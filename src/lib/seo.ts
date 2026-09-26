import { Metadata } from 'next'
import { SITE } from '@/lib/site'

/**
 * SEO helpers , expert-level structured data for both search engines and
 * LLM-based answer engines (ChatGPT, Perplexity, Google AI Overviews).
 *
 * Emits:
 *   - Organization
 *   - LocalBusiness (with geo coordinates in Kotli, AJK)
 *   - WebSite (with SearchAction)
 *   - Service (per service page)
 *   - BreadcrumbList
 *   - FAQPage
 *   - Article (per blog post)
 *   - Person (Ashir Mehfooz, CEO)
 */

const SITE_URL = SITE.url
const SITE_NAME = 'XactGen AI'
const DEFAULT_TITLE = 'XactGen AI | Exact Solutions for the Next Generation'
const DEFAULT_DESCRIPTION =
  'XactGen, led by founder and CEO Ashir Mehfooz, is an AI and data science company building smart solutions for real-world problems: AI model development, data analytics, web and app development, and documentation and academic support.'

// Kotli, Azad Kashmir, Pakistan
const GEO = {
  latitude: 33.5183,
  longitude: 73.8994,
  city: 'Kotli',
  region: 'Azad Jammu & Kashmir',
  regionCode: 'AJK',
  country: 'PK',
  postalCode: '11100',
  streetAddress: 'Software Technology Park, University of Kotli AJK',
}

// Countries served (priority markets first)
const SERVED_COUNTRIES: Array<[string, string]> = [
  ['US', 'United States'],
  ['CA', 'Canada'],
  ['GB', 'United Kingdom'],
  ['AU', 'Australia'],
  ['DE', 'Germany'],
  ['IT', 'Italy'],
  ['AE', 'United Arab Emirates'],
  ['SA', 'Saudi Arabia'],
  ['QA', 'Qatar'],
  ['KW', 'Kuwait'],
  ['BH', 'Bahrain'],
  ['OM', 'Oman'],
  ['IN', 'India'],
  ['HN', 'Honduras'],
  ['PK', 'Pakistan'],
]
const AREA_SERVED = SERVED_COUNTRIES.map(([, name]) => ({ '@type': 'Country', name }))

// Keyword sets , targeted for local + regional + LLM discovery
const KEYWORDS_CORE = [
  'data science company',
  'AI development company',
  'AI consulting company USA',
  'machine learning development services',
  'hire AI developers',
  'offshore AI development team',
  'data science consulting USA',
  'AI company Canada',
  'AI development company UK',
  'AI development company Australia',
  'computer vision development company',
  'NLP development services',
  'generative AI development company',
  'custom AI solutions',
  'data analytics services',
  'AI company Pakistan',
  'AI company Lahore',
  'AI company Karachi',
  'AI company Islamabad',
  'AI company Mirpur',
  'XactGen',
  'Ashir Mehfooz',
  'CEO of XactGen',
]

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  keywords?: string[]
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const fullDesc = description || DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/og-image.png`

  return {
    title: fullTitle,
    description: fullDesc,
    keywords: keywords || KEYWORDS_CORE,
    authors: [{ name: 'XactGen', url: SITE_URL }],
    creator: 'XactGen',
    publisher: 'XactGen',
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description: fullDesc,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDesc,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in .env.local and Vercel
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    category: 'Technology',
  }
}

/**
 * generateJsonLd , structured data blocks for search engines and LLMs.
 */
export function generateJsonLd(
  type: 'organization' | 'localBusiness' | 'website' | 'service' | 'breadcrumb' | 'faq' | 'article' | 'person',
  data?: Record<string, any>,
) {
  if (type === 'organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'XactGen AI',
      alternateName: ['XactGen', 'XACTGEN', 'Xactgen', 'XactGen Pakistan', 'xactgenai.com'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      slogan: 'Exact Solutions for the Next Generation',
      founder: { '@id': `${SITE_URL}/#founder`, name: SITE.ceo.name },
      address: {
        '@type': 'PostalAddress',
        streetAddress: GEO.streetAddress,
        addressLocality: GEO.city,
        addressRegion: GEO.region,
        postalCode: GEO.postalCode,
        addressCountry: GEO.country,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE.phoneIntl,
          contactType: 'customer service',
          areaServed: SERVED_COUNTRIES.map(([code]) => code),
          availableLanguage: ['English', 'Urdu'],
        },
      ],
      sameAs: [SITE.linkedin],
      email: SITE.email,
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'Data Engineering',
        'Data Analytics',
        'Business Intelligence',
        'Generative AI',
        'Large Language Models',
        'MLOps',
        'Edge AI',
        'Web Development',
      ],
    }
  }

  if (type === 'localBusiness') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'XactGen AI',
      alternateName: 'XactGen',
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og-image.png`,
      telephone: SITE.phoneIntl,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: GEO.streetAddress,
        addressLocality: GEO.city,
        addressRegion: GEO.region,
        postalCode: GEO.postalCode,
        addressCountry: GEO.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: GEO.latitude,
        longitude: GEO.longitude,
      },
      areaServed: AREA_SERVED,
      sameAs: [SITE.linkedin],
    }
  }

  if (type === 'website') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  if (type === 'person') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: SITE.ceo.name,
      alternateName: ['Asher Mehfooz', 'Hashir'],
      jobTitle: 'Founder and CEO',
      description: 'Ashir Mehfooz is the founder and CEO of XactGen and an AI developer at ROBX.AI. He earned a BS in Data Science from the University of Kotli.',
      url: `${SITE_URL}/about`,
      image: {
        '@type': 'ImageObject',
        url: SITE.ceo.photo,
        contentUrl: SITE.ceo.photo,
        caption: 'Ashir Mehfooz, founder and CEO of XactGen',
      },
      worksFor: { '@id': `${SITE_URL}/#organization` },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Kotli',
        address: 'Kotli, Azad Jammu and Kashmir, Pakistan',
      },
      sameAs: [SITE.ceo.linkedin, SITE.github],
      knowsAbout: ['Artificial Intelligence', 'Data Science', 'Large Language Models', 'Retrieval-Augmented Generation'],
    }
  }

  if (type === 'service' && data) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: data.name,
      provider: { '@id': `${SITE_URL}/#organization` },
      name: data.name,
      description: data.description,
      areaServed: AREA_SERVED,
    }
  }

  if (type === 'breadcrumb' && data) {
    const items = (data.items as Array<{ name: string; path: string }>) || []
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    }
  }

  if (type === 'faq' && data) {
    const items = (data.items as { q: string; a: string }[]) || []
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
  }

  if (type === 'article' && data) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.excerpt,
      image: data.image || `${SITE_URL}/brand/mark.png`,
      datePublished: data.date,
      dateModified: data.dateModified || data.date,
      author: { '@id': `${SITE_URL}/#founder` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}${data.path}`,
    }
  }
}
