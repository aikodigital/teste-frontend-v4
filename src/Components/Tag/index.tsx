import {
  HStack,
  TagLeftIcon,
  TagLabel,
  Tag as ChakraTag,
} from '@chakra-ui/react';

import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineStop,
} from 'react-icons/ai';

interface TagProps {
  color: string | undefined;
  state: string | undefined;
}

const icon = (state: string | undefined) => {
  switch (state) {
    case 'Parado':
      return AiOutlineStop;

    case 'Operando':
      return AiOutlineCheck;

    case 'Manutenção':
      return AiOutlineClockCircle;
  }
};

const Tag = ({ color, state }: TagProps) => {
  return (
    <HStack spacing={4}>
      <ChakraTag size='lg' variant='subtle' bg={color} color='white'>
        <TagLeftIcon boxSize='16px' as={icon(state)} />
        <TagLabel>{state}</TagLabel>
      </ChakraTag>
    </HStack>
  );
};

export default Tag;
