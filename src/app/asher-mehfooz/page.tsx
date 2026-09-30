import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = genMeta({
  title: 'Asher Mehfooz, Founder and CEO of XactGen AI',
  description:
    'Asher Mehfooz, also Ashir Mehfooz, is the founder and CEO of XactGen AI. Gold medalist in BS Data Science from the University of Kotli. Research, experience, and projects.',
  path: '/asher-mehfooz',
  image: SITE.ceo.photo,
  keywords: [
    'Asher Mehfooz',
    'Ashir Mehfooz',
    'CEO of XactGen AI',
    'Founder of XactGen',
    'XactGen AI',
  ],
})

const research = [
  'Large language models and generative AI for real-world, production-grade applications',
  'Natural language processing, prompt engineering, and retrieval-augmented generation (RAG) systems',
  'Artificial intelligence in education, including intelligent tutoring systems for young learners',
  'Sentiment and social-media intelligence from large-scale, unstructured web data',
  'Applied machine learning and human–AI interaction for scalable software systems',
]

const experience = [
  {
    org: 'XactGen',
    role: 'Founder and CEO',
    when: 'September 2025 – present',
    place: 'Software Technology Park, University of Kotli, AJK',
    points: [
      'Founded and registered an AI and data science consultancy, from client acquisition through delivery.',
      'Leads client work in machine learning, data analysis, dashboards, and custom AI tools, including a browser-based virtual try-on.',
    ],
  },
  {
    org: 'ROBX.AI',
    role: 'AI Developer and Research Team Head',
    when: 'November 2025 – present',
    place: 'Islamabad',
    points: [
      'Leads production language-model work, including Pulisint, a live sentiment platform.',
      'Directs a research team building teacher-facing tools for the I Am Scientist platform.',
    ],
  },
  {
    org: 'Datix AI',
    role: 'Lead, AI and Data Science',
    when: 'March 2025 – April 2026',
    place: 'Kotli, AJK',
    points: [
      'Led department delivery from requirements through dashboards, AI applications, databases, and language-model pipelines.',
    ],
  },
  {
    org: 'Systems Limited',
    role: 'Intern, DevOps and Generative AI',
    when: 'June 2025 – August 2025',
    place: 'Islamabad',
    points: [
      'Supported CI/CD and Docker in a production environment, and a generative-AI chatbot on Azure AI.',
    ],
  },
]

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: 'AI and machine learning',
    items: ['LLMs', 'Generative AI', 'RAG', 'Prompt engineering', 'Fine-tuning', 'NLP', 'Deep learning', 'Model evaluation'],
  },
  {
    title: 'Data',
    items: ['EDA', 'Statistical analysis', 'Predictive modelling', 'Tableau', 'Power BI', 'SPSS', 'R', 'SQL'],
  },
  {
    title: 'Programming',
    items: ['Python', 'JavaScript', 'React', 'Next.js', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'FastAPI', 'Flask'],
  },
  {
    title: 'Infrastructure',
    items: ['Docker', 'Git', 'Linux', 'CI/CD', 'Azure AI', 'MongoDB', 'Apache Spark'],
  },
]

const projects: { title: string; where: string; text: string }[] = [
  { title: 'Smart Animated Tutor for Kids', where: 'Thesis, University of Kotli', text: 'Tutoring system for children aged 3–6 with generative AI, speech, and a 3D avatar, plus a poem generator, drawing canvas, and teacher dashboard.' },
  { title: 'I Am Scientist', where: 'ROBX.AI', text: 'Teacher-facing AI tools covering data pipelines, model integration, and deployment.' },
  { title: 'Pulisint', where: 'ROBX.AI', text: 'Live sentiment platform that takes online sources through a language-model pipeline onto a real-time dashboard.' },
  { title: 'IELTS Official Training', where: 'EdTech', text: 'AI-supported IELTS practice for speaking, writing, and feedback.' },
  { title: 'Virtual Try Room', where: 'XactGen, client', text: 'Browser extension that lets a person upload a garment and a photo to try clothing on virtually.' },
  { title: 'Fertiliser recommendation', where: 'XactGen, client', text: 'Machine-learning recommendations on an edge device for field use with limited connectivity.' },
  { title: 'INSPAL', where: 'Client delivery', text: 'Inspection workflows, scoring, and reports, with scheduling and role-based access.' },
  { title: 'GoFlix', where: 'USA client', text: 'Movie browsing and playback web app built with Next.js.' },
  { title: 'LocalGov', where: 'Civic data', text: 'Local-government records and reports, with a database and language-model summaries.' },
  { title: 'Text keyboard LLM', where: 'Professional project', text: 'Fine-tuned language model for next-word prediction and writing suggestions.' },
  { title: 'LLM fine-tuning and API deploy', where: 'Professional project', text: 'Domain-specific model fine-tuning connected to web apps through APIs.' },
  { title: 'Generative AI chatbot', where: 'Personal project', text: 'Context-aware chatbot focused on prompt design and response quality.' },
  { title: 'Telco customer churn', where: 'Kaggle, ashirzaki', text: 'Classification model for customers at risk of leaving, from cleaning through evaluation.' },
  { title: 'NYC taxi fare, PySpark', where: 'Kaggle, ashirzaki', text: 'Distributed regression pipeline on the NYC taxi fare data with Apache Spark.' },
  { title: 'Titanic survival', where: 'Kaggle', text: 'Classification with missing-value handling, feature engineering, and standard evaluation.' },
  { title: 'Pakistan sentiment dashboard', where: 'Professional project', text: 'Web dashboard for sentiment on Pakistan-focused sources, with filters and trends.' },
  { title: 'Statistical analysis and visualisation', where: 'Datix AI, client', text: 'Client analysis in R and SPSS, with hypothesis testing and Tableau dashboards.' },
  { title: 'MS Access database', where: 'Freelance client', text: 'Relational database with forms, queries, and reports.' },
  { title: 'Keyboard device driver', where: 'University coursework', text: 'Windows keyboard driver for input events, from an operating-systems course.' },
]

const awards = [
  { title: 'Gold medalist', detail: 'BS Data Science, University of Kotli, 2025. Highest standing in the cohort, CGPA 3.89/4.00.' },
  { title: 'Prime Minister’s Youth Laptop Scheme', detail: 'Government of Pakistan, 2023, awarded for academic standing.' },
  { title: 'First student-led startup', detail: 'XactGen, registered under the Software Technology Park (SCO STP), 2025.' },
]

const certificates = [
  ['Google Data Analytics', 'Google / Coursera', '2022'],
  ['Data Visualization with Tableau', 'Coursera', '2022'],
  ['Data Analysis and Visualization in Power BI', 'Coursera', '2023'],
  ['Introduction to Big Data with Hadoop and Spark', 'Coursera', '2023'],
  ['Google AI Essentials', 'Google / Coursera', '2023'],
  ['Neural Networks and Deep Learning', 'Coursera', '2023'],
  ['Introduction to Artificial Intelligence', 'Coursera', '2022'],
  ['Machine Learning with Apache Spark', 'Coursera', '2024'],
  ['Improving Deep Neural Networks', 'Coursera', '2024'],
  ['Generative AI: Introduction and Applications', 'Coursera', '2024'],
  ['Generative AI: Prompt Engineering Basics', 'Coursera', '2025'],
  ['Getting Started with Microsoft Excel', 'Coursera', '2022'],
  ['Charts and Dashboards using Google Sheets', 'Coursera', '2022'],
]

export default function AsherMehfoozPage() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Asher Mehfooz',
    alternateName: ['Ashir Mehfooz', 'Hashir'],
    jobTitle: 'Founder and CEO, XactGen AI',
    url: `${SITE.url}/asher-mehfooz`,
    image: SITE.ceo.photo,
    worksFor: { '@type': 'Organization', name: 'XactGen AI', url: SITE.url },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Kotli' },
    sameAs: [SITE.ceo.linkedin, SITE.github, 'https://www.kaggle.com/ashirzaki', 'https://asher-mehfooz-portfolio.vercel.app/'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start mb-16">
            <Image
              src="/team/ashir-mehfooz.jpg"
              alt="Asher Mehfooz, founder and CEO of XactGen AI"
              width={896}
              height={1195}
              priority
              className="w-full h-auto rounded-2xl border border-white/[0.06]"
            />
            <div>
              <p className="text-aurora-cyan text-sm font-medium uppercase tracking-widest mb-3">Founder and CEO, XactGen AI</p>
              <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mb-4">Asher Mehfooz</h1>
              <p className="text-slate-300 leading-relaxed mb-4">
                Asher Mehfooz, known publicly as Ashir Mehfooz, is an AI developer and data scientist. He is the founder and chief executive of XactGen AI, and an AI developer and research team head at ROBX.AI.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                He earned a BS in Data Science from the University of Kotli (October 2021 – December 2025) with a CGPA of 3.89/4.00, and graduated as gold medalist. His thesis manuscript, on a multimodal tutoring system for early childhood education, has been submitted for first editorial review.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a href={SITE.ceo.linkedin} className="text-aurora-cyan hover:opacity-80" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={SITE.github} className="text-aurora-cyan hover:opacity-80" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.kaggle.com/ashirzaki" className="text-aurora-cyan hover:opacity-80" target="_blank" rel="noopener noreferrer">Kaggle</a>
                <a href="mailto:info.hasher@gmail.com" className="text-aurora-cyan hover:opacity-80">Email</a>
                <a href={`https://wa.me/${SITE.whatsapp}`} className="text-aurora-cyan hover:opacity-80" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Research interests</h2>
            <ul className="space-y-2 text-slate-300">
              {research.map(item => <li key={item} className="leading-relaxed">{item}</li>)}
            </ul>
          </section>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Thesis</h2>
            <h3 className="text-white font-medium mb-2">A Multimodal AI-Driven Intelligent Tutoring System for Personalized Early Childhood Education</h3>
            <p className="text-slate-500 text-sm mb-3">Asher Mehfooz · 2025 · submitted for first editorial review</p>
            <p className="text-slate-300 leading-relaxed">
              A web tutoring system for children aged 3–6, combining generative AI, text-to-speech, and 3D animated avatars to teach alphabets, numbers, colours, and shapes, with a poem generator, a drawing canvas, and a teacher dashboard.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Experience</h2>
            <div className="space-y-8">
              {experience.map(job => (
                <div key={job.org}>
                  <h3 className="text-white font-medium">{job.role} · {job.org}</h3>
                  <p className="text-slate-500 text-sm mb-2">{job.when} · {job.place}</p>
                  <ul className="space-y-1 text-slate-300">
                    {job.points.map(point => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillGroups.map(group => (
                <div key={group.title}>
                  <h3 className="text-white font-medium mb-2">{group.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map(project => (
                <div key={project.title} className="rounded-2xl border border-white/[0.06] bg-space-800/40 p-5">
                  <h3 className="text-white font-medium mb-1">{project.title}</h3>
                  <p className="text-aurora-cyan text-xs mb-2">{project.where}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Awards</h2>
            <div className="space-y-4">
              {awards.map(award => (
                <div key={award.title}>
                  <h3 className="text-white font-medium">{award.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{award.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display font-semibold text-2xl text-white mb-4">Certifications</h2>
            <p className="text-slate-500 text-sm mb-4">Thirteen courses, issued through Coursera.</p>
            <ul className="space-y-2 text-slate-300 text-sm">
              {certificates.map(([name, by, year]) => (
                <li key={name}>{name} · {by} · {year}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
