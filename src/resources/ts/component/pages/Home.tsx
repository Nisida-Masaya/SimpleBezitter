import React, { memo, useCallback, useEffect, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Center, Image, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useAllArticles } from "../../hooks/useAllArticles";
import { useLoginUser } from "../../hooks/useLoginUser";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const Home: VFC = memo(() => {
    const history = useHistory();
    const { getArticles, loading, articles } = useAllArticles();
    const { loginUser } = useLoginUser();

    const onClickCreateArticle = useCallback(
        () => history.push("/home/createArticle"),
        []
    );    

    useEffect(() => {
        getArticles();
    }, []);

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
                            <Image
                                src={article.article_image}
                                width={300}
                                height={40}
                            />
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
