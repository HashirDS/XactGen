import { MetadataRoute } from 'next'
import { getBlogPostsServer, getProjectsServer } from '@/lib/firestore-server'
import { serviceBuckets } from '@/lib/service-details'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xactgen.com'

// Regenerate hourly so newly published content appears in the sitemap
export const revalidate = 3600

function safeISO(ts: any, fallback: string): string {
  try { return ts?.toDate ? ts.toDate().toISOString() : fallback } catch { return fallback }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL,                lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/services`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/projects`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/blog`,      lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terms`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Service detail pages come from our static content, not Firestore
  const serviceEntries: MetadataRoute.Sitemap = serviceBuckets.map(b => ({
    url: `${SITE_URL}/services/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic content — fail gracefully if Firestore is unreachable
  const [posts, projects] = await Promise.all([
    getBlogPostsServer(true).catch(() => []),
    getProjectsServer().catch(() => []),
  ])

  const blogEntries: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${SITE_URL}/blog/${p.id}`,
    lastModified: safeISO((p as any).updatedAt || p.createdAt, now),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.8 : 0.6,
  }))

  const projectEntries: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${SITE_URL}/projects/${p.id}`,
    lastModified: safeISO((p as any).updatedAt || p.createdAt, now),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.7 : 0.5,
  }))

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries]
}
