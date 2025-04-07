"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({});

export function Provider(props) {
  return (
    <ChakraProvider value={createSystem(defaultConfig, customConfig)}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
