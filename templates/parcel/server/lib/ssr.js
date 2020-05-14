import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { printDrainHydrateMarks } from 'react-imported-component';
import through from 'through';
import { PassThrough } from 'stream';
import Application from '../../app/application';
import { getHTMLFragments } from './client';
// import { getDataFromTree } from 'react-apollo';

const getApplicationStream = (originalUrl, context) => {
    const helmetContext = {};
    const app = (
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={originalUrl} context={context}>
                <Application />
            </StaticRouter>
        </HelmetProvider>
    );

    // const sheet = new ServerStyleSheet()
    // return sheet.interleaveWithNodeStream(
    //   renderToNodeStream(sheet.collectStyles(app))
    // )
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
    return new Promise((resolve, reject) => {
        try {
            const pathname = request.url.pathname;
            // If you were using Apollo, you could fetch data with this
            // await getDataFromTree(app);
            const context = {};
            const stream = getApplicationStream(pathname, context);

            if (context.url) {
                h.redirect(context.url).code(301);
            }

            const [startingHTMLFragment, endingHTMLFragment] = getHTMLFragments(
                {
                    drainHydrateMarks: printDrainHydrateMarks(),
                }
            );

            console.log(
                `Route "${pathname}" generated in ${Date.now() - before}ms`
            );

            const res = new PassThrough();
            res.write(startingHTMLFragment);
            stream.pipe(through(write, end(endingHTMLFragment))).pipe(res);

            resolve(
                h
                    .response(res)
                    .type('text/html')
                    .code(200)
            );
        } catch (e) {
            reject(h.code(500));
        }
    });
};

const defaultSSR = ssr(getApplicationStream);

export default defaultSSR;
