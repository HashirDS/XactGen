/**
 * Built-in starting content for the website.
 *
 * The public pages show this until the database has been filled. The first
 * time the admin logs in, it is copied into Firestore (see seedDefaultContent
 * in firestore.ts). From then on everything is read from Firestore and can be
 * edited or deleted in the admin panel. Each item's `id` becomes its
 * Firestore document id, so page links stay the same before and after.
 */
import type { Service, TeamMember, Project, BlogPost } from '@/types'

type Seed<T> = Omit<T, 'createdAt' | 'updatedAt'>

export const defaultServices: Seed<Service>[] = [
  {
    id: 'ai-development', slug: 'ai-development', title: 'AI Development', icon: 'ai', order: 1, active: true,
    shortDescription: 'Custom AI models, generative AI applications and intelligent automation for real-world problems.',
    fullDescription: 'We design and build AI systems end to end: from understanding the problem and the data, to training and evaluating models, to deploying them inside your product or workflow.',
    features: ['Custom AI models', 'Generative AI', 'Intelligent automation', 'Deployment'],
  },
  {
    id: 'machine-learning', slug: 'machine-learning', title: 'Machine Learning', icon: 'ml', order: 2, active: true,
    shortDescription: 'Predictive models and machine learning that solve real business problems.',
    fullDescription: 'Classification, regression, forecasting and recommendation models built on your data, evaluated honestly and delivered in a form your team can use.',
    features: ['Predictive modeling', 'Forecasting', 'Model evaluation'],
  },
  {
    id: 'deep-learning', slug: 'deep-learning', title: 'Deep Learning', icon: 'dl', order: 3, active: true,
    shortDescription: 'Neural networks for vision, language, sequence and generative tasks.',
    fullDescription: 'CNNs, transformers and other neural network architectures, trained or fine-tuned for your task and optimised to run where you need them.',
    features: ['Neural networks', 'Transformers', 'CNNs'],
  },
  {
    id: 'computer-vision', slug: 'computer-vision', title: 'Computer Vision', icon: 'vision', order: 4, active: true,
    shortDescription: 'Object detection, image classification, OCR and edge deployment.',
    fullDescription: 'Systems that understand images and video: detecting and counting objects, reading documents, and running models on affordable edge devices.',
    features: ['Object detection', 'OCR', 'Edge AI'],
  },
  {
    id: 'nlp', slug: 'nlp', title: 'NLP', icon: 'nlp', order: 5, active: true,
    shortDescription: 'Chatbots, language understanding, sentiment analysis and generative AI.',
    fullDescription: 'Chatbots and assistants that answer questions from your own knowledge, plus text classification, sentiment analysis and document processing.',
    features: ['Chatbots', 'LLM apps', 'Sentiment analysis'],
  },
  {
    id: 'business-intelligence', slug: 'business-intelligence', title: 'Business Intelligence', icon: 'bi', order: 6, active: true,
    shortDescription: 'Dashboards and reporting with Excel, Power BI and Tableau.',
    fullDescription: 'Interactive dashboards and reports that turn your numbers into clear decisions, built with Excel, Power BI and Tableau.',
    features: ['Power BI', 'Tableau', 'Excel', 'Reporting'],
  },
  {
    id: 'data-analytics', slug: 'data-analytics', title: 'Data Analytics', icon: 'analytics', order: 7, active: true,
    shortDescription: 'Turning raw data into meaningful insights for smarter decision-making.',
    fullDescription: 'Data cleaning, exploratory analysis, statistics and visualisation that explain what is happening in your data and why.',
    features: ['Data cleaning', 'EDA', 'Statistics', 'Visualisation'],
  },
  {
    id: 'web-development', slug: 'web-development', title: 'Web Development', icon: 'web', order: 8, active: true,
    shortDescription: 'Modern, responsive websites and AI-integrated web applications.',
    fullDescription: 'Websites and web apps built with React, Next.js, Tailwind CSS, Django, Flask and MongoDB, with AI features integrated where they help.',
    features: ['React', 'Next.js', 'Django', 'Flask'],
  },
  {
    id: 'app-development', slug: 'app-development', title: 'App Development', icon: 'app', order: 9, active: true,
    shortDescription: 'Cross-platform mobile apps for Android and iOS.',
    fullDescription: 'Mobile apps for Android and iOS, connected to your data and AI services, designed to be simple for your users.',
    features: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    id: 'embedded-systems', slug: 'embedded-systems', title: 'Embedded Systems', icon: 'embedded', order: 10, active: true,
    shortDescription: 'Firmware and edge AI on Raspberry Pi, Arduino and microcontrollers.',
    fullDescription: 'Embedded software and on-device AI for Raspberry Pi, Arduino and microcontrollers, connecting sensors and cameras to smart decisions.',
    features: ['Raspberry Pi', 'IoT', 'Firmware'],
  },
  {
    id: 'documentation-academic-support', slug: 'documentation-academic-support', title: 'Documentation & Academic Support', icon: 'docs', order: 11, active: true,
    shortDescription: 'Professional project documentation, university projects and research assistance.',
    fullDescription: 'Clear, well-structured documentation for software and research projects, plus guidance on university projects and research work.',
    features: ['Project documentation', 'University projects', 'Research assistance'],
  },
]

export const defaultTeam: Seed<TeamMember>[] = [
  {
    id: 'ashir-mehfooz', name: 'Ashir Mehfooz', role: 'CEO', order: 1,
    imageUrl: 'https://raw.githubusercontent.com/datixai/datixaiweb-assets/main/datixaiwebassests/ashirnewpic.jpeg',
    bio: 'Ashir leads XactGen with a vision to build a leading company that creates smart solutions with real impact. Starting his journey as a BS Data Science student, he has worked on real projects and solved real-world problems.',
    linkedin: 'https://www.linkedin.com/in/ashir-mehfooz',
  },
  {
    id: 'ahmed-ali', name: 'Ahmed Ali', role: 'Head of AI', order: 2,
    imageUrl: 'https://raw.githubusercontent.com/datixai/datixaiweb-assets/main/datixaiwebassests/Ahmed%20Ali.jpeg',
    bio: 'AI Engineer and Data Scientist with hands-on experience building and deploying machine learning models, deep learning systems, computer vision pipelines and full-stack AI applications. Kaggle Notebooks Expert, ranked in the top 2% globally.',
    linkedin: '',
  },
  {
    id: 'saiqa-aziz', name: 'Saiqa Aziz', role: 'Project Manager', order: 3,
    imageUrl: 'https://raw.githubusercontent.com/datixai/datixaiweb-assets/main/datixaiwebassests/saiqa.jpeg',
    bio: 'Saiqa manages projects with strong coordination and leadership, ensuring timely delivery and smooth teamwork at XactGen.',
    linkedin: '',
  },
]

export const defaultProjects: Seed<Project>[] = [
  {
    id: 'smart-animated-tutor-for-kids', slug: 'smart-animated-tutor-for-kids',
    title: 'Smart Animated Tutor for Kids',
    description: 'An intelligent web-based learning system for children aged 2 to 6, with 3D animated avatars.',
    fullDescription: 'An intelligent web-based system for early childhood education. Features include 3D animated avatars, teacher mimicry, poem and song generation, and interactive drawing. It is designed to make learning fun, engaging and intelligent for kids aged 2 to 6.',
    tags: ['Generative AI', '3D Avatars', 'EdTech', 'Web App'],
    category: 'AI/ML', featured: true, clientName: 'XactGen', completedAt: '2025', imageUrl: '',
  },
  {
    id: 'chatbot-personal-assistant', slug: 'chatbot-personal-assistant',
    title: 'Chatbot for Personal Assistant',
    description: 'A personal assistant chatbot for scheduling, questions and task automation.',
    fullDescription: 'Built using real-time APIs for intelligent responses, this chatbot provides personal assistance for scheduling, answering queries and automating everyday tasks. It demonstrates NLP and Generative AI integration in a practical tool.',
    tags: ['NLP', 'Generative AI', 'Chatbot'],
    category: 'NLP', featured: true, clientName: 'XactGen', completedAt: '2025', imageUrl: '',
  },
  {
    id: 'business-dashboards', slug: 'business-dashboards',
    title: 'Business Intelligence Dashboards',
    description: 'Interactive dashboards built with Excel, Power BI and Tableau.',
    fullDescription: 'A set of interactive dashboards built with Excel, Power BI and Tableau, including Heart Attack Analysis, House Price Prediction, Student Performance Analysis and Sales Analysis. Each dashboard turns raw data into clear, filterable views for quick decisions.',
    tags: ['Power BI', 'Tableau', 'Excel', 'Dashboards'],
    category: 'Data Analytics', featured: true, clientName: 'XactGen', completedAt: '2025', imageUrl: '',
  },
]

export const defaultBlogPosts: Seed<BlogPost>[] = [
  {
    id: 'ashir-mehfooz-founder-ceo-xactgen',
    slug: 'ashir-mehfooz-founder-ceo-xactgen',
    title: 'Ashir Mehfooz, Founder and CEO of XactGen',
    excerpt: 'Ashir Mehfooz is the founder and CEO of XactGen, an AI and data science company. He is a gold-medalist data scientist and an AI developer at ROBX.AI.',
    content: `Ashir Mehfooz is the founder and chief executive of XactGen, the AI and data science company behind [xactgenai.com](https://www.xactgenai.com/). He started the firm in September 2025 and registered it under the Software Technology Park at the University of Kotli, Azad Jammu and Kashmir. Clients know the company as XactGen and as XactGen AI.

His name on his curriculum vitae is Asher Mehfooz. His public profile name is Ashir Mehfooz. His GitHub account is [HashirDS](https://github.com/HashirDS), and his LinkedIn profile is [linkedin.com/in/ashir-mehfooz](https://www.linkedin.com/in/ashir-mehfooz).

## Education

He earned a Bachelor of Science in Data Science from the University of Kotli, from October 2021 to December 2025, with a CGPA of 3.89 out of 4.00. He graduated as gold medalist, the highest standing in his cohort. His thesis was the Smart Animated Tutor for Kids, a web system that uses generative AI, text-to-speech, and 3D avatars to teach alphabets, numbers, colours, and shapes to children aged 3 to 6. The project also includes a poem generator, a drawing canvas, and a teacher dashboard.

He was awarded a laptop under the Prime Minister's Youth Laptop Scheme in 2023. The university recognised XactGen as its first student-led startup registered under the Software Technology Park.

## Work

At XactGen he runs client acquisition and delivery. Public work includes a browser-based virtual try-on tool, dashboards, websites, and small AI tools for clients in the United States, Australia, Pakistan, and Italy.

Since November 2025 he has been an AI developer and research team head at ROBX.AI in Islamabad. There he has worked on Pulisint, a system for real-time sentiment analysis, and on teacher-facing tools for the I Am Scientist platform.

From March 2025 to April 2026 he led the AI and data science department at Datix AI in Kotli, taking client work from requirements through dashboards, applications, databases, and language-model pipelines.

From June to August 2025 he interned at Systems Limited in Islamabad, on DevOps and generative AI. He supported CI/CD and Docker, and contributed to a chatbot built with Azure AI.

## Practice

His research interests are large language models, retrieval-augmented generation, natural language processing, and AI for education. The tools he uses include Python, SQL, React, Next.js, PyTorch, TensorFlow, scikit-learn, FastAPI, LangChain, Power BI, Tableau, Docker, and Azure AI.

Between 2022 and 2025 he completed Coursera courses from Google, DeepLearning.AI, and IBM, including Google Data Analytics, Google AI Essentials, neural networks, and prompt engineering. He attended a smart-research workshop at NCAI, NUST Islamabad in 2024, and an AI-for-research workshop at the University of Kotli in 2023.

In May 2026 he was invited to speak on literature-review methods for the Department of Education at the University of Kotli. During his degree he mentored junior students on final-year projects and trained a senior cohort on AI tools for academic referencing. He speaks English and Urdu.`,
    tags: ['CEO of XactGen', 'XactGen AI', 'Ashir Mehfooz', 'Generative AI', 'Data Science'],
    category: 'AI & ML',
    author: 'Ashir Mehfooz',
    published: true,
    featured: true,
    readTime: 6,
    coverImageUrl: '',
    metaTitle: 'Ashir Mehfooz, CEO of XactGen AI',
    metaDescription: 'Ashir Mehfooz is the founder and CEO of XactGen, a gold-medalist data scientist and AI developer working on generative AI, RAG, and applied data science.',
  },
  {
    id: 'why-pakistani-business-should-think-about-ai', slug: 'why-pakistani-business-should-think-about-ai',
    title: 'Why Every Small Business in Pakistan Should Think About AI',
    excerpt: 'AI is no longer just for tech giants. Here is how small businesses in Pakistan can start using AI without breaking the bank.',
    content: '## The AI opportunity in Pakistan\n\nArtificial intelligence used to feel out of reach for small businesses. That is no longer true. Cloud APIs, open source models and lightweight devices mean that a business with a small budget can now build practical AI into its operations.\n\n## Three places to start\n\n1. **Automate the paperwork.** Invoices, receipts and forms are perfect for OCR and language models. What used to take hours can now be done in seconds.\n2. **Understand your customers.** Sentiment analysis on reviews, WhatsApp messages and support tickets tells you what people actually think of your product.\n3. **Forecast the future.** Even a modest amount of historical sales data can power a demand-forecasting model that helps you plan inventory.\n\n## Where XactGen fits in\n\nWe build these systems for businesses, students and schools. Reach out if any of the above sounds useful.',
    tags: ['AI', 'Small Business', 'Pakistan'], category: 'Business', author: 'XactGen',
    published: true, featured: true, readTime: 4, coverImageUrl: '',
    metaTitle: 'AI for Small Business in Pakistan',
    metaDescription: 'How small businesses in Pakistan can start using AI practically and affordably.',
  },
  {
    id: 'ai-3d-avatars-early-childhood-learning', slug: 'ai-3d-avatars-early-childhood-learning',
    title: 'How AI and 3D Avatars Can Make Early Learning Fun',
    excerpt: 'Young children learn best through play, stories and songs. Here is how animated avatars and generative AI can support teachers and parents.',
    content: '## Learning at ages 2 to 6\n\nAt this age children learn through repetition, rhymes, pictures and play. Attention spans are short, so content has to be lively and interactive.\n\n## What AI adds\n\n- **Animated avatars** give children a friendly character to follow, which keeps them engaged longer than static pages.\n- **Teacher mimicry** lets an avatar present lessons in a familiar teaching style.\n- **Poem and song generation** creates new rhymes around the letters, numbers or topics a child is learning.\n- **Interactive drawing** turns practice into play.\n\n## Supporting, not replacing, teachers\n\nThe goal is not to replace teachers or parents. It is to give them a tool that makes practice more fun and frees their time for the moments that need a human.\n\nOur Smart Animated Tutor for Kids brings these ideas together in one web-based system.',
    tags: ['EdTech', 'Generative AI', '3D Avatars'], category: 'AI & ML', author: 'XactGen',
    published: true, featured: false, readTime: 4, coverImageUrl: '',
    metaTitle: 'AI and 3D Avatars for Early Childhood Learning',
    metaDescription: 'How animated avatars, generative songs and interactive drawing can make learning fun for children aged 2 to 6.',
  },
  {
    id: 'raw-data-to-decisions-dashboards', slug: 'raw-data-to-decisions-dashboards',
    title: 'From Raw Data to Decisions: Building Useful Dashboards',
    excerpt: 'A dashboard is only useful if it answers real questions. Our approach to building dashboards in Power BI, Tableau and Excel.',
    content: '## Start with the questions\n\nBefore opening Power BI or Tableau, write down the three to five questions the dashboard must answer. Every chart should map to one of them.\n\n## Clean the data first\n\nMost of the work happens before the first chart: fixing missing values, standardising dates and categories, and checking totals against the source.\n\n## Keep it simple\n\n1. **One page, one purpose.** Split big dashboards into focused pages.\n2. **Put the key numbers at the top.** Totals and trends first, details below.\n3. **Use filters, not more charts.** Let people slice by date, region or product.\n\n## Examples from our work\n\nWe have built dashboards for heart attack risk analysis, house price prediction, student performance and sales analysis. Each started with the same questions-first approach.',
    tags: ['Power BI', 'Tableau', 'Data Analytics'], category: 'Data Science', author: 'XactGen',
    published: true, featured: false, readTime: 3, coverImageUrl: '',
    metaTitle: 'Building Useful Dashboards with Power BI and Tableau',
    metaDescription: 'A practical, questions-first approach to building dashboards in Power BI, Tableau and Excel.',
  },
]
