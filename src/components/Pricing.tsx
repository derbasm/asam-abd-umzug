'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const tiers = [
  {
    name: 'Basis',
    id: 'tier-basic',
    href: '#contact',
    priceMonthly: 'ab 399€',
    description: 'Der perfekte Einstieg für kleine Umzüge.',
    features: [
      'Transport Ihrer Möbel und Kartons',
      '2 erfahrene Umzugshelfer',
      '3,5t Transporter',
      'Basis-Versicherung',
      'Grundlegende Möbelmontage',
      'Standardmäßige Umzugsdecken',
    ],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#contact',
    priceMonthly: 'ab 699€',
    description: 'Die optimale Lösung für mittlere bis große Umzüge.',
    features: [
      'Alles vom Basis-Paket',
      '3-4 erfahrene Umzugshelfer',
      '7,5t LKW mit Hebebühne',
      'Erweiterte Versicherung',
      'Komplette Möbelmontage',
      'Professionelles Verpackungsmaterial',
      'Einlagerungsmöglichkeit (1 Monat)',
      'Entsorgung von Verpackungsmaterial',
    ],
    featured: true,
  },
  {
    name: 'Business',
    id: 'tier-business',
    href: '#contact',
    priceMonthly: 'Individuell',
    description: 'Maßgeschneiderte Lösungen für Firmenumzüge.',
    features: [
      'Alles vom Premium-Paket',
      'Unbegrenzte Anzahl an Helfern',
      'Mehrere LKWs nach Bedarf',
      'Spezial-Versicherung',
      'IT-Equipment Handling',
      'Wochenend-Service',
      'Projektmanager vor Ort',
      'Express-Service möglich',
    ],
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-white via-accent-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Preise
          </motion.h2>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-accent-900 sm:text-5xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Die richtige Lösung für jeden Umzug
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Wählen Sie das passende Paket für Ihre Bedürfnisse. Alle Preise sind Richtwerte und können nach individueller Beratung angepasst werden.
          </motion.p>
        </div>

        <motion.div
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'lg:z-10 lg:rounded-b-none ring-2 ring-primary-600' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-accent-200 xl:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group'
              )}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-semibold shadow-lg">
                  Beliebt
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-primary-600' : 'text-accent-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-accent-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">{tier.priceMonthly}</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-accent-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-xl'
                    : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300',
                  'mt-8 block rounded-full py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 hover:-translate-y-0.5'
                )}
              >
                Jetzt anfragen
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 