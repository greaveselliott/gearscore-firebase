import React from 'react';
import { connect } from 'react-redux';

const ForgottenUsername = () => (
    <div>
        <h1>Forgotten Username</h1>
    </div>
);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenUsername);
