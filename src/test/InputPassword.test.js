import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { InputPassword } from '../components/InputPassword';

test('renders input password correctly', async () => {
  let inputValue = '';

  const handleChange = (event) => {
    inputValue = event.target.value;
  };

  const handleBlur = () => {
  };

  const { getByText, getByPlaceholderText, container } = render(
    <InputPassword
      title="Password Title"
      placeholder="Password Placeholder"
      id="passwordId"
      onChange={handleChange}
      onBlur={handleBlur}
      value={inputValue}
    />
  );

  const titleElement = getByText('Password Title');
  expect(titleElement).toBeInTheDocument();

  const placeholderElement = getByPlaceholderText('Password Placeholder');
  expect(placeholderElement).toBeInTheDocument();

  fireEvent.change(placeholderElement, { target: { value: 'Test value' } });

  expect(inputValue).toBe('Test value');

  const eyeIcon = container.querySelector('svg');
  expect(eyeIcon).toBeInTheDocument();

  fireEvent.click(eyeIcon);

  fireEvent.click(eyeIcon);


});
