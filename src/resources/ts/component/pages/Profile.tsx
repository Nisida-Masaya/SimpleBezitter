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
  Input
} from "@chakra-ui/react";


import { useLoginUser } from "../../hooks/useLoginUser";

export const Profile: VFC = memo(() => {

  const history = useHistory();
  const { loginUser, loading, getLoginUser } = useLoginUser();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user_image, setUserImage] = useState("");

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
            <Image
              borderRadius='full'
              src={ loginUser?.user_image }
              boxSize='200px'
            />
            <Button colorScheme='teal' variant='outline' onClick={onOpen}>画像編集</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
                <ModalContent>
                  <ModalHeader>画像編集</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input id="user_image" name="user_image" type="file" placeholder="プロフィール写真" onChange={onChangeUserImage}/>
                  </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose}>キャンセル</Button>
                  <Button colorScheme='blue'>確定</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </Stack>

          <Stack spacing={6} py={4} px={10} mx={100} marginTop={100}>
            <Text>メールアドレス</Text>
            <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
              <Text>{ loginUser?.email }</Text>
            </Box>
            <Text>氏名（ニックネーム）</Text>
            <Box bg="white" w="sm" px={3} py={1} borderRadius="md">
              <Text>{ loginUser?.name }</Text>
            </Box>
            <Text>投稿内容</Text>
            <Box bg="white" w="sm" h={100} px={3} py={1} borderRadius="md">
              <Text>{ loginUser?.introduction }</Text>
            </Box>
          </Stack>

          <Stack spacing={6} py={4} px={10} mx={5}>
            <Button colorScheme='teal' marginTop={0} marginBottom={100} variant='outline' onClick={onOpen}>編集</Button>
          </Stack>
        </Flex>
    </>
  );

});
