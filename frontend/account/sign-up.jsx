import React from 'react';
import { connect } from 'react-redux';

const SignUp = () => (
    <div>
        <h1>Sign up</h1>
    </div>
);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
