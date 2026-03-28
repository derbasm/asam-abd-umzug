'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslations } from '@/hooks/useTranslations';

export default function Reviews() {
  const { data } = useTranslations();
  const { reviews } = data;

  return (
    <div className="bg-gradient-to-b from-white to-accent-50 section-spacing" id="reviews">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {reviews.subtitle}
          </h2>
          <h2 className="mt-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance">
            {reviews.title}
          </h2>
          <p className="mt-4 text-accent-600">
            {reviews.description}
          </p>
          {/* Aggregate rating badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-yellow-50 border border-yellow-200 px-6 py-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-accent-700">5,0 von 5 – basierend auf 50+ Bewertungen</span>
          </div>
        </div>
        
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {reviews.items.map((review, index) => (
            <article
              key={review.id}
              className="card-interactive group h-full"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-accent-900 group-hover:text-primary-600 transition-colors duration-200">
                      {review.name}
                    </h3>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-sm font-medium text-yellow-600 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                
                {/* Review text */}
                <div className="flex-1">
                  <blockquote className="text-accent-600 leading-relaxed italic">
                    "{review.text}"
                  </blockquote>
                </div>
                
                {/* Bottom border indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
