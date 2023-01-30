import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { User } from "../types/api/User";

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const updatePassword = useCallback((inputNowPassword: string, newPassword: string, newPasswordCheck: string) => {
        setLoading(true);

        const data = new FormData();
        data.append("inputNowPassword", inputNowPassword);
        data.append("newPassword", newPassword);
        data.append("newPasswordCheck", newPasswordCheck);

        axios
            .post<User>("/api/updatePassword", data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                showMessage({
                    title: "パスワードを変更しました。",
                    status: "success",
                });
                history.push("/home");
            })
            .catch((err) => {
                console.log(err);

                showMessage({
                    title: "15文字以内で設定してください。",
                    status: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { updatePassword, loading };
};
