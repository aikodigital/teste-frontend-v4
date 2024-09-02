import { MantineProvider } from '@mantine/core';
import dynamic from 'next/dynamic';

const NoSSRComponent = dynamic(() => import('./screens/home'), { ssr: false });


export default function Home() { 
  return (
      <MantineProvider forceColorScheme="dark"> 
        <NoSSRComponent />
      </MantineProvider> 
  );
}
