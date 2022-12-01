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
            axios
                .post<User>("/api/login", { email, password })
                .then((res) => {
                    setIsAuth(true);
                    showMessage({
                        title: "ログインしました。",
                        status: "success",
                    });
                    history.push("/home");
                    console.log(res.data);
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
        axios
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

    return { login, logout, isAuth, loading };
};
