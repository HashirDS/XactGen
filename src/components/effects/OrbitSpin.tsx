'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, ReactNode } from 'react'

/**
 * OrbitSpin
 * Reusable "solar system" diagram: spinning XactGen mark in the center with
 * nodes orbiting on one or two rings. Used on Projects, Blog, About (partners)
 * and Contact. Services keeps its own version.
 *
 * - Up to `max` nodes are shown (default 12). Extra items are simply left out
 *   of the spin; pages still list them in their normal grid below.
 * - 1 to 5 nodes: single ring. 6+: split across inner and outer rings.
 * - `theme` controls the hover glow color per page.
 */

export interface OrbitNode {
  key: string
  label: string
  href?: string
  external?: boolean      // opens in a new tab
  icon?: ReactNode        // optional icon; falls back to initials
  image?: string          // optional logo shown inside the node (on a white disc)
  imagePadding?: 'none' | 'sm' | 'lg'  // breathing room around the logo
}

type Theme = 'cyan' | 'amber' | 'rose' | 'violet'

// Full class strings (not built dynamically) so Tailwind keeps them in the CSS
const THEMES: Record<Theme, {
  glow: string; icon: string; hoverBorder: string; hoverLabel: string
  centerBorder: string; centerShadow: string; halo: string
}> = {
  cyan: {
    glow: 'bg-aurora-cyan/30', icon: 'text-aurora-cyan', hoverBorder: 'group-hover:border-aurora-cyan/50',
    hoverLabel: 'group-hover:text-aurora-cyan', centerBorder: 'border-aurora-cyan/25',
    centerShadow: 'shadow-aurora-cyan/20', halo: 'bg-aurora-cyan/15',
  },
  amber: {
    glow: 'bg-amber-400/40', icon: 'text-amber-300', hoverBorder: 'group-hover:border-amber-300/60',
    hoverLabel: 'group-hover:text-amber-300', centerBorder: 'border-amber-300/30',
    centerShadow: 'shadow-amber-400/25', halo: 'bg-amber-400/15',
  },
  rose: {
    glow: 'bg-rose-500/40', icon: 'text-rose-300', hoverBorder: 'group-hover:border-rose-400/60',
    hoverLabel: 'group-hover:text-rose-300', centerBorder: 'border-rose-400/30',
    centerShadow: 'shadow-rose-500/25', halo: 'bg-rose-500/15',
  },
  violet: {
    glow: 'bg-aurora-violet/40', icon: 'text-aurora-violet', hoverBorder: 'group-hover:border-aurora-violet/60',
    hoverLabel: 'group-hover:text-aurora-violet', centerBorder: 'border-aurora-violet/30',
    centerShadow: 'shadow-aurora-violet/25', halo: 'bg-aurora-violet/15',
  },
}

function initials(label: string): string {
  const words = label.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
  return (words.slice(0, 2).map(w => w[0]).join('') || '?').toUpperCase()
}

function shortLabel(label: string, max = 22): string {
  return label.length > max ? label.slice(0, max - 1).trimEnd() + '…' : label
}

export default function OrbitSpin({
  nodes,
  theme = 'cyan',
  size = 'lg',
  max = 12,
}: {
  nodes: OrbitNode[]
  theme?: Theme
  size?: 'lg' | 'sm'
  max?: number
}) {
  const t = THEMES[theme]
  const [tick, setTick] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const animate = () => {
      setTick((Date.now() - startRef.current) / 1000)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const shown = nodes.slice(0, max)
  const twoRings = shown.length > 5
  const innerCount = twoRings ? Math.floor(shown.length / 2) : shown.length
  const inner = shown.slice(0, innerCount)
  const outer = shown.slice(innerCount)

  const sm = size === 'sm'
  const innerRadius = twoRings ? 28 : 40
  const outerRadius = 46

  const innerRot = (tick / (sm ? 30 : 25)) * 360
  const outerRot = (tick / 45) * 360

  const renderNode = (node: OrbitNode, i: number, total: number, ring: 'inner' | 'outer') => {
    const base = (i / total) * 360 + (ring === 'outer' ? 180 / Math.max(total, 1) : 0)
    const angle = base + (ring === 'inner' ? innerRot : outerRot)
    const r = ring === 'inner' ? innerRadius : outerRadius
    const rad = (angle - 90) * Math.PI / 180
    const x = 50 + r * Math.cos(rad)
    const y = 50 + r * Math.sin(rad)

    const body = (
      <div className="relative">
        <div className={`absolute inset-0 rounded-full ${t.glow} blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />
        {node.image ? (
          <div className={`relative ${sm ? 'w-14 h-14' : 'w-14 h-14 lg:w-16 lg:h-16'} rounded-full bg-white overflow-hidden border-2 border-white/[0.15] ${t.hoverBorder} transition-colors duration-300 flex items-center justify-center ${
            node.imagePadding === 'lg' ? 'p-2' : node.imagePadding === 'sm' ? 'p-0.5' : ''
          }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.image} alt={node.label} className="w-full h-full object-contain" draggable={false} />
          </div>
        ) : (
          <div className={`relative ${sm ? 'w-11 h-11' : 'w-11 h-11 lg:w-12 lg:h-12'} rounded-full bg-space-800 border border-white/[0.08] flex items-center justify-center ${t.icon} ${t.hoverBorder} transition-colors duration-300`}>
            {node.icon ?? <span className="font-display font-semibold text-xs tracking-tight">{initials(node.label)}</span>}
          </div>
        )}
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[9px] tracking-wider uppercase text-slate-400 opacity-80 ${t.hoverLabel} transition-colors duration-200 pointer-events-none`}>
          {shortLabel(node.label)}
        </div>
      </div>
    )

    const cls = 'group absolute -translate-x-1/2 -translate-y-1/2 z-10'
    const style = { top: `${y}%`, left: `${x}%` }

    if (!node.href) {
      return <div key={node.key} className={cls} style={style} title={node.label}>{body}</div>
    }
    if (node.external || node.href.startsWith('mailto:') || node.href.startsWith('http')) {
      const newTab = node.external || node.href.startsWith('http')
      return (
        <a key={node.key} href={node.href} className={cls} style={style} aria-label={node.label} title={node.label}
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {body}
        </a>
      )
    }
    return <Link key={node.key} href={node.href} className={cls} style={style} aria-label={node.label} title={node.label}>{body}</Link>
  }

  return (
    <div className={`relative aspect-square w-full ${sm ? 'max-w-[340px]' : 'max-w-[440px]'} mx-auto`}>
      <div className="orbit-ring" style={{ width: `${innerRadius * 2}%`, height: `${innerRadius * 2}%` }} />
      {twoRings && <div className="orbit-ring" style={{ width: '92%', height: '92%' }} />}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full ${t.halo} blur-2xl scale-150`} />
          <div
            className={`relative ${sm ? 'w-16 h-16' : 'w-20 h-20 lg:w-24 lg:h-24'} rounded-full bg-gradient-to-br from-space-700 to-space-900 border ${t.centerBorder} flex items-center justify-center shadow-xl ${t.centerShadow}`}
            style={{ animation: 'orbit-center 25s linear infinite' }}
          >
            <Image
              src="/brand/mark.png"
              alt="XactGen"
              width={48}
              height={48}
              className={`${sm ? 'w-8 h-8' : 'w-11 h-11 lg:w-12 lg:h-12'} object-contain`}
              style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.35))' }}
            />
          </div>
        </div>
      </div>

      {inner.map((n, i) => renderNode(n, i, inner.length, 'inner'))}
      {outer.map((n, i) => renderNode(n, i, outer.length, 'outer'))}
    </div>
  )
}
