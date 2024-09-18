import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Header from "./components/Header.tsx";
import RouteApp from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Header />
        <RouteApp />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
