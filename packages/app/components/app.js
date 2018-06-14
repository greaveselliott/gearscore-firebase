'use strict';exports.__esModule = true;
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require('firebase/app');var _app2 = _interopRequireDefault(_app);
require('firebase/auth');

var _reactRedux = require('react-redux');


var _makeStore = require('@firebase-app/make-store');
var _history = require('history');
var _reactRouterRedux = require('react-router-redux');

var _JssProvider = require('react-jss/lib/JssProvider');var _JssProvider2 = _interopRequireDefault(_JssProvider);
var _jss = require('jss');
var _jssPresetDefault = require('jss-preset-default');var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);
var _jss2 = require('react-jss/lib/jss');

var _exenv = require('exenv');

var _firebaseTools = require('@firebase-app/firebase-tools');
var _config = require('@firebase-app/config');
var _routes = require('./routes');var _routes2 = _interopRequireDefault(_routes);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                * Loads the App in a server context.
                                                                                                                                                                                *
                                                                                                                                                                                * This takes care of setting up JSS, the Theme, Redux and the Router.
                                                                                                                                                                                */ // Other.
// JSS.
// Redux.
// Firebase.
// React core.
class App extends _react2.default.Component {constructor(props) {super(props);
    // Create a theme instance.
    this.theme = {};

    // Configure JSS
    this.jss = (0, _jss.create)((0, _jssPresetDefault2.default)());
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
      _react2.default.createElement(_JssProvider2.default, { registry: this.props.registry, jss: this.jss },
        _react2.default.createElement(_reactRedux.Provider, { store: this.props.store },
          _react2.default.createElement(_reactRouterRedux.ConnectedRouter, { history: this.props.history },
            _react2.default.createElement(_routes2.default, null)))));




  }}exports.default = App;


// On the client, display the app.
// Local.
// Router.
if (_exenv.canUseDOM) {// Instantiate a Firebase app.
  const firebaseApp = _app2.default.initializeApp(_config.firebaseConfig.result);
  // Keep the Firebase ID Token and the __session cookie in sync.
  (0, _firebaseTools.keepIdTokenInCookie)(firebaseApp, '__session');

  const registry = new _jss2.SheetsRegistry();
  const history = (0, _history.createBrowserHistory)();
  const store = (0, _makeStore.makeStore)(history, firebaseApp, window.__REDUX_STATE__);

  (0, _firebaseTools.whenAuthReady)(store).then(() => {
    // Render the app.
    _reactDom2.default.render(_react2.default.createElement(App, { registry: registry, store: store, history: history }), document.getElementById('app'));
  });
}
//# sourceMappingURL=app.js.map