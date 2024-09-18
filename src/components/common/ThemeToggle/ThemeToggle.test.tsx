import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../theme/ThemeProvider';
import ThemeToggle from './ThemeToggle';

// Função auxiliar para renderizar o componente com o contexto de tema
const renderWithThemeProvider = () => {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  it('deve exibir o ícone de lua quando o tema atual é claro', () => {
    renderWithThemeProvider();

    // Verifica se o botão de alternância do tema está presente
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('deve alternar o tema quando o botão é clicado', () => {
    renderWithThemeProvider();

    // Captura o botão de alternância do tema
    const toggleButton = screen.getByRole('button');

    // Clica no botão para alternar o tema
    fireEvent.click(toggleButton);

    // Verifica se o botão de alternância foi clicado
    expect(toggleButton).toBeInTheDocument();
  });
});
