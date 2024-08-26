import { BadgeProps } from './models';

import { BadgeStyled } from './styles';

export const Badge = ({ color, children }: BadgeProps) => {
  return <BadgeStyled color={color}>{children}</BadgeStyled>;
};
