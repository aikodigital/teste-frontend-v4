import styled from 'styled-components';

export const InputContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`;

export const LabelStyled = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.text.base};
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;

  border: 1px solid ${(props) => props.theme.neutral.default};
  border-radius: 0.5rem;

  font-size: 1rem;
  color: ${(props) => props.theme.text.base};

  &::placeholder {
    color: ${(props) => props.theme.text.baseLight};
  }

  &:focus-within, &:hover {
    border-color: ${(props) => props.theme.primary.default};
  }
`;
