'use client'
import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import toast from 'react-hot-toast'

interface Settings {
 heroTitle: string
 heroSubtitle: string
 aboutText: string
 phone: string
 email: string
 address: string
 linkedinUrl: string
 whatsappNumber: string
 googleMapsUrl: string
 metaTitle: string
 metaDescription: string
}

const defaults: Settings = {
 heroTitle: 'Exact Solutions for the Next Generation',
 heroSubtitle: 'We build intelligent AI systems, machine learning models, and data solutions that transform how businesses operate, for clients worldwide.',
 aboutText: 'At XactGen, we believe in creating smarter solutions for real-world problems by blending Artificial Intelligence, Data Science, and next-generation technologies.',
 phone: '+92 304 9111104',
 email: 'contact@datixai.com',
 address: 'Software Technology Park, University of Kotli, AJK, Pakistan',
 linkedinUrl: 'https://www.linkedin.com/company/xactgen/',
 whatsappNumber: '923049111104',
 googleMapsUrl: 'https://maps.app.goo.gl/ZRfTvPLQ8VkHyGoY6',
 metaTitle: 'XactGen AI | Exact Solutions for the Next Generation',
 metaDescription: 'XactGen AI builds AI software, machine learning tools, data analytics, chatbots, dashboards, and websites from the Software Technology Park in Kotli, AJK.',
}

export default function AdminSettingsPage() {
 const [settings, setSettings] = useState<Settings>(defaults)
 const [loading, setLoading] = useState(true)
 const [saving, setSaving] = useState(false)
 const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'contact'>('general')

 useEffect(() => {
 getDoc(doc(db, 'settings', 'main'))
 .then(snap => {
 if (snap.exists()) setSettings({ ...defaults, ...snap.data() as Settings })
 })
 .catch(console.error)
 .finally(() => setLoading(false))
 }, [])

 const handleSave = async () => {
 setSaving(true)
 try {
 await setDoc(doc(db, 'settings', 'main'), { ...settings, updatedAt: serverTimestamp() })
 toast.success('Settings saved successfully!')
 } catch {
 toast.error('Failed to save settings')
 } finally {
 setSaving(false)
 }
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }))
 }

 const inputClass = 'w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-aurora-cyan/60 transition-colors'
 const labelClass = 'block text-sm text-slate-400 mb-1.5'

 const tabs = [
 { id: 'general', label: 'General', icon: '' },
 { id: 'contact', label: 'Contact Info', icon: '' },
 { id: 'seo', label: 'SEO', icon: '' },
 ] as const

 if (loading) {
 return (
 <div className="space-y-4">
 {[1,2,3].map(i => <div key={i} className="glass rounded-xl h-16 animate-pulse" />)}
 </div>
 )
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Site Settings</h1>
 <p className="text-slate-400 mt-1">Manage global website content and configuration</p>
 </div>
 <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-60">
 {saving ? (
 <>
 <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
 </svg>
 Saving...
 </>
 ) : ' Save Settings'}
 </button>
 </div>

 {/* Tabs */}
 <div className="flex gap-2 mb-6">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-500 transition-all ${
 activeTab === tab.id
 ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/30'
 : 'glass text-slate-400 hover:text-white'
 }`}
 >
 <span>{tab.icon}</span>
 {tab.label}
 </button>
 ))}
 </div>

 <div className="glass rounded-2xl p-6 space-y-6">

 {/* General Tab */}
 {activeTab === 'general' && (
 <>
 <div>
 <p className="text-xs text-slate-500 mb-4 bg-aurora-cyan/8 border border-aurora-cyan/20 rounded-lg px-3 py-2">
 These values update the homepage hero text. Note: after saving here, you may need to redeploy your site on Vercel for static pages to reflect the changes (or use ISR).
 </p>
 </div>
 <div>
 <label className={labelClass}>Hero Main Title</label>
 <input name="heroTitle" value={settings.heroTitle} onChange={handleChange}
 className={inputClass} placeholder="Exact Solutions for the Next Generation" />
 </div>
 <div>
 <label className={labelClass}>Hero Subtitle</label>
 <textarea name="heroSubtitle" rows={3} value={settings.heroSubtitle} onChange={handleChange}
 className={`${inputClass} resize-none`}
 placeholder="We build intelligent AI systems..." />
 </div>
 <div>
 <label className={labelClass}>About Page Main Text</label>
 <textarea name="aboutText" rows={4} value={settings.aboutText} onChange={handleChange}
 className={`${inputClass} resize-none`}
 placeholder="Company description..." />
 </div>
 </>
 )}

 {/* Contact Tab */}
 {activeTab === 'contact' && (
 <>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className={labelClass}>Phone Number</label>
 <input name="phone" value={settings.phone} onChange={handleChange}
 className={inputClass} placeholder="+92 304 9111104" />
 </div>
 <div>
 <label className={labelClass}>Email Address</label>
 <input name="email" type="email" value={settings.email} onChange={handleChange}
 className={inputClass} placeholder="contact@datixai.com" />
 </div>
 </div>
 <div>
 <label className={labelClass}>Office Address</label>
 <input name="address" value={settings.address} onChange={handleChange}
 className={inputClass} placeholder="Software Technology Park, University of Kotli..." />
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className={labelClass}>WhatsApp Number (digits only)</label>
 <input name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange}
 className={inputClass} placeholder="923049111104" />
 <p className="text-xs text-slate-500 mt-1">No + or spaces. e.g. 923049111104</p>
 </div>
 <div>
 <label className={labelClass}>LinkedIn Company URL</label>
 <input name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange}
 className={inputClass} placeholder="https://www.linkedin.com/company/xactgen/" />
 </div>
 </div>
 <div>
 <label className={labelClass}>Google Maps URL</label>
 <input name="googleMapsUrl" value={settings.googleMapsUrl} onChange={handleChange}
 className={inputClass} placeholder="https://maps.app.goo.gl/..." />
 </div>
 </>
 )}

 {/* SEO Tab */}
 {activeTab === 'seo' && (
 <>
 <div>
 <p className="text-xs text-slate-500 mb-4 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
 ️ These are the default SEO values. Each page also has its own SEO settings in the code. To change per-service SEO, edit via the Services manager above.
 </p>
 </div>
 <div>
 <label className={labelClass}>Default Meta Title</label>
 <input name="metaTitle" value={settings.metaTitle} onChange={handleChange}
 className={inputClass} placeholder="XactGen AI | Exact Solutions for the Next Generation" />
 <p className="text-xs text-slate-500 mt-1">
 Recommended: 50–60 characters · Current: {settings.metaTitle.length} chars
 </p>
 </div>
 <div>
 <label className={labelClass}>Default Meta Description</label>
 <textarea name="metaDescription" rows={3} value={settings.metaDescription} onChange={handleChange}
 className={`${inputClass} resize-none`}
 placeholder="XactGen AI builds AI software, machine learning tools, and websites from Kotli." />
 <p className="text-xs text-slate-500 mt-1">
 Recommended: 150–160 characters · Current: {settings.metaDescription.length} chars
 </p>
 </div>

 {/* SEO Checklist */}
 <div className="border-t border-aurora-cyan/15 pt-5">
 <h3 className="font-display font-semibold text-white text-sm mb-4">SEO Checklist</h3>
 <div className="space-y-2">
 {[
 { done: true, label: 'Sitemap.xml auto-generated at /sitemap.xml' },
 { done: true, label: 'Robots.txt configured (/robots.txt)' },
 { done: true, label: 'Open Graph tags on all pages' },
 { done: true, label: 'JSON-LD Organization schema' },
 { done: true, label: 'JSON-LD Service schema on services page' },
 { done: true, label: 'JSON-LD Review schema on reviews' },
 { done: true, label: 'Canonical URLs configured' },
 { done: true, label: 'Semantic HTML (article, section, nav, main)' },
 { done: true, label: 'Google Search Console verified for xactgenai.com' },
 { done: true, label: 'Sitemap submitted in Google Search Console' },
 { done: true, label: 'OG share image at /public/og-image.png (1200x630)' },
 { done: true, label: 'Favicon and app icons in /public/' },
 ].map(item => (
 <div key={item.label} className="flex items-start gap-2.5 text-sm">
 <span className={`mt-0.5 shrink-0 ${item.done ? 'text-green-400' : 'text-amber-400'}`}>
 {item.done ? '' : '⬜'}
 </span>
 <span className={item.done ? 'text-slate-400' : 'text-slate-300'}>{item.label}</span>
 </div>
 ))}
 </div>
 </div>
 </>
 )}
 </div>
 </div>
 )
}
