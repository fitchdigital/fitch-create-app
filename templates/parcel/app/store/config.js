import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { END } from 'redux-saga';
import Immutable, { fromJS } from 'immutable';
import installDevTools from 'immutable-devtools';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { actionAppInit } from './application/actions';
import history from '../history';

const USE_DEV_TOOLS =
    global.__REDUX_DEVTOOLS_EXTENSION__ &&
    process.env.NODE_ENV !== 'production';
if (USE_DEV_TOOLS) installDevTools(Immutable);

const makeStateImmutable = (
    state = { application: { api: process.env.API } }
) => {
    const immutableState = {};
    Object.keys(state).forEach(key => {
        immutableState[key] = fromJS(state[key]);
    });

    return immutableState;
};

// optional exports
export { makeStateImmutable, rootSaga, actionAppInit };

// default export
export default (options = {}) => {
    const { initialState = {} } = options;

    const middlewares = [];

    // adds saga middleware
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware, routerMiddleware(history));

    const createReduxStore = USE_DEV_TOOLS
        ? compose(
              applyMiddleware(...middlewares),
              global.__REDUX_DEVTOOLS_EXTENSION__()
          )
        : compose(applyMiddleware(...middlewares));

    const store = createReduxStore(createStore)(rootReducer, initialState);
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
};
