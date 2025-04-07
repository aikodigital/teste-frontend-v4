import React from "react";
import { Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Text from "./Text";

/**
 * Status component that displays a colored status indicator alongside a text label.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.color - The color used for the status icon and text.
 * @param {string} props.state - The status text to display.
 * @returns {JSX.Element}
 */
function Status(props) {
  return (
    <Flex align="center" my="3">
      <FontAwesomeIcon
        icon={faCircle}
        style={{ color: props.color, marginRight: "10px" }}
      />

      <Text fontWeight="semibold" as="span" style={{ color: props.color }}>
        {props.state}
      </Text>
    </Flex>
  );
}

export default Status;
