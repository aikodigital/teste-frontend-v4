import React from "react";
import { Card } from "@chakra-ui/react";

/**
 * Component DetailCard that renders a Card with title and content.
 *
 * @component
 * @param {object} props - Component properties
 * @param {string} props.title - Title shown in the card.
 * @param {React.ReactNode} props.children - Content rendered within the card.
 * @returns {JSX.Element}
 */
function DetailCard(props) {
  return (
    <Card.Root h="100%" maxH="70vh">
      <Card.Body overflow={"auto"}>
        <Card.Title mb="3">{props.title}</Card.Title>
        {props.children}
      </Card.Body>
    </Card.Root>
  );
}

export default DetailCard;
