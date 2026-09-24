/**
 * Content model for the /services page and each /services/[slug] detail page.
 * Structural placeholders only — no invented pricing or fake case study numbers.
 */

export interface ServiceBucket {
  slug: string
  title: string
  summary: string
  tagsShort: string[]
  iconKey: IconKey
}

export type IconKey =
  | 'ai' | 'ml' | 'dl' | 'vision' | 'nlp'
  | 'bi' | 'analytics' | 'web' | 'app' | 'embedded'

export const serviceBuckets: ServiceBucket[] = [
  { slug: 'ai-development',       title: 'AI Development',       summary: 'End-to-end AI solutions built for production.',                              tagsShort: ['Strategy', 'Architecture', 'Deployment'], iconKey: 'ai' },
  { slug: 'machine-learning',     title: 'Machine Learning',     summary: 'Supervised, unsupervised, and reinforcement learning for real problems.',   tagsShort: ['Modeling', 'MLOps', 'Evaluation'],        iconKey: 'ml' },
  { slug: 'deep-learning',        title: 'Deep Learning',        summary: 'Neural network architectures for perception, sequence, and generative tasks.', tagsShort: ['Neural Networks', 'Transformers', 'CNNs'], iconKey: 'dl' },
  { slug: 'computer-vision',      title: 'Computer Vision',      summary: 'Object detection, OCR, and edge deployment on Raspberry Pi.',              tagsShort: ['Object Detection', 'OCR', 'Edge AI'],       iconKey: 'vision' },
  { slug: 'nlp',                  title: 'NLP',                  summary: 'Language understanding, sentiment, chatbots, and generative AI.',          tagsShort: ['LLMs', 'Sentiment', 'Chatbots'],           iconKey: 'nlp' },
  { slug: 'business-intelligence',title: 'Business Intelligence',summary: 'Dashboards, reporting, and BI systems that turn data into decisions.',     tagsShort: ['Dashboards', 'Reporting', 'Metrics'],      iconKey: 'bi' },
  { slug: 'data-analytics',       title: 'Data Analytics',       summary: 'Data pipelines, exploratory analysis, and statistical modeling.',          tagsShort: ['Pipelines', 'Analysis', 'Statistics'],     iconKey: 'analytics' },
  { slug: 'web-development',      title: 'Web Development',      summary: 'Modern web applications built with Next.js, React, and cloud backends.',   tagsShort: ['Next.js', 'React', 'APIs'],                iconKey: 'web' },
  { slug: 'app-development',      title: 'App Development',      summary: 'Cross-platform mobile apps built with React Native and Flutter.',          tagsShort: ['iOS', 'Android', 'React Native'],          iconKey: 'app' },
  { slug: 'embedded-systems',     title: 'Embedded Systems',     summary: 'Firmware and edge AI on Raspberry Pi, Arduino, and microcontrollers.',     tagsShort: ['Raspberry Pi', 'IoT', 'Firmware'],         iconKey: 'embedded' },
]

export function getBucket(slug: string): ServiceBucket | undefined {
  return serviceBuckets.find(b => b.slug === slug)
}
