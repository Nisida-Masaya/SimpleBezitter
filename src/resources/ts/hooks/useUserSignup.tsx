/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { User } from "../types/api/User";

export const useUserSignup = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const createUser = useCallback((name: string, email: string, password: string) => {

        setLoading(true);
        axios
            .post<User>("/api/signup ", {
                name: name,
                email: email,
                password: password,
                // 'article_image': newArticleImage
            })
            .then((res) => {
                console.log(res);
                history.push("/");
            })
            .catch(() => {
                console.log("登録できませんでした");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { createUser, loading };
};
