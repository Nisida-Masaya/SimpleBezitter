/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Article } from "../types/api/Article";

export const useCreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const createArticle = useCallback((context: string) => {
        setLoading(true);
        axios
            .post<Article>("/api/articles", {
                context: context,
                // 'article_image': newArticleImage
            })
            .then((res) => {
                console.log(res);
                history.push("/home");
            })
            .catch(() => {
                console.log("登録できませんでした");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { createArticle, loading };
};
