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

export const metadata: Metadata = genMeta({})

export default async function HomePage() {
  const buckets = (await loadServices()).map(toBucket).slice(0, 12)
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
