import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import LogoutButton from '../account/logout-button';

const Navigation = ({}) => (
  <nav>
    <LogoutButton />
  </nav>
);


export default compose(
  firebaseConnect([]),
  connect(state => ({})),
)(Navigation);