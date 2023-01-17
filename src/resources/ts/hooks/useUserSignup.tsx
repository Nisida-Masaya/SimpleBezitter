/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { User } from "../types/api/User";
import { useMessage } from "./useMessage";

export const useUserSignup = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const createUser = useCallback(
        (
            name: string,
            email: string,
            password: string,
            user_image,
            introduction: string
        ) => {
            setLoading(true);

            const data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("password", password);
            data.append("user_image", user_image);
            data.append("introduction", introduction);

            axios
                .post<User>("/api/signup ", data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    showMessage({
                        title: "ユーザーを作成しました。",
                        status: "success",
                    });

                    history.push("/");
                })
                .catch(() => {
                    console.log("登録できませんでした");
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        []
    );

    return { createUser, loading };
};
