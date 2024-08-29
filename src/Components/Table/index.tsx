import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';

import Tag from '../Tag';

import { useDataContext } from '../../context/DataContext';

const TableHistory = () => {
  const { selected, setSelectedID } = useDataContext();

  if (!selected) return;

  return (
    <Box paddingX='24px' margin='24px'>
      <Flex justifyContent='space-between' marginBottom='24px'>
        <Heading as='h4' size='lg'>
          Histórico de estados
        </Heading>

        <Button onClick={() => setSelectedID()}>Resetar</Button>
      </Flex>

      <TableContainer border='1px solid #E2E8F0'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Equipamento</Th>
              <Th>Modelo</Th>
              <Th>Estado</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>

          <Tbody>
            {selected?.stateHistory?.map((state, index) => (
              <Tr key={index}>
                <Td>{selected.name}</Td>
                <Td>{selected.model}</Td>
                <Td>
                  <Tag color={state.color} state={state.state} />
                </Td>
                <Td>{state.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableHistory;
