export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  children: React.ReactNode;
  testId?: string;
}

export interface BadgeStyledProps {
  color?: BadgeProps['color'];
}
