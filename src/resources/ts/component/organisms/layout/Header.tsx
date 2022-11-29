import React, { memo, useCallback, VFC } from "react";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";



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
    const onClickProfile = useCallback(() => history.push("/home/profile"), []);

    return (
        <>
            <Flex
                as="nav"
                bg="teal.500"
                color="gray.50"
                align="center"
                justify="space-between"
                padding={{ base: 3, md: 5 }}
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
                <Flex
                    align="center"
                    fontSize="sm"
                    flexGrow={2}
                    display={{ base: "none", md: "flex" }}
                >
                    <Box pr={4}>
                        <Link onClick={onClickProfile} to="/home/profile">
                            プロフィール
                        </Link>
                    </Box>
                    <Box pr={4}>
                        <Link to="/home">設定</Link>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
});
