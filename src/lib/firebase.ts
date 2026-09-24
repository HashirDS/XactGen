import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// All values come from .env.local (see .env.local.example). Firebase web API
// keys are public by design; data is protected by firestore.rules.
// The placeholders only let the site start before Firebase is configured:
// database reads fail quietly and the pages show their built-in defaults.
export const firebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'not-configured',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'not-configured.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not-configured',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'not-configured.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
}

if (!firebaseConfigured && typeof window !== 'undefined') {
  console.warn('[XactGen] Firebase is not configured. Copy .env.local.example to .env.local and add your Firebase project values.')
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
