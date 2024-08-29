import styled from 'styled-components'

export const MapWrapper = styled.div`
  width: auto;
  height: 40vh;
  margin: 5px;
  position: relative;
  z-index: 1;

  border: 2px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;

  button {
    position: absolute;
    top: 22px;
    left: 50px;
    padding: 8px;
    width: 40px;
    height: 40px;
    background-color: #3d1690;
    color: #eee;
    font-size: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
    &:focus {
      color: #ccc;
    }
  }

  @media (max-width: 768px) {
    width: auto;
    height: 25vh;
    margin: 5px;
  }
`
