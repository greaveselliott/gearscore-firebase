import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { ProfileContainer } from './';
import GoogleButton from 'react-google-button';

export const LoginPage = ({ firebase: { login }, auth }) => (
  <div className="login">
    <GoogleButton onClick={() => firebase.login({ provider: 'google', type: 'popup' })} />
    <div>
      {
        firebase.auth.isLoaded ? <span>Loading...</span> : firebase.auth.isEmpty
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(firebase.auth, null, 2)}</pre>
      }
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
  })
}

export default compose(
  withFirebase(LoginPage),
  connect(state => ({
    auth: state.firebaseState.auth
  })),
);