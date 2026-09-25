import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy',
  description: 'XactGen Privacy Policy — how we collect, use, and protect your data.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display font-semibold text-4xl text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 prose-dark">
            {[
              {
                title: '1. Information We Collect',
                content: `When you use our contact form, we collect your name, email address, phone number (optional), and message content. We use this information solely to respond to your inquiry. We do not collect any sensitive personal data without your explicit consent.`
              },
              {
                title: '2. How We Use Your Information',
                content: `Your information is used to: respond to project inquiries and provide quotes, communicate about ongoing projects, and improve our services. We do not sell, trade, or rent your personal information to third parties.`
              },
              {
                title: '3. Data Storage',
                content: `Contact form submissions are stored securely in Google Firebase (Firestore), which is governed by Google's privacy and security policies. Data is stored in encrypted form and accessible only to authorised XactGen team members.`
              },
              {
                title: '4. Cookies',
                content: `Our website uses minimal cookies necessary for basic functionality. We do not use tracking or advertising cookies. You can control cookie settings through your browser preferences.`
              },
              {
                title: '5. Third-Party Services',
                content: `Our website uses Google Firebase for database services and a third-party hosting provider. We also link to LinkedIn and Google Maps, which have their own privacy policies.`
              },
              {
                title: '6. Your Rights',
                content: `You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, contact us via our contact form at www.xactgenai.com/contact. We will respond within 30 days.`
              },
              {
                title: '7. Contact Us',
                content: `For any privacy-related questions, please use our contact form at www.xactgenai.com/contact.`
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
