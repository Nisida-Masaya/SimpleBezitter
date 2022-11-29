import React from "react";

import { Home } from "../component/pages/Home";
import { Profile } from "../component/pages/Profile";
import { CreateArticle } from "../component/pages/CreateArticle";
import { Page404 } from "../component/pages/Page404";

export const HomeRoutes = [
    {
        path: "/",
        exact: true,
        children: <Home />,
    },
    {
        path: "/profile",
        exact: false,
        children: <Profile />,
    },
    {
        path: "/createArticle",
        exact: false,
        children: <CreateArticle />,
    },
    {
        path: "*",
        exact: false,
        children: <Page404 />,
    },
];
