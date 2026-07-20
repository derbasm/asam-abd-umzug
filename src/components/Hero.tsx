'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useTranslations } from '@/hooks/useTranslations';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const { data } = useTranslations();
  const { hero } = data;

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-accent-100/20 min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="container-custom">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="px-0 lg:px-0 lg:col-span-6 flex flex-col justify-center">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
              <h1 className="py-3 font-heading gradient-text text-balance">
                {hero.title}
              </h1>
              <p className="mt-6 text-lg text-accent-600 text-balance leading-8">
                {hero.subtitle}
              </p>
              <p className="mt-5 inline-flex items-center rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-800">
                Für Umzüge in Hamm, Dortmund, Münster und Umgebung
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-x-6">
                <Link
                  href={hero.cta.primary.link}
                  onClick={() => trackEvent('hero_cta_click', { location: 'hero_primary' })}
                  className="btn-primary btn-mobile w-full sm:w-auto touch-target"
                >
                  {hero.cta.primary.text}
                </Link>
                <a
                  href={`tel:${data.company.phone}`}
                  onClick={() => trackEvent('phone_click', { location: 'hero_secondary' })}
                  className="group inline-flex items-center gap-x-2 text-base font-semibold text-accent-900 hover:text-primary-600 transition-colors duration-200 touch-target"
                >
                  <PhoneIcon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  Jetzt anrufen
                </a>
              </div>
              <div className="mt-9 grid gap-3 border-t border-accent-100 pt-6 text-sm text-accent-700 sm:grid-cols-3 sm:gap-4">
                {['Kostenlos & unverbindlich', 'Persönliche Beratung', 'Transparente Preisabsprache'].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-20 lg:col-span-6 lg:mt-0 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-full sm:max-w-lg lg:max-w-none px-1 sm:px-0">
              {/* Background decoration */}
              <div className="absolute inset-0 sm:-inset-4 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-2xl" />
              
              <div className="relative">
                <div className="relative w-full bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center">
                  <Image
                    src="/images/about-us.webp"
                    alt={`${data.company.name} Team bei einem Umzug`}
                    width={1280}
                    height={853}
                    className="h-full w-full object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>

                <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border-2 border-primary-600">
                  <div className="text-center">
                    <div className="text-sm font-bold text-accent-900">Unverbindlich anfragen</div>
                    <div className="text-xs text-accent-600 mt-0.5">Wir beraten Sie persönlich</div>
                  </div>
                </div>

                {/* Ring decoration */}
                <div className="absolute inset-0 sm:-inset-4 border-2 border-primary-200/50 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
