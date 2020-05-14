import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, LazyBoundary } from 'react-imported-component';
import Header from 'app/components/header';
import Home from 'app/pages/home';
import LoadingComponent from 'app/pages/loading';

const About = lazy(() => import('app/pages/about'));

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
