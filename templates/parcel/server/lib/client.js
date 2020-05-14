import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';

const htmlPath = path.join(process.cwd(), 'dist', 'client', 'index.html');
const rawHTML = fs.readFileSync(htmlPath).toString();

const appString = '<div id="app">';
const splitter = '###SPLIT###';
const [startingRawHTMLFragment, endingRawHTMLFragment] = rawHTML
    .replace(appString, `${appString}${splitter}`)
    .split(splitter);

export const getHTMLFragments = ({ state, drainHydrateMarks }) => {
    const initialState = `<script>window.__INITIAL_STATE__ = ${serialize(
        state
    )}</script>`;
    const startingHTMLFragment = `${startingRawHTMLFragment}${drainHydrateMarks}${initialState}`;

    return [startingHTMLFragment, endingRawHTMLFragment];
};
