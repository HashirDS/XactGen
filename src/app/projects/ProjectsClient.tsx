'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { Project } from '@/types'
import OrbitSpin from '@/components/effects/OrbitSpin'

const categories = ['All', 'AI/ML', 'Web Development', 'Data Analytics', 'Automation', 'NLP']

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const loading = false
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Header */}
        <section className="container-custom mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="editorial-headline text-4xl sm:text-5xl lg:text-6xl mb-6">
              Our <em className="!text-amber-300">Projects</em>
            </h1>
          </div>
        </section>

        {/* Spin + latest projects (spin holds up to 12, the full list is below) */}
        <section className="container-custom mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <OrbitSpin
                theme="amber"
                max={12}
                nodes={projects.map(p => ({ key: p.id, label: p.title, href: `/projects/${p.id}` }))}
              />
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loading
                ? [1, 2, 3, 4].map(i => <div key={i} className="h-[76px] rounded-2xl bg-space-800/40 animate-pulse" />)
                : projects.slice(0, 10).map(p => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.id}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-space-800/40 hover:border-amber-300/40 hover:bg-space-800/70 transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-300/20 flex items-center justify-center text-amber-300 font-display font-semibold text-xs shrink-0">
                        {p.title.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                      </div>
                      <div className="font-display font-medium text-white text-[15px] leading-tight tracking-tight line-clamp-2">
                        {p.title}
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <div className="container-custom mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-500 transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-aurora-cyan to-aurora-violet text-white shadow-lg shadow-aurora-cyan/25'
                    : 'glass text-slate-400 hover:text-white hover:border-aurora-cyan/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="glass rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">Projects Coming Soon</h3>
              <p className="text-slate-400">We're loading our portfolio. Check back shortly!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <article className="glass glass-hover rounded-2xl overflow-hidden group h-full flex flex-col">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-brand-600/20 to-accent-600/20 flex items-center justify-center">
            <span className="text-5xl">🧠</span>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-aurora-cyan transition-colors">{project.title}</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{project.description}</p>
          {project.clientName && (
            <div className="text-xs text-slate-500 mb-3">Client: {project.clientName}</div>
          )}
          <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-aurora-cyan hover:text-aurora-cyan transition-colors">
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors" title="View on GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}