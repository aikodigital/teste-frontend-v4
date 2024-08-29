import { render, screen } from '@testing-library/react';
import MapComponent from './MapComponent';

jest.mock('react-map-gl', () => ({
  MapGL: (props) => <div>{props.children}</div>,
}));

test('renders MapComponent', () => {
  render(<MapComponent />);
  // Verifique se outros elementos esperados são renderizados
  expect(screen.getByText('Filtrar por Estado')).toBeInTheDocument();
});
