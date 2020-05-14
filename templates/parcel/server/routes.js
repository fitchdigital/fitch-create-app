import ssr from './lib/ssr';

export default [
    // static files
    {
        method: 'GET',
        path: '/dist/client/{file*}',
        handler: {
            directory: {
                path: 'dist/client',
            },
        },
    },

    // all other routes
    {
        method: 'GET',
        path: '/{param*}',
        handler: ssr,
    },
];
