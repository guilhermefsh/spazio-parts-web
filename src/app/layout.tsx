import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Spazio Parts - Peças Automotivas Premium',
    template: '%s | Spazio Parts'
  },
  description: 'Peças automotivas premium e qualidade superior para seu veículo. Encontre aerofólios, para-choques, spoilers e saias laterais.',
  keywords: [
    'peças para fiat uno',
    'peças para carro antigo',
    'aerofólio fiat uno',
    'parachoque uno',
    'parachoque spazio',
    'saias laterais fiat',
    'loja de peças automotivas',
    'peças antigas automotivas',
    'spazio parts',
    'aerofólio esportivo',
    'parachoque dianteiro e traseiro'
  ],
  authors: [{ name: 'Spazio Parts' }],
  creator: 'Spazio Parts',
  publisher: 'Spazio Parts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Spazio Parts - Peças Automotivas Vintage Premium',
    description: 'Peças automotivas premium e qualidade superior para seu veículo. Encontre aerofólios, para-choques, spoilers e saias laterais.',
    siteName: 'Spazio Parts',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Spazio Parts Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spazio Parts - Peças Automotivas Premium',
    description: 'Peças automotivas premium e qualidade superior para seu veículo. Encontre aerofólios, para-choques, spoilers e saias laterais.',
    images: ['/logo.jpg'],
    creator: '@spazioparts'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
