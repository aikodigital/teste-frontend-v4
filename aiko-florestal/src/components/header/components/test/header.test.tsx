import { render, screen } from '@testing-library/react';

import Header from '@/components/header';
import { useAppState } from '@/hooks/useAppState';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useAppState', () => ({
  useAppState: jest.fn()
}));

describe('Header Component', () => {
  it('should render the header component', () => {
    (useAppState as jest.Mock).mockReturnValue({ sidebarState: false });

    render(<Header />);

    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });

  it('should apply the correct class based on sidebarState', () => {
    (useAppState as jest.Mock).mockReturnValue({ sidebarState: true });

    const { rerender } = render(<Header />);

    let header = screen.getByTestId('header-container');
    expect(header).toHaveClass('lg:pl-64');

    (useAppState as jest.Mock).mockReturnValue({ sidebarState: false });

    rerender(<Header />);
    header = screen.getByTestId('header-container');
    expect(header).toHaveClass('lg:pl-14');
  });

  it('should render HeaderMenuButton component', () => {
    (useAppState as jest.Mock).mockReturnValue({ sidebarState: false });

    render(<Header />);

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });
});
