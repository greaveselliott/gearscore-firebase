
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal, withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
// Routes
import Layout from './components/layout';
import ConditionalRedirect from './conditional-redirect';
import { AccountRoutes } from './account';
import Home from './components/home';
import NotFound from './components/404';


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

const Routes = ({ auth }) => (
  <Layout>
    {/* Redirects */}
    <Switch>
      <ConditionalRedirect if={auth.uid} from="/account" to="/"/>
      <ConditionalRedirect if={!auth.uid} from="/" to="/account"/>
    </Switch>
    
    {/* Content */}
    <Switch> 
      <Route exact path="/" component={Home}/> 
      <Route path="/account" component={AccountRoutes}/> 
      <Route exact component={NotFound}/> 
    </Switch>
  </Layout>
);

export default withRouter(compose(
  firebaseConnect(['firebaseState/auth/uid']), 
  connect(state => ({ auth: state.firebaseState.auth })
)))(Routes);