import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { generateMetadata as genMeta } from '@/lib/seo'
import { loadServices } from '@/lib/firestore-server'
import { toBucket } from '@/lib/service-details'

export const revalidate = 60

export const metadata: Metadata = genMeta({
  title: 'AI & Machine Learning Services',
  description: 'XactGen delivers expert AI development, machine learning, deep learning, computer vision, NLP, data analytics, and web development services globally.',
  path: '/services',
  keywords: ['AI development services', 'machine learning services Pakistan', 'deep learning development', 'computer vision service', 'NLP services', 'data analytics company'],
})

export default async function Page() {
  const buckets = (await loadServices()).map(toBucket)
  return <ServicesClient buckets={buckets} />
}
