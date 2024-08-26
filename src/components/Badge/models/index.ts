export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  children: React.ReactNode;
}

export interface BadgeStyledProps {
  color?: BadgeProps['color'];
}
