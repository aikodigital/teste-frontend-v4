import React from 'react';
import { render, screen } from '@testing-library/react';
import { Map } from './index';

// Mock do LoadScript para evitar erros durante o teste
jest.mock('@react-google-maps/api', () => ({
  LoadScript: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  GoogleMap: () => <div data-testid="google-map">Google Map</div>,
}));

describe('Map Component', () => {
  it('deve renderizar o componente de mapa sem erros', () => {
    render(<Map selectedEquipment={null} />);

    const mapElement = screen.getByTestId('google-map');
    expect(mapElement).toBeInTheDocument();
  });
});
