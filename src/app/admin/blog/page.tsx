'use client'
import { useEffect, useState } from 'react'
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/firestore'
import { BlogPost } from '@/types'
import toast from 'react-hot-toast'

const blogCategories = ['AI & ML', 'Data Science', 'Web Development', 'Business', 'Tutorials', 'News', 'Case Studies']

const emptyPost: Omit<BlogPost, 'id' | 'createdAt'> = {
 title: '', slug: '', excerpt: '', content: '', coverImageUrl: '',
 tags: [], category: 'AI & ML', author: 'XactGen',
 published: true, featured: false, readTime: 5,
 metaTitle: '', metaDescription: '',
}

export default function AdminBlogPage() {
 const [posts, setPosts] = useState<BlogPost[]>([])
 const [loading, setLoading] = useState(true)
 const [showForm, setShowForm] = useState(false)
 const [editing, setEditing] = useState<BlogPost | null>(null)
 const [form, setForm] = useState<Omit<BlogPost, 'id' | 'createdAt'>>(emptyPost)
 const [tagsText, setTagsText] = useState('')
 const [saving, setSaving] = useState(false)
 const [preview, setPreview] = useState(false)

 const load = () => {
 setLoading(true)
 getBlogPosts(false).then(setPosts).catch(console.error).finally(() => setLoading(false))
 }
 useEffect(load, [])

 const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

 const openAdd = () => { setEditing(null); setForm(emptyPost); setTagsText(''); setPreview(false); setShowForm(true) }
 const openEdit = (p: BlogPost) => {
 setEditing(p)
 setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content,
 coverImageUrl: p.coverImageUrl || '', tags: p.tags, category: p.category,
 author: p.author, published: p.published, featured: p.featured,
 readTime: p.readTime || 5, metaTitle: p.metaTitle || '', metaDescription: p.metaDescription || '' })
 setTagsText(p.tags.join(', '))
 setPreview(false)
 setShowForm(true)
 }

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault()
 setSaving(true)
 const data = { ...form, tags: tagsText.split(',').map(t => t.trim()).filter(Boolean) }
 try {
 if (editing) { await updateBlogPost(editing.id, data); toast.success('Article updated!') }
 else { await addBlogPost(data); toast.success('Article published!') }
 setShowForm(false); load()
 } catch { toast.error('Failed to save') }
 finally { setSaving(false) }
 }

 const handleDelete = async (id: string, title: string) => {
 if (!confirm(`Delete "${title}"?`)) return
 await deleteBlogPost(id); toast.success('Article deleted'); load()
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 const { name, value, type } = e.target
 setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value }))
 }

 const ic = 'w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-aurora-cyan/60 transition-colors placeholder-slate-600'
 const formatDate = (ts: any) => { try { return ts?.toDate().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) } catch { return 'Just now' } }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="font-display font-bold text-2xl text-white">Blog & Articles</h1>
 <p className="text-slate-400 mt-1">{posts.length} articles · {posts.filter(p => p.published).length} published</p>
 </div>
 <button onClick={openAdd} className="btn-primary text-sm px-5 py-2.5">+ New Article</button>
 </div>

 {loading ? (
 <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="glass rounded-xl h-16 animate-pulse"/>)}</div>
 ) : posts.length === 0 ? (
 <div className="glass rounded-2xl p-16 text-center">
 <div className="w-16 h-16 rounded-2xl bg-aurora-cyan/8 flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-aurora-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
 </svg>
 </div>
 <h3 className="font-display font-semibold text-white text-xl mb-2">No articles yet</h3>
 <p className="text-slate-400 mb-6">Write your first article to attract visitors and improve SEO</p>
 <button onClick={openAdd} className="btn-primary text-sm">Write First Article</button>
 </div>
 ) : (
 <div className="glass rounded-2xl overflow-hidden">
 <table className="w-full">
 <thead>
 <tr className="border-b border-aurora-cyan/15">
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider">Article</th>
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
 <th className="text-left px-6 py-4 text-xs text-slate-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
 <th className="text-right px-6 py-4 text-xs text-slate-500 uppercase tracking-wider">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-brand-500/5">
 {posts.map(post => (
 <tr key={post.id} className="hover:bg-white/2 transition-colors">
 <td className="px-6 py-4">
 <div>
 <div className="font-medium text-white text-sm flex items-center gap-2">
 {post.title}
 {post.featured && <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400"></span>}
 </div>
 <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{post.excerpt}</div>
 </div>
 </td>
 <td className="px-6 py-4 hidden md:table-cell">
 <span className="text-xs px-2 py-1 rounded-full bg-aurora-cyan/8 text-aurora-cyan">{post.category}</span>
 </td>
 <td className="px-6 py-4 hidden sm:table-cell">
 <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
 post.published ? 'bg-green-500/15 text-green-400' : 'bg-slate-500/15 text-slate-400'
 }`}>
 <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-400' : 'bg-slate-400'}`} />
 {post.published ? 'Published' : 'Draft'}
 </span>
 </td>
 <td className="px-6 py-4 text-slate-400 text-xs hidden lg:table-cell">{formatDate(post.createdAt)}</td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer"
 className="px-3 py-1.5 text-xs glass rounded-lg text-slate-400 hover:text-white transition-colors">View</a>
 <button onClick={() => openEdit(post)} className="px-3 py-1.5 text-xs glass rounded-lg text-aurora-cyan hover:text-aurora-cyan transition-colors">Edit</button>
 <button onClick={() => handleDelete(post.id, post.title)} className="px-3 py-1.5 text-xs glass rounded-lg text-red-400 hover:text-red-300 transition-colors">Delete</button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 {/* Modal */}
 {showForm && (
 <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
 <div className="glass rounded-2xl w-full max-w-4xl border border-aurora-cyan/20 my-4">
 <div className="flex items-center justify-between p-6 border-b border-aurora-cyan/15">
 <h2 className="font-display font-semibold text-white">{editing ? 'Edit Article' : 'New Article'}</h2>
 <div className="flex items-center gap-3">
 <button type="button" onClick={() => setPreview(!preview)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${preview ? 'bg-aurora-cyan/10 text-aurora-cyan' : 'glass text-slate-400 hover:text-white'}`}>
 {preview ? 'Edit Mode' : 'Preview'}
 </button>
 <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white text-xl leading-none">×</button>
 </div>
 </div>

 {preview ? (
 <div className="p-6 max-h-[70vh] overflow-y-auto">
 <h1 className="font-display font-bold text-2xl text-white mb-3">{form.title || 'Untitled'}</h1>
 <p className="text-slate-400 mb-6 text-sm">{form.excerpt}</p>
 {form.coverImageUrl && <img src={form.coverImageUrl} alt="" className="w-full h-48 object-cover rounded-xl mb-6" />}
 <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{form.content || 'No content yet...'}</div>
 </div>
 ) : (
 <form onSubmit={handleSave} className="p-6">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Main content */}
 <div className="lg:col-span-2 space-y-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Title *</label>
 <input name="title" required value={form.title} onChange={e => { handleChange(e); if (!editing) setForm(prev => ({ ...prev, slug: autoSlug(e.target.value) })) }}
 className={ic} placeholder="How AI is Transforming Healthcare in Pakistan" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Excerpt (shown in listing)</label>
 <textarea name="excerpt" rows={2} value={form.excerpt} onChange={handleChange}
 className={`${ic} resize-none`} placeholder="A brief summary of your article..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Content *</label>
 <textarea name="content" required rows={14} value={form.content} onChange={handleChange}
 className={`${ic} resize-y font-mono text-xs`}
 placeholder={"Write your full article here...\n\nYou can use plain text with paragraphs.\nLine breaks are preserved automatically.\n\nTip: Use double line breaks between paragraphs."} />
 </div>
 </div>

 {/* Sidebar settings */}
 <div className="space-y-4">
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Status</label>
 <div className="flex gap-2">
 <label className="flex-1 flex items-center gap-2 glass rounded-xl px-3 py-2.5 cursor-pointer">
 <input type="checkbox" name="published" checked={form.published}
 onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))}
 className="accent-brand-500" />
 <span className="text-sm text-slate-300">Published</span>
 </label>
 <label className="flex-1 flex items-center gap-2 glass rounded-xl px-3 py-2.5 cursor-pointer">
 <input type="checkbox" name="featured" checked={form.featured}
 onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
 className="accent-yellow-500" />
 <span className="text-sm text-slate-300">Featured</span>
 </label>
 </div>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Category</label>
 <select name="category" value={form.category} onChange={handleChange} className={ic}>
 {blogCategories.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Author</label>
 <input name="author" value={form.author} onChange={handleChange} className={ic} placeholder="Author name" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Read time (minutes)</label>
 <input name="readTime" type="number" value={form.readTime} onChange={handleChange} className={ic} min={1} max={60} />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Cover Image URL</label>
 <input name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange} className={ic} placeholder="https://..." />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Tags (comma separated)</label>
 <input value={tagsText} onChange={e => setTagsText(e.target.value)} className={ic} placeholder="AI, Machine Learning, Pakistan" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">URL Slug</label>
 <input name="slug" value={form.slug} onChange={handleChange} className={ic} placeholder="how-ai-transforms-healthcare" />
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Meta Title (SEO)</label>
 <input name="metaTitle" value={form.metaTitle} onChange={handleChange} className={ic} placeholder="SEO title..." />
 <p className="text-xs text-slate-600 mt-1">{(form.metaTitle || '').length}/60 chars</p>
 </div>
 <div>
 <label className="block text-sm text-slate-400 mb-1.5">Meta Description (SEO)</label>
 <textarea name="metaDescription" rows={2} value={form.metaDescription} onChange={handleChange} className={`${ic} resize-none`} placeholder="SEO description..." />
 <p className="text-xs text-slate-600 mt-1">{(form.metaDescription || '').length}/160 chars</p>
 </div>
 </div>
 </div>

 <div className="flex gap-3 pt-4 border-t border-aurora-cyan/15 mt-4">
 <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
 {saving ? 'Saving...' : editing ? 'Update Article' : 'Publish Article'}
 </button>
 <button type="button" onClick={() => setShowForm(false)} className="btn-outline px-6">Cancel</button>
 </div>
 </form>
 )}
 </div>
 </div>
 )}
 </div>
 )
}
