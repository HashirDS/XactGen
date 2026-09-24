'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

/**
 * CTA banner only. The four-stat bar (Google rating, projects, service areas,
 * satisfaction rate) has been removed as requested.
 */
export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section" aria-label="Call to action">
      <div className="container-custom">
        <div
          ref={ref}
          className={`relative rounded-3xl overflow-hidden border border-white/[0.06] transition-all duration-700 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}
        >
          <div className="absolute inset-0 bg-space-900" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-aurora-violet/12 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-aurora-cyan/12 blur-3xl" />

          <div className="relative z-10 px-8 py-16 md:px-16 text-center">
            <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl mb-5">
              Tell us what you are building.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 font-light">
              Whether you have a clear vision or just a problem to solve, we will architect the AI solution that fits.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">
                Start a project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn-outline">
                Chat with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
