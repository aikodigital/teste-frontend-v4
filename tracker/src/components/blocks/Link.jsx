import React from "react";
import { Link as CLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Link component that integrates Chakra UI's Link with React Router's Link.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.to - The destination path for the link in the current venv.
 * @param {React.ReactNode} props.children - The content to be displayed within the link.
 * @returns {JSX.Element}
 */
function Link(props) {
  return (
    <CLink fontSize="md" as={RouterLink} to={props.to} fontWeight="semibold">
      {props.children}
    </CLink>
  );
}

export default Link;
