import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { User } from "../types/api/User";

export const useEditUserImage = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const updateUserImage = useCallback((id: number, user_image: string) => {
        setLoading(true);

        const data = new FormData();
        data.append("id", id.toString());
        data.append("user_image", user_image);

        axios
            .post<User>("/api/userImageUpdate", data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                showMessage({
                    title: "プロフィールを更新しました。",
                    status: "success",
                });
                history.push("/");
                history.push("/home/profile");
            })
            .catch((err) => {
                console.log(err);

                showMessage({
                    title: "更新に失敗しました。",
                    status: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { updateUserImage, loading };
};
