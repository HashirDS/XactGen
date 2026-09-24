import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xactgen.com'

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
