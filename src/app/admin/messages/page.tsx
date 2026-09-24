'use client'
import { useEffect, useState } from 'react'
import { getMessages, markMessageRead, deleteMessage } from '@/lib/firestore'
import { Message } from '@/types'
import toast from 'react-hot-toast'

export default function AdminMessagesPage() {
 const [messages, setMessages] = useState<Message[]>([])
 const [loading, setLoading] = useState(true)
 const [selected, setSelected] = useState<Message | null>(null)
 const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

 const load = () => {
 setLoading(true)
 getMessages().then(setMessages).catch(console.error).finally(() => setLoading(false))
 }
 useEffect(load, [])

 const openMessage = async (msg: Message) => {
 setSelected(msg)
 if (!msg.read) {
 await markMessageRead(msg.id)
 setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
 }
 }

 const handleDelete = async (id: string) => {
 if (!confirm('Delete this message?')) return
 await deleteMessage(id)
 setMessages(prev => prev.filter(m => m.id !== id))
 setSelected(null)
 toast.success('Message deleted')
 }

 const formatDate = (ts: unknown) => {
 if (!ts) return 'Just now'
 try {
 const d = (ts as { toDate: () => Date }).toDate()
 return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
 } catch { return 'Recent' }
 }

 const filtered = messages.filter(m =>
 filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
 )

 const unreadCount = messages.filter(m => !m.read).length

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Messages</h1>
 <p className="text-slate-400 mt-1">
 {unreadCount > 0 ? <span className="text-aurora-cyan">{unreadCount} unread</span> : 'All caught up!'}
 {' '}· {messages.length} total messages
 </p>
 </div>
 </div>

 {/* Filters */}
 <div className="flex gap-2 mb-6">
 {(['all', 'unread', 'read'] as const).map(f => (
 <button key={f} onClick={() => setFilter(f)}
 className={`px-4 py-2 rounded-xl text-sm font-500 transition-all ${
 filter === f ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/30' : 'glass text-slate-400 hover:text-white'
 }`}>
 {f.charAt(0).toUpperCase() + f.slice(1)}
 {f === 'unread' && unreadCount > 0 && (
 <span className="ml-2 w-5 h-5 rounded-full bg-brand-500 text-white text-xs inline-flex items-center justify-center">
 {unreadCount}
 </span>
 )}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
 {/* List */}
 <div className="lg:col-span-2 space-y-2">
 {loading ? (
 <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="glass rounded-xl h-20 animate-pulse" />)}</div>
 ) : filtered.length === 0 ? (
 <div className="glass rounded-xl p-10 text-center">
 <div className="text-4xl mb-3"></div>
 <p className="text-slate-400 text-sm">No messages found</p>
 </div>
 ) : (
 filtered.map(msg => (
 <button key={msg.id} onClick={() => openMessage(msg)}
 className={`w-full text-left glass rounded-xl p-4 transition-all hover:border-aurora-cyan/30 ${
 selected?.id === msg.id ? 'border-aurora-cyan/40 bg-aurora-cyan/5' : ''
 }`}>
 <div className="flex items-start justify-between gap-2 mb-1">
 <div className="flex items-center gap-2">
 {!msg.read && <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />}
 <span className="font-500 text-white text-sm truncate">{msg.name}</span>
 </div>
 <span className="text-xs text-slate-500 shrink-0">{formatDate(msg.createdAt)}</span>
 </div>
 <div className="text-xs text-aurora-cyan mb-1 truncate">{msg.subject}</div>
 <div className="text-xs text-slate-500 truncate">{msg.message}</div>
 </button>
 ))
 )}
 </div>

 {/* Detail */}
 <div className="lg:col-span-3">
 {selected ? (
 <div className="glass rounded-2xl p-6">
 <div className="flex items-start justify-between mb-6">
 <div>
 <h2 className="font-display font-semibold text-white text-lg">{selected.subject}</h2>
 <div className="text-sm text-slate-400 mt-1">{formatDate(selected.createdAt)}</div>
 </div>
 <button onClick={() => handleDelete(selected.id)}
 className="text-xs px-3 py-1.5 glass rounded-lg text-red-400 hover:text-red-300 transition-colors">
 Delete
 </button>
 </div>

 <div className="grid grid-cols-2 gap-4 mb-6">
 {[
 { label: 'From', value: selected.name },
 { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
 { label: 'Phone', value: selected.phone || 'Not provided', href: selected.phone ? `tel:${selected.phone}` : undefined },
 { label: 'Service', value: selected.service || 'General inquiry' },
 ].map(item => (
 <div key={item.label} className="bg-space-800/50 rounded-xl p-3">
 <div className="text-xs text-slate-500 mb-1">{item.label}</div>
 {item.href ? (
 <a href={item.href} className="text-sm text-aurora-cyan hover:text-aurora-cyan">{item.value}</a>
 ) : (
 <div className="text-sm text-white">{item.value}</div>
 )}
 </div>
 ))}
 </div>

 <div className="bg-space-800/50 rounded-xl p-4 mb-6">
 <div className="text-xs text-slate-500 mb-2">Message</div>
 <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
 </div>

 <div className="flex gap-3">
 <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
 className="btn-primary text-sm px-5 py-2.5">
 Reply via Email
 </a>
 {selected.phone && (
 <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
 className="btn-outline text-sm px-5 py-2.5">
 WhatsApp
 </a>
 )}
 </div>
 </div>
 ) : (
 <div className="glass rounded-2xl p-16 text-center">
 <div className="text-5xl mb-4"></div>
 <h3 className="font-display font-semibold text-white mb-2">Select a message</h3>
 <p className="text-slate-400 text-sm">Click any message on the left to read it</p>
 </div>
 )}
 </div>
 </div>
 </div>
 )
}
