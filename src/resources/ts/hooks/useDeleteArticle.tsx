/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Article } from "../types/api/Article";
import { useMessage } from "./useMessage";

export const useDeleteArticle = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const deleteArticle = useCallback((id: number) => {
        setLoading(true);

        if (history.location.pathname === "/home") {
            axios
                .delete<Article>(`/api/articles/${id}`, {})
                .then((res) => {
                    showMessage({
                        title: "削除しました。",
                        status: "success",
                    });
                    history.push("/");
                    history.push("/home");
                })
                .catch((err) => {
                    console.log(err);

                    showMessage({
                        title: "削除できませんでした。",
                        status: "error",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (history.location.pathname === "/home/myGoodList") {
            axios
                .delete<Article>(`/api/articles/${id}`, {})
                .then((res) => {
                    showMessage({
                        title: "削除しました。",
                        status: "success",
                    });
                    history.push("/");
                    history.push("/home/myGoodList");
                })
                .catch((err) => {
                    console.log(err);

                    showMessage({
                        title: "削除できませんでした。",
                        status: "error",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    return { deleteArticle, loading };
};
