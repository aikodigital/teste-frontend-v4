import { ReactNode } from "react";
import { Toaster } from "./components/ui/sonner";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen overflow-hidden">
      {children}
      <Toaster />
    </main>
  );
}
