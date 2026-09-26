'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { addMessage } from '@/lib/firestore'
import toast from 'react-hot-toast'
import OrbitSpin, { OrbitNode } from '@/components/effects/OrbitSpin'
import { SITE, composeEmailUrl } from '@/lib/site'

const services = [
  'AI Development', 'Machine Learning', 'Deep Learning',
  'Computer Vision', 'NLP', 'Generative AI', 'RAG Systems', 'Model Fine-Tuning',
  'Business Intelligence', 'Data Analytics', 'Web Scraping & Automation', 'Web Development',
  'Documentation & Academic Support', 'Other',
]

// One message per browser every 5 minutes (persists across page refreshes).
const COOLDOWN_MS = 5 * 60 * 1000
const COOLDOWN_KEY = 'xactgen_contact_last_sent'

function cooldownSecondsLeft(): number {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
    const left = COOLDOWN_MS - (Date.now() - last)
    return left > 0 ? Math.ceil(left / 1000) : 0
  } catch { return 0 }
}

const contactNodes: OrbitNode[] = [
  { key: 'email', label: 'Email', href: composeEmailUrl(SITE.email), external: true,
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg> },
  { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${SITE.whatsapp}`, external: true,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> },
  { key: 'location', label: 'Location', href: `https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`, external: true,
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg> },
  { key: 'company-linkedin', label: 'Company LinkedIn', href: SITE.linkedin, external: true,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.339 18.338V9.996H5.667v8.342h2.672zM7.003 8.883a1.548 1.548 0 1 0 0-3.096 1.548 1.548 0 0 0 0 3.096zm11.335 9.455v-4.535c0-2.413-1.288-3.535-3.005-3.535-1.387 0-2.008.762-2.354 1.298v-1.113h-2.612c.034.755 0 8.342 0 8.342h2.612v-4.66c0-.234.017-.468.086-.635.188-.469.616-.955 1.334-.955.941 0 1.318.717 1.318 1.767v4.484h2.621z"/></svg> },
  { key: 'github', label: 'GitHub', href: SITE.github, external: true,
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
]

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', service: '' })
  const [sending, setSending] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypotRef.current?.value) { toast.success('Message sent!'); return }
    const wait = cooldownSecondsLeft()
    if (wait > 0) { toast.error(`You can send one message every 5 minutes. Please try again in ${Math.ceil(wait / 60)} min.`); return }
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) { toast.error('Please enter a valid email address'); return }
    const sanitized = {
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().toLowerCase().slice(0, 200),
      phone: form.phone.trim().slice(0, 20),
      subject: form.subject.trim().slice(0, 200),
      message: form.message.trim().slice(0, 4000),
      service: form.service,
    }
    setSending(true)
    try {
      await addMessage(sanitized)
      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())) } catch {}
      toast.success("Message sent! We'll get back to you within 24 hours.")
      setForm({ name: '', email: '', phone: '', subject: '', message: '', service: '' })
    } catch {
      toast.error('Something went wrong. Please try WhatsApp or email us directly.')
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const ic = 'w-full bg-space-800 border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-aurora-cyan/60 transition-colors'

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom mb-16 text-center">
          <span className="text-aurora-cyan text-sm font-medium uppercase tracking-widest mb-3 block">Get In Touch</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mb-4">
            Start Your <span className="gradient-text">AI Journey</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have a project in mind? We'd love to hear about it.
          </p>
        </div>

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact spin: every node opens its action directly */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center">
              <OrbitSpin theme="cyan" size="sm" nodes={contactNodes} />
              <p className="text-xs text-slate-500 mt-6 text-center">Tap any node to reach us directly.</p>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <h2 className="font-display font-semibold text-white text-xl mb-2">Send a Message</h2>

                {/* HONEYPOT */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                  <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2" htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                      maxLength={100} className={ic} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2" htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      maxLength={200} className={ic} placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2" htmlFor="phone">Phone / WhatsApp</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      maxLength={20} className={ic} placeholder="+92 300 0000000" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2" htmlFor="service">Service Interested In</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange} className={ic}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2" htmlFor="subject">Subject *</label>
                  <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange}
                    maxLength={200} className={ic} placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2" htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
                    maxLength={4000} className={`${ic} resize-none`}
                    placeholder="Tell us about your project..." />
                  <div className="text-xs text-slate-600 mt-1 text-right">{form.message.length}/4000</div>
                </div>

                <button type="submit" disabled={sending}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      {/* Paper plane icon pointing right → */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}