'use strict';exports.__esModule = true;var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRouterDom = require('react-router-dom');
var _reactRedux = require('react-redux');
var _reactReduxFirebase = require('react-redux-firebase');
var _redux = require('redux');
var _account = require('@firebase-app/account');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const Navigation = ({ isAuth }) =>
_react2.default.createElement('nav', null,
  isAuth ? _react2.default.createElement(_account.LogoutButton, null) : _react2.default.createElement(_reactRouterDom.Link, { to: '/account/login' }, 'Login'));exports.default =




(0, _reactRouterDom.withRouter)((0, _redux.compose)(
(0, _reactReduxFirebase.firebaseConnect)(),
(0, _reactRedux.connect)(state => ({
  isAuth: !state.firebaseState.auth.isEmpty })))(

Navigation));
//# sourceMappingURL=navigation.js.map