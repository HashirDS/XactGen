'use client'
import { useEffect, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { seedDefaultContent } from '@/lib/firestore'

/**
 * On the admin's first visit, copies the website's built-in content into
 * Firestore before the admin pages load their lists (see seedDefaultContent).
 */
export default function SeedGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedDefaultContent()
      .then(n => { if (n > 0) toast.success(`Website content added to the database (${n} items). You can now edit or delete it.`) })
      .catch(err => {
        console.error('[XactGen] Could not copy built-in content to Firestore:', err)
        toast.error('Could not copy website content to the database. Check the admin UID in the Firestore rules.')
      })
      .finally(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-full border-2 border-aurora-cyan/20 border-t-aurora-cyan animate-spin" />
      </div>
    )
  }
  return <>{children}</>
}
