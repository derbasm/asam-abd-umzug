'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

function Footer() {
  const { data } = useTranslations();
  const { footer } = data;
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Start', href: '#' },
      { name: 'Leistungen', href: '#services' },
      { name: 'Über uns', href: '#about' },
      { name: 'Preise', href: '#pricing' },
      { name: 'Galerie', href: '#gallery' },
      { name: 'Kontakt', href: '#contact' },
    ],
    legal: [
      { name: 'Impressum', href: '/impressum' },
      { name: 'Datenschutz', href: '/datenschutz' },
      { name: 'AGB', href: '/agb' },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-accent-900 to-accent-800 text-white">
      <div className="container-custom section-spacing">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4">
                {data.company.name}
              </h3>
            </div>
            
            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">Telefon</h4>
                <a 
                  href={`tel:${data.company.phone}`} 
                  className="text-accent-300 hover:text-white transition-colors block"
                >
                  {data.company.phone}
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">E-Mail</h4>
                <a 
                  href={`mailto:${data.company.email}`} 
                  className="text-accent-300 hover:text-white transition-colors block break-all"
                >
                  {data.company.email}
                </a>
              </div>
              
              <div className="sm:col-span-2">
                <h4 className="font-semibold text-white mb-2">Adresse</h4>
                <p className="text-accent-300">
                  {data.company.address.street}<br />
                  {data.company.address.zip} {data.company.address.city}
                </p>
              </div>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 sm:mb-6">Rechtliches</h4>
            <nav className="space-y-3">
              {navigation.legal.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="block text-accent-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-accent-700">
          <div className="text-center">
            <p className="text-sm text-accent-300">
              {footer.copyright.replace('{year}', currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);