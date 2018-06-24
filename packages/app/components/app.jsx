import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { canUseDOM } from 'exenv';
import { whenAuthReady, keepIdTokenInCookie } from '@firebase-app/firebase-tools';
import { firebaseConfig } from '@firebase-app/config';
import makeStore from '@firebase-app/make-store';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';

const App = ({store, history}) => (
    <div>
      <Provider store={store}>
        <ConnectedRouter location='/' action='x' history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </div>
);
      
export default App;

// On the client, display the app.
if (canUseDOM) {
  // Instantiate a Firebase app.
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Keep the Firebase ID Token and the __session cookie in sync.
  keepIdTokenInCookie(firebaseApp, '__session');

  const history = createBrowserHistory();
  const store = makeStore(history, firebaseApp, window.__REDUX_STATE__);
  
  whenAuthReady(store).then(() => {
    // Render the app.
      // ReactDOM.hydrate(<App store={store} history={history}/>, document.getElementById('app'));
  });
}
