import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';

const LogoutButton = ({ firebase }) => (
    <button onClick={() => firebase.logout()}>Logout</button>
)

LogoutButton.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired
  })
}

export default withFirebase(LogoutButton);