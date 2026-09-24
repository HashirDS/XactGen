import { loadProject } from '@/lib/firestore-server'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await loadProject(params.id).catch(() => null)
  if (!project) return genMeta({ title: 'Project Not Found' })
  return genMeta({ title: project.title, description: project.description, path: `/projects/${params.id}` })
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await loadProject(params.id).catch(() => null)
  if (!project) notFound()

  const p = project as any
  const youtubeEmbed = getYouTubeEmbedUrl(p.youtubeUrl || '')
  const allImages = [p.imageUrl, p.image2Url, p.image3Url, p.image4Url, p.image5Url].filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-aurora-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-aurora-cyan transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-slate-300 truncate">{project.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20">{project.category}</span>
              {project.featured && (
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Featured</span>
              )}
            </div>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">{project.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* YouTube Video */}
          {youtubeEmbed && (
            <div className="mb-8 glass rounded-2xl overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={youtubeEmbed}
                  title={project.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Image Gallery */}
          {allImages.length > 0 && (
            <div className="mb-10">
              {/* Main image */}
              {allImages[0] && (
                <div className="rounded-2xl overflow-hidden mb-3">
                  <img src={allImages[0]} alt={project.title} className="w-full object-cover max-h-96" />
                </div>
              )}
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.slice(1).map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-video">
                      <img src={img} alt={`${project.title} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {project.fullDescription && (
                <div className="glass rounded-2xl p-7 mb-6">
                  <h2 className="font-display font-semibold text-white text-xl mb-4">About this Project</h2>
                  <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">Project Details</h3>
                <div className="space-y-3">
                  {project.clientName && (
                    <div><div className="text-xs text-slate-500 mb-0.5">Client</div><div className="text-sm text-white">{project.clientName}</div></div>
                  )}
                  <div><div className="text-xs text-slate-500 mb-0.5">Category</div><div className="text-sm text-white">{project.category}</div></div>
                  {project.completedAt && (
                    <div><div className="text-xs text-slate-500 mb-0.5">Completed</div><div className="text-sm text-white">{project.completedAt}</div></div>
                  )}
                </div>
              </div>

              {project.tags?.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-white text-sm mb-3 uppercase tracking-wider">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-aurora-cyan/8 text-aurora-cyan border border-aurora-cyan/20">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass rounded-2xl p-5 space-y-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm py-3">
                    View Live Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center text-sm py-3">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                )}
                <Link href="/contact" className="btn-outline w-full justify-center text-sm py-3">Start a Similar Project</Link>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-aurora-cyan transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
              Back to all projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
