import { getBlogPostServer } from '@/lib/firestore-server'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import type { Metadata } from 'next'

// Render markdown with sensible defaults
marked.setOptions({ breaks: true, gfm: true })

function tsToISO(ts: any): string | undefined {
  try { return ts?.toDate ? ts.toDate().toISOString() : undefined } catch { return undefined }
}
function tsToReadable(ts: any): string {
  try { return ts?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) } catch { return '' }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getBlogPostServer(params.id).catch(() => null)
  if (!post || !post.published) return genMeta({ title: 'Article Not Found' })
  return genMeta({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${params.id}`,
    image: post.coverImageUrl,
    keywords: [...(post.tags || []), post.category, 'XactGen blog'],
  })
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostServer(params.id).catch(() => null)
  if (!post || !post.published) notFound()

  const html = marked.parse(post.content || '') as string
  const datePublished = tsToISO(post.createdAt)
  const dateReadable = tsToReadable(post.createdAt)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished,
    author: { '@type': 'Person', name: post.author || 'XactGen' },
    publisher: {
      '@type': 'Organization',
      name: 'XactGen',
      logo: { '@type': 'ImageObject', url: 'https://xactgen.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://xactgen.com/blog/${params.id}` },
    keywords: (post.tags || []).join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-aurora-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-aurora-cyan transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-300 truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-aurora-cyan/8 text-aurora-cyan border border-aurora-cyan/20">{post.category}</span>
              {post.tags?.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">{tag}</span>
              ))}
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">{post.title}</h1>
            {post.excerpt && (
              <p className="text-slate-300 text-lg leading-relaxed mb-5">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-sm text-slate-500 pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {post.author}
              </span>
              <span>·</span>
              <time dateTime={datePublished}>{dateReadable}</time>
              {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
            </div>
          </div>

          {/* Cover image */}
          {post.coverImageUrl && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-white/5">
              <img src={post.coverImageUrl} alt={post.title} className="w-full object-cover max-h-[28rem]" />
            </div>
          )}

          {/* Markdown content */}
          <article
            className="prose-blog mb-12"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center border border-white/5 bg-navy-800/40">
            <h3 className="font-display font-semibold text-xl text-white mb-2">Interested in AI for your business?</h3>
            <p className="text-slate-400 mb-6">Get a free consultation with our AI experts.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-3">Get Free Consultation</Link>
              <Link href="/blog" className="btn-outline px-8 py-3">More Articles</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
