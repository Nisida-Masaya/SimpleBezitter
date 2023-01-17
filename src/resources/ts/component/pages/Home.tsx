import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Center,
    Image,
    Spinner,
    Text,
    Flex,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { useAllArticles } from "../../hooks/useAllArticles";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";
import { useLoginUser } from "../../hooks/useLoginUser";
import { ArticleDeleteModal } from "../organisms/article/ArticleDeleteModal";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const Home: VFC = memo(() => {
    const history = useHistory();
    const { getArticles, loading, articles } = useAllArticles();
    const { loginUser, getLoginUser } = useLoginUser();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delArticle, setDelArticle] = useState<number>(0);

    const onClickCreateArticle = useCallback(
        () => history.push("/home/createArticle"),
        []
    );

    const onClickDeleteArticle = useCallback((article_id: number) => {
        setDelArticle(article_id);
        console.log(delArticle);
    }, []);

    //いいね
    const onClickGood = (id: number) => {
        axios.post(`api/like/${id}`).then((res) => {
            console.log(res.data);
        });
    };

    useEffect(() => {
        getArticles();
        getLoginUser();
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
                        <Box
                            key={article.id}
                            backgroundColor="gray.100"
                            borderRadius="5px"
                            mb={2}
                            ml={100}
                            w={1000}
                            p={2}
                        >
                            <Flex justifyContent="space-between">
                                <Flex>
                                    {article.user_image ? (
                                        <Image
                                            src={article.user_image}
                                            borderRadius="50px"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        false
                                    )}
                                    <Text pl={2}>
                                        {article.create_user_name}
                                    </Text>
                                </Flex>
                                {article.create_user_id === loginUser["id"] ? (
                                    <CloseIcon
                                        onClick={() => {
                                            onClickDeleteArticle(article.id);
                                            onOpen();
                                        }}
                                    />
                                ) : (
                                    false
                                )}
                            </Flex>
                            <Text ml={10}>{article.context}</Text>
                            <Text ml={10}>{article.id}</Text>
                            {article.article_image ? (
                                <Image
                                    src={article.article_image}
                                    borderRadius="10px"
                                    width={300}
                                    ml={10}
                                />
                            ) : (
                                false
                            )}
                            {/* {article ? (
                                <Button onClick={() => onClickGood(article.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-heart"
                                        viewBox="0 0 16 16"
                                        >
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                </Button>
                                
                                ) : (
                                    false
                                )} */}
                        </Box>
                    ))}
                    <ArticleDeleteModal
                        article_Id={delArticle}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                    <AddIcon
                        w={10}
                        h={10}
                        color="gray.700"
                        onClick={onClickCreateArticle}
                        border="1px"
                        borderRadius="3xl"
                        p={1}
                        position="fixed"
                        bottom={10}
                        right={10}
                    ></AddIcon>
                </Box>
            )}
        </>
    );
});
