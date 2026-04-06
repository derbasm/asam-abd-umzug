'use client';

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
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {services.subtitle}
          </p>
          <h2 className="py-2 gradient-text">
            {services.title}
          </h2>
          <p className="mt-4 text-accent-600">
            {services.description}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:mt-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || HomeIcon;
            return (
              <div
                key={service.title}
                className="card p-8 relative group"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 