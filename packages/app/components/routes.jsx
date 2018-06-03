
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
// Routes
import Layout from './layout';
// import Redirects from '../../react-router-redux-redirect';
import { AccountRoutes } from '@firebase-app/account';
import Home from '../../home';
import NotFound from './404';

const Routes = ({ firebase, auth }) => (
  <Layout>
    {/* Redirects */}
    {/* <Switch>
      <Redirects if={auth.uid} from="/account/" to="/"/>
      <Redirects if={!auth.uid} from="/" to="/account"/>
    </Switch> */}
    
    {/* Content */}
    <Switch> 
      <Route exact path="/" component={Home}/> 
      <Route path="/account" component={AccountRoutes}/> 
      <Route exact component={NotFound}/> 
    </Switch>
  </Layout>
);

export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebaseState.auth,
  }))
)(Routes));