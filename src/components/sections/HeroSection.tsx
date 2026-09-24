import Link from 'next/link'
import Aurora from '@/components/effects/Aurora'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden grid-pattern"
      aria-label="Hero"
    >
      <Aurora />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-space-950 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-space-950 to-transparent pointer-events-none z-10" />

      {/* Lowered vertical rhythm: extra top padding pushes the headline and
          buttons further down from the navbar so they sit more centered. */}
      <div className="container-custom relative z-20 pt-44 lg:pt-48 pb-24 text-center">
        <h1 className="editorial-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto mb-6">
          Exact solutions for the <em>next</em> generation
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 font-light">
          Smarter solutions for real-world problems, blending Artificial Intelligence, Data Science and next-generation technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-primary">
            Start a project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
          <Link href="/projects" className="btn-outline">See our work</Link>
        </div>

        <div className="mt-20 lg:mt-24 pt-8 border-t border-white/[0.06] max-w-xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="font-display font-semibold text-white text-4xl lg:text-5xl tracking-tight">
                20<span className="text-aurora-cyan">+</span>
              </div>
              <div className="text-xs text-slate-500 mt-2 tracking-widest uppercase">Happy customers</div>
            </div>
            <div>
              <div className="font-display font-semibold text-white text-4xl lg:text-5xl tracking-tight">
                10<span className="text-aurora-cyan">+</span>
              </div>
              <div className="text-xs text-slate-500 mt-2 tracking-widest uppercase">Countries served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
