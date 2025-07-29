import deData from '@/data/site-data.json';

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": deData.company.name,
    "alternateName": "Asam Abd Umzugsservice",
    "description": "Professioneller Umzugsservice in Hamm und NRW. Wir bieten Privatumzüge, Büroumzüge, Haushaltsauflösung, Möbelmontage und Transportservice.",
    "url": "https://asamabd-umzug.de",
    "logo": "https://asamabd-umzug.de/images/logo.webp",
    "image": [
      "https://asamabd-umzug.de/images/swipper/01.jpg",
      "https://asamabd-umzug.de/images/swipper/02.jpg",
      "https://asamabd-umzug.de/images/swipper/03.jpg"
    ],
    "telephone": deData.company.phone,
    "email": deData.company.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": deData.company.address.street,
      "addressLocality": deData.company.address.city,
      "postalCode": deData.company.address.zip,
      "addressCountry": "DE",
      "addressRegion": "Nordrhein-Westfalen"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.6806,
      "longitude": 7.8203
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00"
    ],
    "priceRange": "€60-€80 pro Stunde",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 51.6806,
        "longitude": 7.8203
      },
      "geoRadius": "100000"
    },
    "areaServed": [
      "Hamm",
      "Dortmund", 
      "Münster",
      "Unna",
      "Soest",
      "Nordrhein-Westfalen"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Umzugsdienstleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Privatumzug",
            "description": "Professionelle Privatumzüge von der kleinen Wohnung bis zum großen Haus."
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Büroumzug",
            "description": "Professionelle Büroumzüge mit minimaler Ausfallzeit."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Haushaltsauflösung",
            "description": "Professionelle Entrümpelung und Entsorgung von Möbeln und Haushaltsgegenständen."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Möbelmontage", 
            "description": "Fachgerechte Demontage und Montage von Möbeln."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport",
            "description": "Transportservice von A nach B für alle Transportbedürfnisse."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewBody": "Absolut professioneller Service! Das Team war pünktlich, freundlich und sehr vorsichtig mit unseren Möbeln. Der Umzug verlief reibungslos und schneller als erwartet."
      }
    ],
    "sameAs": [
      "https://www.facebook.com/asamabd.umzug",
      "https://www.instagram.com/asamabd.umzug"
    ]
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://asamabd-umzug.de"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Leistungen",
        "item": "https://asamabd-umzug.de#services"
      },
      {
        "@type": "ListItem",
        "position": 3, 
        "name": "Preise",
        "item": "https://asamabd-umzug.de#pricing"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Kontakt", 
        "item": "https://asamabd-umzug.de#contact"
      }
    ]
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet ein Umzug in Hamm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unsere Umzugspreise beginnen ab 60€ pro Stunde für das Basis-Paket mit 3,5t Transporter und 1 Umzugshelfer. Das Premium-Paket kostet 80€ pro Stunde und beinhaltet 2 Umzugshelfer sowie Möbelmontage und Verpackungsmaterial."
        }
      },
      {
        "@type": "Question", 
        "name": "Welche Gebiete bedienen Sie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir bieten unsere Umzugsdienstleistungen in Hamm und ganz Nordrhein-Westfalen an, einschließlich Dortmund, Münster, Unna und Soest. Unser Servicegebiet erstreckt sich über einen Radius von 100km."
        }
      },
      {
        "@type": "Question",
        "name": "Bieten Sie auch Haushaltsauflösungen an?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Ja, wir bieten professionelle Haushaltsauflösungen und Entrümpelung an. Wir entsorgen einzelne oder mehrere Möbel und Haushaltsgegenstände fachgerecht und umweltfreundlich."
        }
      },
      {
        "@type": "Question",
        "name": "Ist eine kostenlose Beratung möglich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wir bieten eine kostenlose und unverbindliche Beratung an. Kontaktieren Sie uns unter +49 176 80248293 oder per E-Mail für ein individuelles Angebot."
        }
      }
    ]
  };
}
