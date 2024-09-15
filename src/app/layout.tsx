import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Header from './components/header';
import Footer from './components/footer';



export const metadata: Metadata = {
  title: "Aiko Tracker",
  description: "Aiko Equipament Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="pt-BR">
      <body>
      < Header/>
        {children}
        < Footer />
      </body>
    </html>
  );
}
