import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import GoogleButton from 'react-google-button';

export const LoginPage = ({ firebase: { login }, auth }) => (
  <div className="login">
    <GoogleButton onClick={() => login({ provider: 'google', type: 'popup' })} />
    <div>
      {
        auth.isLoaded ? <span>Loading...</span> : auth.isEmpty
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
    </div>
  </div>
)

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