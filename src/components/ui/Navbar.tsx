'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

// Center links. Contact is reached via the "Get in touch" button on the right.
const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
  { href: '/about',    label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href))

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-950/85 backdrop-blur-lg border-b border-white/[0.05] py-2.5' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="XactGen AI home">
          <Image
            src="/brand/mark.png"
            alt="XactGen AI"
            width={34}
            height={34}
            priority
            className="object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display font-semibold text-white text-[15px] leading-none tracking-tight whitespace-nowrap">
            XactGen<span className="text-aurora-violet"> AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/[0.06]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary text-sm px-5 py-2">Get in touch</Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="lg:hidden text-slate-300 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-space-900/95 backdrop-blur-lg border-t border-white/[0.05] animate-slide-up">
          <ul className="container-custom py-4 space-y-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-white bg-white/[0.06]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/[0.05] mt-3">
              <Link href="/contact" className="btn-primary text-sm w-full justify-center">Get in touch</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
