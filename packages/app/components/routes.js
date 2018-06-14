'use strict';exports.__esModule = true;
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRouter = require('react-router');
var _reactRedux = require('react-redux');
var _reactReduxFirebase = require('react-redux-firebase');
var _redux = require('redux');

var _layout = require('./layout');var _layout2 = _interopRequireDefault(_layout);

var _account = require('@firebase-app/account');
var _home = require('../../home');var _home2 = _interopRequireDefault(_home);
var _ = require('./404');var _2 = _interopRequireDefault(_);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Routes

const Routes = ({ firebase, auth }) =>
_react2.default.createElement(_layout2.default, null,







  _react2.default.createElement(_reactRouter.Switch, null,
    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/account', component: _account.AccountRoutes }),
    _react2.default.createElement(_reactRouter.Route, { exact: true, component: _2.default }))); // import Redirects from '../../react-router-redux-redirect';
exports.default =



(0, _reactRouter.withRouter)((0, _redux.compose)(
(0, _reactReduxFirebase.firebaseConnect)(),
(0, _reactRedux.connect)(state => ({
  auth: state.firebaseState.auth })))(

Routes));
//# sourceMappingURL=routes.js.map