import React from 'react';
import { Helmet } from 'react-helmet-async';
import './style.scss';

const Home = () => (
    <div className='home'>
        <Helmet>
            <title>Home Page</title>
        </Helmet>

        <p>This is the home page</p>
    </div>
);

export default Home;
