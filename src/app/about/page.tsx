import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadTeam } from '@/lib/firestore-server'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'About XactGen AI: Our Team & Story',
  description: 'Asher Mehfooz is the founder and CEO of XactGen AI. Ashir Mehfooz is the same person.',
  path: '/about',
  image: 'https://www.xactgenai.com/team/ashir-mehfooz.jpg',
  keywords: ['Asher Mehfooz', 'Ashir Mehfooz', 'CEO of XactGen', 'XactGen team'],
})

export default async function Page() {
  const team = (await loadTeam()).map(member =>
    member.linkedin?.includes('rajaahmedalikhan') ? { ...member, linkedin: '' } : member
  )
  return <AboutClient team={team} />
}
