import "./index.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  bgColor: string;
};

export const Badge = ({ children, bgColor }: Props) => {
  return (
    <span className="badge" style={{ backgroundColor: bgColor }}>
      {children}
    </span>
  );
};
