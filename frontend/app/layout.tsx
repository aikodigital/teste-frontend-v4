import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GeoTrack Dashboard',
  description:
    'GeoTrack Dashboard: Um aplicativo de monitoramento geoespacial que permite a visualização e filtragem de equipamentos em tempo real sobre um mapa interativo, facilitando a análise de produtividade e o gerenciamento operacional.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <MantineProvider forceColorScheme="dark">
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
