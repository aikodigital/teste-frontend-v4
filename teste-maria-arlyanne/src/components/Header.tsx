import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Box
      zIndex={1}
      bg={"teal"}
      position={"relative"}
      w={"100%"}
      p={4}
      color={"white"}
      mb={5}
    >
      <Flex align="center" justify="space-between">
        <Heading size="medium">Teste Maria Arlyanne</Heading>
        <Flex alignItems={"center"}>
          <Link style={{marginRight:"15px"}} color="teal" to="/">
            Equipamentos Recentes
          </Link>
          <Link style={{marginRight:"15px"}} to="/equipmentlisting">Lista de Equipamentos</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
