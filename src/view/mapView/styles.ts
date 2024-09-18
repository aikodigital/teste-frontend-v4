import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ContainerPopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  overflow-y: auto;
  z-index: 1000;    border-radius: 5px;
  border: 1px solid black;

  p {
    text-align: start;
  }

  .troggle-button {
    color: #007bff;
    cursor: pointer;
    align-self: flex-end;
    text-decoration: underline;
    margin-top: 0;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: "100%";
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
   }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: max-content;
    margin-top: 20px;
  }
`;

export const ContinerIcon = styled.span` 
  display: flex;
  align-items: center;
  width: max-content;
  margin-top: 10;
  gap: 10px;
`;