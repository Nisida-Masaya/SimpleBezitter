/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Article } from "../types/api/Article";
import { useMessage } from "./useMessage";

export const useCreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { showMessage } = useMessage();

    const createArticle = useCallback(
        (context: string, article_image) => {
            setLoading(true);
            // console.log(context);
            // console.log(article_image);
            const data = new FormData();
            data.append("context", context);
            data.append("article_image", article_image);

            console.log(data.get('article_image'));

            axios
                .post("/api/articles", data, {
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
        },
        []
    );

    return { createArticle, loading };
};
