'use client'
import { useEffect, useState, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { seedDefaultContent, migrateTeamPhotos, migratePortfolioProjects } from '@/lib/firestore'

/**
 * On the admin's first visit, copies the website's built-in content into
 * Firestore before the admin pages load their lists (see seedDefaultContent),
 * moves team photos hosted on GitHub into the database (migrateTeamPhotos),
 * and adds the portfolio projects with their images (migratePortfolioProjects).
 */
export default function SeedGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const run = async () => {
      try {
        const n = await seedDefaultContent()
        if (n > 0) toast.success(`Website content added to the database (${n} items). You can now edit or delete it.`)
      } catch (err) {
        console.error('[XactGen] Could not copy built-in content to Firestore:', err)
        toast.error('Could not copy website content to the database. Check the admin UID in the Firestore rules.')
      }
      // Photos are saved to the `images` collection, which needs the latest
      // firestore.rules. If they are not published yet, show one clear message.
      let rulesMissing = false
      const isDenied = (err: any) => err?.code === 'permission-denied'
      try {
        const moved = await migrateTeamPhotos()
        if (moved > 0) toast.success(`${moved} team photo(s) moved into the database.`)
      } catch (err) {
        if (isDenied(err)) rulesMissing = true
        else console.error('[XactGen] Could not move team photos to Firestore:', err)
      }
      try {
        const { added, images } = await migratePortfolioProjects()
        if (added > 0) toast.success(`${added} portfolio project(s) added. Delete any you don't want in Projects.`)
        else if (images > 0) toast.success(`${images} project image(s) moved into the database.`)
      } catch (err) {
        if (isDenied(err)) rulesMissing = true
        else console.error('[XactGen] Could not add portfolio projects:', err)
      }
      if (rulesMissing) {
        toast('Photos are still loading from their original links. To store them in the database, publish the latest firestore.rules (with the "images" section) in Firebase Console > Firestore > Rules.', { duration: 8000, icon: 'ℹ️' })
      }
    }
    run().finally(() => setReady(true))
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
