/**
 * XactGen — Firebase Seed Script
 * ──────────────────────────────
 * Fills an empty Firestore database with starter content (services, team,
 * projects, one blog post). Safe to run multiple times: existing records
 * (matched by slug / name) are skipped, never duplicated.
 *
 * Reads the Firebase config from .env.local and signs in as the admin user,
 * because firestore.rules only allow the admin to write.
 *
 * Usage (from the project folder):
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword node scripts/seed.js
 * On Windows PowerShell:
 *   $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="yourpassword"; node scripts/seed.js
 */

const fs = require('fs')
const path = require('path')
const { initializeApp, getApps, getApp } = require('firebase/app')
const { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } = require('firebase/firestore')
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')

// Minimal .env.local reader (no extra dependency)
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase is not configured. Copy .env.local.example to .env.local and fill in your values.')
  process.exit(1)
}

// Reuse app if already initialized — avoids duplicate app error
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const services = [
  {
    title: 'AI Development Services',
    slug: 'ai-development',
    shortDescription: 'Custom AI systems tailored to your business needs.',
    fullDescription: 'Unlock the power of artificial intelligence with XactGen comprehensive AI development services. Our expert team combines cutting-edge technologies and innovative solutions to craft intelligent systems tailored to meet the evolving needs of businesses.',
    icon: '🤖',
    features: ['Custom AI model development', 'AI strategy consulting', 'Model training & fine-tuning', 'AI integration with existing systems', 'Ongoing maintenance & optimization'],
    order: 1, active: true,
    metaTitle: 'AI Development Services Pakistan | XactGen',
    metaDescription: 'Professional AI development services in Pakistan. Custom machine learning models, AI integrations, and intelligent automation solutions by XactGen.',
  },
  {
    title: 'Machine & Deep Learning',
    slug: 'machine-learning',
    shortDescription: 'Advanced neural networks and algorithms for business innovation.',
    fullDescription: 'Our specialized services harness the power of advanced algorithms and neural networks to drive business innovation. From developing intricate models to implementing cutting-edge solutions, we ensure your business stays ahead.',
    icon: '🧠',
    features: ['Predictive modeling', 'Neural network architecture', 'Transfer learning', 'Model evaluation & tuning', 'Production deployment'],
    order: 2, active: true,
    metaTitle: 'Machine Learning & Deep Learning Services | XactGen',
    metaDescription: 'Expert machine learning and deep learning solutions in Pakistan. Neural networks, predictive models, and AI-powered automation by XactGen.',
  },
  {
    title: 'Data Analytics & Visualization',
    slug: 'data-analytics',
    shortDescription: 'Transform raw data into actionable business insights.',
    fullDescription: 'Our experts employ advanced analytical techniques and visualization tools to extract meaningful insights from your data. Whether identifying trends, making data-driven decisions, or creating insightful dashboards.',
    icon: '📊',
    features: ['Interactive dashboard design', 'KPI tracking & reporting', 'Statistical analysis', 'Data pipeline development', 'Real-time analytics'],
    order: 3, active: true,
    metaTitle: 'Data Analytics & Visualization Services | XactGen',
    metaDescription: 'Professional data analytics and visualization services. Business intelligence dashboards, KPI tracking, and data-driven insights by XactGen.',
  },
  {
    title: 'Natural Language Processing',
    slug: 'nlp',
    shortDescription: 'Human-like text analysis, generation, and understanding.',
    fullDescription: 'Leveraging cutting-edge NLP techniques, we specialize in analyzing, interpreting, and generating human-like text. From sentiment analysis and text classification to chatbot development and language modeling.',
    icon: '💬',
    features: ['Sentiment & opinion analysis', 'Text classification & tagging', 'Named entity recognition', 'Language translation', 'Document summarization'],
    order: 4, active: true,
    metaTitle: 'NLP Natural Language Processing Services Pakistan | XactGen',
    metaDescription: 'Natural language processing services in Pakistan. Sentiment analysis, text classification, chatbots, and NLP solutions by XactGen.',
  },
  {
    title: 'Computer Vision',
    slug: 'computer-vision',
    shortDescription: 'Intelligent image and video analysis systems.',
    fullDescription: 'We build intelligent visual systems that can perceive, analyze, and understand images and video. From quality control automation to real-time object detection.',
    icon: '👁️',
    features: ['Object detection & tracking', 'Image classification', 'Facial recognition systems', 'Video analytics', 'Medical image analysis'],
    order: 5, active: true,
    metaTitle: 'Computer Vision AI Services Pakistan | XactGen',
    metaDescription: 'Computer vision and image recognition services in Pakistan. Object detection, image classification, and visual AI solutions by XactGen.',
  },
  {
    title: 'Business Intelligence',
    slug: 'business-intelligence',
    shortDescription: 'End-to-end BI from data warehouse to executive dashboards.',
    fullDescription: 'Transform how your organization uses data. Our BI solutions span from data warehousing architecture to executive dashboards, giving leadership the real-time visibility they need.',
    icon: '🏢',
    features: ['Data warehouse design', 'ETL pipeline development', 'Power BI / Tableau dashboards', 'Financial analytics', 'Operational reporting'],
    order: 6, active: true,
    metaTitle: 'Business Intelligence Services Pakistan | XactGen',
    metaDescription: 'Business intelligence and data warehouse solutions in Pakistan. Power BI dashboards, ETL pipelines, and BI consulting by XactGen.',
  },
  {
    title: 'Chatbots & Generative AI',
    slug: 'chatbots-generative-ai',
    shortDescription: 'Intelligent chatbots and AI content generation.',
    fullDescription: 'Our Generative AI capabilities empower you to create dynamic and creative content, from text to images. Whether automating customer support or generating unique content.',
    icon: '🤝',
    features: ['Custom chatbot development', 'LLM integration (GPT, Claude)', 'Customer support automation', 'Content generation systems', 'Voice assistant development'],
    order: 7, active: true,
    metaTitle: 'AI Chatbot & Generative AI Development Pakistan | XactGen',
    metaDescription: 'Custom AI chatbot and generative AI solutions in Pakistan. ChatGPT integration, LLM development, and AI content generation by XactGen.',
  },
  {
    title: 'Web Scraping & Automation',
    slug: 'automation',
    shortDescription: 'Large-scale data extraction and process automation.',
    fullDescription: 'Our expertise in web scraping, coupled with robust automation solutions, ensures efficiency and accuracy in handling large-scale data. Whether market research, data extraction, or process automation.',
    icon: '⚙️',
    features: ['Large-scale web scraping', 'Data extraction pipelines', 'RPA (Robotic Process Automation)', 'API integrations', 'Workflow automation'],
    order: 8, active: true,
    metaTitle: 'Web Scraping & Automation Services Pakistan | XactGen',
    metaDescription: 'Professional web scraping and automation services in Pakistan. Data extraction, RPA, and process automation solutions by XactGen.',
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Dynamic, fast, SEO-optimized web applications.',
    fullDescription: 'Elevate your online presence with cutting-edge web development services. We craft dynamic and user-friendly websites tailored to your unique needs.',
    icon: '🌐',
    features: ['Next.js / React applications', 'E-commerce platforms', 'CMS development', 'API development', 'Performance optimization'],
    order: 9, active: true,
    metaTitle: 'Web Development Services Pakistan | XactGen',
    metaDescription: 'Professional web development services in Pakistan. Next.js, React, e-commerce, and custom web applications by XactGen.',
  },
]

const teamMembers = [
  {
    name: 'Ashir Mehfooz',
    role: 'CEO',
    bio: 'Starting his journey as a BS Data Science student, Ashir has worked on real projects and real-world problems. His vision is to build XactGen into a leading company that creates smart solutions with real impact.',
    imageUrl: '/team/ashir-mehfooz.png',
    linkedin: '',
    order: 1,
  },
  {
    name: 'Saiqa Aziz',
    role: 'Project Manager',
    bio: 'Saiqa manages projects with strong coordination and leadership, ensuring timely delivery and smooth teamwork at XactGen.',
    imageUrl: '',
    linkedin: '',
    order: 2,
  },
  {
    name: 'Mudasar Hussain',
    role: 'Head of Marketing',
    bio: "Mudasar leads marketing strategies and manages the company's website, ensuring XactGen's work reaches the right audience.",
    imageUrl: '',
    linkedin: '',
    order: 3,
  },
  {
    name: 'Zia Ul Arifeen',
    role: 'Head of Finance',
    bio: "Zia manages financial planning and budgeting, ensuring XactGen's growth is stable and sustainable.",
    imageUrl: '',
    linkedin: '',
    order: 4,
  },
]

// ─────────────────────────────────────────────────────────────────
// PROJECTS — from the XactGen portfolio. Edit or delete from the
// admin panel (/admin) after seeding.
// ─────────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Smart Animated Tutor for Kids',
    slug: 'smart-animated-tutor-for-kids',
    description: 'Intelligent web-based system for early childhood education with 3D animated avatars.',
    fullDescription: 'Intelligent web-based system for early childhood education. Features include 3D animated avatars, teacher mimicry, poem/song generation, and interactive drawing. Designed to make learning fun, engaging, and intelligent for kids aged 2 to 6.',
    tags: ['Generative AI', '3D Avatars', 'EdTech', 'Web App'],
    category: 'AI/ML',
    imageUrl: '',
    featured: true,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 1,
  },
  {
    title: 'Chatbot for Personal Assistant',
    slug: 'chatbot-personal-assistant',
    description: 'Personal assistant chatbot for scheduling, queries and task automation.',
    fullDescription: 'Built using real-time APIs for intelligent responses. Provides personal assistance for scheduling, queries, and task automation. Demonstrates NLP and Generative AI integration.',
    tags: ['NLP', 'Generative AI', 'Chatbot'],
    category: 'NLP',
    imageUrl: '',
    featured: true,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 2,
  },
  {
    title: 'Cloud Computing Project (Azure)',
    slug: 'cloud-computing-azure',
    description: 'Scalable applications and services deployed on Microsoft Azure.',
    fullDescription: 'Completed during an internship at Systems Limited. Deployed scalable applications and services using Microsoft Azure, with hands-on experience in cloud deployment, monitoring, and automation.',
    tags: ['Azure', 'Cloud', 'DevOps'],
    category: 'Web Development',
    imageUrl: '',
    featured: false,
    clientName: 'Systems Limited (internship)',
    completedAt: '2025',
    order: 3,
  },
  {
    title: 'Database Management Systems',
    slug: 'database-management-systems',
    description: 'Pharmacy, bank and hotel management systems.',
    fullDescription: 'Pharmacy Management System: streamlined medicine stock, sales, and records. Bank Management System: secure handling of customer accounts and transactions. Hotel Management System: room booking, staff, and guest record management.',
    tags: ['Databases', 'SQL', 'Management Systems'],
    category: 'Web Development',
    imageUrl: '',
    featured: false,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 4,
  },
  {
    title: 'Business Dashboards',
    slug: 'business-dashboards',
    description: 'Interactive dashboards built with Excel, Power BI and Tableau.',
    fullDescription: 'Dashboards built with Excel, Power BI and Tableau. Projects include Heart Attack Analysis, House Price Prediction, Student Performance Analysis and Sales Analysis.',
    tags: ['Power BI', 'Tableau', 'Excel', 'Dashboards'],
    category: 'Data Analytics',
    imageUrl: '',
    featured: true,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 5,
  },
  {
    title: 'Data Science Analyses',
    slug: 'data-science-analyses',
    description: 'World Happiness, Telco customer churn and Air Quality analyses.',
    fullDescription: 'World Happiness Analysis: studied global happiness factors with data visualization. Telco Customer EDA: customer churn analysis for the telecom industry. Air Quality Analysis: environmental data exploration and insights.',
    tags: ['Data Science', 'EDA', 'Visualization'],
    category: 'Data Analytics',
    imageUrl: '',
    featured: false,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 6,
  },
  {
    title: 'Web Development',
    slug: 'web-development-solutions',
    description: 'Modern, responsive web-based solutions.',
    fullDescription: 'We work with modern technologies including HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, React.js, MongoDB, Django, and Flask to design and implement innovative web-based solutions.',
    tags: ['React', 'Django', 'Flask', 'Tailwind CSS'],
    category: 'Web Development',
    imageUrl: '',
    featured: false,
    clientName: 'XactGen',
    completedAt: '2025',
    order: 7,
  },
]

// ─────────────────────────────────────────────────────────────────
// SAMPLE BLOG POST — Placeholder content. Edit or delete from the
// admin panel (/admin) after seeding.
// ─────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    title: 'Why Every Small Business in Pakistan Should Think About AI',
    slug: 'why-pakistani-business-should-think-about-ai',
    excerpt: 'AI is no longer just for tech giants. Here is how small businesses in Pakistan can start using AI without breaking the bank.',
    content: '## The AI opportunity in Pakistan\n\nArtificial intelligence used to feel out of reach for small businesses. That is no longer true. Cloud APIs, open source models, and lightweight devices mean that a business with a small budget can now build practical AI into its operations.\n\n## Three places to start\n\n1. **Automate the paperwork.** Invoices, receipts, and forms are perfect for OCR and language models. What used to take hours can now be done in seconds.\n2. **Understand your customers.** Sentiment analysis on reviews, WhatsApp messages, and support tickets tells you what people actually think of your product.\n3. **Forecast the future.** Even a modest amount of historical sales data can power a demand-forecasting model that helps you plan inventory.\n\n## Where XactGen fits in\n\nWe build these systems for businesses, students and schools. Reach out if any of the above sounds useful.',
    coverImageUrl: '',
    tags: ['AI', 'Small Business', 'Pakistan'],
    category: 'AI & ML',
    author: 'XactGen',
    published: true,
    featured: true,
    readTime: 4,
    metaTitle: 'AI for Small Business in Pakistan | XactGen',
    metaDescription: 'How small businesses in Pakistan can start using AI practically and affordably. Guide by XactGen.',
  },
]

async function seedCollection(collectionName, items, slugField) {
  console.log(`\n📦 Seeding [${collectionName}]...`)
  let added = 0
  let skipped = 0

  for (const item of items) {
    const identifier = item[slugField]

    // Check if document already exists by slug or name
    const q = query(collection(db, collectionName), where(slugField, '==', identifier))
    const existing = await getDocs(q)

    if (!existing.empty) {
      console.log(`  ⏭️  Already exists — skipped: "${item.title || item.name}"`)
      skipped++
      continue
    }

    const ref = await addDoc(collection(db, collectionName), {
      ...item,
      createdAt: serverTimestamp(),
    })
    console.log(`  ✅ Added: "${item.title || item.name}" (id: ${ref.id})`)
    added++
  }

  console.log(`  → Result: ${added} added, ${skipped} already existed`)
  return added
}

async function seed() {
  console.log('╔══════════════════════════════════════╗')
  console.log('║   XactGen — Firebase Database Seed   ║')
  console.log('╚══════════════════════════════════════╝')
  console.log('ℹ️  Duplicate-safe — existing records are skipped\n')

  try {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD
    if (!email || !password) {
      console.error('❌ Set ADMIN_EMAIL and ADMIN_PASSWORD (your Firebase admin login) before running the seed.')
      process.exit(1)
    }
    await signInWithEmailAndPassword(auth, email, password)
    console.log(`🔐 Signed in as ${email}`)

    const servicesAdded = await seedCollection('services', services, 'slug')
    const teamAdded     = await seedCollection('team', teamMembers, 'name')
    const projectsAdded = await seedCollection('projects', projects, 'slug')
    const blogsAdded    = await seedCollection('blog', blogPosts, 'slug')
    const totalAdded    = servicesAdded + teamAdded + projectsAdded + blogsAdded

    console.log('\n══════════════════════════════════════')
    if (totalAdded > 0) {
      console.log(`✨ Done! ${totalAdded} new record(s) added to Firebase.`)
    } else {
      console.log('✅ Nothing to add — all data already exists in Firebase.')
    }
    console.log('👉 Login at /admin/login to manage your content.')
    process.exit(0)

  } catch (err) {
    console.log('\n══════════════════════════════════════')
    if (err.code === 'permission-denied') {
      console.error('❌ Permission denied by Firestore security rules.')
      console.error('   Fix: Go to Firebase Console → Firestore → Rules')
      console.error('   and paste the contents of firestore.rules into the editor.')
      console.error('   Make sure the admin UID in firestore.rules matches your admin user, then click "Publish".')
    } else {
      console.error('❌ Seed failed:', err.message)
    }
    process.exit(1)
  }
}

seed()
