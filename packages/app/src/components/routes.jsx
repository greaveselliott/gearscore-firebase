
import React from 'react';
import { Router, withRouter, Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// import { AccountRoutes } from '@firebase-app/account';
import { Home } from '@firebase-app/home';
import NotFound from './404.jsx';

const Routes = ({ firebase, auth }) => (
    <Switch> 
      <Route exact path="/" component={Home}/> 
      <Route path="/account" component={AccountRoutes}/>
      <Route exact component={NotFound} /> 
    </Switch>
);

export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebaseState.auth,
  }))
)(Routes));