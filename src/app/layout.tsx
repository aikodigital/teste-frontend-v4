import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Teste Aiko',
  description: 'Teste para Desenvolvedor Frontend da Aiko',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
