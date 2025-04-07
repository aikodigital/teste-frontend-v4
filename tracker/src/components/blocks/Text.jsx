import React from "react";
import { Text as CText } from "@chakra-ui/react";

/**
 * Text component that wraps Chakra UI's Text component and applies custom styling based on the variant.
 *
 * This component renders differently based on the `variant` prop:
 * - "title": Renders as a large title with specific margins and a semibold font weight.
 * - "titleSmall": Renders as an h2 element with a medium title style and semibold font weight.
 * - Default: Renders as a span with a medium font size, spreading any additional props.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant] - The text variant to apply. Can be "title", "titleSmall", or omitted.
 * @param {React.ReactNode} props.children - The content to be displayed inside the text component.
 * @returns {JSX.Element}
 */
function Text(props) {
  switch (props.variant) {
    case "title":
      return (
        <CText
          textStyle="5xl"
          mb={{ base: "5", lg: "10" }}
          mt={{ lg: "10", base: 0 }}
          fontWeight={"semibold"}
        >
          {props.children}
        </CText>
      );
    case "titleSmall":
      return (
        <CText as="h2" textStyle="2xl" fontWeight="semibold" mt="3">
          {props.children}
        </CText>
      );

    default:
      return <CText as="span" fontSize="md" {...props}></CText>;
  }
}

export default Text;
