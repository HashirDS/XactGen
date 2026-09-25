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
import type { BlogPost, Project, Service, TeamMember } from '@/types'
import { defaultServices, defaultTeam, defaultProjects, defaultBlogPosts } from '@/lib/default-content'

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

// ─── Loaders with built-in fallback ──────────────────────────────────────────
// Until the admin's first login copies the built-in content into Firestore
// (marked by settings/content-seeded), public pages show that built-in content.
// After that, Firestore is the only source, so admin edits and deletions show.
// If Firestore is unreachable, the built-in content is shown as well.

async function isContentSeededServer(): Promise<boolean> {
  return (await getDocREST<{ id: string }>('settings', 'content-seeded')) !== null
}

async function loadWithFallback<T>(fetchLive: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!(await isContentSeededServer())) return fallback
    return await fetchLive()
  } catch {
    return fallback
  }
}

const byOrder = (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)

// Timestamps are converted to epoch milliseconds so results can be passed
// from server components to client components.
function plain<T extends { createdAt?: any; updatedAt?: any }>(item: T): T {
  const toMs = (ts: any) => (ts?.seconds ? ts.seconds * 1000 : null)
  return { ...item, createdAt: toMs(item.createdAt), updatedAt: toMs(item.updatedAt) } as T
}

export async function loadServices(): Promise<Service[]> {
  return loadWithFallback(
    async () => (await listDocsREST<Service>('services')).filter(s => s.active !== false).sort(byOrder).map(plain),
    defaultServices.filter(s => s.active).map(s => ({ ...s }) as Service),
  )
}

export async function loadTeam(): Promise<TeamMember[]> {
  return loadWithFallback(
    async () => (await listDocsREST<TeamMember>('team')).sort(byOrder).map(plain),
    defaultTeam.map(m => ({ ...m }) as TeamMember),
  )
}

export async function loadProjects(): Promise<Project[]> {
  return loadWithFallback(
    async () => (await getProjectsServer()).map(plain),
    defaultProjects.map(p => ({ ...p }) as Project),
  )
}

const PROFILE_POST_DATE = Date.UTC(2026, 8, 26)

function withBuiltinPosts(live: BlogPost[]): BlogPost[] {
  const ids = new Set(live.map(p => p.id))
  const extras = defaultBlogPosts
    .filter(p => p.published && !ids.has(p.id))
    .map(p => ({ ...p, createdAt: PROFILE_POST_DATE }) as BlogPost)
  return [...extras, ...live]
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  return loadWithFallback(
    async () => withBuiltinPosts((await getBlogPostsServer(true)).map(plain)),
    defaultBlogPosts.filter(p => p.published).map(p => ({ ...p, createdAt: PROFILE_POST_DATE }) as BlogPost),
  )
}

export async function loadProject(id: string): Promise<Project | null> {
  return loadWithFallback(
    () => getProjectServer(id),
    (defaultProjects.find(p => p.id === id) as Project) || null,
  )
}

export async function loadBlogPost(id: string): Promise<BlogPost | null> {
  const builtin = defaultBlogPosts.find(p => p.id === id)
  return loadWithFallback(
    async () => (await getBlogPostServer(id)) || (builtin ? { ...builtin, createdAt: makeTimestamp(new Date(PROFILE_POST_DATE).toISOString()) } as BlogPost : null),
    builtin ? { ...builtin, createdAt: makeTimestamp(new Date(PROFILE_POST_DATE).toISOString()) } as BlogPost : null,
  )
}
