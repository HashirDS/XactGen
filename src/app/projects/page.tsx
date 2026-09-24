import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadProjects } from '@/lib/firestore-server'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'Our Projects: AI & Data Science Portfolio',
  description: 'Explore real AI, machine learning, and data analytics projects delivered by XactGen.',
  path: '/projects',
  keywords: ['XactGen portfolio', 'AI projects Pakistan', 'machine learning case studies', 'data analytics projects'],
})

export default async function Page() {
  const projects = await loadProjects()
  return <ProjectsClient projects={projects} />
}
