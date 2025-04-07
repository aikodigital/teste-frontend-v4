import React from "react";
import { Center, Spinner } from "@chakra-ui/react";
/**
 * Loading component that displays a full viewport centered spinner.
 *
 * **/
function Loading() {
  return (
    <Center w="100vw" h="100vh">
      <Spinner></Spinner>
    </Center>
  );
}

export default Loading;
