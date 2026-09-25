import { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

const SITE_URL = SITE.url

// Note: we do NOT list /admin in disallow — that would publish the secret URL
// to the world. Noindex for that path is enforced by metadata in
// src/app/admin/layout.tsx (robots: { index: false, follow: false })
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
