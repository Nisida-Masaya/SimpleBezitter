import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
        </ChakraProvider>
    );
}
