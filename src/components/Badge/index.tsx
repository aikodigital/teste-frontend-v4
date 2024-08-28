import { BadgeProps } from './models';

import { BadgeStyled } from './styles';

export const Badge = ({ testId, color, children }: BadgeProps) => {
  return (
    <BadgeStyled data-testid={testId} color={color}>
      {children}
    </BadgeStyled>
  );
};
