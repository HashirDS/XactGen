'use client'
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  twinkle: number
  speed: number
  layer: number
  color: string
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

interface Props {
  interactive?: boolean
  className?: string
}

/**
 * Milky Way backdrop that sits fixed behind the whole page.
 *
 * The galactic band (nebula glow, dust lanes and thousands of faint stars)
 * is painted once to an offscreen canvas, then drawn every frame with a very
 * slow rotation so the sky appears to turn. Brighter foreground stars
 * twinkle and respond to the mouse, and an occasional shooting star crosses.
 */
export default function MilkyWay({ interactive = true, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let band: HTMLCanvasElement | null = null
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let mouseX = 0
    let mouseY = 0
    let animationId = 0
    let running = true
    let angle = 0
    let lastMeteor = 0

    const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#e0f2fe', '#bae6fd', '#e9d5ff', '#fde68a']

    // Box-Muller: normally distributed values keep stars dense near the band axis
    const gauss = () => {
      let u = 0
      let v = 0
      while (u === 0) u = Math.random()
      while (v === 0) v = Math.random()
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    }

    const paintBand = () => {
      // Square canvas big enough to cover the viewport at any rotation
      const size = Math.ceil(Math.hypot(width, height))
      if (size < 1) return null
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const b = c.getContext('2d')
      if (!b) return null

      const cx = size / 2
      const cy = size / 2
      const thickness = Math.max(size * 0.09, 90)

      b.translate(cx, cy)
      b.rotate(-0.42)

      const cloud = (x: number, y: number, r: number, rgb: string, a: number) => {
        const g = b.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(${rgb}, ${a})`)
        g.addColorStop(1, `rgba(${rgb}, 0)`)
        b.fillStyle = g
        b.beginPath()
        b.arc(x, y, r, 0, Math.PI * 2)
        b.fill()
      }

      // Soft nebula glow along the band: violet edges, blue body, warm core
      b.globalCompositeOperation = 'lighter'
      for (let i = 0; i < 70; i++) {
        const x = (Math.random() - 0.5) * size
        const y = gauss() * thickness * 0.55
        const r = thickness * (0.6 + Math.random() * 1.4)
        const pick = Math.random()
        const rgb = pick < 0.4 ? '139, 92, 246' : pick < 0.75 ? '56, 130, 220' : '236, 72, 153'
        cloud(x, y, r, rgb, 0.035 + Math.random() * 0.03)
      }
      // Bright galactic core, a little off-centre
      const coreX = size * 0.12
      for (let i = 0; i < 14; i++) {
        cloud(coreX + gauss() * thickness * 0.8, gauss() * thickness * 0.25, thickness * (0.5 + Math.random()), '255, 214, 170', 0.05)
      }
      cloud(coreX, 0, thickness * 1.6, '255, 236, 210', 0.07)

      // Faint star dust concentrated in the band
      const dust = Math.min(Math.floor(size * 5), 9000)
      for (let i = 0; i < dust; i++) {
        const x = (Math.random() - 0.5) * size
        const y = gauss() * thickness * 0.7
        const r = Math.random() * 0.7 + 0.15
        b.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.5})`
        b.fillRect(x, y, r, r)
      }

      // Dark dust lanes cut through the middle of the band
      b.globalCompositeOperation = 'destination-out'
      for (let i = 0; i < 45; i++) {
        const x = (Math.random() - 0.5) * size * 0.9
        const y = gauss() * thickness * 0.12 + thickness * 0.05
        const r = thickness * (0.12 + Math.random() * 0.35)
        cloud(x, y, r, '0, 0, 0', 0.35)
      }

      // Sparse background stars across the whole sky
      b.globalCompositeOperation = 'source-over'
      b.setTransform(1, 0, 0, 1, 0, 0)
      const sparse = Math.floor((size * size) / 5000)
      for (let i = 0; i < sparse; i++) {
        b.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.35})`
        const r = Math.random() * 0.8 + 0.2
        b.fillRect(Math.random() * size, Math.random() * size, r, r)
      }
      return c
    }

    const initStars = () => {
      const base = Math.min((width * height) / 9000, 200)
      const layers = [
        { count: Math.floor(base * 0.6), sizeMin: 0.4, sizeMax: 1.0, opacity: 0.6 },
        { count: Math.floor(base * 0.3), sizeMin: 0.8, sizeMax: 1.5, opacity: 0.85 },
        { count: Math.floor(base * 0.1), sizeMin: 1.3, sizeMax: 2.1, opacity: 1.0 },
      ]
      stars = layers.flatMap((layer, layerIdx) =>
        Array.from({ length: layer.count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
          opacity: layer.opacity,
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.03,
          layer: layerIdx,
          color: colors[Math.floor(Math.random() * colors.length)],
        })),
      )
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Repaint only when the viewport outgrows the band (mobile URL bars fire resize constantly)
      if (!band || band.width < Math.hypot(width, height)) band = paintBand()
      initStars()
      if (reducedMotion) draw()
    }

    const spawnMeteor = () => {
      const fromLeft = Math.random() < 0.5
      const speed = 7 + Math.random() * 5
      const dir = fromLeft ? 1 : -1
      meteors.push({
        x: fromLeft ? Math.random() * width * 0.6 : width * 0.4 + Math.random() * width * 0.6,
        y: Math.random() * height * 0.4,
        vx: speed * dir,
        vy: speed * 0.45,
        life: 0,
        maxLife: 50 + Math.random() * 30,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Galactic band, slowly turning around the viewport centre
      if (band && band.width > 0) {
        ctx.save()
        ctx.translate(width / 2 + mouseX * 10, height / 2 + mouseY * 10)
        ctx.rotate(angle)
        ctx.drawImage(band, -band.width / 2, -band.height / 2)
        ctx.restore()
      }

      for (const s of stars) {
        if (!reducedMotion) s.twinkle += s.speed
        const parallax = (s.layer + 1) * 7
        const px = s.x + mouseX * parallax
        const py = s.y + mouseY * parallax
        const tw = reducedMotion ? 1 : Math.sin(s.twinkle) * 0.35 + 0.65
        const alpha = s.opacity * tw

        if (s.r > 1.2) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4)
          g.addColorStop(0, hexToRgba(s.color, 0.3 * alpha))
          g.addColorStop(1, hexToRgba(s.color, 0))
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(px, py, s.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(s.color, alpha)
        ctx.fill()
      }

      // Shooting stars
      meteors = meteors.filter(m => m.life < m.maxLife)
      for (const m of meteors) {
        m.x += m.vx
        m.y += m.vy
        m.life++
        const fade = 1 - m.life / m.maxLife
        const tailX = m.x - m.vx * 9
        const tailY = m.y - m.vy * 9
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        g.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`)
        g.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }
    }

    const animate = (t: number) => {
      if (!running) return
      angle += 0.00006
      if (t - lastMeteor > 6000 + Math.random() * 6000) {
        spawnMeteor()
        lastMeteor = t
      }
      draw()
      animationId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / width - 0.5
      mouseY = e.clientY / height - 0.5
    }
    const onVisibility = () => {
      running = !document.hidden
      if (running && !reducedMotion) animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    if (interactive && !reducedMotion) window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (!reducedMotion) animationId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [interactive])

  return <canvas ref={canvasRef} className={`starfield ${className}`} aria-hidden="true" />
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
