import { ReactNode } from "react";
import { Toaster } from "./components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen overflow-hidden">
      {children}
      <Toaster />
      <Analytics />
    </main>
  );
}
