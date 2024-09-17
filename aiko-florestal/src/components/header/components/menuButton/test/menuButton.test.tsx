import { render, screen, fireEvent } from '@testing-library/react';

import HeaderMenuButton from '@/components/header/components/menuButton';
import { useAppState } from '@/hooks/useAppState';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useAppState', () => ({
  useAppState: jest.fn()
}));

describe('HeaderMenuButton Component', () => {
  let openMenu: jest.Mock;

  beforeEach(() => {
    openMenu = jest.fn();
    (useAppState as jest.Mock).mockReturnValue({ openMenu });
  });

  it('should render the button', () => {
    render(<HeaderMenuButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call openMenu when the button is clicked', () => {
    render(<HeaderMenuButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(openMenu).toHaveBeenCalledTimes(1);
  });
});
