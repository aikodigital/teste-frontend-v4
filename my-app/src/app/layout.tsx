import "@/styles/globals.css";
import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
