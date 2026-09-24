import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, setDoc,
  deleteDoc, query, orderBy, serverTimestamp, where, limit
} from 'firebase/firestore'
import { db } from './firebase'
import { Service, Project, Message, TeamMember, BlogPost } from '@/types'

// ─── SERVICES ────────────────────────────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, 'services'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service))
}
export async function getService(id: string): Promise<Service | null> {
  const snap = await getDoc(doc(db, 'services', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Service) : null
}
export async function addService(data: Omit<Service, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'services'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}
export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  await updateDoc(doc(db, 'services', id), { ...data, updatedAt: serverTimestamp() })
}
export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id))
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project))
}
// Filtered in code rather than with where()+orderBy(), which would require a
// Firestore composite index. Keeps the site working with zero index setup.
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects()
  return all.filter(p => p.featured).slice(0, 6)
}
export async function getProject(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, 'projects', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Project) : null
}
export async function addProject(data: Omit<Project, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}
export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  await updateDoc(doc(db, 'projects', id), { ...data, updatedAt: serverTimestamp() })
}
export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id))
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────
// Single orderBy query, published filter applied in code. The previous
// where('published')+orderBy('createdAt') combo needed a composite index that
// did not exist, so the public blog silently returned nothing.
export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  const posts = snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
  return publishedOnly ? posts.filter(p => p.published === true) : posts
}
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, 'blog', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as BlogPost) : null
}
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, 'blog'), where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPost
}
export async function addBlogPost(data: Omit<BlogPost, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'blog'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}
export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<void> {
  await updateDoc(doc(db, 'blog', id), { ...data, updatedAt: serverTimestamp() })
}
export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, 'blog', id))
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────
export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Message))
}
export async function addMessage(data: Omit<Message, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const ref = await addDoc(collection(db, 'messages'), { ...data, read: false, createdAt: serverTimestamp() })
  return ref.id
}
export async function markMessageRead(id: string): Promise<void> {
  await updateDoc(doc(db, 'messages', id), { read: true })
}
export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(doc(db, 'messages', id))
}

// ─── TEAM ────────────────────────────────────────────────────────────────────
export async function getTeamMembers(): Promise<TeamMember[]> {
  const q = query(collection(db, 'team'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as TeamMember))
}
export async function addTeamMember(data: Omit<TeamMember, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'team'), { ...data, createdAt: serverTimestamp() })
  return ref.id
}
export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<void> {
  await updateDoc(doc(db, 'team', id), { ...data })
}
export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, 'team', id))
}
