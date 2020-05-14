import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default () => (
    <div className='header'>
        <h1>--TITLE--</h1>
        <nav>
            <NavLink to='/' exact activeClassName='active'>
                Home
            </NavLink>
            <NavLink to='/about' exact activeClassName='active'>
                About
            </NavLink>
        </nav>
    </div>
);
