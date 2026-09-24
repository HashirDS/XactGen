/**
 * Projects imported from Ashir Mehfooz's portfolio
 * (https://asher-mehfooz-portfolio.vercel.app). They are added to Firestore on
 * the admin's next visit (see migratePortfolioProjects in firestore.ts), with
 * their images copied into the database, and can then be edited or deleted
 * from Admin > Projects. The mockup images in public/imports/projects are only
 * the source for that one-time copy.
 */
import type { Project } from '@/types'

const img = (name: string) => `/imports/projects/mockup-${name}.jpg`

export const portfolioProjects: Omit<Project, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'i-am-scientist-teacher-ai-tools', slug: 'i-am-scientist-teacher-ai-tools',
    title: 'I Am Scientist: Teacher AI Tools',
    description: 'Teacher-facing AI tools for the I Am Scientist ed-tech platform.',
    fullDescription: 'Teacher-facing AI tools for the I Am Scientist ed-tech platform, covering data pipelines, model integration, and deployment. Built with a research team at Robx.AI to help teachers plan, track, and support classroom learning.',
    tags: ['LLMs', 'Data Pipelines', 'EdTech', 'Python', 'Model Integration'],
    category: 'AI/ML', featured: true, clientName: 'Robx.AI, research team', imageUrl: img('scientist'),
  },
  {
    id: 'ielts-official-training', slug: 'ielts-official-training',
    title: 'IELTS Official Training',
    description: 'AI-supported IELTS training platform for official exam practice.',
    fullDescription: 'AI-supported IELTS training platform for official exam practice. Covers speaking, writing, and feedback so learners can train in a structured, exam-ready way.',
    tags: ['LLMs', 'Speech', 'NLP', 'Feedback Engine', 'React'],
    category: 'NLP', featured: true, clientName: 'Professional, EdTech', imageUrl: img('ielts'),
  },
  {
    id: 'pulisint', slug: 'pulisint',
    title: 'Pulisint',
    description: 'Live sentiment platform powered by web scraping and an LLM pipeline.',
    fullDescription: 'Live sentiment platform that scrapes online sources and runs them through an LLM pipeline. Shows structured insights on a real-time dashboard.',
    tags: ['LLMs', 'Web Scraping', 'NLP', 'Python', 'Realtime Dashboard'],
    category: 'NLP', featured: true, clientName: 'Robx.AI', imageUrl: img('pulisint'),
  },
  {
    id: 'humint', slug: 'humint',
    title: 'Humint',
    description: 'Social media intelligence tool with LLM analysis.',
    fullDescription: 'Social media intelligence tool that collects public profile data across platforms. Processes it with LLMs and returns structured analysis through API integration.',
    tags: ['Web Scraping', 'LLMs', 'APIs', 'OSINT'],
    category: 'Automation', featured: false, clientName: 'Robx.AI', imageUrl: img('humint'),
  },
  {
    id: 'cyberpulse', slug: 'cyberpulse',
    title: 'CyberPulse (MilGPT)',
    description: 'Secure-network, domain-specific LLM for operational work.',
    fullDescription: 'Secure-network LLM system trained for army operational work. Built as a complete domain-specific model for military use.',
    tags: ['Domain LLM', 'Secure Networks', 'NLP', 'Python', 'Ops Dashboard'],
    category: 'AI/ML', featured: true, clientName: 'MilGPT, defence systems', imageUrl: img('cyberpulse'),
    liveUrl: 'https://cyberpulse.milgpt.com/',
  },
  {
    id: 'rocketforce', slug: 'rocketforce',
    title: 'RocketForce',
    description: 'AI automation and analytics platform with LLM pipelines.',
    fullDescription: 'AI automation and analytics platform for army and client delivery. Covers LLM pipelines, data processing, and a web dashboard.',
    tags: ['LLM Pipelines', 'Analytics', 'Automation', 'Dashboard', 'Python'],
    category: 'Automation', featured: false, clientName: 'MilGPT, client delivery', imageUrl: img('rocketforce'),
    liveUrl: 'https://rocketforce.milgpt.com/',
  },
  {
    id: 'inspal', slug: 'inspal',
    title: 'INSPAL',
    description: 'Digital inspection and evaluation system.',
    fullDescription: 'Digital inspection and evaluation system for inspection workflows, scoring, and reports. Replaces manual inspection work with scheduling, observations, and role-based access.',
    tags: ['Workflows', 'Role-based Access', 'Reporting', 'React', 'PostgreSQL'],
    category: 'Web Development', featured: false, clientName: 'Client delivery', imageUrl: img('inspal'),
  },
  {
    id: 'text-keyboard-llm', slug: 'text-keyboard-llm',
    title: 'Text Keyboard LLM',
    description: 'Fine-tuned LLM for smarter keyboard suggestions.',
    fullDescription: 'Fine-tuned LLM that makes a text keyboard app smarter. Improves next-word prediction and writing suggestions on device.',
    tags: ['LLM Fine-tuning', 'On-device ML', 'NLP', 'Mobile'],
    category: 'NLP', featured: false, clientName: 'Professional project', imageUrl: img('keyboard'),
  },
  {
    id: 'localgov', slug: 'localgov',
    title: 'LocalGov',
    description: 'AI system for local government data, reporting and records.',
    fullDescription: 'AI system for local government data, reporting, and records. End-to-end delivery with database design and LLM-powered reports.',
    tags: ['LLMs', 'Database Design', 'Reporting', 'SQL', 'Civic Data'],
    category: 'AI/ML', featured: false, clientName: 'Civic tech', imageUrl: img('localgov'),
  },
  {
    id: 'goflix', slug: 'goflix',
    title: 'GoFlix',
    description: 'Netflix-style movie streaming platform for a USA client.',
    fullDescription: 'Netflix-style movie streaming platform built for a USA client. Users can browse, watch, and manage titles through a full entertainment web app.',
    tags: ['Next.js', 'Streaming', 'React', 'APIs', 'Media'],
    category: 'Web Development', featured: true, clientName: 'USA client', imageUrl: img('goflix'),
  },
  {
    id: 'pentest-tool', slug: 'pentest-tool',
    title: 'PENTEST Tool',
    description: 'Website security assessment scanner with structured reports.',
    fullDescription: 'Cybersecurity assessment scanner that reviews a website end to end: weak points, exposure, subdomains, TCP, DNS, and open ports. Produces a structured report of findings and risk on the target site.',
    tags: ['Security Assessment', 'DNS', 'Port Scan', 'Reporting', 'Python'],
    category: 'Automation', featured: false, clientName: 'Professional, security', imageUrl: img('pentest'),
  },
  {
    id: 'llm-fine-tuning-web-app-integration', slug: 'llm-fine-tuning-web-app-integration',
    title: 'LLM Fine-Tuning & Web App Integration',
    description: 'Domain-specific LLM fine-tuning connected to web apps through APIs.',
    fullDescription: 'Domain-specific LLM fine-tuning connected to web apps through APIs. Covers model adaptation through to production use.',
    tags: ['LLMs', 'Fine-Tuning', 'Flask', 'REST API'],
    category: 'AI/ML', featured: false, clientName: 'Professional project', imageUrl: img('finetune'),
  },
  {
    id: 'generative-ai-chatbot', slug: 'generative-ai-chatbot',
    title: 'Generative AI Chatbot',
    description: 'Context-aware chatbot built with large language models.',
    fullDescription: 'Context-aware chatbot built with large language models. Focused on prompt design, response quality, and user flow.',
    tags: ['LLMs', 'Prompt Engineering', 'Python'],
    category: 'NLP', featured: false, clientName: 'Personal project', imageUrl: img('chatbot'),
  },
  {
    id: 'fertiliser-recommendation-edge-ml', slug: 'fertiliser-recommendation-edge-ml',
    title: 'Fertiliser Recommendation, Edge ML',
    description: 'ML fertiliser recommendations on an edge device for field use.',
    fullDescription: 'ML-based fertiliser recommendation system deployed on an edge device for low-connectivity agricultural field use. Takes soil and crop parameters and outputs actionable recommendations.',
    tags: ['Machine Learning', 'Edge Device', 'IoT', 'Python'],
    category: 'AI/ML', featured: true, clientName: 'XactGen client', imageUrl: img('edgeml'),
  },
  {
    id: 'virtual-try-room-extension', slug: 'virtual-try-room-extension',
    title: 'Virtual Try Room, Browser Extension',
    description: 'AI browser extension to virtually try on clothing.',
    fullDescription: 'AI-powered browser extension allowing users to upload a garment and a personal photo to virtually try on clothing. Delivered end-to-end for a client.',
    tags: ['Computer Vision', 'AI', 'Browser Extension', 'Python'],
    category: 'AI/ML', featured: true, clientName: 'XactGen client', imageUrl: img('tryon'),
  },
  {
    id: 'telco-customer-churn-prediction', slug: 'telco-customer-churn-prediction',
    title: 'Telco Customer Churn Prediction',
    description: 'Predicting which telecom customers are at risk of churning.',
    fullDescription: 'Predictive system identifying customers at risk of churning. Covers data cleaning, EDA, feature engineering, and classification model evaluation.',
    tags: ['Python', 'Scikit-learn', 'EDA', 'Classification'],
    category: 'Data Analytics', featured: false, clientName: 'Kaggle', imageUrl: img('ml'),
    liveUrl: 'https://kaggle.com/ashirzaki',
  },
  {
    id: 'nyc-taxi-fare-pyspark', slug: 'nyc-taxi-fare-pyspark',
    title: 'NYC Taxi Fare, PySpark',
    description: 'Distributed ML regression pipeline with PySpark.',
    fullDescription: 'Distributed ML regression pipeline built with PySpark on the NYC Taxi Fare dataset, demonstrating big data modelling at scale with Apache Spark.',
    tags: ['PySpark', 'Apache Spark', 'Regression', 'Big Data'],
    category: 'Data Analytics', featured: false, clientName: 'Kaggle', imageUrl: img('ml'),
    liveUrl: 'https://kaggle.com/ashirzaki',
  },
  {
    id: 'titanic-survival-prediction', slug: 'titanic-survival-prediction',
    title: 'Titanic Survival Prediction',
    description: 'Classification model on the Titanic dataset.',
    fullDescription: 'Classification model on the Titanic dataset, including missing value handling, feature engineering, and model evaluation using standard supervised learning metrics.',
    tags: ['Python', 'Scikit-learn', 'Classification'],
    category: 'Data Analytics', featured: false, clientName: 'Kaggle', imageUrl: img('ml'),
    githubUrl: 'https://github.com/HashirDS/EDA-and-Visualization-of-a-Titanic-Dataset',
  },
  {
    id: 'pakistan-sentiment-analysis-dashboard', slug: 'pakistan-sentiment-analysis-dashboard',
    title: 'Pakistan Sentiment Analysis Dashboard',
    description: 'Sentiment dashboard for Pakistan-focused data sources.',
    fullDescription: 'Dynamic web dashboard performing sentiment analysis on Pakistan-focused data sources with real-time filtering, trend tracking, and visual sentiment breakdowns.',
    tags: ['Python', 'NLP', 'Web Dashboard', 'Data Viz'],
    category: 'Data Analytics', featured: false, clientName: 'Professional project', imageUrl: img('data'),
  },
  {
    id: 'statistical-analysis-visualisation', slug: 'statistical-analysis-visualisation',
    title: 'Statistical Analysis & Visualisation',
    description: 'Statistical analysis with R and SPSS, dashboards in Tableau.',
    fullDescription: 'Complete statistical analysis and visualisation project for a client, using R and SPSS for data processing and hypothesis testing, plus Tableau for interactive dashboards.',
    tags: ['R', 'SPSS', 'Tableau', 'Data Reporting'],
    category: 'Data Analytics', featured: false, clientName: 'Freelance client', imageUrl: img('data'),
  },
  {
    id: 'ms-access-database-system', slug: 'ms-access-database-system',
    title: 'MS Access Database System',
    description: 'Relational database in Microsoft Access for a client.',
    fullDescription: 'Structured relational database in Microsoft Access for a client, including schema design, data entry forms, queries, and reporting tailored to their data management needs.',
    tags: ['MS Access', 'Database Design', 'SQL'],
    category: 'Web Development', featured: false, clientName: 'Freelance client', imageUrl: img('database'),
  },
  {
    id: 'keyboard-device-driver-windows', slug: 'keyboard-device-driver-windows',
    title: 'Keyboard Device Driver, Windows',
    description: 'Basic Windows keyboard device driver.',
    fullDescription: 'Basic Windows keyboard device driver handling input events, demonstrating low-level hardware-to-OS interaction and system-level programming concepts.',
    tags: ['C', 'Windows OS', 'Low-level Programming'],
    category: 'Automation', featured: false, clientName: 'University coursework', imageUrl: img('driver'),
  },
]

/** Image and link for the existing Smart Animated Tutor project. */
export const tutorProjectUpdate = {
  id: 'smart-animated-tutor-for-kids',
  imageUrl: img('tutor'),
  liveUrl: 'https://fyp-2-git-main-hashirs-projects-a6498d88.vercel.app/',
}
