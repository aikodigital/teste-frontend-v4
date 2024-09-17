import { render, screen, fireEvent } from '@testing-library/react';

import CloseButton from '@/components/menu/components/closeButton';
import '@testing-library/jest-dom';

describe('CloseButton Component', () => {

  it('should call onClick when the button is clicked', () => {
    const onClick = jest.fn();
    render(<CloseButton onClick={onClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
