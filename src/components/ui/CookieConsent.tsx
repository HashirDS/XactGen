'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('xactgen-cookie-consent')
    if (!consent) setTimeout(() => setVisible(true), 1500)
  }, [])

  const accept = () => { localStorage.setItem('xactgen-cookie-consent', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('xactgen-cookie-consent', 'declined'); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-slide-up">
      <div className="glass rounded-2xl p-5 border border-aurora-cyan/20 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-aurora-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-aurora-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-1">We use cookies</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We use cookies to improve your experience. See our{' '}
              <Link href="/privacy" className="text-aurora-cyan hover:text-aurora-cyan underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={accept} className="flex-1 btn-primary text-xs py-2.5 justify-center">Accept All</button>
          <button onClick={decline} className="flex-1 btn-outline text-xs py-2.5 justify-center">Decline</button>
        </div>
      </div>
    </div>
  )
}
