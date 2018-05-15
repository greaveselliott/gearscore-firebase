import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

const handleLoginWithEmail = (values, { firebase}) => {
    return firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
};

export default withFirebase(handleLoginWithEmail);