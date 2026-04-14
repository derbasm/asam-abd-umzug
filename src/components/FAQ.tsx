'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';

export default function FAQ() {
  const { data } = useTranslations();
  const faq = (data as any).faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq) return null;

  return (
    <section className="bg-white section-spacing" id="faq">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {faq.subtitle}
          </p>
          <h2 className="py-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance">
            {faq.title}
          </h2>
          <p className="mt-4 text-accent-600">
            {faq.description}
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 max-w-3xl divide-y divide-accent-100">
          {faq.items.map((item: { question: string; answer: string }, index: number) => (
            <div key={index} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between text-left gap-4 group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-base sm:text-lg font-semibold text-accent-900 group-hover:text-primary-600 transition-colors duration-200">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform duration-300 mt-0.5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-accent-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-accent-600 mb-4">
            Haben Sie weitere Fragen? Wir helfen Ihnen gerne weiter.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Kostenlose Beratung anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
