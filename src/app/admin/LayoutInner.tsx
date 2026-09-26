'use client'
import { useRequireAuth, useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import SeedGate from './SeedGate'

const navItems = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/blog', label: 'Blog & Articles' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/settings', label: 'Settings' },
]

const icons: Record<string, React.FC<{className?:string}>> = {
  '/admin': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>,
  '/admin/analytics': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/></svg>,
  '/admin/services': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  '/admin/projects': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>,
  '/admin/blog': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  '/admin/team': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>,
  '/admin/messages': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>,
  '/admin/settings': ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
}

export default function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useRequireAuth()
  const { logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    router.push('/admin/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-space-950 flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-aurora-cyan/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aurora-cyan animate-spin" />
      </div>
    </div>
  )
  if (!user) return null

  return (
    <div className="min-h-screen bg-space-950 flex relative z-10">
      {/* Sidebar */}
      <aside className="w-60 bg-space-900 border-r border-white/[0.06] flex-col fixed h-full z-40 hidden lg:flex">
        {/* Subtle aurora accent at the top of the sidebar so admin feels part of the same universe */}
        <div className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute -top-8 -left-8 w-48 h-24 bg-aurora-violet/15 blur-3xl pointer-events-none" />
          <div className="relative p-5">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand/mark.png" alt="XactGen AI" width={32} height={32} className="object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.35))' }} />
              <div>
                <div className="font-display font-semibold text-sm text-white tracking-tight whitespace-nowrap">XactGen<span className="text-aurora-violet"> AI</span></div>
                <div className="text-xs text-slate-500">Admin Panel</div>
              </div>
            </Link>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = icons[item.href]
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}>
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                {item.label}
              </Link>
            )
          })}

        </nav>

        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-aurora-violet flex items-center justify-center text-xs font-bold text-white shrink-0">{(user.email || 'A')[0].toUpperCase()}</div>
            <div className="min-w-0">
              <div className="text-sm text-white font-medium truncate">Admin</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
          </div>
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-aurora-cyan transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
            View Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header + content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-space-900 border-b border-white/[0.06] sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Image src="/brand/mark.png" alt="XactGen" width={24} height={24} className="object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.35))' }} />
            <span className="font-display font-bold text-sm text-white">Admin</span>
          </div>
          <div className="flex gap-1">
            {navItems.slice(0,5).map(item => {
              const Icon = icons[item.href]
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return Icon ? (
                <Link key={item.href} href={item.href}
                  className={`p-2 rounded-lg transition-all ${isActive ? 'bg-aurora-cyan/15 text-aurora-cyan' : 'text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </Link>
              ) : null
            })}
            <button onClick={handleLogout} className="p-2 rounded-lg text-slate-400 hover:text-red-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
            </button>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8"><SeedGate>{children}</SeedGate></main>
      </div>
    </div>
  )
}
