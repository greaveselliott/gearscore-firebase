import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

const LoginForm = ({ handleSubmit, firebase }) => {

    const handleLoginWithEmail = (values) => {
        return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    };

    return (
        <form action="/account/login" onSubmit={handleSubmit(handleLoginWithEmail)}>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default compose(
    firebaseConnect(),
    reduxForm({form: 'login'}),
)(LoginForm);