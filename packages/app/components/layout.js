'use strict';exports.__esModule = true;















var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _reactRouterDom = require('react-router-dom');
var _redux = require('redux');
var _reactReduxFirebase = require('react-redux-firebase');
var _navigation = require('./navigation');var _navigation2 = _interopRequireDefault(_navigation);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                *
                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                *
                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                *
                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                */const styles = theme => ({});class Layout extends _react2.default.Component {render() {return _react2.default.createElement('div', null, _react2.default.createElement(_navigation2.default, null), this.props.children);}}exports.default =

(0, _redux.compose)((0, _reactReduxFirebase.firebaseConnect)(), (0, _reactRedux.connect)(state => state))(Layout);
//# sourceMappingURL=layout.js.map