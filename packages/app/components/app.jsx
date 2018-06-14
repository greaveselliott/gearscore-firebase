// React core.
import React from 'react';
import ReactDOM from 'react-dom';
// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
// Redux.
import { Provider } from 'react-redux';

// Router.
import { makeStore } from '@firebase-app/make-store';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
// JSS.
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss/lib/jss';
// Other.
import { canUseDOM } from 'exenv';
// Local.
import { whenAuthReady, keepIdTokenInCookie } from '@firebase-app/firebase-tools';
import { firebaseConfig } from '@firebase-app/config';
import Routes from './routes';

/**
 * Loads the App in a server context.
 *
 * This takes care of setting up JSS, the Theme, Redux and the Router.
 */
export default class App extends React.Component {

  constructor(props) {
    super(props);

    // Create a theme instance.
    this.theme =  {};

    // Configure JSS
    this.jss = create(preset());
    //this.jss.options.createGenerateClassName = createGenerateClassName;
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <JssProvider registry={this.props.registry} jss={this.jss}>
          <Provider store={this.props.store}>
            <ConnectedRouter history={this.props.history}>
              <Routes/>
            </ConnectedRouter>
          </Provider>
      </JssProvider>
    );
  }
}

// On the client, display the app.
if (canUseDOM) {
  // Instantiate a Firebase app.
  const firebaseApp = firebase.initializeApp(firebaseConfig.result);

  // Keep the Firebase ID Token and the __session cookie in sync.
  keepIdTokenInCookie(firebaseApp, '__session');

  const registry = new SheetsRegistry();
  const history = createBrowserHistory();
  const store = makeStore(history, firebaseApp, window.__REDUX_STATE__);
  
  whenAuthReady(store).then(() => {
    // Render the app.
      ReactDOM.render(<App registry={registry} store={store} history={history}/>, document.getElementById('app'));
  });
}
