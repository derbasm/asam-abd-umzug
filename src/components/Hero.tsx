'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative isolate bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-secondary-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl container-padding">
        <div className="relative pt-14 lg:pt-20 pb-20 lg:pb-32">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <motion.div 
              className="px-6 lg:px-0 lg:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
                <div className="mb-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-x-2 rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-600 ring-1 ring-inset ring-primary-600/20"
                  >
                    <span>Kostenlose Beratung</span>
                    <span aria-hidden="true" className="text-primary-600/60">→</span>
                  </Link>
                </div>
                <h1 className="mt-10 font-heading gradient-text">
                  Ihr Partner für stressfreie Umzüge
                </h1>
                <p className="mt-6 text-lg text-accent-600">
                  Wir machen Ihren Umzug zu einem reibungslosen Erlebnis. Mit unserem erfahrenen Team und modernster Ausrüstung sorgen wir für einen professionellen und effizienten Umzugsservice.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="#contact"
                    className="btn-primary"
                  >
                    Kostenvoranschlag anfordern
                  </Link>
                  <Link
                    href="#services"
                    className="group inline-flex items-center gap-x-2 text-base font-medium text-accent-900 hover:text-primary-600"
                  >
                    Unsere Leistungen
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-20 sm:mt-24 lg:mt-0 lg:col-span-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mx-auto max-w-2xl lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-2xl bg-accent-50 shadow-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Professioneller Umzugsservice"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 