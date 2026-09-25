import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CTASection from '@/components/sections/CTASection'
import { generateMetadata as genMeta, generateJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import { loadServices } from '@/lib/firestore-server'
import { toBucket } from '@/lib/service-details'

// Re-check Firestore at most once a minute so admin edits appear on the site
export const revalidate = 60

export const metadata: Metadata = genMeta({
  description: 'Ashir Mehfooz is the founder and CEO of XactGen, an AI company. XactGen AI builds smarter solutions with Artificial Intelligence, Data Science and next-generation technology.',
  keywords: [
    'CEO of XactGen', 'XactGen AI', 'Ashir Mehfooz',
    'AI company Pakistan', 'machine learning services',
    'AI development services', 'XactGen',
  ],
})

export default async function HomePage() {
  const buckets = (await loadServices()).map(toBucket)
  const faqSchema = generateJsonLd('faq', {
    items: [
      {
        q: 'Who is the CEO of XactGen?',
        a: 'Ashir Mehfooz is the founder and CEO of XactGen and XactGen AI.',
      },
    ],
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
