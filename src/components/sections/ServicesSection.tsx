'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { serviceBuckets, IconKey } from '@/lib/service-details'

const iconMap: Record<IconKey, React.FC<{ className?: string }>> = {
  ai: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.091z"/>
    </svg>
  ),
  ml: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
    </svg>
  ),
  dl: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/>
    </svg>
  ),
  vision: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  nlp: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
    </svg>
  ),
  bi: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
    </svg>
  ),
  analytics: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941"/>
    </svg>
  ),
  web: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
    </svg>
  ),
  app: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
    </svg>
  ),
  embedded: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>
    </svg>
  ),
}

/**
 * 10 services now: 5 on inner ring, 5 on outer ring.
 * Inner is faster (25s), outer slower (45s), for a planetary feel.
 * Overall diagram is shrunk from 540px to 440px.
 */
const innerServices = [0, 1, 2, 3, 4]
const outerServices = [5, 6, 7, 8, 9]

function OrbitalDiagram() {
  const [tick, setTick] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startRef.current) / 1000
      setTick(elapsed)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const innerRotation = (tick / 25) * 360
  const outerRotation = (tick / 45) * 360

  const renderIcon = (bucketIndex: number, ringIndex: number, ring: 'inner' | 'outer', totalInRing: number) => {
    const bucket = serviceBuckets[bucketIndex]
    if (!bucket) return null
    const Icon = iconMap[bucket.iconKey]
    // Outer ring offset by half a slot for planetary spacing
    const baseAngle = (ringIndex / totalInRing) * 360 + (ring === 'outer' ? 36 : 0)
    const rotationOffset = ring === 'inner' ? innerRotation : outerRotation
    const currentAngle = baseAngle + rotationOffset
    // Tighter radii — diagram is smaller now
    const radius = ring === 'inner' ? 28 : 46
    const rad = (currentAngle - 90) * Math.PI / 180
    const x = 50 + radius * Math.cos(rad)
    const y = 50 + radius * Math.sin(rad)

    return (
      <Link
        key={bucket.slug}
        href={`/services/${bucket.slug}`}
        className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ top: `${y}%`, left: `${x}%` }}
        aria-label={bucket.title}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-aurora-cyan/25 blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-space-800 border border-white/[0.08] flex items-center justify-center text-aurora-cyan/90 group-hover:text-aurora-cyan group-hover:border-aurora-cyan/40 transition-colors duration-300">
            <Icon className="w-5 h-5 lg:w-5 lg:h-5" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[9px] tracking-wider uppercase text-slate-400 opacity-80 group-hover:text-aurora-cyan transition-colors duration-200 pointer-events-none">
            {bucket.title}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="relative aspect-square w-full max-w-[440px] mx-auto">
      <div className="orbit-ring" style={{ width: '54%', height: '54%' }} />
      <div className="orbit-ring" style={{ width: '92%', height: '92%' }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-aurora-cyan/15 blur-2xl scale-150" />
          <div
            className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-space-700 to-space-900 border border-aurora-cyan/25 flex items-center justify-center shadow-xl shadow-aurora-cyan/20"
            style={{ animation: 'orbit-center 25s linear infinite' }}
          >
            <div className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center">
              <Image
                src="/brand/mark.png"
                alt="XactGen"
                width={48}
                height={48}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.35))' }}
              />
            </div>
          </div>
        </div>
      </div>

      {innerServices.map((bucketIdx, i) => renderIcon(bucketIdx, i, 'inner', innerServices.length))}
      {outerServices.map((bucketIdx, i) => renderIcon(bucketIdx, i, 'outer', outerServices.length))}
    </div>
  )
}

function ServiceCard({ bucket, index }: { bucket: typeof serviceBuckets[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = iconMap[bucket.iconKey]

  return (
    <Link
      ref={ref as any}
      href={`/services/${bucket.slug}`}
      className={`group relative flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-space-800/40 hover:border-aurora-cyan/25 hover:bg-space-800/70 transition-all duration-300 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="w-11 h-11 rounded-xl bg-aurora-cyan/8 border border-aurora-cyan/15 flex items-center justify-center text-aurora-cyan shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-medium text-white text-[15px] leading-tight tracking-tight">
          {bucket.title}
        </div>
      </div>
    </Link>
  )
}

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section relative" id="services" aria-label="Our Services">
      <div className="container-custom">
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-20 max-w-2xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl mb-5">
            Our <em>AI</em> Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <OrbitalDiagram />
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceBuckets.map((bucket, i) => (
                <ServiceCard key={bucket.slug} bucket={bucket} index={i} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm text-aurora-cyan hover:gap-3 transition-all">
                Find your AI solution
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
