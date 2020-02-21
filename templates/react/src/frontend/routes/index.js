import React from 'react';

export const routes = [
    {
        path: '/',
        exact: true,
        child: <h2>Homepage</h2>,
    },
    {
        path: '/about',
        child: <h2>About</h2>,
    },
];
