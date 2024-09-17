import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { MapComponent } from '@/components';
import { useMap } from '@/hooks/useMap';

vi.mock('@/hooks/useMap');

describe('MapComponent', () => {
  const mockMarkers = [
    {
      coordinates: [-19.1673, -46.0034] as [number, number],
      popupValue: 'Marker 1',
      tooltipValue: 'Tooltip 1'
    },
    {
      coordinates: [-20.0, -47.0] as [number, number],
      popupValue: 'Marker 2',
      tooltipValue: 'Tooltip 2'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map container', () => {
    render(<MapComponent markers={[]} />);

    const mapElement = screen.getByTestId('map');

    expect(mapElement).toBeInTheDocument();
  });

  it('should call useMap hook with correct parameters', () => {
    render(<MapComponent markers={mockMarkers} />);

    expect(useMap).toHaveBeenCalledWith({
      zoom: 10,
      center: [-19.1673, -46.0034],
      markers: mockMarkers
    });
  });

  it('should render with empty markers', () => {
    render(<MapComponent markers={[]} />);

    expect(useMap).toHaveBeenCalledWith({
      zoom: 10,
      center: [-19.1673, -46.0034],
      markers: []
    });
  });
});
