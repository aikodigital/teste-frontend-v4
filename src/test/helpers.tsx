/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const renderWithProviders = (
  component: React.ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>
) => ({
  user: userEvent.setup(),
  ...render(component, { wrapper: Providers, ...options })
});

const customRenderHook = (hook: () => any, options?: Omit<RenderOptions, 'wrapper'>) => ({
  user: userEvent.setup(),
  ...renderHook(hook, { wrapper: Providers, ...options })
});

export * from '@testing-library/react';
export { renderWithProviders as render, customRenderHook as renderHook };
