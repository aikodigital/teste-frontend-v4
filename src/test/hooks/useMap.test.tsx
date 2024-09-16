import { act } from 'react';

import { Map as LeafletMap } from 'leaflet';

import { useMap } from '@/hooks';
import { renderHook } from '@/test/helpers';

beforeEach(() => {
  const mapDiv = document.createElement('div');

  mapDiv.id = 'map';
  document.body.appendChild(mapDiv);
});

afterEach(() => {
  const mapDiv = document.getElementById('map');

  if (mapDiv) {
    mapDiv.remove();
  }
});

describe('<useMap />', () => {
  const center: [number, number] = [-19.1673, -46.0034];
  const zoom = 10;

  beforeEach(() => {
    vi.spyOn(LeafletMap.prototype, 'setView');
    vi.spyOn(LeafletMap.prototype, 'addLayer');
    vi.spyOn(LeafletMap.prototype, 'remove');
    vi.spyOn(LeafletMap.prototype, 'removeLayer');
  });

  it('should render the map with zoom and center', () => {
    act(() => {
      renderHook(() => useMap({ center, zoom, markers: [] }));
    });

    const mapElement = document.getElementById('map');

    expect(mapElement).toBeInTheDocument();

    const mapInstance = LeafletMap.prototype.setView;

    expect(mapInstance).toHaveBeenCalledWith(
      { lat: center[0], lng: center[1] },
      zoom,
      expect.any(Object)
    );
  });

  it('should add markers to the map', () => {
    const markers = [
      {
        coordinates: [-19.1673, -46.0034] as [number, number],
        popupValue: 'Nome teste ',
        tooltipValue: 'Posição teste',
        icon: undefined
      }
    ];

    act(() => {
      renderHook(() => useMap({ center, zoom, markers }));
    });

    const markerInstance = LeafletMap.prototype.addLayer;

    expect(markerInstance).toHaveBeenCalled();
  });

  it('should clean map and remover markers at unmount', () => {
    const markers = [
      {
        coordinates: [-19.1673, -46.0034] as [number, number],
        popupValue: 'Nome teste ',
        tooltipValue: 'Posição teste',
        icon: undefined
      }
    ];

    const { unmount } = renderHook(() => useMap({ center, zoom, markers }));

    act(() => {
      unmount();
    });

    const mapInstance = LeafletMap.prototype.remove;
    const markerInstance = LeafletMap.prototype.removeLayer;

    expect.soft(mapInstance).toHaveBeenCalled();
    expect.soft(markerInstance).toHaveBeenCalled();
  });
});
