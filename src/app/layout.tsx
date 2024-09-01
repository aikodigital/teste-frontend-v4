import type { Metadata } from "next";
import { ConfigProvider } from 'antd';
import { Inter } from "next/font/google";
import MapsProvider from '@/lib/providers/mapsProvider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teste Aiko - Pedro Woyames",
  description: "Teste Aiko - Pedro Woyames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                colorBgContainer: '#e6e6e6',
                headerBg: '#fff'
              },
            },
          }}
        >
          <MapsProvider>
            {children}
          </MapsProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
