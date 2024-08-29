import equipmentModelData from './data/equipmentModel.json';
import equipmentStateData from './data/equipmentState.json';

import { Select, Flex, Box } from '@chakra-ui/react';

import Map from './Components/Map';

import { useDataContext } from './context/DataContext';
import TableHistory from './Components/Table';

function App() {
  const { setFilters } = useDataContext();

  return (
    <>
      <Box height='48px' bgColor='darkslategray' w='100%'></Box>
      <Flex marginY='24px' gap='8px' paddingX='24px'>
        <Select
          w='240px'
          placeholder='Select model'
          onChange={(event) =>
            setFilters({ value: event.target.value, type: 'model' })
          }
        >
          {equipmentModelData.map((equipment) => (
            <option key={equipment.id} value={equipment.id}>
              {equipment.name}
            </option>
          ))}
        </Select>

        <Select
          w='240px'
          placeholder='Select state'
          onChange={(event) =>
            setFilters({ value: event.target.value, type: 'state' })
          }
        >
          {equipmentStateData.map((equipment) => (
            <option key={equipment.id} value={equipment.id}>
              {equipment.name}
            </option>
          ))}
        </Select>
      </Flex>

      <Map />
      <TableHistory />
    </>
  );
}

export default App;
