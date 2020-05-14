import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rehydrateMarks } from 'react-imported-component';
import Application from './application';
import history from './history';
import configure, {
    makeStateImmutable,
    rootSaga,
    actionAppInit,
} from './store/config';
import './styles/index.scss';

export const hydrate = (app, element) => () => {
    ReactDOM.hydrate(app, element);
};

export const start = ({ isProduction, document, module, hydrate }) => {
    const lib = 'color:#666;font-size:x-small;font-weight:bold;';
    const parameters = 'color:#777;font-size:x-small';
    const values = 'color:#f33;font-size:x-small';
    const node = process.env.NODE_ENV;
    const name = process.env.NAME;
    const api = process.env.API;
    const args = [
        `%c${name}\n%cnode: %c${node}\n%capi: %c${api}`,
        lib,
        parameters,
        values,
        parameters,
        values,
    ];

    console.log(...args);

    // init redux store
    const initialState = makeStateImmutable(global.__INITIAL_STATE__);
    delete global.__INITIAL_STATE__;

    const store = configure({
        initialState,
    });
    store.runSaga(rootSaga);
    store.dispatch(actionAppInit(global.location.pathname));

    //
    const element = document.getElementById('app');
    const app = (
        <HelmetProvider>
            <Provider store={store}>
                <Router history={history}>
                    <Application />
                </Router>
            </Provider>
        </HelmetProvider>
    );

    if (isProduction) {
        rehydrateMarks().then(hydrate(app, element));
    } else {
        ReactDOM.render(app, element);
    }

    if (module.hot) {
        module.hot.accept();
    }
};

const options = {
    isProduction: process.env.NODE_ENV === 'production',
    document: document,
    module,
    hydrate,
};

start(options);
