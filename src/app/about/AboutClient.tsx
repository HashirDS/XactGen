'use client'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { TeamMember } from '@/types'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'
import OrbitSpin, { OrbitNode } from '@/components/effects/OrbitSpin'
import { CEO_FAQS, SITE } from '@/lib/site'

const pillars = [
  { title: 'Our Mission', text: 'To be the forefront provider of innovative AI development solutions, shaping the future of intelligent technology.' },
  { title: 'Our Vision', text: 'To empower businesses and individuals by providing them with transformative AI development solutions.' },
  { title: 'Our Promise', text: '24/7 quick support, on-time delivery, skilled and expert teams, and industry-specific expertise.' },
]

const partners: OrbitNode[] = [
  { key: 'sco', label: 'SCO', image: '/partners/sco.png', imagePadding: 'lg' },
  { key: 'army', label: 'Pakistan Army', image: '/partners/pak-army.png', imagePadding: 'sm' },
  { key: 'uok', label: 'University of Kotli', image: '/partners/university-of-kotli.png', imagePadding: 'sm' },
]

export default function AboutClient({ team }: { team: TeamMember[] }) {

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <div className="container-custom text-center mb-24">
          <AnimatedSection>
            <span className="text-aurora-cyan text-sm font-medium uppercase tracking-widest mb-3 block">Our Story</span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              About <span className="gradient-text">XactGen</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Smarter solutions for real-world problems, blending Artificial Intelligence, Data Science and next-generation technologies.
            </p>
          </AnimatedSection>
        </div>

        {/* Mission */}
        <div className="container-custom mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
                Exact Solutions for the <span className="gradient-text">Next Generation</span>
              </h2>
              <div className="space-y-5 text-slate-400 leading-relaxed">
                <p>At XactGen, we believe in creating smarter solutions for real-world problems by blending Artificial Intelligence, Data Science, and next-generation technologies. Our mission is to make work and learning easier through intelligent automation and innovative tools.</p>
                <p>We provide a wide range of services including AI model development, data analytics, documentation support, 3D avatars for education, chatbots, and web-based solutions. Whether it is solving university projects, IT challenges, or improving teaching methods in schools, XactGen delivers smart, tailored solutions that fit every need.</p>
                <p>Our unique strength lies in combining AI with Data Science to design solutions that are not only technically powerful but also practical and user-friendly.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, label: 'Our Location', href: `https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}` },
                  { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: 'Company LinkedIn', href: SITE.linkedin },
                  { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, label: 'Send us a message', href: '/contact' },
                ].map(item => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-aurora-cyan transition-colors glass px-4 py-2.5 rounded-xl">
                    {item.icon} {item.label}
                  </a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="text-center">
                <h2 className="editorial-headline text-3xl sm:text-4xl mb-3">
                  Our <em className="!text-aurora-violet">Partners</em>
                </h2>
                <p className="text-slate-400 mb-8">We thank our partners.</p>
                <OrbitSpin theme="violet" size="sm" nodes={partners} />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Mission, vision, promise */}
        <div className="container-custom mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 80}>
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-aurora-cyan/15 bg-navy-900/30 py-14 mb-24">
          <div className="container-custom grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '20+', label: 'Happy Customers' },
              { value: '10+', label: 'Countries Served' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <div className="font-display font-semibold text-3xl md:text-4xl gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="container-custom mb-24">
          <AnimatedSection className="max-w-3xl mx-auto text-center sm:text-left">
            <img
              src="/team/ashir-mehfooz.jpg"
              alt="Ashir Mehfooz, founder and CEO of XactGen"
              width={480}
              height={640}
              className="w-48 sm:w-56 h-64 sm:h-72 object-cover object-top rounded-2xl mb-6 border border-white/10 mx-auto sm:mx-0"
            />
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Who leads <span className="gradient-text">XactGen</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              <a href={SITE.ceo.linkedin} className="text-white hover:text-aurora-cyan" rel="me">{SITE.ceo.name}</a> is the founder and CEO of XactGen.
              His profiles are on <a href={SITE.ceo.linkedin} className="text-white hover:text-aurora-cyan" rel="me">LinkedIn</a> and <a href={SITE.github} className="text-white hover:text-aurora-cyan" rel="me">GitHub</a>.
            </p>
            <div className="space-y-6">
              {CEO_FAQS.map(item => (
                <div key={item.q}>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{item.q}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Team — dynamic from Firebase */}
        <div className="container-custom mb-24">
          <AnimatedSection className="text-center mb-14">
            <span className="text-aurora-cyan text-sm font-medium uppercase tracking-widest mb-3 block">The People</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => {
                const name = member.name || 'Team Member'
                const initials = name.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || 'TM'
                return (
                <AnimatedSection key={member.id} delay={i * 80}>
                  <div className="glass glass-hover rounded-2xl p-6 text-center h-full flex flex-col">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={name}
                        onError={(e) => {
                          // If the avatar URL fails to load (LinkedIn hotlink-blocked, dead link, etc.),
                          // hide the broken image and show the initials fallback alongside it.
                          const img = e.currentTarget
                          img.style.display = 'none'
                          const fallback = img.nextElementSibling as HTMLElement | null
                          if (fallback) fallback.style.display = 'flex'
                        }}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-aurora-cyan/30" />
                    ) : null}
                    <div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-violet items-center justify-center text-2xl font-display font-bold text-white mx-auto mb-4"
                      style={{ display: member.imageUrl ? 'none' : 'flex' }}
                    >
                      {initials}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">{name}</h3>
                    <p className="text-aurora-cyan text-sm mb-3">{member.role}</p>
                    {member.bio && <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{member.bio}</p>}
                    {member.linkedin && (
                      <a href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-cyan transition-colors mt-auto">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </AnimatedSection>
                )
              })}
            </div>
        </div>

        {/* Final CTA */}
        <div className="container-custom">
          <AnimatedSection>
            <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-accent-600/20" />
              <div className="relative z-10">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">Want to Work With Us?</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">Whether you have a clear project or just a problem to solve — we'd love to talk.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary px-8 py-3.5">Start a Conversation</Link>
                  <Link href="/services" className="btn-outline px-8 py-3.5">View Our Services</Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  )
}