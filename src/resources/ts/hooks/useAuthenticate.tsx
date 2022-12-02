import React, { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/User";
import { useMessage } from "./useMessage";

export const useAuthenticate = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    const { showMessage } = useMessage();

    const history = useHistory();

    const login = useCallback(
        ({ email, password }: { email: string; password: string }) => {
            setLoading(true);
            setIsAuth(true);
            axios
                .post<User>("/api/login", { email, password })
                .then((res) => {
                    showMessage({
                        title: "ログインしました。",
                        status: "success",
                    });
                    history.replace("/home");
                })
                .catch(() => {
                    showMessage({
                        title: "ログインに失敗しました。",
                        status: "error",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        []
    );

    const logout = useCallback(() => {
        setIsAuth(false);
        axios
            .post<User>("/api/logout")
            .then((res) => {
                //ログアウトURL
                history.replace("/");
                showMessage({
                    title: "ログアウトしました。",
                    status: "success",
                });
            })
            .catch(() => {
                showMessage({
                    title: "ログアウトに失敗しました。",
                    status: "error",
                });
            });
    }, []);

    const IsAuth = () => {
        return new Promise(function (resolve, reject){
            axios.get('api/isAuth')
            .then((res) => resolve(res.data))
            .catch((e) => reject(e))
        });
    };

    return { login, logout, IsAuth, isAuth, loading };
};
