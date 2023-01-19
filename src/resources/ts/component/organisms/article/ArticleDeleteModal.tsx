import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React, { memo, VFC } from "react";

import { useDeleteArticle } from "../../../hooks/useDeleteArticle";

type Props = {
    article_Id: number;
    isOpen: boolean;
    onClose: () => void;
};

export const ArticleDeleteModal: VFC<Props> = memo((props) => {
    const { article_Id, isOpen, onClose } = props;
    const { deleteArticle } = useDeleteArticle();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>投稿削除</ModalHeader>
                <ModalCloseButton />
                <ModalBody>本当に削除してもよろしいでしょうか？</ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        閉じる
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={() => deleteArticle(article_Id)}
                    >
                        削除
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
