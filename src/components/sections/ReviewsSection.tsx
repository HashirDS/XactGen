'use client'
import { useInView } from 'react-intersection-observer'
import OrbitSpin from '@/components/effects/OrbitSpin'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=xactgen'

const reviews = [
  {
    author: 'ben Keville',
    rating: 5,
    text: 'Working with XactGen has been an excellent experience. They took the time to understand exactly what I needed and built spreadsheets that not only work flawlessly but also include automated, self-calculating features that save me a ton of time.',
    date: '4 months ago',
    avatar: 'BK',
    country: 'USA',
    flag: '🇺🇸',
  },
  {
    author: 'Gulnwaz Ali',
    rating: 5,
    text: 'Highly recommended and well-managed team! We needed several services for our business, including ERP system support and maintenance of our official website. Their team handled everything brilliantly and professionally.',
    date: '4 months ago',
    avatar: 'GA',
    country: 'Australia',
    flag: '🇦🇺',
  },
  {
    author: 'Junaid Shahzad',
    rating: 5,
    text: 'XactGen is the best service in Azad Jammu Kashmir. We needed a website for our business — they not only delivered a website but a full experience. We are very happy with their services.',
    date: '4 months ago',
    avatar: 'JS',
    country: 'Pakistan',
    flag: '🇵🇰',
  },
  {
    author: 'Adriano Mazzoni',
    rating: 5,
    text: 'Truly competent, fast and delivers exactly what you ask for, finding the most appropriate solutions. Highly recommended for any AI or data project.',
    date: '4 months ago',
    avatar: 'AM',
    country: 'Italy',
    flag: '🇮🇹',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <article
      ref={ref}
      className={`flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-space-800/40 hover:border-amber-300/30 hover:bg-space-800/70 transition-all duration-300 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/20 flex items-center justify-center text-amber-300 font-display font-semibold text-xs shrink-0">
          {review.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-display font-medium text-white text-[15px] leading-tight tracking-tight capitalize truncate">{review.author}</div>
          <div className="text-xs text-slate-500">{review.country}</div>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">&ldquo;{review.text}&rdquo;</p>
    </article>
  )
}

export default function ReviewsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section relative" id="reviews" aria-label="Client Reviews">
      <div className="container-custom">
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-20 max-w-2xl mx-auto transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl">
            Client <em className="!text-amber-300">Reviews</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <OrbitSpin
              theme="amber"
              size="sm"
              nodes={reviews.map(r => ({
                key: r.avatar + r.author,
                label: r.author,
                href: GOOGLE_REVIEWS_URL,
                external: true,
              }))}
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reviews.map((review, i) => (
                <ReviewCard key={review.author} review={review} index={i} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-amber-300 hover:gap-3 transition-all"
              >
                View more reviews on Google
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
