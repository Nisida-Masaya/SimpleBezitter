import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import axios from "axios";

import { Article } from "../../types/api/Article";
import { Link, useHistory } from "react-router-dom";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const Home: VFC = memo(() => {
    const [articles, setArticles] = useState<Array<Article>>([]);
    const history = useHistory();

    const onClickCreateArticle = useCallback(() => history.push("/home/createArticle"), []);


    const getArticles = async () => {
        const data = await axios
            .get<Array<Article>>("api/articles")
            .then((res) => {
                setArticles(res.data);
            });
        console.log(data);
    };

    useEffect(() => {
        getArticles();
    });

  return (
    <>
            <h1>ホームページ</h1>
            <Link onClick={onClickCreateArticle} to="/home/createArticle" >新規投稿</Link>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <span>{article.context}</span>
                    </li>
                ))}
            </ul> 
        </>
  );
});
