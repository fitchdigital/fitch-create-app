import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'app/components/header';
import Home from 'app/pages/home/';
import About from 'app/pages/about/index.jsx';

const Application = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Redirect to='/' />
            </Switch>
        </>
    );
};

export default Application;
