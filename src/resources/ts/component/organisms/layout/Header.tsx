import React, { memo, useCallback, VFC } from "react";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/
export const Header: VFC = memo(() => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const history = useHistory();

    const onClickHome = useCallback(() => history.push("/home"), []);

    return (
        <>
            <Flex
                as="nav"
                bg="gray.100"
                color="gray.700"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
                boxShadow="md"
                // width='100%'
                // position="fixed"
            >
                <Flex
                    align="center"
                    as="a"
                    mr={8}
                    _hover={{ cursor: "pointer" }}
                    onClick={onClickHome}
                >
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
                        SimpleBezitter
                    </Heading>
                </Flex>
                <MenuIconButton onOpen={onOpen} />
            </Flex>
            <MenuDrawer onClose={onClose} isOpen={isOpen} />
        </>
    );
});
