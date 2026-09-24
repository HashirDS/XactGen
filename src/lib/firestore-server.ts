/**
 * Server-side Firestore reads over the REST API.
 *
 * The Firebase web SDK uses long-lived gRPC/WebChannel streams that fail inside
 * Vercel serverless functions, which made /blog/[id] and /projects/[id] return
 * 404 in production. Plain HTTPS fetches work everywhere. Public reads are
 * allowed by firestore.rules, so the public web API key is enough.
 *
 * Use this ONLY in server components, route handlers and sitemap.
 * Client components and the admin panel keep using src/lib/firestore.ts.
 */
import type { BlogPost, Project } from '@/types'

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not-configured'
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

// Edits made in the admin panel show up on the live site within this many seconds
const REVALIDATE_SECONDS = 60

// Mimics the SDK Timestamp so existing `ts.toDate()` code keeps working
function makeTimestamp(iso: string) {
  return { toDate: () => new Date(iso), seconds: Math.floor(new Date(iso).getTime() / 1000) }
}

function decodeValue(v: any): any {
  if (v == null) return null
  if ('stringValue' in v) return v.stringValue
  if ('booleanValue' in v) return v.booleanValue
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  if ('timestampValue' in v) return makeTimestamp(v.timestampValue)
  if ('nullValue' in v) return null
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decodeValue)
  if ('mapValue' in v) return decodeFields(v.mapValue.fields || {})
  return null
}

function decodeFields(fields: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(fields || {})) out[k] = decodeValue(v)
  return out
}

function decodeDoc<T>(doc: any): T {
  const id = String(doc.name).split('/').pop() as string
  return { id, ...decodeFields(doc.fields || {}) } as T
}

async function getDocREST<T>(collection: string, id: string): Promise<T | null> {
  if (!id || id.includes('/')) return null
  const res = await fetch(`${BASE}/${collection}/${encodeURIComponent(id)}?key=${API_KEY}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Firestore REST ${res.status} for ${collection}/${id}`)
  return decodeDoc<T>(await res.json())
}

async function listDocsREST<T>(collection: string): Promise<T[]> {
  const items: T[] = []
  let pageToken = ''
  do {
    const url = `${BASE}/${collection}?pageSize=300&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) throw new Error(`Firestore REST ${res.status} for ${collection}`)
    const json = await res.json()
    for (const d of json.documents || []) items.push(decodeDoc<T>(d))
    pageToken = json.nextPageToken || ''
  } while (pageToken)
  return items
}

const byNewest = (a: any, b: any) =>
  (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)

export async function getBlogPostServer(id: string): Promise<BlogPost | null> {
  return getDocREST<BlogPost>('blog', id)
}

export async function getProjectServer(id: string): Promise<Project | null> {
  return getDocREST<Project>('projects', id)
}

export async function getBlogPostsServer(publishedOnly = true): Promise<BlogPost[]> {
  const posts = (await listDocsREST<BlogPost>('blog')).sort(byNewest)
  return publishedOnly ? posts.filter(p => p.published === true) : posts
}

export async function getProjectsServer(): Promise<Project[]> {
  return (await listDocsREST<Project>('projects')).sort(byNewest)
}
