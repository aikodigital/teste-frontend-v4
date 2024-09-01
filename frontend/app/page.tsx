import { MantineProvider } from '@mantine/core';
import HomePage from './screens/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider forceColorScheme="dark" withNormalizeCSS>
        <HomePage />
      </MantineProvider>
    </QueryClientProvider>
  );
}
