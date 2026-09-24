'use client'
import { useEffect, useState } from 'react'
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/firestore'
import { TeamMember } from '@/types'
import toast from 'react-hot-toast'

const emptyMember: Omit<TeamMember, 'id' | 'createdAt'> = {
 name: '', role: '', bio: '', imageUrl: '', linkedin: '', order: 0,
}

export default function AdminTeamPage() {
 const [members, setMembers] = useState<TeamMember[]>([])
 const [loading, setLoading] = useState(true)
 const [showForm, setShowForm] = useState(false)
 const [editing, setEditing] = useState<TeamMember | null>(null)
 const [form, setForm] = useState<Omit<TeamMember, 'id' | 'createdAt'>>(emptyMember)
 const [saving, setSaving] = useState(false)

 const load = () => {
 setLoading(true)
 getTeamMembers().then(setMembers).catch(console.error).finally(() => setLoading(false))
 }
 useEffect(load, [])

 const openAdd = () => { setEditing(null); setForm(emptyMember); setShowForm(true) }
 const openEdit = (m: TeamMember) => {
 setEditing(m)
 setForm({ name: m.name, role: m.role, bio: m.bio, imageUrl: m.imageUrl || '', linkedin: m.linkedin || '', order: m.order })
 setShowForm(true)
 }

 const normalizeUrl = (url: string) => {
 if (!url) return ''
 url = url.trim()
 if (url.startsWith('http://') || url.startsWith('https://')) return url
 return `https://${url}`
 }

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault()
 setSaving(true)
 const cleanForm = { ...form, linkedin: normalizeUrl(form.linkedin ?? '') }
 try {
 if (editing) { await updateTeamMember(editing.id, cleanForm); toast.success('Team member updated!') }
 else { await addTeamMember(cleanForm); toast.success('Team member added!') }
 setShowForm(false); load()
 } catch { toast.error('Failed to save') }
 finally { setSaving(false) }
 }

 const handleDelete = async (id: string, name: string) => {
 if (!confirm(`Remove ${name}?`)) return
 await deleteTeamMember(id)
 toast.success('Team member removed')
 load()
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Team Members</h1>
 <p className="text-slate-400 mt-1">Manage team shown on the About page</p>
 </div>
 <button onClick={openAdd} className="btn-primary text-sm px-5 py-2.5">+ Add Member</button>
 </div>

 {loading ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {[1,2,3].map(i => <div key={i} className="glass rounded-xl h-44 animate-pulse" />)}
 </div>
 ) : members.length === 0 ? (
 <div className="glass rounded-2xl p-16 text-center">
 <div className="text-5xl mb-4"></div>
 <h3 className="font-display font-semibold text-white text-xl mb-2">No team members yet</h3>
 <p className="text-slate-400 mb-6">Add your team to showcase on the About page</p>
 <button onClick={openAdd} className="btn-primary text-sm">Add First Member</button>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {members.map(member => (
 <div key={member.id} className="glass rounded-xl p-5 flex flex-col gap-3">
 <div className="flex items-center gap-3">
 {member.imageUrl ? (
 <img src={member.imageUrl} alt={member.name}
 onError={(e) => {
 const img = e.currentTarget
 img.style.display = 'none'
 const fallback = img.nextElementSibling as HTMLElement | null
 if (fallback) fallback.style.display = 'flex'
 }}
 className="w-12 h-12 rounded-full object-cover" />
 ) : null}
 <div
 className="w-12 h-12 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-violet items-center justify-center text-lg font-display font-bold text-white shrink-0"
 style={{ display: member.imageUrl ? 'none' : 'flex' }}
 >
 {(member.name || 'TM').split(' ').map(n => n[0] || '').join('').slice(0,2).toUpperCase()}
 </div>
 <div>
 <div className="font-display font-semibold text-white text-sm">{member.name}</div>
 <div className="text-xs text-aurora-cyan">{member.role}</div>
 </div>
 </div>
 <p className="text-slate-400 text-xs line-clamp-2">{member.bio}</p>
 <div className="flex gap-2 mt-auto">
 <button onClick={() => openEdit(member)} className="flex-1 px-3 py-1.5 text-xs glass rounded-lg text-aurora-cyan hover:text-aurora-cyan transition-colors">Edit</button>
 <button onClick={() => handleDelete(member.id, member.name)} className="px-3 py-1.5 text-xs glass rounded-lg text-red-400 hover:text-red-300 transition-colors">Remove</button>
 </div>
 </div>
 ))}
 </div>
 )}

 {showForm && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
 <div className="glass rounded-2xl w-full max-w-lg border border-aurora-cyan/20">
 <div className="flex items-center justify-between p-6 border-b border-aurora-cyan/15">
 <h2 className="font-display font-semibold text-white">{editing ? 'Edit Member' : 'Add Team Member'}</h2>
 <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white text-xl">×</button>
 </div>
 <form onSubmit={handleSave} className="p-6 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Full Name *</label>
 <input name="name" required value={form.name} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60"
 placeholder="Full name" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Role / Title *</label>
 <input name="role" required value={form.role} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60"
 placeholder="Founder & CEO" />
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Bio</label>
 <textarea name="bio" rows={3} value={form.bio} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60 resize-none"
 placeholder="Short bio..." />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Photo URL</label>
 <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60"
 placeholder="https://..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Order</label>
 <input name="order" type="number" value={form.order} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60" />
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">LinkedIn URL</label>
 <input name="linkedin" value={form.linkedin} onChange={handleChange}
 className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60"
 placeholder="https://linkedin.com/in/username" />
 </div>
 <div className="flex gap-3 pt-2">
 <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
 {saving ? 'Saving...' : editing ? 'Update Member' : 'Add Member'}
 </button>
 <button type="button" onClick={() => setShowForm(false)} className="btn-outline px-6">Cancel</button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 )
}