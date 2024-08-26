import styled from 'styled-components';

export const ContainerStyled = styled.main`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background.light};
`;

export const SidebarStyled = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30%;

  gap: 2rem;
`;

export const SidebarHeaderStyled = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.5rem 1rem 0;

  img {
    width: 100%;
    max-width: 5rem;
  }
`;

export const SidebarFilterContainerStyled = styled.section`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 0 1rem;
`;

export const SidebarFilterLineStyled = styled.section`
  display: flex;
  width: 100%;

  gap: 1rem;
`;

export const SidebarListContainerStyled = styled.section`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 0 1rem 1.5rem;

  overflow-y: auto;
`;

export const MapContainerStyled = styled.section`
  display: flex;
  position: relative;
  flex: 1;
`;
