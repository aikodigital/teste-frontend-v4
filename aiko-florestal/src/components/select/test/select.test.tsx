import { render, screen } from '@testing-library/react';

import SelectField from '@/components/select';
import '@testing-library/jest-dom';

describe('SelectField Component', () => {
  const defaultProps = {
    placeholder: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  };

  it('should render the select field with placeholder and options', () => {
    render(<SelectField {...defaultProps} />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render with errors', () => {
    render(<SelectField {...defaultProps} errors="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    render(<SelectField {...defaultProps} disabled />);

    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('combobox')).toHaveClass('bg-off-white');
  });

  it('should render with default value', () => {
    render(<SelectField {...defaultProps} defaultValue="option2" />);

    expect(screen.getByRole('combobox')).toHaveValue('option2');
  });

  it('should apply custom class names', () => {
    render(<SelectField {...defaultProps} className="custom-class" />);

    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });

});
