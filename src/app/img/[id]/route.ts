/**
 * Serves photos uploaded from the admin panel. They are stored in Firestore
 * (collection `images`) as data URLs; see src/lib/images.ts.
 * Each upload gets a new id, so responses can be cached for a long time.
 */
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not-configured'
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(params.id)) return new Response('Not found', { status: 404 })

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/images/${params.id}?key=${API_KEY}`,
    { next: { revalidate: 86400 } },
  )
  if (!res.ok) return new Response('Not found', { status: 404 })

  const doc = await res.json()
  const dataUrl: string = doc?.fields?.data?.stringValue || ''
  const match = dataUrl.match(/^data:(image\/[a-z+.-]+);base64,(.+)$/)
  if (!match) return new Response('Not found', { status: 404 })

  return new Response(Buffer.from(match[2], 'base64'), {
    headers: {
      'Content-Type': match[1],
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
