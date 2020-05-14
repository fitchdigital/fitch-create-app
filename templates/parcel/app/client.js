import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { rehydrateMarks } from 'react-imported-component';
import Application from './application';
import './styles/index.scss';

export const hydrate = (app, element) => () => {
    ReactDOM.hydrate(app, element);
};

export const start = ({ isProduction, document, module, hydrate }) => {
    const element = document.getElementById('app');
    const app = (
        <HelmetProvider>
            <BrowserRouter>
                <Application />
            </BrowserRouter>
        </HelmetProvider>
    );

    const lib = 'color:#666;font-size:x-small;font-weight:bold;';
    const parameters = 'color:#777;font-size:x-small';
    const values = 'color:#f33;font-size:x-small';
    const node = process.env.__NODE_ENV__;
    const name = process.env.__NAME__;
    const args = [`%c${name}\n%cnode: %c${node}`, lib, parameters, values];

    console.log(...args);

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
    module: module,
    hydrate,
};

start(options);
