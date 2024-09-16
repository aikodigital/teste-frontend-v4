import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const robotoNormal = localFont({
  src: "./fonts/Roboto-Regular.ttf",
  variable: "--font-roboto",
  weight: "400",
});
const robotoMedium = localFont({
  src: "./fonts/Roboto-Medium.ttf",
  variable: "--font-roboto",
  weight: "500",
});
const robotoBold = localFont({
  src: "./fonts/Roboto-Bold.ttf",
  variable: "--font-roboto",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Gestão de frota - Aiko",
  description: "Leve mais produtividade e segurança para a sua operação com a solução de gestão de frota da aiko e tenha mais eficiência e reduza custos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${robotoNormal.variable} ${robotoMedium.variable} ${robotoBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
