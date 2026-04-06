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
          
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Reviews */}
            <Link
              href="https://share.google/mChHAAqjgcLSf06EO"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border-2 border-accent-200 p-6 sm:p-8 hover:border-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-transparent transition-all duration-300 cursor-pointer"
            >
              <div className="mb-2 w-20 h-20 flex items-center justify-center">
                <img
                  alt="Google"
                  loading="lazy"
                  width="130"
                  height="130"
                  decoding="async"
                  data-nimg="1"
                  className="object-contain h-full w-full"
                  style={{ color: 'transparent' }}
                  srcSet="/_next/image?url=%2Fimages%2Fgooglemaps.webp&w=256&q=75 1x, /_next/image?url=%2Fimages%2Fgooglemaps.webp&w=384&q=75 2x"
                  src="/_next/image?url=%2Fimages%2Fgooglemaps.webp&w=384&q=75"
                />
              </div>
              <h3 className="font-semibold text-lg text-accent-900 mb-2 group-hover:text-primary-600 transition-colors">
                Google
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </Link>

            {/* Kleinanzeigen Reviews */}
            <Link
              href="https://www.kleinanzeigen.de/bewertungen/umzug-asam-abd"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-xl border-2 border-accent-200 p-6 sm:p-8 hover:border-primary-600 hover:bg-gradient-to-br hover:from-primary-50 hover:to-transparent transition-all duration-300 cursor-pointer"
            >
              <div className="mb-2 w-20 h-20 flex items-center justify-center">
                <img
                  alt="Kleinanzeigen"
                  loading="lazy"
                  width="130"
                  height="130"
                  decoding="async"
                  data-nimg="1"
                  className="object-contain h-full w-full"
                  style={{ color: 'transparent' }}
                  srcSet="/_next/image?url=%2Fimages%2Fkleinanzeigen.webp&w=256&q=75 1x, /_next/image?url=%2Fimages%2Fkleinanzeigen.webp&w=384&q=75 2x"
                  src="/_next/image?url=%2Fimages%2Fkleinanzeigen.webp&w=384&q=75"
                />
              </div>
              <h3 className="font-semibold text-lg text-accent-900 mb-2 group-hover:text-primary-600 transition-colors">
                Kleinanzeigen
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
