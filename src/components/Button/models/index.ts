export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  testId?: string;
}

export interface ButtonStyledProps {
  variant: 'primary' | 'secondary';
}
