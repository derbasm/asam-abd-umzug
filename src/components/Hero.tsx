'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';
import { IMAGES } from '@/constants/images';

export default function Hero() {
  const { data } = useTranslations();
  const { hero } = data;

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-accent-100/20">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-40">
        <motion.div 
          className="px-6 lg:px-0 lg:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
            <div className="mb-8">
              <Link
                href={hero.consultation.link}
                className="inline-flex items-center gap-x-2 rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-600 ring-1 ring-inset ring-primary-600/20"
              >
                <span>{hero.consultation.text}</span>
                <span aria-hidden="true" className="text-primary-600/60">→</span>
              </Link>
            </div>
            <h1 className="mt-10 font-heading gradient-text">
              {hero.title}
            </h1>
            <p className="mt-6 text-lg text-accent-600">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href={hero.cta.primary.link}
                className="btn-primary"
              >
                {hero.cta.primary.text}
              </Link>
              <Link
                href={hero.cta.secondary.link}
                className="group inline-flex items-center gap-x-2 text-base font-medium text-accent-900 hover:text-primary-600"
              >
                {hero.cta.secondary.text}
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-20 sm:mt-24 md:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <Image
              src={IMAGES.hero.main}
              alt="Modern Umzug Service"
              width={912}
              height={600}
              className="w-full max-w-lg rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 