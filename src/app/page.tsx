import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CTASection from '@/components/sections/CTASection'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'
import { loadServices } from '@/lib/firestore-server'
import { toBucket } from '@/lib/service-details'

// Re-check Firestore at most once a minute so admin edits appear on the site
export const revalidate = 60

export const metadata: Metadata = genMeta({
  description: 'XactGen builds smarter solutions for real-world problems by blending Artificial Intelligence, Data Science and next-generation technology.',
  keywords: [
    'AI company Pakistan', 'machine learning services', 'deep learning',
    'computer vision', 'NLP', 'data analytics',
    'AI development services', 'XactGen', 'XactGen Pakistan',
    'generative AI services', 'MLOps', 'AI consulting',
  ],
})

export default async function HomePage() {
  const buckets = (await loadServices()).map(toBucket)
  // Org and Website schema are emitted in the root layout; not duplicated here.
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection buckets={buckets} />
        <CTASection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  )
}
