import { ReactNode } from "react";
import { AppBarComponent } from "./components/appbar/appbar.component";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col items-start">
      <AppBarComponent />
      {children}
    </main>
  );
}
