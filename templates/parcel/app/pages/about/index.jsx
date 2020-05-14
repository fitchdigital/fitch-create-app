import React from 'react';
import { Helmet } from 'react-helmet-async';
import './style.scss';

const About = () => (
    <div className='about'>
        <Helmet>
            <title>About Page</title>
        </Helmet>

        <p>This is the about page</p>
    </div>
);

export default About;
