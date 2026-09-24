import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Contact XactGen: Get a Free Consultation',
  description: 'Contact XactGen for a free AI consultation. We help businesses with AI development, machine learning, data science, and web development globally.',
  path: '/contact',
  keywords: ['contact XactGen', 'AI consultation Pakistan', 'hire AI developer', 'machine learning services contact', 'free AI consultation'],
})

export default function Page() {
  return <ContactClient />
}
