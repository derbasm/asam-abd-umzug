'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getTrackingConsent } from '@/lib/analytics';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (getTrackingConsent() === 'granted') {
      setEnabled(true);
    }

    const onConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setEnabled(customEvent.detail === 'granted');
    };

    window.addEventListener('tracking-consent-updated', onConsentUpdate);
    return () => {
      window.removeEventListener('tracking-consent-updated', onConsentUpdate);
    };
  }, []);

  if (!MEASUREMENT_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            anonymize_ip: true,
            allow_google_signals: false
          });
        `}
      </Script>
    </>
  );
}
