import type { Metadata } from "next";
import deData from '@/data/site-data.json';
import enData from '@/data/site-data-en.json';

export function generateMetadata(language: 'de' | 'en' = 'de'): Metadata {
  const data = language === 'de' ? deData : enData;
  const isGerman = language === 'de';
  
  const seoKeywords = isGerman ? [
    // Primäre Keywords
    "Umzugsservice Hamm",
    "Umzugsunternehmen Hamm", 
    "Umzug Hamm",
    "Möbeltransport Hamm",
    "Umzugshilfe Hamm",
    
    // Sekundäre Keywords
    "Privatumzug Hamm",
    "Büroumzug Hamm", 
    "Haushaltsauflösung Hamm",
    "Möbelmontage Hamm",
    "Verpackungsservice Hamm",
    "Transport Service Hamm",
    
    // Regionale Keywords
    "Umzug NRW",
    "Umzugsservice Westfalen",
    "Möbeltransport Dortmund",
    "Umzug Münster",
    "Umzugsunternehmen Ruhrgebiet",
    
    // Service Keywords
    "professioneller Umzug",
    "günstiger Umzug",
    "Umzug mit Verpackung",
    "Umzug Komplettservice",
    "Entrümpelung",
    "Möbel entsorgen",
    
    // Long-tail Keywords
    "Umzugsunternehmen Hamm günstig",
    "Umzug Hamm Preise",
    "seriöse Umzugsfirma Hamm",
    "Umzugshilfe Hamm Stundenlohn"
  ] : [
    // Primary Keywords
    "Moving Service Hamm",
    "Moving Company Hamm",
    "Professional Movers Hamm",
    "Furniture Transport Hamm",
    "Moving Help Hamm",
    
    // Secondary Keywords  
    "Residential Moving Hamm",
    "Office Moving Hamm",
    "House Clearance Hamm", 
    "Furniture Assembly Hamm",
    "Packing Service Hamm",
    "Transport Service Hamm",
    
    // Regional Keywords
    "Moving NRW",
    "Moving Service Westphalia", 
    "Furniture Transport Dortmund",
    "Moving Münster",
    "Moving Company Ruhr Area",
    
    // Service Keywords
    "professional moving",
    "affordable moving",
    "moving with packing",
    "full service moving",
    "clearance service",
    "furniture disposal",
    
    // Long-tail Keywords
    "cheap moving company Hamm",
    "moving Hamm prices", 
    "reliable moving company Hamm",
    "moving help Hamm hourly rate"
  ];

  const title = isGerman 
    ? `${data.company.name} - Professioneller Umzugsservice in Hamm | Umzugsunternehmen NRW` 
    : `${data.company.name} - Professional Moving Service in Hamm | Moving Company NRW`;
    
  const description = isGerman
    ? `✅ Professioneller Umzugsservice in Hamm & NRW ⭐ Privatumzüge, Büroumzüge, Haushaltsauflösung ⭐ Günstige Preise ab 60€/Std ⭐ Kostenlose Beratung ☎️ ${data.company.phone}`
    : `✅ Professional Moving Service in Hamm & NRW ⭐ Residential, Office Moving, House Clearance ⭐ Affordable rates from €60/hr ⭐ Free consultation ☎️ ${data.company.phone}`;

  return {
    title,
    description,
    keywords: seoKeywords,
    
    // Open Graph Meta Tags
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: 'https://asamabd-umzug.de',
      siteName: data.company.name,
      title,
      description,
      images: [
        {
          url: 'https://asamabd-umzug.de/images/logo.png',
          width: 1200,
          height: 630,
          alt: `${data.company.name} Logo`,
        },
        {
          url: 'https://asamabd-umzug.de/images/swipper/01.jpg',
          width: 1200,
          height: 630,
          alt: isGerman ? 'Professioneller Umzugsservice' : 'Professional Moving Service',
        }
      ],
    },
    
    // Twitter Card Meta Tags
    twitter: {
      card: 'summary_large_image',
      site: '@asamabd_umzug',
      creator: '@asamabd_umzug',
      title,
      description,
      images: ['https://asamabd-umzug.de/images/logo.png'],
    },
    
    // Additional Meta Tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification Tags
    verification: {
      google: 'your-google-site-verification-code',
      yandex: 'your-yandex-verification-code',
    },
    
    // Canonical URL
    alternates: {
      canonical: 'https://asamabd-umzug.de',
      languages: {
        'de-DE': 'https://asamabd-umzug.de',
        'en-US': 'https://asamabd-umzug.de/en',
      },
    },
    
    // Other Meta Tags
    category: 'Moving Services',
    classification: 'Business',
    other: {
      'geo.region': 'DE-NW',
      'geo.placename': 'Hamm',
      'geo.position': '51.6806;7.8203',
      'ICBM': '51.6806, 7.8203',
      'business:contact_data:locality': 'Hamm',
      'business:contact_data:region': 'Nordrhein-Westfalen',
      'business:contact_data:postal_code': '59077',
      'business:contact_data:country_name': 'Germany',
      'business:contact_data:phone_number': data.company.phone,
      'business:contact_data:email': data.company.email,
    },
  };
}
