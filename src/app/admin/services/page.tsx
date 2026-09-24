'use client'
import { useEffect, useState } from 'react'
import { getServices, addService, updateService, deleteService } from '@/lib/firestore'
import { Service } from '@/types'
import toast from 'react-hot-toast'
import { iconOptions } from '@/lib/service-details'
import { iconMap } from '@/components/ui/ServiceIcon'

const emptyService: Omit<Service,'id'|'createdAt'> = {
 title:'', slug:'', shortDescription:'', fullDescription:'',
 icon:'', imageUrl:'', youtubeUrl:'', image2Url:'', image3Url:'',
 features:[], order:0, active:true, metaTitle:'', metaDescription:'',
}

export default function AdminServicesPage() {
 const [services, setServices] = useState<Service[]>([])
 const [loading, setLoading] = useState(true)
 const [showForm, setShowForm] = useState(false)
 const [editing, setEditing] = useState<Service|null>(null)
 const [form, setForm] = useState<Omit<Service,'id'|'createdAt'>>(emptyService)
 const [saving, setSaving] = useState(false)
 const [featuresText, setFeaturesText] = useState('')

 const load = () => { setLoading(true); getServices().then(setServices).catch(console.error).finally(()=>setLoading(false)) }
 useEffect(load,[])

 const autoSlug = (t:string) => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

 const openAdd = () => { setEditing(null); setForm(emptyService); setFeaturesText(''); setShowForm(true) }
 const openEdit = (s:Service) => {
 setEditing(s)
 setForm({ title:s.title, slug:s.slug, shortDescription:s.shortDescription, fullDescription:s.fullDescription,
 icon:s.icon, imageUrl:s.imageUrl||'', youtubeUrl:(s as any).youtubeUrl||'',
 image2Url:(s as any).image2Url||'', image3Url:(s as any).image3Url||'',
 features:s.features, order:s.order, active:s.active, metaTitle:s.metaTitle||'', metaDescription:s.metaDescription||'' })
 setFeaturesText(s.features.join('\n'))
 setShowForm(true)
 }

 const handleSave = async (e:React.FormEvent) => {
 e.preventDefault(); setSaving(true)
 const data = { ...form, features: featuresText.split('\n').filter(Boolean) }
 try {
 if (editing) { await updateService(editing.id,data); toast.success('Service updated!') }
 else { await addService(data); toast.success('Service added!') }
 setShowForm(false); load()
 } catch { toast.error('Failed to save') } finally { setSaving(false) }
 }

 const handleDelete = async (id:string, title:string) => {
 if (!confirm(`Delete "${title}"?`)) return
 await deleteService(id); toast.success('Deleted'); load()
 }

 const ic = 'w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60 transition-colors placeholder-slate-600'

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Services</h1>
 <p className="text-slate-400 mt-1">Manage services shown on the website</p>
 </div>
 <button onClick={openAdd} className="btn-primary text-sm px-5 py-2.5">+ Add Service</button>
 </div>

 {loading ? (
 <div className="space-y-3">{[1,2,3].map(i=><div key={i} className="glass rounded-xl h-16 animate-pulse"/>)}</div>
 ) : services.length === 0 ? (
 <div className="glass rounded-2xl p-16 text-center">
 <h3 className="font-display font-semibold text-white text-xl mb-2">No services yet</h3>
 <button onClick={openAdd} className="btn-primary text-sm mt-4">Add First Service</button>
 </div>
 ) : (
 <div className="glass rounded-2xl overflow-hidden">
 <table className="w-full">
 <thead>
 <tr className="border-b border-aurora-cyan/15">
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider">Service</th>
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider hidden md:table-cell">Media</th>
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
 <th className="text-right px-6 py-4 text-xs text-slate-500 uppercase tracking-wider">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-brand-500/5">
 {services.map(s => (
 <tr key={s.id} className="hover:bg-white/2 transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 {(() => { const Icon = iconMap[s.icon as keyof typeof iconMap] || iconMap.ai; return <Icon className="w-6 h-6 text-aurora-cyan" /> })()}
 <div>
 <div className="font-medium text-white text-sm">{s.title}</div>
 <div className="text-xs text-slate-500">{s.slug}</div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 hidden md:table-cell">
 <div className="flex gap-1.5">
 {s.imageUrl && <span className="text-xs px-2 py-0.5 rounded-full bg-aurora-cyan/8 text-aurora-cyan">Photo</span>}
 {(s as any).youtubeUrl && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">Video</span>}
 {!s.imageUrl && !(s as any).youtubeUrl && <span className="text-xs text-slate-600">None</span>}
 </div>
 </td>
 <td className="px-6 py-4 hidden sm:table-cell">
 <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${s.active ? 'bg-green-500/15 text-green-400' : 'bg-slate-500/15 text-slate-400'}`}>
 <span className={`w-1.5 h-1.5 rounded-full ${s.active ? 'bg-green-400' : 'bg-slate-400'}`} />
 {s.active ? 'Active' : 'Hidden'}
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button onClick={()=>openEdit(s)} className="px-3 py-1.5 text-xs glass rounded-lg text-aurora-cyan hover:text-aurora-cyan transition-colors">Edit</button>
 <button onClick={()=>handleDelete(s.id,s.title)} className="px-3 py-1.5 text-xs glass rounded-lg text-red-400 hover:text-red-300 transition-colors">Delete</button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 {showForm && (
 <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
 <div className="glass rounded-2xl w-full max-w-2xl border border-aurora-cyan/20 my-4">
 <div className="flex items-center justify-between p-6 border-b border-aurora-cyan/15">
 <h2 className="font-display font-semibold text-white">{editing ? 'Edit Service' : 'Add New Service'}</h2>
 <button onClick={()=>setShowForm(false)} className="text-slate-400 hover:text-white text-xl">×</button>
 </div>
 <form onSubmit={handleSave} className="p-6 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Icon</label>
 <select name="icon" value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))} className={ic}>
 <option value="">Choose an icon</option>
 {iconOptions.map(o=><option key={o.key} value={o.key}>{o.label}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Display Order</label>
 <input name="order" type="number" value={form.order} onChange={e=>setForm(p=>({...p,order:Number(e.target.value)}))} className={ic}/>
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Title *</label>
 <input name="title" required value={form.title} onChange={e=>{setForm(p=>({...p,title:e.target.value,...(!editing&&{slug:autoSlug(e.target.value)})}))}} className={ic} placeholder="AI Development Services"/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">URL Slug</label>
 <input name="slug" value={form.slug} onChange={e=>setForm(p=>({...p,slug:e.target.value}))} className={ic}/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Short Description</label>
 <textarea name="shortDescription" rows={2} value={form.shortDescription} onChange={e=>setForm(p=>({...p,shortDescription:e.target.value}))} className={`${ic} resize-none`}/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Full Description</label>
 <textarea name="fullDescription" rows={3} value={form.fullDescription} onChange={e=>setForm(p=>({...p,fullDescription:e.target.value}))} className={`${ic} resize-none`}/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Features (one per line)</label>
 <textarea rows={4} value={featuresText} onChange={e=>setFeaturesText(e.target.value)} className={`${ic} resize-none`} placeholder={"Feature 1\nFeature 2\nFeature 3"}/>
 </div>

 {/* Media */}
 <div className="border-t border-aurora-cyan/15 pt-4">
 <p className="text-sm font-medium text-white mb-3">Media</p>
 <div className="space-y-3">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Main Photo URL</label>
 <input value={form.imageUrl||''} onChange={e=>setForm(p=>({...p,imageUrl:e.target.value}))} className={ic} placeholder="https://..."/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">
 <svg className="w-3.5 h-3.5 inline mr-1 text-red-400" fill="currentColor" viewBox="0 0 24 24">
 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
 </svg>
 YouTube Video URL
 </label>
 <input value={(form as any).youtubeUrl||''} onChange={e=>setForm(p=>({...p,youtubeUrl:e.target.value}))} className={ic} placeholder="https://youtube.com/watch?v=..."/>
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Photo 2 URL</label>
 <input value={(form as any).image2Url||''} onChange={e=>setForm(p=>({...p,image2Url:e.target.value}))} className={ic} placeholder="https://..."/>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Photo 3 URL</label>
 <input value={(form as any).image3Url||''} onChange={e=>setForm(p=>({...p,image3Url:e.target.value}))} className={ic} placeholder="https://..."/>
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Meta Title (SEO)</label>
 <input value={form.metaTitle||''} onChange={e=>setForm(p=>({...p,metaTitle:e.target.value}))} className={ic}/>
 </div>
 <div className="flex items-end pb-2.5">
 <label className="flex items-center gap-2 cursor-pointer">
 <input type="checkbox" checked={form.active} onChange={e=>setForm(p=>({...p,active:e.target.checked}))} className="w-4 h-4 rounded accent-brand-500"/>
 <span className="text-sm text-slate-300">Active on site</span>
 </label>
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Meta Description (SEO)</label>
 <textarea rows={2} value={form.metaDescription||''} onChange={e=>setForm(p=>({...p,metaDescription:e.target.value}))} className={`${ic} resize-none`}/>
 </div>
 <div className="flex gap-3 pt-2">
 <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
 {saving ? 'Saving...' : editing ? 'Update' : 'Add Service'}
 </button>
 <button type="button" onClick={()=>setShowForm(false)} className="btn-outline px-6">Cancel</button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 )
}
