'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/admin')
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (locked) {
      toast.error('Too many failed attempts. Please wait 15 minutes.')
      return
    }
    if (!password) { toast.error('Please enter your password'); return }
    setLoading(true)
    try {
      await login(email.trim(), password)
      toast.success('Welcome back!')
      router.push('/admin')
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        if (newAttempts >= 5) {
          setLocked(true)
          setTimeout(() => { setLocked(false); setAttempts(0) }, 15 * 60 * 1000)
          toast.error('Too many failed attempts. Login locked for 15 minutes.')
        } else {
          toast.error(`Wrong password. ${5 - newAttempts} attempt${5 - newAttempts !== 1 ? 's' : ''} remaining.`)
        }
      } else if (code === 'auth/too-many-requests') {
        toast.error('Account temporarily locked. Reset your password or wait 5 minutes.')
      } else if (code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
        toast.error('Firebase config error. Check firebase.ts.')
      } else {
        toast.error('Login failed: ' + (code || 'Unknown error'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-space-950 grid-pattern flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-radial from-aurora-cyan/10 via-transparent to-transparent" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full bg-aurora-cyan/15 blur-2xl" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-space-700 to-space-900 border border-aurora-cyan/25 flex items-center justify-center">
              <Image src="/brand/mark.png" alt="XactGen" width={40} height={40} className="object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.35))' }} />
            </div>
          </div>
          <h1 className="font-display font-semibold text-2xl text-white tracking-tight">Xact<span className="text-aurora-violet">Gen</span></h1>
          <p className="text-slate-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <h2 className="font-display font-semibold text-white text-xl text-center mb-2">Sign In</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-2" htmlFor="email">Email Address</label>
            <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-aurora-cyan/60 transition-colors"
              placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input id="password" type={showPass ? 'text' : 'password'} required value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-space-800 border border-aurora-cyan/20 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-aurora-cyan/60 transition-colors"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPass ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Signing in...
              </>
            ) : 'Sign In to Dashboard'}
          </button>
        </form>
        <p className="text-center text-xs text-slate-600 mt-6">
          Protected admin area · XactGen © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
