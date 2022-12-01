import React, { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
}

export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback((props: Props) => {
    const {title, status} = props;
    toast({
      title,
      status,
      position: "top-right",
      duration: 2000,
      isClosable: true
    });
  }, [toast]);
  return { showMessage };
};
