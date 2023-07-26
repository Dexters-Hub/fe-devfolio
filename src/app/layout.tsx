import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Frontend Engineering - Devfolio Challenge',
  description: 'A submission for the Devfolio Frontend Engineering Role Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
