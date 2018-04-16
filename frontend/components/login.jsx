import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {

    constructor(props) {
        super(props);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(e) {
        e.preventDefault();
        this.props.firebase.login({
            email: 'test@test.com',
            password: 'testest1'
        });
        console.log('Logging in.');
    }

    render() {
        return (
            <form className="login" onSubmit={this.loginUser}>
                <h1>Login page</h1>
                <label>Email</label>
                <input type="email" name="email" id="email" />
                <label>Password</label>
                <input type="password" name="password" id="password" />
                <input type="submit" />
            </form>
        )
    }
}

export default firebaseConnect()(Login);