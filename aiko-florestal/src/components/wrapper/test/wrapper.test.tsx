import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Params } from 'react-router-dom';

import PageWrapper from '@/components/wrapper';
import { useAppState } from '@/hooks/useAppState';

jest.mock('@/components/header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

jest.mock('@/components/menu', () => ({
  __esModule: true,
  default: () => <div>AppMenu</div>,
}));

jest.mock('@/hooks/useAppState', () => ({
  __esModule: true,
  useAppState: jest.fn(),
}));

const mockUseAppState = useAppState as jest.MockedFunction<typeof useAppState>;

const setup = (sidebarState: boolean, renderFunc: (params: Readonly<Params<string>>) => React.ReactNode = () => null) => {
  mockUseAppState.mockReturnValue({ sidebarState } as any);

  render(
    <BrowserRouter>
      <PageWrapper render={renderFunc}>
        <div>Children</div>
      </PageWrapper>
    </BrowserRouter>
  );
};

test('renders Header and AppMenu components', () => {
  setup(false);
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('AppMenu')).toBeInTheDocument();
});

test('renders children correctly', () => {
  setup(false);
  expect(screen.getByText('Children')).toBeInTheDocument();
});

test('conditionally renders the result of render function', () => {
  const renderFunc = jest.fn().mockReturnValue(<div>Render Function Result</div>);
  setup(false, renderFunc);

  expect(renderFunc).toHaveBeenCalled();
  expect(screen.getByText('Render Function Result')).toBeInTheDocument();
});

