import React, { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Textarea } from "@chakra-ui/react";

import { useCreateArticle } from "../../hooks/useCreateArticle";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/

export const CreateArticle: VFC = memo(() => {
    const [newArticleContext, setNewArticleContext] = useState("");
    const [newArticleImage, setNewArticleImage] = useState();
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
            <p>記事作成ページです。</p>
            <form onSubmit={onClickCreateArticle}>
                <Textarea
                    name="context"
                    value={newArticleContext}
                    onChange={onChangeArticleContext}
                    placeholder="255文字以内"
                />
                <br />
                <input
                    type="file"
                    name="article_image"
                    onChange={onChangeArticleImage}
                />
                <br />
                <PrimaryButton
                    onClick={onClickCreateArticle}
                    disabled={
                        newArticleContext === "" && newArticleImage === ""
                    }
                >
                    作成
                </PrimaryButton>
            </form>
        </>
    );
});
