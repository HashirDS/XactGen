import type { Metadata } from 'next'
import AdminLayoutInner from './LayoutInner'

// Admin path is excluded from search-engine indexing via metadata, NOT via
// robots.txt. Listing /admin in robots.txt would publish the secret URL.
export const metadata: Metadata = {
  title: 'Admin · XactGen',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutInner>{children}</AdminLayoutInner>
}
