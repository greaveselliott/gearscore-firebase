import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { LogoutButton } from '../account/';

const Navigation = ({isAuth}) => (
  <nav>
    { isAuth ? <LogoutButton /> : <Link to='/account/login'>Login</Link> }
  </nav>
);


export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({
    isAuth: !state.firebaseState.auth.isEmpty,
  }))
)(Navigation));