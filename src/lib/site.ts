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
  // Exact pin saved on the XactGen AI Business Profile, not the university label.
  mapsQuery: '33.4856725,73.9031222',
  ceo: {
    name: 'Ashir Mehfooz',
    title: 'Founder and CEO, XactGen',
    linkedin: 'https://www.linkedin.com/in/ashir-mehfooz',
    photo: 'https://www.xactgenai.com/team/ashir-mehfooz.jpg',
    photoAlt: 'Ashir Mehfooz, founder and CEO of XactGen',
  },
}

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
