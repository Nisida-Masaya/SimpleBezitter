import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Input,
    Text,
    Textarea,
} from "@chakra-ui/react";
import React, { ChangeEvent, memo, useState, VFC } from "react";

import { useEditUserProfile } from "../../../hooks/useEditUserProfile";


type Props = {
    id: number; 
    name: string;
    introduction: string;
    isOpen: boolean;
    onClose: () => void;
};

export const UserProfileEditModal: VFC<Props> = memo((props) => {
    const { id, name, introduction, isOpen, onClose } = props;
    const { updateUserProfile } = useEditUserProfile();

    const [emails, setEmail] = useState("");
    const [names, setName] = useState("");
    const [introductions, setIntroduction] = useState("");

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangeIntroduction = (e: ChangeEvent<HTMLInputElement>) => {
        setIntroduction(e.target.value);
    };

    const onClickUpdateUserProfile = () => {

        var updateName = names;
        var updateIntroduction = introductions;

        if (names == '') {
            updateName = name;
        };

        if (introductions == '') {
            updateIntroduction = introduction;
        };

        updateUserProfile(id, updateName, updateIntroduction);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                  <ModalHeader>プロフィール編集</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>氏名（ニックネーム）</Text>
                    <Input id="name" type="text" placeholder={name} name="name" value={names} onChange={onChangeName} marginBottom={3}/>
                    <Text>投稿内容</Text>
                    <Input id="introduction" type="text" placeholder={introduction} name="introduction" value={introductions} onChange={onChangeIntroduction} size='sm' marginBottom={3}/>
                  </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' onClick={onClickUpdateUserProfile}>確定</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    );
});
