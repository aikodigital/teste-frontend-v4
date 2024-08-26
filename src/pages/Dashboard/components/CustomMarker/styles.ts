import styled from 'styled-components';

export const CustomMarkerContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid ${(props) => props.theme.neutral.default};
  }
`;

export const CustomMarkerHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  gap: 2rem;

  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status {
    display: flex;
    align-items: center;
  }
`;

export const CustomMarkerTextsStyled = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 0.25rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.text.base};
  }

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.baseLight};
  }
`;

export const CustomMarkerIconStyled = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const CustomMarkerContentStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  strong {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.base};
  }

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.baseLight};
  }
`;
