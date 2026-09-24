import type { Metadata } from 'next'

// Dynamic metadata for blog articles is handled server-side
// The page title updates via document.title in the client component
export const metadata: Metadata = {
  title: 'Blog Article — XactGen',
  description: 'Read the latest AI and machine learning insights from XactGen.',
  openGraph: {
    type: 'article',
    siteName: 'XactGen',
  },
  robots: { index: true, follow: true },
}
