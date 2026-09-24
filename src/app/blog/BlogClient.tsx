'use client'
import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { BlogPost } from '@/types'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import OrbitSpin from '@/components/effects/OrbitSpin'

const categories = ['All', 'AI & ML', 'Data Science', 'Web Development', 'Business', 'Tutorials']

// createdAt arrives as epoch milliseconds from the server loader
function formatDate(ms: any) {
  if (typeof ms !== 'number') return ''
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const loading = false
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.find(p => p.featured)
  const rest = filtered.filter(p => p.id !== featured?.id)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="editorial-headline text-4xl sm:text-5xl lg:text-6xl mb-6">
              Blog &amp; <em className="!text-rose-300">Articles</em>
            </h1>
          </div>

          {/* Spin + latest articles (spin holds up to 12, the full list is below) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <div className="flex justify-center order-2 lg:order-1">
              <OrbitSpin
                theme="rose"
                max={12}
                nodes={posts.map(p => ({ key: p.id, label: p.title, href: `/blog/${p.id}` }))}
              />
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loading
                ? [1, 2, 3, 4].map(i => <div key={i} className="h-[76px] rounded-2xl bg-space-800/40 animate-pulse" />)
                : posts.slice(0, 10).map(p => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.id}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-space-800/40 hover:border-rose-400/40 hover:bg-space-800/70 transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-300 font-display font-semibold text-xs shrink-0">
                        {p.title.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                      </div>
                      <div className="font-display font-medium text-white text-[15px] leading-tight tracking-tight line-clamp-2">
                        {p.title}
                      </div>
                    </Link>
                  ))}
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="search" placeholder="Search articles..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-navy-800 border border-aurora-cyan/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-aurora-cyan/60"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/30' : 'glass text-slate-400 hover:text-white'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="glass rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-aurora-cyan/8 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-aurora-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="font-display font-semibold text-white text-xl mb-2">No articles yet</h3>
              <p className="text-slate-400">Check back soon — we're working on great content!</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <AnimatedSection className="mb-10">
                  <Link href={`/blog/${featured.id}`} className="glass glass-hover rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 group">
                    {featured.coverImageUrl ? (
                      <img src={featured.coverImageUrl} alt={featured.title} className="w-full h-56 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="h-56 lg:h-full bg-gradient-to-br from-brand-600/30 to-accent-600/30 flex items-center justify-center">
                        <svg className="w-16 h-16 text-aurora-cyan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                      </div>
                    )}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20">{featured.category}</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400">Featured</span>
                      </div>
                      <h2 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-aurora-cyan transition-colors">{featured.title}</h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span>{formatDate(featured.createdAt)}</span>
                        {featured.readTime && <><span>·</span><span>{featured.readTime} min read</span></>}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <AnimatedSection key={post.id} delay={i * 60}>
                    <Link href={`/blog/${post.id}`} className="glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full group">
                      {post.coverImageUrl ? (
                        <img src={post.coverImageUrl} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="h-44 bg-gradient-to-br from-brand-600/20 to-accent-600/20 flex items-center justify-center">
                          <svg className="w-10 h-10 text-aurora-cyan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-aurora-cyan/8 text-aurora-cyan">{post.category}</span>
                          {post.tags?.slice(0,2).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{tag}</span>
                          ))}
                        </div>
                        <h2 className="font-display font-semibold text-white text-base mb-2 group-hover:text-aurora-cyan transition-colors line-clamp-2">{post.title}</h2>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-auto border-t border-white/5 pt-3">
                          <span>{post.author}</span>
                          <div className="flex items-center gap-2">
                            {post.readTime && <span>{post.readTime} min</span>}
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}