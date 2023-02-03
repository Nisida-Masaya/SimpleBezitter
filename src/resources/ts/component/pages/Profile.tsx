import React, { memo, useCallback, useEffect, VFC, useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Box,
    Image,
    Flex,
    Button,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

import { useLoginUser } from "../../hooks/useLoginUser";
import { UserImageEditModal } from "../organisms/user/UserImageEditModal";
import { UserProfileEditModal } from "../organisms/user/UserProfileEditModal";

export const Profile: VFC = memo(() => {
    const history = useHistory();
    const { loginUser, getLoginUser } = useLoginUser();
    const {
        isOpen: isEditUserImageOpen,
        onOpen: onEditUserImageOpen,
        onClose: onEditUserImageClose,
    } = useDisclosure();
    const {
        isOpen: isEditUserProfileOpen,
        onOpen: onEditUserProfileOpen,
        onClose: onEditUserProfileClose,
    } = useDisclosure();

    const onClickBackPage = useCallback(() => history.push("/home"), []);

    // console.log(loginUser[0]?.user_image);
    // console.log(loginUser[0]?.passowrd);

    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <>
            <Flex height="100vh">
                <Stack spacing={6} py={4} px={10} mx={5} my={30}>
                    <Box borderRadius="md">
                        <ArrowBackIcon
                            w={10}
                            h={10}
                            onClick={onClickBackPage}
                        />
                    </Box>
                </Stack>

                <Stack spacing={6} py={4} px={10} mx={50} marginTop={100}>
                    <Image
                        borderRadius="full"
                        src={loginUser[0]?.user_image}
                        boxSize={200}
                        
                    />
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={onEditUserImageOpen}
                    >
                        画像編集
                    </Button>

                    <UserImageEditModal
                        id={loginUser[0]?.id}
                        user_image={loginUser[0]?.user_image}
                        isOpen={isEditUserImageOpen}
                        onClose={onEditUserImageClose}
                    />
                </Stack>

                <Stack spacing={6} py={4} px={10} mx={100} marginTop={100}>
                    <Text>メールアドレス（編集できません）</Text>
                    <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
                        <Text>{loginUser[0]?.email}</Text>
                    </Box>
                    <Text>氏名（ニックネーム）</Text>
                    <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
                        <Text>{loginUser[0]?.name}</Text>
                    </Box>
                    <Text>投稿内容</Text>
                    <Box
                        bg="white"
                        w="sm"
                        h={100}
                        px={3}
                        py={1}
                        borderRadius="md"
                    >
                        <Text>{loginUser[0]?.introduction}</Text>
                    </Box>
                </Stack>

                <Stack spacing={6} py={4} px={10} mx={5}>
                    <Button
                        colorScheme="teal"
                        marginTop={10}
                        variant="outline"
                        onClick={onEditUserProfileOpen}
                    >
                        編集
                    </Button>
                </Stack>

                <UserProfileEditModal
                    id={loginUser[0]?.id}
                    name={loginUser[0]?.name}
                    introduction={loginUser[0]?.introduction}
                    isOpen={isEditUserProfileOpen}
                    onClose={onEditUserProfileClose}
                />
            </Flex>
        </>
    );
});
