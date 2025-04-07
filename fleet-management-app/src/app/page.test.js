import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders the loading message', async () => {
    render(<Home />);    

    const paragraph = screen.getByRole('paragraph');
    const aikoLogo = screen.getByRole('img', {name: 'Logo Aiko'});

    await waitFor(() => {
      expect(paragraph).toHaveTextContent('Carregando mapa...');
      expect(aikoLogo).toBeInTheDocument();
    })
  })
})