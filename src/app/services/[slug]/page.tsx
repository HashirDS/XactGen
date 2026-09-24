import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { toBucket } from '@/lib/service-details'
import { loadServices } from '@/lib/firestore-server'

export const revalidate = 60

async function getBuckets() {
  return (await loadServices()).map(toBucket)
}

export async function generateStaticParams() {
  return (await getBuckets()).map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const b = (await getBuckets()).find(x => x.slug === params.slug)
  if (!b) return genMeta({ title: 'Service Not Found' })
  return genMeta({
    title: b.title,
    description: b.summary,
    path: `/services/${b.slug}`,
    keywords: [b.title, ...b.tagsShort, 'XactGen'],
  })
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const buckets = await getBuckets()
  const bucket = buckets.find(x => x.slug === params.slug)
  if (!bucket) notFound()

  // Sibling services for the "explore other services" section
  const others = buckets.filter(b => b.slug !== bucket.slug).slice(0, 4)

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container-custom mb-16 relative text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-aurora-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-aurora-cyan transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-300">{bucket.title}</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <h1 className="editorial-headline text-4xl sm:text-5xl lg:text-6xl mb-6">
              {bucket.title}
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl font-light leading-relaxed">
              {bucket.summary}
            </p>
            {bucket.description && (
              <p className="text-slate-300 leading-relaxed mt-6">{bucket.description}</p>
            )}
            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {bucket.tagsShort.map(tag => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-aurora-cyan/8 border border-aurora-cyan/15 text-aurora-cyan">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link href="/contact" className="btn-primary">Get in touch</Link>
              <Link href="/services" className="btn-outline">Back to services</Link>
            </div>
          </div>
        </section>

        {/* Explore other services */}
        <section className="container-custom mb-16">
          <div className="text-center mb-10">
            <h2 className="editorial-headline text-2xl sm:text-3xl">
              Explore other services
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {others.map(other => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group p-5 rounded-2xl border border-white/[0.06] bg-space-800/40 hover:border-aurora-cyan/25 hover:bg-space-800/70 transition-all duration-300 text-center"
              >
                <div className="font-display font-medium text-white text-sm mb-1">{other.title}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06]">
            <div className="absolute inset-0 bg-space-900" />
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-aurora-cyan/10 blur-3xl" />
            <div className="absolute -bottom-24 left-0 w-80 h-80 rounded-full bg-aurora-violet/10 blur-3xl" />
            <div className="relative z-10 px-8 py-14 md:px-16 text-center">
              <h2 className="editorial-headline text-3xl sm:text-4xl text-white mb-6">
                Ready to build?
              </h2>
              <Link href="/contact" className="btn-primary">
                Start the conversation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
