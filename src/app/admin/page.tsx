'use client'
import { useEffect, useState } from 'react'
import { getServices, getProjects, getMessages, getBlogPosts } from '@/lib/firestore'
import Link from 'next/link'

/**
 * Admin Dashboard.
 * Card grid with live counts of each managed collection.
 * No emojis — matches the galaxy theme used on the public site.
 */

function IconServices({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  )
}
function IconProjects({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
    </svg>
  )
}
function IconBlog({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  )
}
function IconMessages({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
    </svg>
  )
}
function IconTeam({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
    </svg>
  )
}
function IconAnalytics({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
    </svg>
  )
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, projects: 0, messages: 0, unread: 0, blog: 0, published: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getServices(), getProjects(), getMessages(), getBlogPosts(false)])
      .then(([services, projects, messages, blog]) => {
        setCounts({
          services: services.length,
          projects: projects.length,
          messages: messages.length,
          unread: messages.filter(m => !m.read).length,
          blog: blog.length,
          published: blog.filter(p => p.published).length,
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Services',       value: counts.services, href: '/admin/services', Icon: IconServices,   sub: 'What we offer' },
    { label: 'Projects',       value: counts.projects, href: '/admin/projects', Icon: IconProjects,   sub: 'Portfolio items' },
    { label: 'Blog articles',  value: counts.blog,     href: '/admin/blog',     Icon: IconBlog,       sub: `${counts.published} published` },
    { label: 'Messages',       value: counts.messages, href: '/admin/messages', Icon: IconMessages,   sub: counts.unread > 0 ? `${counts.unread} unread` : 'All read', highlight: counts.unread > 0 },
  ]

  const shortcuts = [
    { label: 'Team',      href: '/admin/team',      Icon: IconTeam,      desc: 'Add or edit team members shown on About' },
    { label: 'Analytics', href: '/admin/analytics', Icon: IconAnalytics, desc: 'View website engagement over time' },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display font-semibold text-3xl text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-1.5">Welcome back. Everything editable from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, href, Icon, sub, highlight }) => (
          <Link
            key={label}
            href={href}
            className={`group relative rounded-2xl p-6 border transition-all duration-300 ${
              highlight
                ? 'border-aurora-cyan/30 bg-aurora-cyan/8 hover:border-aurora-cyan/50'
                : 'border-white/[0.06] bg-space-800/40 hover:border-aurora-cyan/25 hover:bg-space-800/70'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                highlight
                  ? 'bg-aurora-cyan/15 border-aurora-cyan/30 text-aurora-cyan'
                  : 'bg-aurora-cyan/8 border-aurora-cyan/15 text-aurora-cyan'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-aurora-cyan group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
            <div className="font-display font-semibold text-3xl text-white tracking-tight">
              {loading ? <span className="inline-block w-8 h-8 bg-white/[0.06] rounded animate-pulse" /> : value}
            </div>
            <div className="text-sm text-slate-300 mt-1">{label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
          </Link>
        ))}
      </div>

      {/* Shortcuts row */}
      <div className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-slate-500 mb-4">More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map(({ label, href, Icon, desc }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-4 rounded-2xl p-5 border border-white/[0.06] bg-space-800/40 hover:border-aurora-cyan/25 hover:bg-space-800/70 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-aurora-cyan/8 border border-aurora-cyan/15 text-aurora-cyan flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-medium text-white text-[15px] tracking-tight">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-aurora-cyan group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div className="rounded-2xl p-6 border border-white/[0.06] bg-space-800/30">
        <h3 className="font-display font-medium text-white mb-3">Quick tips</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-aurora-cyan mt-0.5">→</span>
            <span>To publish a new blog post, make sure the <span className="text-white">Published</span> toggle is <span className="text-white">on</span> before saving. Otherwise it stays as a draft and won&apos;t show on the public blog.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-aurora-cyan mt-0.5">→</span>
            <span>Featured projects show on the homepage. Cap it at 3-6 for the best layout.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-aurora-cyan mt-0.5">→</span>
            <span>Every change is live within seconds. Refresh the public page in an Incognito window to confirm.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
