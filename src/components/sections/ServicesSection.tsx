'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { ServiceBucket } from '@/lib/service-details'
import { iconMap } from '@/components/ui/ServiceIcon'



function OrbitalDiagram({ buckets }: { buckets: ServiceBucket[] }) {
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

  // First half of the services on the inner ring, the rest on the outer ring
  const indexes = buckets.slice(0, 12).map((_, i) => i)
  const inner = indexes.slice(0, Math.ceil(indexes.length / 2))
  const outer = indexes.slice(Math.ceil(indexes.length / 2))

  const innerRotation = (tick / 25) * 360
  const outerRotation = (tick / 45) * 360

  const renderIcon = (bucketIndex: number, ringIndex: number, ring: 'inner' | 'outer', totalInRing: number) => {
    const bucket = buckets[bucketIndex]
    if (!bucket) return null
    const Icon = iconMap[bucket.iconKey]
    // Outer ring offset by half a slot for planetary spacing
    const baseAngle = (ringIndex / totalInRing) * 360 + (ring === 'outer' ? 180 / Math.max(totalInRing, 1) : 0)
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

      {inner.map((bucketIdx, i) => renderIcon(bucketIdx, i, 'inner', inner.length))}
      {outer.map((bucketIdx, i) => renderIcon(bucketIdx, i, 'outer', outer.length))}
    </div>
  )
}

function ServiceCard({ bucket, index }: { bucket: ServiceBucket; index: number }) {
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

export default function ServicesSection({ buckets }: { buckets: ServiceBucket[] }) {
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
            <OrbitalDiagram buckets={buckets} />
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {buckets.map((bucket, i) => (
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
