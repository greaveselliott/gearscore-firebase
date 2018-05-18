import { XMLHttpRequest } from 'xmlhttprequest';
import { https } from 'firebase-functions';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as _ from 'lodash';
import App, { makeRegistry } from '../frontend/app';
import makeStore from '../frontend/make-store';
import firebaseTools, { whenAuthReady } from '../frontend/firebase-tools';
import express from 'express';
import firebaseMiddleware from './firebase-express-middleware';
import firebase from 'firebase';
import admin from 'firebase-admin';
import history, { createMemoryHistory } from 'history';
import getAuthenticatedFirebaseApp from './get-authenticated-firebase-app';

// needed to fix "Error: The XMLHttpRequest compatibility library was not found." in Firebase client SDK.
global.XMLHttpRequest = XMLHttpRequest;

const baseTemplate = fs.readFileSync(path.resolve(__dirname, './index.html'));
const template = _.template(baseTemplate);
const router = new express.Router();
const serviceAccount = require('./service-account-credentials.json');
const firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}, '__service_account');


const cacheControlHeaderValues = {};

// This Express middleware will check ig there is a Firebase ID token and inject
router.use(firebaseMiddleware.auth({
  checkCookie: true,
  generateCustomToken: true,
  firebaseAdminApp: firebaseAdminApp
}));

const handleLoginWithEmail = (values) => {
  return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
      });
};

router.post('/account/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  getAuthenticatedFirebaseApp().then(firebaseApp => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      var model = appModelFactory(req, firebaseApp);
      whenAuthReady(model.store).then(() => {
        const state = model.store.getState();
        const uid = state.firebaseState.auth.uid;
        res.redirect(`/account/login?user=${uid}`);
      });
    })
    .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
  }).catch(error => {
    console.log('There was an error', error);
    res.status(500).send(error);
  });
});

router.get('*', (req, res) => {
  const user = req.user || {};

  getAuthenticatedFirebaseApp(user.uid, user.token).then(firebaseApp => {
    var model = appModelFactory(req, firebaseApp);
    whenAuthReady(model.store).then(() => {
      renderApplication(req, res, model);
    });
  }).catch(error => {
    console.log('There was an error', error);
    res.status(500).send(error);
  });
});

const appModelFactory = (req, firebaseApp) => {
  const history = createMemoryHistory();
  history.replace(req.url);
  const store = makeStore(history, firebaseApp);
  const registry = makeRegistry();

  return { history, store, registry, req };
};

const renderApplication = (req, res, model) => {
  const view = React.createElement(App, {
    history: model.history,
    store: model.store,
    registry: model.registry
  });

  const body = ReactDOMServer.renderToString(view);
  const initialState = model.store.getState();
  const css = model.registry.toString();
  const lastUrl = initialState.router.location.pathname;

  if (lastUrl !== model.req.url) {
    // If there has been a redirect we redirect server side.
    console.log('Server side redirect to', lastUrl);
    res.redirect(lastUrl);
  } else {
    // res.set('Cache-Control', 'public, max-age=60, s-maxage=180'); // TODO: make this change dependent on each URL. with a map maybe??
    // If there was no redirect we send the rendered app as well as the redux state.
    res.send(template({body, initialState, css, node_env: process.env.NODE_ENV}));
  }
};

/**
 * Helper function to get the markup from React, inject the initial state, and
 * send the server-side markup to the client
 */
exports = module.exports = https.onRequest(router);