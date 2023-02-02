import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { User } from "../types/api/User";

export const useEditUserProfile = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const updateUserProfile = useCallback((id: number, name: string, introduction: string) => {
        setLoading(true);

        const data = new FormData();
        data.append("id", id.toString());
        data.append("name", name);
        data.append("introduction", introduction);

        axios
            .post<User>("/api/update", data, {
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

    return { updateUserProfile, loading };
};
