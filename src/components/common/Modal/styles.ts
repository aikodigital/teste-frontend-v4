import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  overflow-y: auto;
`;

export const Content = styled.div`
  background: ${(props) => props.theme["gray-800"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px; 
  max-height: 65%; 
  width: 100%;
  box-shadow: 0 2px 10px rgba(49, 19, 19, 0.1);
  position: relative;
  overflow-y: auto; 
  outline: 3px solid ${(props) => props.theme["gray-500"]}; /* Adiciona contorno verde */
  outline-offset: -3px; /* Ajusta o contorno para dentro */

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme["gray-500"]};
    border-radius: 4px;
  }

`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme["red-500"]};
  outline: none; /* Remove a borda padrão no estado de foco */

  &:focus {
    outline: none; /* Garante que não haverá borda ao focar */
  }

  &:hover {
    color: ${(props) => props.theme["red-300"]}; /* Adiciona um efeito de hover opcional */
  }
`;