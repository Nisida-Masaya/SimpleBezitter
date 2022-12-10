/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { Article } from "../types/api/Article";

export const useDeleteArticle = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const deleteArticle = useCallback((id: number ) => {
        setLoading(true);

        axios
            .delete<Article>(`/api/articles/${id}`, {
                
            })
            .then((res) => {
                console.log(res.data);

                showMessage({
                    title: "削除しました。",
                    status: "success",
                });
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
    }, []);

    return { deleteArticle, loading };
};
