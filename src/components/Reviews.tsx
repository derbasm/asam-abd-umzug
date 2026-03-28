'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Reviews() {
  return (
    <div className="bg-gradient-to-b from-white to-accent-50 section-spacing" id="reviews">
      <div className="container-custom">
        {/* External Review Platforms Section - Only Google */}
        <div className="mt-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary-600 mb-12">
            Verifizierte Bewertungen
          </p>
          
          <div className="mx-auto max-w-2xl">
            {/* Google Reviews */}
            <Link
              href="https://www.google.com/search?q=asam+abd+umzug+hamm+reviews" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border-2 border-accent-200 p-8 hover:border-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-transparent transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
              </div>
              <h3 className="font-semibold text-lg text-accent-900 mb-2 group-hover:text-primary-600 transition-colors">
                Google Bewertungen
              </h3>
              <p className="text-sm text-accent-600 text-center mb-4">4.9 Sterne • 50+ Bewertungen</p>
              <p className="text-sm text-primary-600 font-medium group-hover:underline">Bewertungen anschauen →</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
