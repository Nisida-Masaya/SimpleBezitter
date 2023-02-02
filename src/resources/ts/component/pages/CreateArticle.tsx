import React, { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, FormLabel, Stack, Textarea } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useCreateArticle } from "../../hooks/useCreateArticle";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/

export const CreateArticle: VFC = memo(() => {
    const history = useHistory();

    const [newArticleContext, setNewArticleContext] = useState("");
    const [newArticleImage, setNewArticleImage] = useState("");
    const { createArticle } = useCreateArticle();

    const onChangeArticleContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewArticleContext(e.target.value);
    };
    
    const onChangeArticleImage = (e) => {
        setNewArticleImage(e.target.files[0]);
    };

    const onClickCreateArticle = () =>
        createArticle(newArticleContext, newArticleImage);

    return (
        <>
            <ArrowBackIcon onClick={() => history.goBack()} ml="10" w={5} h={5} />
            <Box onSubmit={onClickCreateArticle} w={1000} ml="15%">
                <Stack spacing={6} py={3} px={5}>
                    <FormLabel>投稿内容</FormLabel>
                    <Textarea
                        name="context"
                        value={newArticleContext}
                        onChange={onChangeArticleContext}
                        placeholder="255文字以内"
                        mb={5}
                    />
                    <FormLabel>画像</FormLabel>
                    <input
                        type="file"
                        name="article_image"
                        onChange={onChangeArticleImage}
                    />
                    <br />
                    <PrimaryButton
                        onClick={onClickCreateArticle}
                        disabled={
                            newArticleContext === "" &&
                            newArticleImage === "" &&
                            (newArticleImage === "" || newArticleContext === "")
                        }
                    >
                        作成
                    </PrimaryButton>
                </Stack>
            </Box>
        </>
    );
});
