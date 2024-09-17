import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import Button from '../index';

describe('Button Component', () => {
  it('should render with default primary variant', () => {
    render(<Button title="Click Me" />);

    const button = screen.getByTestId('core-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('bg-green-300 text-white'); // classe do variant "primary"
  });

  it('should render with secondary variant', () => {
    render(<Button title="Secondary" variant="secondary" />);

    const button = screen.getByTestId('core-button');
    expect(button).toHaveClass('bg-white text-gray-700');
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button title="Click Me" onClick={onClick} />);

    const button = screen.getByTestId('core-button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading is true', () => {
    render(<Button title="Loading" loading={true} />);

    const button = screen.getByTestId('core-button');
    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button title="Disabled" disabled={true} />);

    const button = screen.getByTestId('core-button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed bg-opacity-40');
  });

  it('should render the correct content when content prop is passed', () => {
    render(<Button content={<span>Extra Content</span>} />);

    const button = screen.getByTestId('core-button');
    expect(button).toHaveTextContent('Extra Content');
  });
});
