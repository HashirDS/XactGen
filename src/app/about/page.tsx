import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadTeam } from '@/lib/firestore-server'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'About XactGen AI: Our Team & Story',
  description: 'Ashir Mehfooz is the founder and CEO of XactGen (xactgenai.com), an AI and data science company in Kotli, Azad Jammu and Kashmir, Pakistan.',
  path: '/about',
  image: 'https://www.xactgenai.com/team/ashir-mehfooz.jpg',
  keywords: ['Ashir Mehfooz', 'CEO of XactGen', 'about XactGen', 'XactGen team'],
})

export default async function Page() {
  const team = (await loadTeam()).map(member =>
    member.linkedin?.includes('rajaahmedalikhan') ? { ...member, linkedin: '' } : member
  )
  return <AboutClient team={team} />
}
