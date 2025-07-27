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
    
    // Regionale Keywords - Hamm und Umgebung
    "Umzug Dortmund",
    "Umzug Münster", 
    "Umzug Ahlen",
    "Umzug Bönen",
    "Umzug Unna",
    "Umzug Kamen",
    "Umzug Bergkamen",
    "Umzug Werne",
    "Umzug Lünen",
    "Umzugsservice Soest",
    "Umzugsunternehmen Beckum",
    "Möbeltransport Werl",
    "Umzugshilfe Wickede",
    "Transport Pelkum",
    "Umzug Heessen",
    "Umzug Rhynern",
    "Umzug Bockum-Hövel",
    "Umzugsservice Kreis Unna",
    "Umzugsunternehmen Westfalen",
    
    // Service Keywords
    "professioneller Umzug",
    "günstiger Umzug",
    "Umzug mit Verpackung",
    "Umzug Komplettservice",
    "Entrümpelung",
    "Möbel entsorgen",
    
    // Long-tail Keywords - Regional spezifisch
    "Umzugsunternehmen Hamm günstig",
    "Umzug Hamm Preise",
    "seriöse Umzugsfirma Hamm",
    "Umzugshilfe Hamm Stundenlohn",
    "Möbeltransport Dortmund günstig",
    "Umzug Münster Kosten",
    "Privatumzug Ahlen",
    "Büroumzug Bönen",
    "Haushaltsauflösung Unna",
    "Umzugshelfer Kamen",
    "Transportservice Bergkamen",
    "Möbelmontage Werne",
    "Umzugsfirma Lünen",
    "Entrümpelung Soest",
    "Umzug Beckum Preise",
    "Möbeltransport Werl"
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
    
    // Regional Keywords - Hamm and surrounding area
    "Moving Dortmund",
    "Moving Münster",
    "Moving Ahlen", 
    "Moving Bönen",
    "Moving Unna",
    "Moving Kamen",
    "Moving Bergkamen",
    "Moving Werne",
    "Moving Lünen",
    "Moving Service Soest",
    "Moving Company Beckum",
    "Furniture Transport Werl",
    "Moving Help Wickede",
    "Transport Pelkum",
    "Moving Heessen",
    "Moving Rhynern",
    "Moving Bockum-Hövel",
    "Moving Service Kreis Unna",
    "Moving Company Westphalia",
    
    // Service Keywords
    "professional moving",
    "affordable moving",
    "moving with packing",
    "full service moving",
    "clearance service",
    "furniture disposal",
    
    // Long-tail Keywords - Regionally specific
    "cheap moving company Hamm",
    "moving Hamm prices", 
    "reliable moving company Hamm",
    "moving help Hamm hourly rate",
    "affordable furniture transport Dortmund",
    "moving Münster costs",
    "residential moving Ahlen",
    "office moving Bönen", 
    "house clearance Unna",
    "moving helpers Kamen",
    "transport service Bergkamen",
    "furniture assembly Werne",
    "moving company Lünen",
    "clearance service Soest",
    "moving Beckum prices",
    "furniture transport Werl"
  ];

  const title = isGerman 
    ? `${data.company.name} - Ihr Umzugsservice in Hamm, Dortmund, Münster & Umgebung | Professionelle Umzüge` 
    : `${data.company.name} - Your Moving Service in Hamm, Dortmund, Münster & Surrounding Area | Professional Moving`;
    
  const description = isGerman
    ? `✅ Ihr zuverlässiger Umzugspartner in Hamm, Dortmund, Münster & Umgebung ⭐ Privatumzüge, Büroumzüge, Haushaltsauflösung in Ahlen, Bönen, Unna, Kamen ⭐ Günstige Preise ab 60€/Std ⭐ Kostenlose Beratung ☎️ ${data.company.phone}`
    : `✅ Your reliable moving partner in Hamm, Dortmund, Münster & surrounding area ⭐ Residential, Office Moving, House Clearance in Ahlen, Bönen, Unna, Kamen ⭐ Affordable rates from €60/hr ⭐ Free consultation ☎️ ${data.company.phone}`;

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
