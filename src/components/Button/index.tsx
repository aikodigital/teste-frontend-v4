import { ButtonProps } from './models';

import { ButtonStyled } from './styles';

export const Button = ({
  variant = 'primary',
  testId,
  children,
  ...props
}: ButtonProps) => (
  <ButtonStyled data-testid={testId} variant={variant} {...props}>
    {children}
  </ButtonStyled>
);
