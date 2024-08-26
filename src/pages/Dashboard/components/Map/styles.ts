import { MapContainer } from 'react-leaflet';
import styled from 'styled-components';

export const MapContainerStyled = styled(MapContainer)`
  height: 100vh;
  width: 100%;

  .custom-marker-icon {
    border-radius: 50%;
    object-fit: cover;
  }
`;
