import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "../component/pages/Login";
import { Page404 } from "../component/pages/Page404";
import { HomeRoutes } from "./HomeRoutes";

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Login></Login>
            </Route>

            <Route
                path="/home"
                render={({ match: { url } }) => (
                    <Switch>
                        {HomeRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                            >
                                {route.children}
                            </Route>
                        ))}
                    </Switch>
                )}
            />

            <Route path="*">
                <Page404 />
            </Route>
        </Switch>
    );
};
