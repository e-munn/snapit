import type { Metadata } from 'next'
import { Poppins, Tiny5 } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const tiny5 = Tiny5({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-tiny5',
})

export const metadata: Metadata = {
  title: 'SnapIt',
  description: 'SnapIt is a simple, fast, and secure way to share your screenshots.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${tiny5.variable}  antialiased`}>{children}</body>
    </html>
  )
}
