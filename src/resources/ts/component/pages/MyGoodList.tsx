import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import {
    Box,
    Center,
    Image,
    Spinner,
    Text,
    Flex,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { useLoginUser } from "../../hooks/useLoginUser";
import { ArticleDeleteModal } from "../organisms/article/ArticleDeleteModal";
import { useMyGoodList } from "../../hooks/useMyGoodList";
import { useLike } from "../../hooks/useLike";
import { useUnLike } from "../../hooks/useUnLike"; 

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const MyGoodList: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { getMyGoodArticles, loading, myGoodArticles } = useMyGoodList();
    const { onClickGood } = useLike();
    const { onClickUnGood } = useUnLike();
    const { loginUser, getLoginUser } = useLoginUser();
    const [delArticle, setDelArticle] = useState<number>(0);

    //記事削除
    const onClickDeleteArticle = useCallback((article_id: number) => {
        setDelArticle(article_id);
    }, []);

    //いいね
    const onClickLike = useCallback((id: number) => {
        onClickGood(id);
    }, []);

    //いいね解除
    const onClickUnLike = useCallback((id: number) => {
        onClickUnGood(id);
    }, []);

    useEffect(() => {
        getMyGoodArticles();
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
                    {myGoodArticles.map((article) => (
                        <Box
                            key={article.id}
                            backgroundColor="gray.100"
                            borderRadius="5px"
                            mb={2}
                            ml="15%"
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
                                    ) : null}
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
                                ) : null}
                            </Flex>
                            <Text ml={10}>{article.context}</Text>
                            {article.article_image ? (
                                <Image
                                    src={article.article_image}
                                    borderRadius="10px"
                                    width={300}
                                    ml={10}
                                />
                            ) : null}
                            {/* いいねしてるかの判定 */}
                            <Flex>
                                {article.like_user_id === loginUser["id"] ? (
                                    <Button
                                        ml={6}
                                        onClick={() =>
                                            onClickUnLike(article.id)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-heart-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                            />
                                        </svg>
                                    </Button>
                                ) : (
                                    <Button
                                        ml={6}
                                        onClick={() => onClickLike(article.id)}
                                    >
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
                                )}
                                <Text mt={2}>{article.like_count}</Text>
                            </Flex>
                        </Box>
                    ))}
                    <ArticleDeleteModal
                        article_Id={delArticle}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </Box>
            )}
        </>
    );
});