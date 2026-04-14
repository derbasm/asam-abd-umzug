import type { Metadata } from "next";
import deData from '@/data/site-data.json';
import enData from '@/data/site-data-en.json';
import type { Language } from '@/lib/i18n';

export function generateMetadata(language: Language = 'de', page: string = 'home'): Metadata {
  const data = language === 'de' ? deData : enData;
  const isGerman = language === 'de';
  const baseUrl = 'https://asamabd-umzug.de';
  const pagePrefix = isGerman ? '/de' : '/en';

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

  const defaultTitle = isGerman
    ? `${data.company.name} - Ihr Umzugsservice in Hamm, Dortmund, Münster & Umgebung | Professionelle Umzüge`
    : `${data.company.name} - Your Moving Service in Hamm, Dortmund, Münster & Surrounding Area | Professional Moving`;

  const defaultDescription = isGerman
    ? `✅ Ihr zuverlässiger Umzugspartner in Hamm, Dortmund, Münster & Umgebung ⭐ Privatumzüge, Büroumzüge, Haushaltsauflösung in Ahlen, Bönen, Unna, Kamen ⭐ Günstige Preise ab 75€/Std ⭐ Kostenlose Beratung ☎️ ${data.company.phone}`
    : `✅ Your reliable moving partner in Hamm, Dortmund, Münster & surrounding area ⭐ Residential, Office Moving, House Clearance in Ahlen, Bönen, Unna, Kamen ⭐ Affordable rates from €75/hr ⭐ Free consultation ☎️ ${data.company.phone}`;

  // Page-specific title/description overrides
  const pageKey = page || 'home';
  const titles: Record<string, string> = isGerman
    ? {
        home: `${data.company.name} – Professioneller Umzugsservice in Hamm | Privatumzug & Büroumzug`,
        faq: `${data.company.name} – Häufige Fragen zum Umzug`,
        impressum: `${data.company.name} – Impressum`,
        datenschutz: `${data.company.name} – Datenschutzerklärung`,
        agb: `${data.company.name} – Allgemeine Geschäftsbedingungen`,
        contact: `${data.company.name} – Kontakt & Angebot anfordern`,
        services: `${data.company.name} – Leistungen: Privatumzug, Büroumzug, Möbelmontage`,
      }
    : {
        home: `${data.company.name} – Professional Moving Service in Hamm | Residential & Office Moves`,
        faq: `${data.company.name} – Frequently Asked Questions (FAQ)`,
        impressum: `${data.company.name} – Legal Notice`,
        datenschutz: `${data.company.name} – Privacy Policy`,
        agb: `${data.company.name} – Terms & Conditions`,
        contact: `${data.company.name} – Contact & Request a Quote`,
        services: `${data.company.name} – Services: Residential, Office, Furniture Assembly`,
      };

  const descriptions: Record<string, string> = isGerman
    ? {
        home: defaultDescription,
        faq: `Antworten auf häufige Fragen zum Umzug mit Tipps zur Vorbereitung, Preisgestaltung und Ablauf. ${data.company.phone}`,
        impressum: `Impressum und Kontaktdaten von ${data.company.name}. Telefon: ${data.company.phone}`,
        datenschutz: `Informationen zum Umgang mit Ihren personenbezogenen Daten bei ${data.company.name}.`,
        agb: `Allgemeine Geschäftsbedingungen für die Umzugsdienstleistungen von ${data.company.name}.`,
        contact: `Kontaktieren Sie ${data.company.name} für ein kostenloses Umzugsangebot. Telefon: ${data.company.phone}`,
        services: `Unsere Leistungen: Privatumzug, Büroumzug, Verpackungsservice, Möbelmontage. Jetzt unverbindliches Angebot anfordern.`,
      }
    : {
        home: defaultDescription,
        faq: `Answers to common moving questions with tips on preparation, pricing and process. Call ${data.company.phone}`,
        impressum: `Legal notice and contact information for ${data.company.name}. Phone: ${data.company.phone}`,
        datenschutz: `Information about how ${data.company.name} handles your personal data.`,
        agb: `Terms and conditions for moving services provided by ${data.company.name}.`,
        contact: `Contact ${data.company.name} to request a free moving quote. Phone: ${data.company.phone}`,
        services: `Services: residential moves, office moves, packing, furniture assembly. Request a quote.`,
      };

  const title = titles[pageKey] ?? defaultTitle;
  const description = descriptions[pageKey] ?? defaultDescription;

  // build canonical and alternate language URLs for the same page
  const buildPath = (langIsGerman: boolean) => {
    const prefix = langIsGerman ? '/de' : '/en';
    return `${baseUrl}${prefix}${pageKey === 'home' ? '' : `/${pageKey}`}`;
  };

  const pageUrl = buildPath(isGerman);

  // Build a flexible "other" meta object so we can optionally include
  // verification tokens from environment variables without hardcoding.
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  const otherMeta: Record<string, string> = {
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
  };

  if (googleVerification) {
    otherMeta['google-site-verification'] = googleVerification;
  }

  return {
    title,
    description,
    keywords: seoKeywords,
    
    // Open Graph Meta Tags
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: pageUrl,
      siteName: data.company.name,
      title,
      description,
      images: [
        {
          url: 'https://asamabd-umzug.de/images/logo.webp',
          width: 1200,
          height: 630,
          alt: `${data.company.name} Logo`,
        },
        {
          url: 'https://asamabd-umzug.de/images/swipper/01.webp',
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
      images: ['https://asamabd-umzug.de/images/logo.webp'],
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
    
    // Canonical URL
    alternates: {
      canonical: pageUrl,
      languages: {
        'de-DE': buildPath(true),
        'en-US': buildPath(false),
        'x-default': buildPath(false),
      },
    },
    
    // Other Meta Tags
    category: 'Moving Services',
    classification: 'Business',
    other: otherMeta,
  };
}
