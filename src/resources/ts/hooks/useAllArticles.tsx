import React, { useCallback, useState } from "react";
import axios from "axios";

import { Article } from "../types/api/Article";

export const useAllArticles = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<Array<Article>>([]);

    const getArticles = useCallback(() => {
        setLoading(true);

        axios
            .get<Array<Article>>("api/articles")
            .then((res) => {
                setArticles(res.data);
            })
            .catch(() => {
                console.log("投稿記事の取得に失敗しました。");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { getArticles, loading, articles };
};
