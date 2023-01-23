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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea
} from "@chakra-ui/react";


import { useLoginUser } from "../../hooks/useLoginUser";
import { UserImageEditModal } from "../organisms/article/UserImageEditModal";
import { UserProfileEditModal } from "../organisms/article/UserProfileEditModal";


export const Profile: VFC = memo(() => {

  const history = useHistory();
  const { loginUser, getLoginUser } = useLoginUser();
  const { isOpen: isEditUserImageOpen , onOpen: onEditUserImageOpen, onClose: onEditUserImageClose } = useDisclosure();
  const { isOpen: isEditUserProfileOpen , onOpen: onEditUserProfileOpen, onClose: onEditUserProfileClose } = useDisclosure();
  const [ user_image, setUserImage ] = useState("");

  const onClickBackPage = useCallback(
    () => history.push("/home"),
    []
  );

  const onChangeUserImage = (e) => {
    setUserImage(e.target.files[0]);
  };

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

          <Stack spacing={6} py={4} px={10} mx={50} marginTop={100} >
            <Image borderRadius='full' src={loginUser["user_image"]} boxSize='200px'/>
            <Button colorScheme='teal' variant='outline' onClick={onEditUserImageOpen}>画像編集</Button>
            
            <UserImageEditModal
              isOpen={isEditUserImageOpen}
              onClose={onEditUserImageClose}
            />

          </Stack>

          <Stack spacing={6} py={4} px={10} mx={100} marginTop={100}>
            <Text>メールアドレス（編集できません）</Text>
            <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
              <Text>{ loginUser["email"] }</Text>
            </Box>
            <Text>氏名（ニックネーム）</Text>
            <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
              <Text>{ loginUser["name"] }</Text>
            </Box>
            <Text>投稿内容</Text>
            <Box bg="white" w="sm" h={100} px={3} py={1} borderRadius="md">
              <Text>{ loginUser["introduction"] }</Text>
            </Box>
          </Stack>

          <Stack spacing={6} py={4} px={10} mx={5}>
            <Button colorScheme='teal' marginTop={10} variant='outline' onClick={onEditUserProfileOpen}>編集</Button>
          </Stack>

          <UserProfileEditModal
            id={loginUser["id"]}
            name={loginUser["name"]}
            introduction={loginUser["introduction"]}
            isOpen={isEditUserProfileOpen}
            onClose={onEditUserProfileClose}
          />

        </Flex>
    </>
  );

});
 