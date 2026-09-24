import { Timestamp } from 'firebase/firestore'

export interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  icon: string
  imageUrl?: string
  youtubeUrl?: string
  image2Url?: string
  image3Url?: string
  features: string[]
  order: number
  active: boolean
  metaTitle?: string
  metaDescription?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  tags: string[]
  category: string
  imageUrl?: string
  image2Url?: string
  image3Url?: string
  image4Url?: string
  image5Url?: string
  youtubeUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  clientName?: string
  completedAt?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl?: string
  tags: string[]
  category: string
  author: string
  published: boolean
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  readTime?: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  service?: string
  read: boolean
  createdAt?: Timestamp
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  linkedin?: string
  order: number
  createdAt?: Timestamp
}

export interface SiteSettings {
  id: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  phone: string
  email: string
  address: string
  linkedinUrl: string
  whatsappNumber: string
}

export interface CVData {
  name: string
  title: string
  email: string
  phone: string
  linkedin: string
  location: string
  summary: string
  skills: string[]
  experience: { role: string; company: string; period: string; bullets: string[] }[]
  education: { degree: string; institution: string; period: string }[]
  cvFileUrl?: string
}
