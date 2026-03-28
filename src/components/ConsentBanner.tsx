'use client';

import { useEffect, useState } from 'react';
import { getTrackingConsent, setTrackingConsent } from '@/lib/analytics';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getTrackingConsent();
    setIsVisible(consent === null);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-accent-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
      <div className="container-custom flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-accent-700">
          Wir nutzen optionale Analyse-Cookies, um Klicks auf Telefon, WhatsApp und Formulare zu messen und die Website zu verbessern.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setTrackingConsent('denied');
              setIsVisible(false);
            }}
            className="rounded-md border border-accent-300 px-3 py-2 text-sm font-medium text-accent-700 hover:bg-accent-100"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => {
              setTrackingConsent('granted');
              setIsVisible(false);
            }}
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
