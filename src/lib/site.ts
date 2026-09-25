/**
 * Company details used across the public site (navbar, footer, contact page,
 * WhatsApp button, SEO structured data). Edit these values in one place.
 */
export const SITE = {
  name: 'XactGen',
  tagline: 'Exact Solutions for the Next Generation',
  // Keep this host fixed. xactgen.com is a different company, so an old env value must not become the canonical URL.
  url: 'https://www.xactgenai.com',
  email: 'contact@datixai.com',
  phoneDisplay: '+92 304 9111104',
  phoneIntl: '+92-304-9111104',
  whatsapp: '923049111104', // digits only, no + or spaces
  linkedin: 'https://www.linkedin.com/company/xactgen/',
  github: 'https://github.com/HashirDS',
  address: 'Software Technology Park, University of Kotli AJK, Pakistan',
  mapsQuery: 'Software+Technology+Park,+University+of+Kotli,+AJK,+Pakistan',
  ceo: {
    name: 'Ashir Mehfooz',
    title: 'Founder and CEO, XactGen',
    linkedin: 'https://www.linkedin.com/in/ashir-mehfooz',
    photo: 'https://www.xactgenai.com/team/ashir-mehfooz.jpg',
    photoAlt: 'Photo of Ashir Mehfooz, also spelled Asher Mehfooz. Hashir is the same person.',
  },
}

export const NAME_LINE =
  'Ashir Mehfooz is also spelled Asher Mehfooz. Hashir is the same person, and his GitHub username is HashirDS.'

/** Visible answers. Structured data must repeat these sentences, not a different version. */
export const CEO_FAQS = [
  {
    q: 'Who is the CEO of XactGen?',
    a: 'Ashir Mehfooz is the founder and CEO of XactGen. The company website is https://www.xactgenai.com/.',
  },
  {
    q: 'Who is Ashir Mehfooz?',
    a: 'Ashir Mehfooz is the founder and CEO of XactGen and an AI developer at ROBX.AI. He earned a BS in Data Science from the University of Kotli. Ashir Mehfooz is also spelled Asher Mehfooz. Hashir is the same person, and his GitHub username is HashirDS. His LinkedIn profile is https://www.linkedin.com/in/ashir-mehfooz and his GitHub profile is https://github.com/HashirDS.',
  },
  {
    q: 'Who is Asher Mehfooz?',
    a: 'Asher Mehfooz is another spelling of Ashir Mehfooz, the founder and CEO of XactGen. The photo on this page is him.',
  },
  {
    q: 'Who is Hashir?',
    a: 'Hashir is Ashir Mehfooz, founder and CEO of XactGen. His GitHub username is HashirDS, and the photo on this page is him.',
  },
]

/**
 * Link that opens a new email in Gmail (in a new tab) with the address filled
 * in. A plain mailto: link needs an email app installed on the visitor's
 * computer, and does nothing when there is none.
 */
export function composeEmailUrl(to: string, subject = ''): string {
  const q = new URLSearchParams({ view: 'cm', fs: '1', to })
  if (subject) q.set('su', subject)
  return `https://mail.google.com/mail/?${q.toString()}`
}
