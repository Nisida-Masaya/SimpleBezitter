import React, { useCallback, useState } from "react";
import axios from "axios";

import { Article } from "../types/api/Article";

export const useMyGoodList = () => {
    const [loading, setLoading] = useState(false);
    const [myGoodArticles, setMyGoodArticles] = useState<Array<Article>>([]);

    const getMyGoodArticles = useCallback(() => {
        setLoading(true);
        axios
            .get<Array<Article>>("/api/list")
            .then((res) => {
                console.log(res);
                setMyGoodArticles(res.data);
            })
            .catch(() => {
                console.log("投稿記事の取得に失敗しました。");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
 
    return { getMyGoodArticles, loading, myGoodArticles };
};
