import styled from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 8rem);
  margin: 4rem auto;
  padding: 2.5rem;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 15px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow-y: scroll;

  outline: auto;
  transition: outline-color 0.2s;
`;