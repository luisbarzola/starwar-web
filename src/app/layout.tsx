
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import Navigation from './components/navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Star War',
  description: 'Star War',
}

export default function RootLayout({ children,}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>

          <Navigation />
          {children}
        </Providers>
        
      </body>
    </html>
  )
}
