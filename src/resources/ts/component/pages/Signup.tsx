import React, { ChangeEvent, memo, useState, VFC, HtmlHTMLAttributes } from "react";
import { Link, BrowserRouter } from "react-router-dom"
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
} from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useUserSignup } from "../../hooks/useUserSignup";

export const Signup: VFC = memo(() => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { createUser } = useUserSignup();

    //名前
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    //メールアドレス
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    //パスワード
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onClickSignup = () => createUser(name, email, password);

    return (
        <>
            <Flex align="center" justify="center" height="100vh">
                <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        ユーザー新規作成
                    </Heading>
                    <Divider my={4} />
                    <Stack spacing={6} py={4} px={10}>
                        <Input
                            id="name"
                            type="text"
                            placeholder="氏名"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                        />
                        <Input
                            id="email"
                            type="email"
                            placeholder="メールアドレス"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="パスワード"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                >
                                    {show ? "閉じる" : "表示"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {/* <Input
                            id="email"
                            type="email"
                            placeholder="プロフィール写真"
                            value={email}
                            onChange={onChangeEmail}
                        /> */}
                        <PrimaryButton onClick={onClickSignup}>
                            ユーザー作成
                        </PrimaryButton>

                        <Link to="/" style={{textAlign: "center"}} >ログイン</Link>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
});
