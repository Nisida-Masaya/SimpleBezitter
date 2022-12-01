import React, { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
    const { children, onClick, disabled = false, loading = false } = props;
    return (
        <Button
            bg="blue.300"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={onClick}
            disabled={disabled || loading}
            isLoading={loading}
        >
            {children}
        </Button>
    );
});
