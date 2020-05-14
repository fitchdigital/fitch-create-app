import ssr from './lib/ssr';

export default [
    // mock api call
    {
        method: 'GET',
        path: '/api/page/{page*}',
        handler: (request, h) => {
            const page = request.params.page;
            return {
                type:
                    'this is a mock up api call until we point to the cms api',
                page,
                components: [],
            };
        },
    },

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
