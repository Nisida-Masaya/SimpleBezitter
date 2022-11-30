import React, { ChangeEvent, memo, useState, VFC } from "react";
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
    const [newArticle, setNewArticle] = useState('');
    const { createArticle } = useCreateArticle();


    const onChangeArticle = (e :ChangeEvent<HTMLTextAreaElement>) => {
        setNewArticle(e.target.value);
    }

    const onClickCreateArticle = () => createArticle(newArticle);

    return (
        <>
            <p>記事作成ページです。</p>
            <form action="api/articles" method="post" encType="multipart/form-data">
                {/* <input type="text" name="context" value={newArticle} onChange={onChangeArticle}  /> */}
                <Textarea name="context" value={newArticle} onChange={onChangeArticle} />
                <br />
                {/* <input type="file" name="article_image" value={newArticleImage} onChange={onChangeArticleImage} /> */}
                <br />
                <PrimaryButton onClick={onClickCreateArticle} >作成</PrimaryButton>
            </form>
        </>
    );
});
