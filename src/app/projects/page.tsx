import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Our Projects: AI & Data Science Portfolio',
  description: 'Explore real AI, machine learning, and data analytics projects delivered by XactGen for clients across Pakistan, Australia, the UK, USA, and Italy.',
  path: '/projects',
  keywords: ['XactGen portfolio', 'AI projects Pakistan', 'machine learning case studies', 'data analytics projects'],
})

export default function Page() {
  return <ProjectsClient />
}
