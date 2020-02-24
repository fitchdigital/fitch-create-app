import React from 'react';
import { HomePage } from 'app/pages/home';
import { AboutPage } from 'app/pages/about';

export const routes = [
    {
        path: '/',
        exact: true,
        child: <HomePage />,
    },
    {
        path: '/about',
        child: <AboutPage />,
    },
];
