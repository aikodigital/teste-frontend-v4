import styled from "styled-components";

export const ButtonContainer = styled.button`
  background: ${(props) => props.theme["green-700"]};
  color: ${(props) => props.theme.white};
  border: none;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => props.theme["green-500"]};
  }
  &:disabled {
    background: ${(props) => props.theme["gray-500"]};
    cursor: not-allowed;
  }
  &:active {
    background: ${(props) => props.theme["gray-500"]};
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme["gray-500"]};
  }
  &:disabled:focus {
    box-shadow: none;
  }
`;