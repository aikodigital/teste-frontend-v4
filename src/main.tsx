import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DataContextProvider } from './context/DataContext.tsx';
import App from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ChakraProvider>
  </StrictMode>
);
