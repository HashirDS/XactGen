'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[XactGen page error]', error)
  }, [error])

  const isDev = process.env.NODE_ENV !== 'production'

  return (
    <main className="min-h-screen bg-navy-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">Something went wrong</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the issue persists.
        </p>

        {isDev && error?.message && (
          <div className="text-left rounded-2xl border border-red-500/20 bg-red-500/5 p-5 mb-8 max-h-[40vh] overflow-auto">
            <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-semibold">
              Dev only · Error details
            </div>
            <div className="font-mono text-sm text-red-300 whitespace-pre-wrap break-words mb-3">
              {error.message}
            </div>
            {error.stack && (
              <details className="text-xs text-slate-400">
                <summary className="cursor-pointer hover:text-slate-200 mb-2">Stack trace</summary>
                <pre className="font-mono text-[11px] whitespace-pre-wrap break-words leading-relaxed">{error.stack}</pre>
              </details>
            )}
            {error.digest && (
              <div className="text-xs text-slate-500 mt-3">Digest: {error.digest}</div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary px-8 py-3">Try Again</button>
          <Link href="/" className="btn-outline px-8 py-3">Go Home</Link>
        </div>
      </div>
    </main>
  )
}
