import App from '@/App';
import { render, screen } from '@/test/helpers';

describe('<Àpp />', () => {
  it('renders a Hello World heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /Hello World/i })).toBeInTheDocument();
  });
});
