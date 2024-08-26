import Map from './Components/Map/Map';
import { Select, Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex w='100%' flexDirection='column'>
      <Flex marginTop='24px' marginBottom='24px' gap='8px'>
        <Select w='240px' placeholder='Select model'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>

        <Select w='240px' placeholder='Select state'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </Flex>

      <Map />
    </Flex>
  );
}

export default App;
