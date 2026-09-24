/**
 * Photos uploaded from the admin panel are stored in Firestore (collection
 * `images`), not in Firebase Storage, so no paid plan is needed. Each image is
 * resized and compressed in the browser first, then saved as a data URL and
 * served by the site at /img/<id> (see src/app/img/[id]/route.ts).
 */
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

// Firestore documents are limited to 1 MB, so keep the stored text well under it
const MAX_DATA_URL_LENGTH = 900_000

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This file is not an image the browser can read.')) }
    img.src = url
  })
}

/** Resize so the longest side is at most maxSide px and encode as JPEG. */
export async function compressImage(blob: Blob, maxSide = 1200): Promise<string> {
  const img = await loadImage(blob)
  let side = maxSide
  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, side / Math.max(img.naturalWidth, img.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.naturalWidth * scale)
    canvas.height = Math.round(img.naturalHeight * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not process the image.')
    ctx.fillStyle = '#ffffff' // transparent PNGs get a white background in JPEG
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', attempt < 3 ? 0.85 : 0.72)
    if (dataUrl.length <= MAX_DATA_URL_LENGTH) return dataUrl
    side = Math.round(side * 0.75)
  }
  throw new Error('The image is too large even after compressing. Please use a smaller image.')
}

/** Compress and store an image in Firestore. Returns the site path to use as the image URL. */
export async function uploadImage(blob: Blob, maxSide = 1200): Promise<string> {
  const data = await compressImage(blob, maxSide)
  const ref = await addDoc(collection(db, 'images'), { data, createdAt: serverTimestamp() })
  return `/img/${ref.id}`
}

/** Download an image from a public URL and store it in Firestore. */
export async function importImageFromUrl(url: string, maxSide = 1200): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not download ${url} (${res.status})`)
  return uploadImage(await res.blob(), maxSide)
}
