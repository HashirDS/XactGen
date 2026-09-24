import type { Metadata } from 'next'
import { Onest, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CookieConsent from '@/components/ui/CookieConsent'
import MilkyWay from '@/components/effects/MilkyWay'
import { generateMetadata as genMeta, generateJsonLd } from '@/lib/seo'

const displayFont = Onest({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  ...genMeta({
    keywords: [
      'AI development Pakistan', 'machine learning company', 'deep learning services',
      'computer vision AI', 'NLP', 'data analytics', 'web development Pakistan',
      'AI chatbot', 'business intelligence', 'XactGen',
      'artificial intelligence Pakistan', 'documentation and academic support',
    ],
  }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema           = generateJsonLd('organization')
  const websiteSchema       = generateJsonLd('website')
  const localBusinessSchema = generateJsonLd('localBusiness')
  const personSchema        = generateJsonLd('person')

  return (
    // suppressHydrationWarning on <html> AND <body> defends against browser
    // extensions (Grammarly, dark-mode readers, translators) that inject
    // attributes and text nodes into the DOM before React hydrates.
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#05070f" />
        <meta name="msapplication-TileColor" content="#05070f" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body
        className="bg-space-950 text-slate-300 font-body antialiased"
        suppressHydrationWarning
      >
        <MilkyWay interactive />

        <AuthProvider>
          {children}
          <WhatsAppButton />
          <CookieConsent />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#12172a',
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.08)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
