import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadTeam } from '@/lib/firestore-server'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'About XactGen: Our Team & Story',
  description: 'Learn about XactGen, led by CEO Ashir Mehfooz: an AI and data science company building smart solutions for real-world problems from Kotli, AJK, Pakistan.',
  path: '/about',
  keywords: ['about XactGen', 'AI company Pakistan', 'XactGen team', 'machine learning company Pakistan'],
})

export default async function Page() {
  const team = await loadTeam()
  return <AboutClient team={team} />
}
