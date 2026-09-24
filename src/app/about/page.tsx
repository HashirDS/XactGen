import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'About XactGen: Our Team & Story',
  description: 'Learn about XactGen, led by CEO Ashir Mehfooz: an AI and data science company building smart solutions for real-world problems from Kotli, AJK, Pakistan.',
  path: '/about',
  keywords: ['about XactGen', 'AI company Pakistan', 'XactGen team', 'machine learning company Pakistan'],
})

export default function Page() {
  return <AboutClient />
}
