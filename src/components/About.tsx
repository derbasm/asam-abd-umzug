'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';
import { IMAGES } from '@/constants/images';

export default function About() {
  const { data } = useTranslations();
  const { about } = data;

  return (
    <div className="overflow-hidden bg-white section-spacing" id="about">
      <div className="container-custom">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-12 lg:gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {about.subtitle}
              </h2>
              <h2 className="py-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance">
                {about.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-accent-600 text-balance">
                {about.description}
              </p>
              <dl className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
                {about.features.map((feature, index) => (
                  <div key={feature} className="relative pl-8 group">
                    <dt className="inline font-semibold text-accent-900">
                      <CheckCircleIcon
                        className="absolute left-0 top-1 h-5 w-5 text-primary-600 group-hover:text-secondary-600 transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="inline text-accent-600 text-base leading-relaxed">
                      {feature}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <Image
                src={IMAGES.about.team}
                alt="Asam Abd Umzugsservice - Über uns"
                width={912}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-gray-200/50 aspect-[4/3] object-cover"
                priority
              />
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6">
                <div className="bg-white rounded-full p-4 sm:p-6 shadow-lg border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">10+</div>
                    <div className="text-xs sm:text-sm text-accent-600 whitespace-nowrap">Jahre Erfahrung</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 