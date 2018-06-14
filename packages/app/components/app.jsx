import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { canUseDOM } from 'exenv';
import { whenAuthReady, keepIdTokenInCookie } from '@firebase-app/firebase-tools';
import { firebaseConfig } from '@firebase-app/config';
import Routes from './routes';

const App = ({store, history}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>
);
      
export default App;

// On the client, display the app.
if (canUseDOM) {
  // Instantiate a Firebase app.
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Keep the Firebase ID Token and the __session cookie in sync.
  keepIdTokenInCookie(firebaseApp, '__session');

  const registry = new SheetsRegistry();
  const history = createBrowserHistory();
  // const store = makeStore(history, firebaseApp, window.__REDUX_STATE__);
  
  const store = {};
  
  whenAuthReady(store).then(() => {
    // Render the app.
      ReactDOM.render(<App registry={registry} store={store} history={history}/>, document.getElementById('app'));
  });
}
