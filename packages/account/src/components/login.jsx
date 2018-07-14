import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import GoogleButton from 'react-google-button';
import LoginForm from './login-form';

export const LoginPage = ({ firebase, auth }) => (
  <div className="login">
    <GoogleButton onClick={() => firebase.login({ provider: 'google', type: 'redirect' })} />
    <LoginForm />
  </div>
);

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
  })
};

export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebaseState.auth,
  }))
)(LoginPage));