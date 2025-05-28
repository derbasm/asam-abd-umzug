'use client';

import { motion } from 'framer-motion';
import { TruckIcon, HomeIcon, BuildingOfficeIcon, ArchiveBoxIcon, WrenchScrewdriverIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const services = [
  {
    name: 'Privatumzüge',
    description: 'Stressfreier Umzug für Privatpersonen mit professioneller Planung und Durchführung.',
    icon: HomeIcon,
  },
  {
    name: 'Firmenumzüge',
    description: 'Effiziente Büro- und Geschäftsumzüge mit minimaler Ausfallzeit.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Möbelmontage',
    description: 'Fachgerechte Demontage und Montage Ihrer Möbel durch erfahrene Experten.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Lagerung',
    description: 'Sichere und flexible Lagerungsmöglichkeiten für Ihre Gegenstände.',
    icon: ArchiveBoxIcon,
  },
  {
    name: 'Transportservice',
    description: 'Zuverlässiger Transport von Einzelstücken bis hin zu kompletten Haushalten.',
    icon: TruckIcon,
  },
  {
    name: 'Umzugsplanung',
    description: 'Detaillierte Planung und Organisation Ihres Umzugs von Anfang bis Ende.',
    icon: ClipboardDocumentCheckIcon,
  },
];

export default function Services() {
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
            Unsere Dienstleistungen
          </motion.p>
          <motion.h2
            className="mt-2 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professionelle Umzugslösungen
          </motion.h2>
          <motion.p
            className="mt-4 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Wir bieten Ihnen ein umfassendes Angebot an Umzugsdienstleistungen, maßgeschneidert auf Ihre individuellen Bedürfnisse.
          </motion.p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="card p-8 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <div className="relative">
                <div className="icon-container mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                <p className="text-accent-600">{service.description}</p>
                <div className="mt-6">
                  <Link
                    href="#contact"
                    className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium group/link"
                  >
                    Mehr erfahren
                    <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 