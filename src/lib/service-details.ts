/**
 * Shape used by the public services pages. Services are stored in Firestore
 * (managed in /admin/services) and converted with toBucket(). The icon field
 * holds one of the IconKey names below; anything else falls back to 'ai'.
 */
import type { Service } from '@/types'

export type IconKey =
  | 'ai' | 'ml' | 'dl' | 'vision' | 'nlp'
  | 'bi' | 'analytics' | 'web' | 'app' | 'embedded' | 'docs'

export const iconOptions: { key: IconKey; label: string }[] = [
  { key: 'ai', label: 'AI (sparkle)' },
  { key: 'ml', label: 'Machine learning (book)' },
  { key: 'dl', label: 'Deep learning (chip)' },
  { key: 'vision', label: 'Computer vision (eye)' },
  { key: 'nlp', label: 'NLP / chat (bubble)' },
  { key: 'bi', label: 'Business intelligence (bars)' },
  { key: 'analytics', label: 'Analytics (trend)' },
  { key: 'web', label: 'Web (globe)' },
  { key: 'app', label: 'App (phone)' },
  { key: 'embedded', label: 'Embedded (layers)' },
  { key: 'docs', label: 'Documentation (document)' },
]

export interface ServiceBucket {
  slug: string
  title: string
  summary: string
  description: string
  tagsShort: string[]
  iconKey: IconKey
}

const validKeys = new Set(iconOptions.map(o => o.key))

export function toBucket(s: Pick<Service, 'slug' | 'title' | 'shortDescription' | 'fullDescription' | 'features' | 'icon'>): ServiceBucket {
  return {
    slug: s.slug,
    title: s.title,
    summary: s.shortDescription || '',
    description: s.fullDescription || '',
    tagsShort: s.features || [],
    iconKey: validKeys.has(s.icon as IconKey) ? (s.icon as IconKey) : 'ai',
  }
}
