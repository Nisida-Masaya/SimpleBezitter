import React, { memo, useCallback, useEffect, VFC } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useAllArticles } from "../../hooks/useAllArticles";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const Home: VFC = memo(() => {
    const history = useHistory();
    const { getArticles, loading, articles } = useAllArticles();

    const onClickCreateArticle = useCallback(
        () => history.push("/home/createArticle"),
        []
    );

    useEffect(() => getArticles(), []);

    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner color="blue.200" />
                </Center>
            ) : (
                <Box>
                    {articles.map((article) => (
                        <Box key={article.id}>
                            <span>{article.context}</span>
                        </Box>
                    ))}
                    <Box borderRadius="md">
                        <AddIcon
                            w={10}
                            h={10}
                            color="gray.700"
                            onClick={onClickCreateArticle}
                        ></AddIcon>
                    </Box>
                </Box>
            )}
        </>
    );
});
