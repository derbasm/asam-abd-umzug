'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';
import { IMAGES } from '@/constants/images';

export default function About() {
  const { data } = useTranslations();
  const { about } = data;

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div
            className="lg:pr-8 lg:pt-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary-600">{about.subtitle}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                {about.title}
              </p>
              <p className="mt-6 text-lg leading-8 text-accent-600">
                {about.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-accent-600 lg:max-w-none">
                {about.features.map((feature) => (
                  <div key={feature} className="relative pl-9">
                    <dt className="inline font-semibold text-accent-900">
                      <CheckCircleIcon
                        className="absolute left-1 top-1 h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                    </dt>{' '}
                    <dd className="inline">{feature}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={IMAGES.about.team}
              alt="Modern Umzug Team"
              width={912}
              height={600}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 