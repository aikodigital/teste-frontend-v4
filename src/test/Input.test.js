import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../components/Input';

test('renders input correctly', () => {
  let inputValue = '';

  const handleChange = (event) => {
    inputValue = event.target.value;
  };

  const handleBlur = () => {

  };

  const { getByText, getByPlaceholderText } = render(
    <Input
      title="Input Title"
      placeholder="Input Placeholder"
      type="text"
      id="inputId"
      onChange={handleChange}
      onBlur={handleBlur}
      value={inputValue}
    />
  );

  const titleElement = getByText('Input Title');
  expect(titleElement).toBeInTheDocument();

  const placeholderElement = getByPlaceholderText('Input Placeholder');
  expect(placeholderElement).toBeInTheDocument();

  fireEvent.change(placeholderElement, { target: { value: 'Test value' } });

  expect(inputValue).toBe('Test value');
});
