import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/functions/fonts";
import Header from "@/components/Header";

import React from "react";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Florestal | Dashboard",
  description: "Florestal Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <div className="App">
          <Header />
          <main className="AppBody">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
