import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Navigation } from '@firebase-app/app';

const Layout = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
);

export default compose(firebaseConnect(), connect(state => state))(Layout);
