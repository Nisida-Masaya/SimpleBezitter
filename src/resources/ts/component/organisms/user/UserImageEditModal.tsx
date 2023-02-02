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
} from "@chakra-ui/react";

import React, { ChangeEvent, memo, useState, VFC } from "react";

import { useEditUserImage } from "../../../hooks/useEditUserImage";

type Props = {
    id: number;
    user_image: string;
    isOpen: boolean;
    onClose: () => void;
};

export const UserImageEditModal: VFC<Props> = memo((props) => {
    const { id, user_image, isOpen, onClose } = props;
    const { updateUserImage } = useEditUserImage();

    const [userImage, setUserImage] = useState("");

    const onChangeUserImage = (e) => {
        setUserImage(e.target.files[0]);
    };

    const onClickUpdateUserImage = () => {
        updateUserImage(id, userImage);
    };

    return (
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
                    <Button colorScheme='blue' onClick={onClickUpdateUserImage}>確定</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
