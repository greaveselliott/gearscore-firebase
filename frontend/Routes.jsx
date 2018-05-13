
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import * as _ from 'lodash';
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

/**
 * All the routes.
 */
class Routes extends React.Component {

  isAuth = false;

  componentWillMount() {
    // this.isAuth = !this.props.firebaseState.auth.isEmpty;
  }

  render() {

    return (
      <Layout>
        {/* Redirects */}
        <Switch>
          <ConditionalRedirect if={this.isAuth} from="/account" to="/"/>
          <ConditionalRedirect if={!this.isAuth} from="/" to="/account"/>
        </Switch>
        {/* Content */}
        <Switch> 
          <Route exact path="/" component={Home}/> 
          <Route path="/account" component={AccountRoutes}/> 
          <Route exact component={NotFound}/> 
        </Switch>
      </Layout>
    )
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({
    isAuth: _.get(state, 'firebaseState.data.flamelink.environments.production.content.blog.en-US', undefined),
  }))
)(Routes));