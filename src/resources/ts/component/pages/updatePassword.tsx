import React, { ChangeEvent, memo, useState, VFC, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Flex,
    Heading,
    Box,
    Divider,
    Button,
    Input,
    Stack,
    InputGroup,
    InputRightElement,
    Textarea,
    Text,

    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { useLoginUser } from "../../hooks/useLoginUser";


//VFCを使用することでchildrenの有無がわかる
//memoコンポーネントが変更されない限り再レンダリングしない
/* アロー関数の関数は毎回新しいものを生成している
  propsとしては違うものと判断
  useCallBackと使うと処理が変わらない場合は同じものを使う（関数を使う時）
*/

export const Password: VFC = memo(() => {
    const [nowPassword, setNowPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const { updatePassword } = useUpdatePassword();
    const { loginUser, getLoginUser } = useLoginUser();

    const isError = nowPassword === "";

    //パスワード
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const handleClick1 = () => setShow1(!show1);
    const handleClick2 = () => setShow2(!show2);
    const handleClick3 = () => setShow3(!show3);

    //現在のパスワード
    const onChangeNowPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNowPassword(e.target.value);
    };

    //新しいパスワード
    const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    //新しいパスワード（確認）
    const onChangeNewPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasswordCheck(e.target.value);
    };

    const onClickUpdatePassword = () =>{
        updatePassword(nowPassword, newPassword, newPasswordCheck);
    };

    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <>
            <Flex align="center" justify="center" height="100vh">
                <Box bg="white" w="md" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        パスワード変更
                    </Heading>
                    <Divider my={4} />
                    <Stack spacing={6} py={4} px={10}>

                        <Text>現在のパスワード</Text>
                        <InputGroup size="md">
                            <Input pr="4.5rem" type={show1 ? "text" : "password"} name="nowPassword" value={nowPassword} onChange={onChangeNowPassword}/>
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick1}>
                                    {show1 ? "閉じる" : "表示"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Text>新しいパスワード</Text>
                        <InputGroup size="md">
                            <Input pr="4.5rem" type={show2 ? "text" : "password"} name="newPassword" value={newPassword} onChange={onChangeNewPassword}/>
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick2}>
                                    {show2 ? "閉じる" : "表示"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Text>新しいパスワード（確認）</Text>
                        <InputGroup size="md">
                            <Input pr="4.5rem" type={show3 ? "text" : "password"} name="newPasswordCheck" value={newPasswordCheck} onChange={onChangeNewPasswordCheck}/>
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick3}>
                                    {show3 ? "閉じる" : "表示"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <PrimaryButton onClick={onClickUpdatePassword}>
                            変更
                        </PrimaryButton>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
});