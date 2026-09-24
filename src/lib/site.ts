/**
 * Company details used across the public site (navbar, footer, contact page,
 * WhatsApp button, SEO structured data). Edit these values in one place.
 */
export const SITE = {
  name: 'XactGen',
  tagline: 'Exact Solutions for the Next Generation',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://xactgen.com',
  email: 'contact@datixai.com',
  phoneDisplay: '+92 304 9111104',
  phoneIntl: '+92-304-9111104',
  whatsapp: '923049111104', // digits only, no + or spaces
  linkedin: 'https://www.linkedin.com/company/xactgen/',
  address: 'Software Technology Park, University of Kotli AJK, Pakistan',
  mapsQuery: 'Software+Technology+Park,+University+of+Kotli,+AJK,+Pakistan',
  ceo: {
    name: 'Ashir Mehfooz',
    title: 'CEO, XactGen',
    photo: '/team/ashir-mehfooz.png',
  },
}
