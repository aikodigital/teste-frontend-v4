import styled from 'styled-components';

import { ButtonStyledProps } from './models';

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.primary.dark};
  
  cursor: pointer;
  
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.white};

  &:hover, &:focus-visible {
    background-color: ${({ theme }) => theme.primary.default};
  }

  ${({ theme, variant }) =>
    variant === 'secondary'
      ? `
    background-color: transparent;
    color: ${theme.primary.dark};

    border: 1px solid ${theme.primary.dark};

    &:hover, &:focus-visible {
      background-color: ${theme.primary.dark}1A;
    }
  `
      : ''}
`;
