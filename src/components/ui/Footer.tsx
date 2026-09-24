import Link from 'next/link'
import Image from 'next/image'
import { SITE, composeEmailUrl } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-space-950 border-t border-white/[0.05] pt-16 pb-8 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-aurora-violet/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-40 bg-aurora-cyan/8 blur-3xl rounded-full pointer-events-none" />

      <div className="container-custom relative">
        {/* Three columns now: Brand, Company, Find us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="XactGen home">
              <Image src="/brand/mark.png" alt="XactGen" width={38} height={38} className="object-contain" />
              <span className="font-display font-semibold text-white text-lg tracking-tight">
                Xact<span className="text-aurora-violet">Gen</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs font-light">
              {SITE.tagline}.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-space-800 border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-aurora-cyan hover:border-aurora-cyan/40 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.339 18.338V9.996H5.667v8.342h2.672zM7.003 8.883a1.548 1.548 0 1 0 0-3.096 1.548 1.548 0 0 0 0 3.096zm11.335 9.455v-4.535c0-2.413-1.288-3.535-3.005-3.535-1.387 0-2.008.762-2.354 1.298v-1.113h-2.612c.034.755 0 8.342 0 8.342h2.612v-4.66c0-.234.017-.468.086-.635.188-.469.616-.955 1.334-.955.941 0 1.318.717 1.318 1.767v4.484h2.621z"/>
                </svg>
              </a>
              {/*
                Email button — opens a new Gmail message in a new tab, addressed
                to us (see composeEmailUrl for why not mailto:).
              */}
              <a
                href={composeEmailUrl(SITE.email)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send us an email"
                title="Send us an email"
                className="w-9 h-9 rounded-lg bg-space-800 border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-aurora-cyan hover:border-aurora-cyan/40 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
              {/* WhatsApp — opens the WhatsApp chat directly. Same reasoning: number
                  isn't shown as visible text anywhere on the footer. */}
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                title="Message us on WhatsApp"
                className="w-9 h-9 rounded-lg bg-space-800 border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-aurora-cyan hover:border-aurora-cyan/40 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-medium text-white mb-4 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-aurora-cyan transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-slate-400 hover:text-aurora-cyan transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-aurora-cyan transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-aurora-cyan transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h4 className="font-display font-medium text-white mb-4 text-xs uppercase tracking-widest">Find us</h4>
            <p className="text-slate-400 text-sm mb-3 leading-relaxed">
              {SITE.address}
            </p>
            <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-3" style={{ height: '150px' }}>
              <iframe
                src={`https://maps.google.com/maps?q=${SITE.mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="150"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.85)', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="XactGen location"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-aurora-cyan hover:opacity-80 transition-opacity"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">© {year} XactGen. All rights reserved.</p>
          <p className="text-slate-500 text-xs">
            Developed by{' '}
            <a href="https://datixai.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-aurora-cyan transition-colors">
              Datix AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
