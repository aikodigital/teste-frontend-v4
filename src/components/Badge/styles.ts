import styled from 'styled-components';
import { BadgeStyledProps } from './models';

export const BadgeStyled = styled.span<BadgeStyledProps>`
  padding: 0.25rem 0.5rem;
  
  border-radius: 1.5rem;
  border: 1px solid ${(props) => props.color};

  font-size: 0.875rem;
  font-weight: 500;

  color: ${(props) => props.theme.text.white};
  background-color: ${(props) => props.color || props.theme.text.base};
`;
