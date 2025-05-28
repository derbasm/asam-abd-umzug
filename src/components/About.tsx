'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const stats = [
  { label: 'Jahre Erfahrung', value: '10+' },
  { label: 'Zufriedene Kunden', value: '1000+' },
  { label: 'Erfolgreiche Umzüge', value: '5000+' },
  { label: 'Mitarbeiter', value: '20+' },
];

const features = [
  'Professionelles und erfahrenes Team',
  'Modernste Umzugstechnik und Fahrzeuge',
  'Umfassende Versicherung für Ihre Sicherheit',
  'Transparente Preisgestaltung ohne versteckte Kosten',
  'Flexible Terminplanung nach Ihren Wünschen',
  'Persönliche Beratung und Betreuung',
];

export default function About() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-white via-primary-50 to-white py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
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
              <h2 className="text-base font-semibold leading-7 text-primary-600">Über uns</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                Ihr vertrauenswürdiger Partner für Umzüge
              </p>
              <p className="mt-6 text-lg leading-8 text-accent-600">
                Mit über 10 Jahren Erfahrung in der Umzugsbranche stehen wir für Qualität, Zuverlässigkeit und erstklassigen Service. Unser Ziel ist es, Ihren Umzug so angenehm und stressfrei wie möglich zu gestalten.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-accent-600 lg:max-w-none">
                {features.map((feature) => (
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/about-image.jpg"
                alt="Unser Team bei der Arbeit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="mt-8 flex justify-center gap-x-8 gap-y-4 flex-wrap">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center gap-y-2 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <dt className="text-sm font-medium text-accent-600">{stat.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                    {stat.value}
                  </dd>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 