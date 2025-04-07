import Footer from '../components/Footer';
import { render, screen } from '@testing-library/react';


describe('Footer', () => {
  it('deve renderizar o texto com o ano atual e o nome', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`© ${currentYear} Georgia Rocha - Todos os direitos reservados.`, 'i')
    );

    expect(footerText).toBeInTheDocument();
  });
});
