import { ReactNode } from "react";
import { MenuComponent } from "./components/menu.component";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screnn overflow-hidden flex flex-col items-center">
      <MenuComponent />
      {children}
    </main>
  );
}
