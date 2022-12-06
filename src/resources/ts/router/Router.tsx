import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { Login } from "../component/pages/Login";
import { Signup } from "../component/pages/Signup";
import { Page404 } from "../component/pages/Page404";
import { HomeRoutes } from "./HomeRoutes";
import { HeaderLayout } from "../component/templates/HeaderLayout";
import { useAuthenticate } from "../hooks/useAuthenticate";

export const Router = () => {
    const history = useHistory();
    const { IsAuth } = useAuthenticate();
    const [loading, setLoading] = useState(false);

    async function GuadRoute() {
        setLoading(true);
        IsAuth()
            .then((isAuth) => {
                if (!isAuth) {
                    if (history.location.pathname === "/") {
                        history.replace("/home");
                    }
                } else {
                    if (
                        history.location.pathname === "/home" ||
                        history.location.pathname === "/home/profile" ||
                        history.location.pathname === "/home/createArticle"
                    ) {
                        history.push("/");
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        GuadRoute();
    }, []);

    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner color="blue.200" />
                </Center>
            ) : (
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

                    <Route exact path="/signup">
                        <Signup></Signup>
                    </Route>

                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            )}
        </>
    );
};
