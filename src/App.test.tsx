import App from '@/App';
import { render, screen } from '@/test/helpers';

describe('<App />', () => {
  it('renders a heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Aiko - Teste Frontend/i })
    ).toBeInTheDocument();
  });
});
