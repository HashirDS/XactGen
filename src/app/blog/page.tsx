import type { Metadata } from 'next'
import BlogClient from './BlogClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadBlogPosts } from '@/lib/firestore-server'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'Blog: AI, ML, and Data Science Insights',
  description: 'Insights on AI, machine learning, data science, and technology from the XactGen team. Tutorials, case studies, and industry analysis.',
  path: '/blog',
  keywords: ['XactGen blog', 'AI tutorials Pakistan', 'machine learning blog', 'data science articles', 'AI case studies'],
})

export default async function Page() {
  const posts = await loadBlogPosts()
  return <BlogClient posts={posts} />
}
