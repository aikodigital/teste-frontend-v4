import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Fragment } from 'react';

import { useDataContext } from '../../context/DataContext';

const Drawer = () => {
  const { selected, setSelectedID } = useDataContext();

  return (
    <ChakraDrawer
      isOpen={!!selected}
      placement='right'
      onClose={() => setSelectedID()}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{selected?.id}</DrawerHeader>

        <DrawerBody>
          {selected?.stateHistory?.map((state, index) => (
            <Fragment key={index}>
              <div>
                <span>{state.date}</span>
                <br />{' '}
                <input type='color' disabled defaultValue={state.color} />
                <span>{state.state}</span>
              </div>
              <br />
            </Fragment>
          ))}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
