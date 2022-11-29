import React, { memo, VFC } from "react";
import { IconButton } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
type Props = {
  onOpen: () => void;
}

export const MenuIconButton: VFC<Props> = memo((props) => {
  const {onOpen} = props;
  return (
    <IconButton
      aria-label="メニューボタン"
      icon={<TriangleDownIcon />}
      size="sm"
      variant="unstyled"
      display={{ base: "block", md: "block" }}
      onClick={onOpen}
    />
  );
});
