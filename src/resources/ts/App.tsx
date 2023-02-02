import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";


import theme from "./theme/theme";
import { Router } from "./router/Router";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ChakraProvider>
    );
}
