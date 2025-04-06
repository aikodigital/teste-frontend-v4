"use client";

import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { EquipmentProvider } from "./context/EquipmentContex";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
        <EquipmentProvider>{children}</EquipmentProvider>
      </body>
    </html>
  );
}
