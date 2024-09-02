import { MantineProvider } from '@mantine/core';
 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const NoSSRComponent = dynamic(() => import('./screens/home'), { ssr: false });


export default function Home() {
  const queryClient = new QueryClient();
  return (
      <MantineProvider forceColorScheme="dark"> 
        <NoSSRComponent />
      </MantineProvider> 
  );
}
