'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';
import { IMAGES } from '@/constants/images';

export default function Hero() {
  const { data } = useTranslations();
  const { hero } = data;

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-accent-100/20 min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="container-custom">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:col-span-6 flex flex-col justify-center">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
              <h1 className="mt-6 font-heading gradient-text text-balance">
                {hero.title}
              </h1>
              <p className="mt-6 text-lg text-accent-600 text-balance leading-8">
                {hero.subtitle}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-x-6">
                <Link
                  href={hero.cta.primary.link}
                  className="btn-primary btn-mobile w-full sm:w-auto touch-target"
                >
                  {hero.cta.primary.text}
                </Link>
                <Link
                  href={hero.cta.secondary.link}
                  className="group inline-flex items-center gap-x-2 text-base font-medium text-accent-900 hover:text-primary-600 transition-colors duration-200 touch-target"
                >
                  {hero.cta.secondary.text}
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-accent-500">
                <div className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Über 10 Jahre Erfahrung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Professioneller Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Kostenlose Beratung</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-20 lg:col-span-6 lg:mt-0 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-2xl" />
              
              <div className="relative">
                <Image
                  src="/images/logo.webp"
                  alt={`${data.company.name} Logo`}
                  width={512}
                  height={512}
                  className="w-full rounded-2xl shadow-2xl ring-1 ring-accent-900/10 transform hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 