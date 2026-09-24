import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="font-display font-extrabold text-8xl gradient-text mb-4">404</div>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Page Not Found</h1>
          <p className="text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary px-8 py-3">Go Home</Link>
            <Link href="/contact" className="btn-outline px-8 py-3">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
