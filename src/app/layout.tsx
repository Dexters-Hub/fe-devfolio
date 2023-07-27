import './globals.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from './lib/registry'

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
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}