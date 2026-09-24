'use client'
import { useEffect, useState } from 'react'
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/firestore'
import { Project } from '@/types'
import toast from 'react-hot-toast'

const categories = ['AI/ML', 'Web Development', 'Data Analytics', 'Automation', 'NLP', 'Computer Vision', 'Business Intelligence', 'Other']

const emptyProject: Omit<Project, 'id' | 'createdAt'> = {
 title: '', slug: '', description: '', fullDescription: '',
 tags: [], category: 'AI/ML', imageUrl: '', liveUrl: '', githubUrl: '',
 featured: false, clientName: '', completedAt: '',
 youtubeUrl: '', image2Url: '', image3Url: '', image4Url: '', image5Url: '',
}

export default function AdminProjectsPage() {
 const [projects, setProjects] = useState<Project[]>([])
 const [loading, setLoading] = useState(true)
 const [showForm, setShowForm] = useState(false)
 const [editing, setEditing] = useState<Project | null>(null)
 const [form, setForm] = useState<Omit<Project, 'id' | 'createdAt'>>(emptyProject)
 const [saving, setSaving] = useState(false)
 const [tagsText, setTagsText] = useState('')

 const load = () => {
 setLoading(true)
 getProjects().then(setProjects).catch(console.error).finally(() => setLoading(false))
 }
 useEffect(load, [])

 const openAdd = () => { setEditing(null); setForm(emptyProject); setTagsText(''); setShowForm(true) }
 const openEdit = (p: Project) => {
 setEditing(p)
 setForm({
 title: p.title, slug: p.slug, description: p.description, fullDescription: p.fullDescription,
 tags: p.tags, category: p.category, imageUrl: p.imageUrl || '', liveUrl: p.liveUrl || '', githubUrl: (p as any).githubUrl || '',
 featured: p.featured, clientName: p.clientName || '', completedAt: p.completedAt || '',
 youtubeUrl: (p as any).youtubeUrl || '',
 image2Url: (p as any).image2Url || '', image3Url: (p as any).image3Url || '',
 image4Url: (p as any).image4Url || '', image5Url: (p as any).image5Url || '',
 })
 setTagsText(p.tags.join(', '))
 setShowForm(true)
 }

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault()
 setSaving(true)
 const data = { ...form, tags: tagsText.split(',').map(t => t.trim()).filter(Boolean) }
 try {
 if (editing) { await updateProject(editing.id, data); toast.success('Project updated!') }
 else { await addProject(data); toast.success('Project added!') }
 setShowForm(false); load()
 } catch { toast.error('Failed to save project') }
 finally { setSaving(false) }
 }

 const handleDelete = async (id: string, title: string) => {
 if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
 await deleteProject(id); toast.success('Project deleted'); load()
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 const { name, value, type } = e.target
 setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
 }

 const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

 const inputClass = 'w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60 transition-colors placeholder-slate-600'

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
 <p className="text-slate-400 mt-1">Manage your portfolio projects</p>
 </div>
 <button onClick={openAdd} className="btn-primary text-sm px-5 py-2.5">+ Add Project</button>
 </div>

 {loading ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {[1,2,3].map(i => <div key={i} className="glass rounded-xl h-52 animate-pulse" />)}
 </div>
 ) : projects.length === 0 ? (
 <div className="glass rounded-2xl p-16 text-center">
 <div className="w-16 h-16 rounded-2xl bg-aurora-cyan/10 flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-aurora-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
 </svg>
 </div>
 <h3 className="font-display font-semibold text-white text-xl mb-2">No projects yet</h3>
 <p className="text-slate-400 mb-6">Add your first project to showcase in the portfolio</p>
 <button onClick={openAdd} className="btn-primary text-sm">Add First Project</button>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {projects.map(project => (
 <div key={project.id} className="glass rounded-xl overflow-hidden group">
 {(project as any).youtubeUrl ? (
 <div className="w-full h-36 bg-gradient-to-br from-red-900/30 to-red-600/20 flex items-center justify-center gap-2">
 <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
 </svg>
 <span className="text-red-400 text-xs font-medium">YouTube Video</span>
 </div>
 ) : project.imageUrl ? (
 <img src={project.imageUrl} alt={project.title} className="w-full h-36 object-cover" />
 ) : (
 <div className="w-full h-36 bg-gradient-to-br from-aurora-cyan/20 to-aurora-violet/20 flex items-center justify-center">
 <svg className="w-10 h-10 text-aurora-cyan/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
 </svg>
 </div>
 )}
 <div className="p-4">
 <div className="flex items-start justify-between gap-2 mb-2">
 <h3 className="font-display font-semibold text-white text-sm">{project.title}</h3>
 {project.featured && (
 <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 shrink-0">Featured</span>
 )}
 </div>
 <p className="text-slate-400 text-xs line-clamp-2 mb-3">{project.description}</p>
 <div className="flex flex-wrap gap-1.5 mb-4">
 {project.tags?.slice(0,3).map(tag => (
 <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-aurora-cyan/8 text-aurora-cyan">{tag}</span>
 ))}
 </div>
 <div className="flex gap-2">
 <button onClick={() => openEdit(project)} className="flex-1 px-3 py-1.5 text-xs glass rounded-lg text-aurora-cyan hover:text-aurora-cyan transition-colors">Edit</button>
 <button onClick={() => handleDelete(project.id, project.title)} className="px-3 py-1.5 text-xs glass rounded-lg text-red-400 hover:text-red-300 transition-colors">Delete</button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}

 {/* Modal */}
 {showForm && (
 <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
 <div className="glass rounded-2xl w-full max-w-2xl border border-aurora-cyan/20 my-4">
 <div className="flex items-center justify-between p-6 border-b border-aurora-cyan/15">
 <h2 className="font-display font-semibold text-white">{editing ? 'Edit Project' : 'Add New Project'}</h2>
 <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white text-xl leading-none">×</button>
 </div>
 <form onSubmit={handleSave} className="p-6 space-y-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Project Title *</label>
 <input name="title" required value={form.title} onChange={e => { handleChange(e); if (!editing) setForm(prev => ({ ...prev, slug: autoSlug(e.target.value) })) }}
 className={inputClass} placeholder="AI Chatbot for E-commerce" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Category</label>
 <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
 {categories.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Client Name</label>
 <input name="clientName" value={form.clientName} onChange={handleChange} className={inputClass} placeholder="Client / Company" />
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Short Description *</label>
 <textarea name="description" required rows={2} value={form.description} onChange={handleChange}
 className={`${inputClass} resize-none`} placeholder="Brief project summary..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Full Description</label>
 <textarea name="fullDescription" rows={4} value={form.fullDescription} onChange={handleChange}
 className={`${inputClass} resize-none`} placeholder="Detailed description, challenges, solutions..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Tags (comma separated)</label>
 <input value={tagsText} onChange={e => setTagsText(e.target.value)} className={inputClass} placeholder="Python, TensorFlow, React" />
 </div>

 {/* Media Section */}
 <div className="border-t border-aurora-cyan/15 pt-4">
 <p className="text-sm font-medium text-white mb-3">Media</p>
 <div className="space-y-3">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">
 <svg className="w-4 h-4 inline mr-1 text-red-400" fill="currentColor" viewBox="0 0 24 24">
 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
 </svg>
 YouTube Video URL
 </label>
 <input name="youtubeUrl" value={(form as any).youtubeUrl || ''} onChange={handleChange}
 className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
 <p className="text-xs text-slate-500 mt-1">If provided, video will be shown on project page</p>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Main Image URL</label>
 <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Image 2 URL</label>
 <input name="image2Url" value={(form as any).image2Url || ''} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Image 3 URL</label>
 <input name="image3Url" value={(form as any).image3Url || ''} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Image 4 URL</label>
 <input name="image4Url" value={(form as any).image4Url || ''} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Image 5 URL</label>
 <input name="image5Url" value={(form as any).image5Url || ''} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Live URL</label>
 <input name="liveUrl" value={form.liveUrl} onChange={handleChange} className={inputClass} placeholder="https://..." />
 </div>
 <div>
 <label className="block text-xs text-slate-500 mb-1.5">
 <svg className="w-3.5 h-3.5 inline mr-1 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
 GitHub Repository URL (optional)
 </label>
 <input name="githubUrl" value={(form as any).githubUrl || ''} onChange={handleChange} className={inputClass} placeholder="https://github.com/username/project-name" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Completed Date</label>
 <input name="completedAt" value={form.completedAt} onChange={handleChange} className={inputClass} placeholder="March 2025" />
 </div>
 </div>
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" name="featured" checked={form.featured}
 onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
 className="w-4 h-4 rounded accent-brand-500" />
 <span className="text-sm text-slate-300">Featured on homepage</span>
 </label>
 <div className="flex gap-3 pt-2">
 <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
 {saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}
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
