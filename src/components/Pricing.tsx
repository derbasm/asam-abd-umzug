'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  const { data } = useTranslations();
  const { pricing } = data;

  return (
    <div className="bg-gradient-to-b from-white via-accent-50 to-white section-spacing" id="pricing">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {pricing.subtitle}
          </motion.h2>
          <motion.h2
            className="mt-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {pricing.title}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {pricing.description}
          </motion.p>
        </div>

        <motion.div
          className="isolate mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {pricing.tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.id}
              className={classNames(
                tier.featured 
                  ? 'relative lg:-mt-4 ring-2 ring-primary-600 shadow-2xl scale-105' 
                  : 'ring-1 ring-accent-200 shadow-lg',
                'flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 lg:p-6 xl:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group'
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + tierIdx * 0.1 }}
              whileHover={{ scale: tier.featured ? 1.02 : 1.05 }}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-secondary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="text-center">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-primary-600' : 'text-accent-900',
                      'text-xl sm:text-2xl font-bold leading-8 mb-2'
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm sm:text-base leading-6 text-accent-600 mb-6">{tier.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">{tier.price}</span>
                  </div>
                </div>
                
                <ul role="list" className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-6 text-accent-600 mb-8">
                  {tier.features.map((feature, index) => (
                    <motion.li 
                      key={feature} 
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    >
                      <CheckIcon className="h-5 w-5 flex-none text-primary-600 mt-0.5" aria-hidden="true" />
                      <span className="flex-1">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'btn-primary'
                    : 'btn-secondary',
                  'btn-mobile group relative overflow-hidden'
                )}
              >
                <span className="relative z-10">{pricing.cta}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 