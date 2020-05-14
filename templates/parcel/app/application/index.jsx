import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, LazyBoundary } from 'react-imported-component';
import Header from '../components/header';
import Home from '../pages/home';
import LoadingComponent from '../pages/loading';

const About = lazy(() => import('../pages/about'));

export const renderAboutPage = () => (
    <LazyBoundary fallback={<LoadingComponent />}>
        <About />
    </LazyBoundary>
);

const Application = () => (
    <>
        <Header />

        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' render={renderAboutPage} />
            <Redirect to='/' />
        </Switch>
    </>
);

export default Application;
