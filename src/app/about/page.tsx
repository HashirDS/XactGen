import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateMetadata as genMeta, generateJsonLd } from '@/lib/seo'
import { loadTeam } from '@/lib/firestore-server'
import { CEO_FAQS } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'About XactGen: Our Team & Story',
  description: 'Ashir Mehfooz is the founder and CEO of XactGen (xactgenai.com), an AI and data science company in Kotli, Azad Jammu and Kashmir, Pakistan.',
  path: '/about',
  image: 'https://www.xactgenai.com/team/ashir-mehfooz.jpg',
  keywords: ['Ashir Mehfooz', 'CEO of XactGen', 'about XactGen', 'XactGen team'],
})

export default async function Page() {
  const team = await loadTeam()
  const faqSchema = generateJsonLd('faq', { items: CEO_FAQS })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AboutClient team={team} />
    </>
  )
}
