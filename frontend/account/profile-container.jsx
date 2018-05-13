import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const ProfileContainer = (Component) => compose(
    firebaseConnect(),
    connect(state => {
        profile: state.firebase.profile
    })
);

export default ProfileContainer;