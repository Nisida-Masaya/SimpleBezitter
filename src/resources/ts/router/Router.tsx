import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { Login } from "../component/pages/Login";
import { Page404 } from "../component/pages/Page404";
import { HomeRoutes } from "./HomeRoutes";
import { HeaderLayout } from "../component/templates/HeaderLayout";
import { useAuthenticate } from "../hooks/useAuthenticate";

export const Router = () => {
    const { isAuth } = useAuthenticate();
    const [loading, setLoading] = useState(false);

    return (
        <>
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
                                    <HeaderLayout>
                                        {route.children}
                                    </HeaderLayout>
                                </Route>
                            ))}
                        </Switch>
                    )}
                />

                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
        </>
    );
};
