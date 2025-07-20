'use client';

import { motion } from 'framer-motion';
import { TruckIcon, HomeIcon, BuildingOfficeIcon, ArchiveBoxIcon, WrenchScrewdriverIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

// Icon mapping
const iconMap = {
  HomeIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
};

export default function Services() {
  const { data } = useTranslations();
  const { services } = data;

  return (
    <div className="section-padding bg-gradient-to-b from-white via-accent-50/50 to-white">
      <div className="container mx-auto max-w-7xl container-padding">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wide text-primary-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {services.subtitle}
          </motion.p>
          <motion.h2
            className="mt-2 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {services.title}
          </motion.h2>
          <motion.p
            className="mt-4 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {services.description}
          </motion.p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || HomeIcon;
            return (
              <motion.div
                key={service.title}
                className="card p-8 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="relative">
                  <div className="icon-container mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-accent-600">{service.description}</p>
                  <div className="mt-6">
                    <Link
                      href="#contact"
                      className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium group/link"
                    >
                      Mehr erfahren
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 