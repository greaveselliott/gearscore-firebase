import React from 'react';
import { connect } from 'react-redux';

const ResetPassword = () => (
    <div>
        <h1>Reset Password</h1>
    </div>
);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
