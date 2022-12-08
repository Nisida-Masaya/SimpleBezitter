/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { Article } from "../types/api/Article";

export const useCreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const createArticle = useCallback((context: string, article_image, ) => {
        setLoading(true);
        const data = new FormData();
        data.append("context", context);
        data.append("article_image", article_image);

        axios
            .post<Article>("/api/articles", data, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);

                showMessage({
                    title: "投稿しました。",
                    status: "success",
                });
                history.push("/home");
            })
            .catch((err) => {
                console.log(err);

                showMessage({
                    title: "投稿できませんでした。",
                    status: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { createArticle, loading };
};
