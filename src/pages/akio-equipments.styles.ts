import styled from 'styled-components';

export const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

export const Logo = styled.img`
  width: min-content;
  height: 50px;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
`;
