import React, { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/User";

export const useAuthenticate = () => {
    const [isAuth, setIsAuth] = useState(false);
    const history = useHistory();

    const login = useCallback(
        ({ email, password }: { email: string; password: string }) => {
            const data = axios
                .post<User>("/api/login", { email, password })
                .then((res) => {
                    setIsAuth(true);
                    history.push("/home");
                    console.log("ログインしました");
                    console.log(res.data);
                })
                .catch(() => {
                    console.log("ログインできません");
                });
        },
        []
    );

    const logout = useCallback(() => {
        const data = axios
            .post<User>("/api/logout")
            .then((res) => {
                setIsAuth(false);
                //ログインURL
                history.push("/");
                console.log("ログアウトしました");
            })
            .catch(() => {
                console.log("ログアウトできませんでした");
            });
    }, []);

    return { login, logout, isAuth };
};
