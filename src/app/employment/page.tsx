import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employment form | XactGen AI',
  description: 'XactGen AI employment application. Fill it on screen or download the PDF.',
  robots: { index: false, follow: false },
}

export default function EmploymentFormPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display font-semibold text-3xl text-white">Employment form</h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Open the form when you need it, or download the PDF and send it back.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/forms/xactgen-employment-form.html" className="btn-primary text-sm">
              Open form
            </a>
            <a href="/forms/xactgen-employment-form.pdf" download className="btn-outline text-sm">
              Download PDF
            </a>
          </div>

          <div className="mt-14 pt-10 border-t border-white/10">
            <h2 className="font-display font-semibold text-3xl text-white">Certificate</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              One certificate for an employee or for yourself. Type the name, what it is for, and the date, then print it.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="/forms/xactgen-certificate.html" className="btn-primary text-sm">
                Open certificate
              </a>
              <a href="/forms/xactgen-certificate.pdf" download className="btn-outline text-sm">
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
