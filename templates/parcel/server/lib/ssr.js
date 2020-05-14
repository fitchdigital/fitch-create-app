import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { printDrainHydrateMarks } from 'react-imported-component';
import through from 'through';
import { PassThrough } from 'stream';
import configure, {
    makeStateImmutable,
    rootSaga,
    actionAppInit,
} from 'app/store/config';
import Application from 'app/application';
import { getHTMLFragments } from './client';

// max time allowed for SSR before bailing
const SSR_TIMEOUT = 5000;

const getApplicationStream = (store, originalUrl, context) => {
    const helmetContext = {};
    const app = (
        <HelmetProvider context={helmetContext}>
            <Provider store={store}>
                <StaticRouter location={originalUrl} context={context}>
                    <Application />
                </StaticRouter>
            </Provider>
        </HelmetProvider>
    );

    return renderToNodeStream(app);
};

export function write (data) {
    this.queue(data);
}

export const end = endingHTMLFragment =>
    function end () {
        this.queue(endingHTMLFragment);
        this.queue(null);
    };

export const ssr = getApplicationStream => (request, h) => {
    const before = Date.now();

    // initial state
    const api = process.env.API || 'http://localhost:1234';
    const initialState = makeStateImmutable({
        application: { api },
    });

    // create redux store
    const store = configure({
        initialState,
    });

    return new Promise((resolve, reject) => {
        try {
            // let redux initial saga do all the calls it needs
            let timeout = null;

            let unsubscribe = () => null;
            const onStoreEvents = () => {
                const state = store.getState();
                if (state.application.toJS().ready) {
                    unsubscribe();
                    clearTimeout(timeout);

                    // once the saga is done, handle SSR
                    const pathname = request.url.pathname;
                    const context = {};
                    const stream = getApplicationStream(
                        store,
                        pathname,
                        context
                    );

                    const [
                        startingHTMLFragment,
                        endingHTMLFragment,
                    ] = getHTMLFragments({
                        state,
                        drainHydrateMarks: printDrainHydrateMarks(),
                    });

                    console.log(
                        `Route "${pathname}" generated in ${Date.now() -
                            before}ms`
                    );

                    const res = new PassThrough();
                    res.write(startingHTMLFragment);
                    stream
                        .pipe(through(write, end(endingHTMLFragment)))
                        .pipe(res);

                    resolve(
                        h
                            .response(res)
                            .type('text/html')
                            .code(200)
                    );
                }
            };

            timeout = setTimeout(() => {
                console.log('Request Timeout');
                reject(h.code(408));
            }, SSR_TIMEOUT);

            unsubscribe = store.subscribe(onStoreEvents);
            store.runSaga(rootSaga).done; // eslint-disable-line
            store.dispatch(actionAppInit(request.url.pathname));
            store.close();
        } catch (e) {
            reject(h.code(500));
        }
    });
};

const defaultSSR = ssr(getApplicationStream);

export default defaultSSR;
