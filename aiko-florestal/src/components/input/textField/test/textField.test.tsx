import { render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import TextField from '@/components/input/textField';

describe('TextField Component', () => {
  it('should render the input with placeholder and type', () => {
    render(<TextField placeholder="Enter text" type="email" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should apply error styles when errors prop is provided', () => {
    render(<TextField placeholder="Enter text" errors="Error message" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('border-red-500');
  });

  it('should apply disabled styles when disabled prop is true', () => {
    render(<TextField placeholder="Enter text" disabled />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-off-white text-gray-500 cursor-not-allowed');
  });

  it('should forward the ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextField placeholder="Enter text" ref={ref} />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(ref.current).toBe(input);
  });

  it('should apply additional className', () => {
    render(<TextField placeholder="Enter text" className="custom-class" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('custom-class');
  });

  it('should handle defaultValue prop correctly', () => {
    render(<TextField placeholder="Enter text" defaultValue="Default text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveValue('Default text');
  });
});
