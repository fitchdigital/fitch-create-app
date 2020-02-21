import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { routes } from 'app/routes';

export const Application = () => {
    return (
        <>
            <nav>
                {routes.map(route => (
                    <Link key={`nav-${route.path}`} to={route.path}>
                        {route.path}
                    </Link>
                ))}
            </nav>
            <Switch>
                {routes.map(route => (
                    <Route
                        key={`component-${route.path}`}
                        path={route.path}
                        exact={route.exact}
                    >
                        {route.child}
                    </Route>
                ))}
            </Switch>
        </>
    );
};
