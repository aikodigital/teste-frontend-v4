import { ButtonProps } from './models';

import { ButtonStyled } from './styles';

export const Button = ({
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => (
  <ButtonStyled variant={variant} {...props}>
    {children}
  </ButtonStyled>
);
