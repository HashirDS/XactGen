import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Terms of Service',
  description: 'XactGen Terms of Service — the rules and guidelines for using our services.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display font-semibold text-4xl text-white mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 prose-dark">
            {[
              {
                title: '1. Services',
                content: `XactGen provides AI development, machine learning, data analytics, web development, and related technology services. All services are subject to a separate written agreement or proposal accepted by both parties.`
              },
              {
                title: '2. Intellectual Property',
                content: `Upon full payment, clients receive ownership of the deliverables created specifically for them. XactGen retains rights to general methodologies, frameworks, and pre-existing tools used in delivering the services. We may showcase completed work in our portfolio unless otherwise agreed in writing.`
              },
              {
                title: '3. Confidentiality',
                content: `We treat all client data, business information, and project details as strictly confidential. We do not disclose client information to third parties without written consent, except as required by law.`
              },
              {
                title: '4. Payment Terms',
                content: `Payment terms are defined in individual project agreements. Typically, projects require a 50% upfront deposit before work begins, with the remaining balance due upon project delivery. Late payments may result in project suspension.`
              },
              {
                title: '5. Limitation of Liability',
                content: `XactGen's liability is limited to the total amount paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages. AI and ML models are provided as-is; performance guarantees depend on data quality and scope defined in project agreements.`
              },
              {
                title: '6. Governing Law',
                content: `These terms are governed by the laws of Pakistan. Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the jurisdiction of courts in Azad Jammu & Kashmir, Pakistan.`
              },
              {
                title: '7. Contact',
                content: `For any questions about these terms, use our contact form at www.xactgenai.com/contact.`
              },
            ].map(section => (
              <section key={section.title}>
                <h2 className="font-display font-semibold text-xl text-white mb-3">{section.title}</h2>
                <p className="text-slate-400 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
