import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Header from './components/header';
import Footer from './components/footer';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      < Header/>
        {children}
        < Footer />
      </body>
    </html>
  );
}
