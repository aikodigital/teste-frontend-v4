import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../components/Button';
import '@testing-library/jest-dom/extend-expect';

test('renders button correctly', () => {
  const { getByText } = render(<Button title="Cadastrar" />);
  
  const buttonElement = getByText('Cadastrar');
  expect(buttonElement).toBeInTheDocument();
});
