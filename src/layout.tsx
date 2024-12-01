import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return <main className="w-screen h-screen overflow-hidden">{children}</main>;
}
