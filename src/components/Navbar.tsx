'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-safari shadow-lg border-b border-accent-100/50'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4 lg:py-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5 flex items-center gap-3 touch-target">
            <div className="relative">
              <Image
                src="/images/logo.webp"
                alt={`${data.company.name} Logo`}
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur-md -z-10" />
            </div>
            <span className="font-heading text-xl sm:text-2xl font-bold text-primary-600 whitespace-nowrap">
              {data.company.name.split(' ')[0]}
              <span className="text-secondary-600 hidden sm:inline"> {data.company.name.split(' ').slice(1).join(' ')}</span>
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-lg p-2 text-accent-700 hover:bg-accent-50 hover:text-accent-900 transition-all duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{data.ui.navigation.openMenu}</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
          {data.navigation.map((item, index) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="relative px-3 py-2 text-sm font-semibold text-accent-900 hover:text-primary-600 transition-all duration-200 group touch-target"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#contact"
            className="btn-primary text-sm px-5 py-2.5 shadow-md hover:shadow-lg"
          >
            Jetzt anfragen
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-accent-900/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-accent-900/10 safe-padding-top safe-padding-bottom">
          <div className="flex items-center justify-between mb-8">
            <Link href="#" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative">
                <Image
                  src="/images/logo.webp"
                  alt={`${data.company.name} Logo`}
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur-sm -z-10" />
              </div>
              <span className="font-heading text-xl font-bold text-primary-600">
                {data.company.name.split(' ')[0]}
                <span className="text-secondary-600"> {data.company.name.split(' ').slice(1).join(' ')}</span>
              </span>
            </Link>
            <button
              type="button"
              className="touch-target rounded-lg p-2 text-accent-700 hover:bg-accent-50 hover:text-accent-900 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{data.ui.navigation.closeMenu}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-2">
              {data.navigation.map((item, index) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3 text-base font-semibold text-accent-900 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                      {item.name.charAt(0)}
                    </span>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Mobile CTA */}
            <div className="mt-8 pt-6 border-t border-accent-200">
              <Link
                href="#contact"
                className="btn-primary w-full text-center block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jetzt anfragen
              </Link>
              {/* Contact info in mobile menu */}
              <div className="mt-6 space-y-4">
                <a href={`tel:${data.company.phone}`} className="flex items-center gap-3 text-sm text-accent-600 hover:text-primary-600 transition-colors">
                  <span>{data.company.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-accent-600">
                  <span>{data.company.email}</span>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
} 