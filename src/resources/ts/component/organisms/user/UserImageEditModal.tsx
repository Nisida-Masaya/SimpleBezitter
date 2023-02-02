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
import React, { memo, VFC } from "react";


type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const UserImageEditModal: VFC<Props> = memo((props) => {
    const { isOpen, onClose } = props;
    //const { deleteArticle } = useDeleteArticle();

    const onChangeUserImage = (e) => {
        
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
                    <Button colorScheme='blue'>確定</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
