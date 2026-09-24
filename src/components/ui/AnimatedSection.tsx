'use client'
import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const transforms = {
    up: 'translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
    none: '',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${transforms[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
