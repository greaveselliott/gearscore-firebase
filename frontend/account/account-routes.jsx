import React, {Fragment} from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import { Login, SignUp, ResetPassword, ForgottenUsername } from './';

const Routes = ({ match }) => (
    <Fragment>
        <ul>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`${match.url}/login`}>Login</Link></li>
            <li><Link to={`${match.url}/sign-up`}>Sign-up</Link></li>
            <li><Link to={`${match.url}/reset-password`}>Reset password</Link></li>
            <li><Link to={`${match.url}/forgotten-username`}>Forgotten username</Link></li>
        </ul>
        <Switch>
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={`${match.url}/sign-up`} component={SignUp} /> 
            <Route path={`${match.url}/reset-password`} component={ResetPassword} /> 
            <Route path={`${match.url}/forgotten-username`} component={ForgottenUsername} />
        </Switch>
    </Fragment>
);

export default withRouter(compose(
  firebaseConnect(),
  connect(state => ({}))
)(Routes));