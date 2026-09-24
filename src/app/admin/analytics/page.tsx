'use client'
import { useEffect, useState } from 'react'
import { getServices, getProjects, getMessages, getBlogPosts } from '@/lib/firestore'

interface Stats {
 services: number; activeServices: number
 projects: number; featuredProjects: number
 messages: number; unread: number
 blog: number; published: number
 recentMessages: any[]
}

export default function AdminAnalyticsPage() {
 const [stats, setStats] = useState<Stats>({ services:0,activeServices:0,projects:0,featuredProjects:0,messages:0,unread:0,blog:0,published:0,recentMessages:[] })
 const [loading, setLoading] = useState(true)

 useEffect(() => {
 Promise.all([getServices(), getProjects(), getMessages(), getBlogPosts(false)])
 .then(([services, projects, messages, blog]) => {
 setStats({
 services: services.length,
 activeServices: services.filter(s => s.active).length,
 projects: projects.length,
 featuredProjects: projects.filter(p => p.featured).length,
 messages: messages.length,
 unread: messages.filter(m => !m.read).length,
 blog: blog.length,
 published: blog.filter(b => b.published).length,
 recentMessages: messages.slice(0, 5),
 })
 })
 .catch(console.error)
 .finally(() => setLoading(false))
 }, [])

 const formatDate = (ts: any) => { try { return ts?.toDate().toLocaleDateString('en-GB', { day:'numeric', month:'short' }) } catch { return 'Recent' } }

 const cards = [
 { label: 'Total Services', value: stats.services, sub: `${stats.activeServices} active`, color: 'from-aurora-cyan to-aurora-cyan', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
 { label: 'Total Projects', value: stats.projects, sub: `${stats.featuredProjects} featured`, color: 'from-aurora-violet to-aurora-violet', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg> },
 { label: 'Messages', value: stats.messages, sub: `${stats.unread} unread`, color: stats.unread > 0 ? 'from-orange-500 to-red-500' : 'from-cyan-500 to-aurora-cyan', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg> },
 { label: 'Blog Articles', value: stats.blog, sub: `${stats.published} published`, color: 'from-teal-500 to-aurora-cyan', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> },
 ]

 return (
 <div>
 <div className="mb-8">
 <h1 className="font-display font-bold text-2xl text-white">Analytics</h1>
 <p className="text-slate-400 mt-1">Overview of your website content and engagement</p>
 </div>

 {/* Stat Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
 {cards.map(card => (
 <div key={card.label} className="glass rounded-2xl p-6">
 <div className="flex items-start justify-between mb-4">
 <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
 {card.icon}
 </div>
 {loading && <div className="w-8 h-6 bg-space-700 rounded animate-pulse" />}
 </div>
 <div className="font-display font-bold text-3xl text-white mb-0.5">
 {loading ? <div className="w-12 h-8 bg-space-700 rounded animate-pulse" /> : card.value}
 </div>
 <div className="text-sm text-slate-400">{card.label}</div>
 <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>
 </div>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
 {/* Content health */}
 <div className="glass rounded-2xl p-6">
 <h2 className="font-display font-semibold text-white mb-5">Content Health</h2>
 <div className="space-y-4">
 {[
 { label: 'Active Services', value: stats.activeServices, total: stats.services, color: 'bg-brand-500' },
 { label: 'Featured Projects', value: stats.featuredProjects, total: stats.projects || 1, color: 'bg-accent-500' },
 { label: 'Published Articles', value: stats.published, total: stats.blog || 1, color: 'bg-teal-500' },
 { label: 'Read Messages', value: stats.messages - stats.unread, total: stats.messages || 1, color: 'bg-green-500' },
 ].map(item => (
 <div key={item.label}>
 <div className="flex items-center justify-between mb-1.5">
 <span className="text-sm text-slate-400">{item.label}</span>
 <span className="text-sm text-white font-medium">{item.value} / {item.total}</span>
 </div>
 <div className="w-full bg-space-700 rounded-full h-2">
 <div className={`${item.color} h-2 rounded-full transition-all duration-700`}
 style={{ width: `${Math.round((item.value / (item.total || 1)) * 100)}%` }} />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Recent messages */}
 <div className="glass rounded-2xl p-6">
 <div className="flex items-center justify-between mb-5">
 <h2 className="font-display font-semibold text-white">Recent Messages</h2>
 <a href="/admin/messages" className="text-xs text-aurora-cyan hover:text-aurora-cyan transition-colors">View all →</a>
 </div>
 {loading ? (
 <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-space-800 rounded-xl h-12 animate-pulse"/>)}</div>
 ) : stats.recentMessages.length === 0 ? (
 <div className="text-center py-8 text-slate-500 text-sm">No messages yet</div>
 ) : (
 <div className="space-y-3">
 {stats.recentMessages.map((msg: any) => (
 <div key={msg.id} className="flex items-start gap-3 p-3 bg-space-800/50 rounded-xl">
 <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!msg.read ? 'bg-brand-400' : 'bg-slate-600'}`} />
 <div className="min-w-0 flex-1">
 <div className="flex items-center justify-between gap-2">
 <span className="text-sm font-medium text-white truncate">{msg.name}</span>
 <span className="text-xs text-slate-500 shrink-0">{formatDate(msg.createdAt)}</span>
 </div>
 <div className="text-xs text-slate-400 truncate">{msg.subject}</div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>

 {/* Quick actions */}
 <div className="glass rounded-2xl p-6">
 <h2 className="font-display font-semibold text-white mb-4">Quick Actions</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
 {[
 { label: 'Add Service', href: '/admin/services', icon: '️' },
 { label: 'Add Project', href: '/admin/projects', icon: '' },
 { label: 'Write Article', href: '/admin/blog', icon: '️' },
 { label: 'View Messages', href: '/admin/messages', icon: '' },
 { label: 'Manage Team', href: '/admin/team', icon: '' },
 { label: 'Settings', href: '/admin/settings', icon: '' },
 ].map(action => (
 <a key={action.label} href={action.href}
 className="glass glass-hover rounded-xl p-4 text-center flex flex-col items-center gap-2">
 <span className="text-2xl">{action.icon}</span>
 <span className="text-xs text-slate-300">{action.label}</span>
 </a>
 ))}
 </div>
 </div>

 {/* SEO Tips */}
 <div className="glass rounded-2xl p-6 mt-6">
 <h2 className="font-display font-semibold text-white mb-4">SEO Checklist</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {[
 { done: true, text: 'Sitemap.xml at /sitemap.xml' },
 { done: true, text: 'Robots.txt configured' },
 { done: true, text: 'Open Graph meta tags' },
 { done: true, text: 'JSON-LD Schema markup' },
 { done: stats.blog > 0, text: `Blog articles (${stats.blog} total)` },
 { done: stats.projects > 0, text: `Portfolio projects (${stats.projects} total)` },
 { done: false, text: 'Submit sitemap to Google Search Console' },
 { done: false, text: 'Register Google Business Profile' },
 ].map(item => (
 <div key={item.text} className="flex items-center gap-2.5 text-sm">
 <span className={item.done ? 'text-green-400' : 'text-amber-400'}>
 {item.done ? (
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
 ) : (
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
 )}
 </span>
 <span className={item.done ? 'text-slate-400' : 'text-slate-300'}>{item.text}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 )
}
