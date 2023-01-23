import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { AddIcon} from "@chakra-ui/icons";


export const CreateArticleIconButton: VFC = memo(() => {
    const history = useHistory();

    const onClickCreateArticle = useCallback(
        () => history.push("/home/createArticle"),
        []
    );

    return (
        <AddIcon
            w={10}
            h={10}
            color="gray.700"
            onClick={onClickCreateArticle}
            border="1px"
            borderRadius="3xl"
            p={1}
            position="fixed"
            bottom={10}
            right={10}
        ></AddIcon>
    );
});
