import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Central de Equipamentos e Gestão header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Central de Equipamentos e Gestão/i);
  expect(linkElement).toBeInTheDocument();
});
