import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase, firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

/**
 * Create a redux store.
 *
 * @param {Object} history - The History manager to use.
 * @param {Object} firebaseApp - The Firebase App instance to use.
 * @param {Object} initialState - The initial state of the Redux store.
 * @return {Object} - The store.
 */
const makeStore = (history, firebaseApp, initialState = {}) => {
    const historyMiddleware = routerMiddleware(history);
    const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

    const config = {
        enableRedirectHandling: false,
        userProfile: 'users'
    };

    const reducers = combineReducers({
        form: formReducer,
        router: routerReducer,
        firebaseState: firebaseStateReducer
    });

    const enhancers = composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(getFirebase)),
        applyMiddleware(historyMiddleware),
        reactReduxFirebase(firebaseApp, config)
    );

    let store = '';
    try {
        store = createStore(
            reducers,
            initialState,
            enhancers
        );
    } catch (e) {
        console.log(e);
    }

    return store;
}

export default makeStore;