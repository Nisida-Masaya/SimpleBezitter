import React, { ChangeEvent, memo, useState, VFC } from "react";
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
import { useAuthenticate } from "../../hooks/useAuthenticate";

export const Login: VFC = memo(() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuthenticate();

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

    const onClickLogin = () => {
        login({ email, password });
    };

    return (
        <>
            <Flex align="center" justify="center" height="100vh">
                <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                    <Heading as="h1" size="lg" textAlign="center">
                        SimpleBezitter
                    </Heading>
                    <Divider my={4} />
                    <Stack spacing={6} py={4} px={10}>
                        <Input
                            id="email"
                            type="email"
                            placeholder="メールアドレス"
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="パスワード"
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
                        <PrimaryButton onClick={onClickLogin}>
                            ログイン
                        </PrimaryButton>
                    </Stack>
                </Box>
            </Flex>
        </>
    );
});
