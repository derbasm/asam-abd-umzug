import type { Metadata } from "next";
import deData from '@/data/site-data.json';
import enData from '@/data/site-data-en.json';
import type { SiteData } from '@/types/site-data';

export function generateMetadata(language: 'de' | 'en' = 'de'): Metadata {
  const data = language === 'de' ? (deData as SiteData) : (enData as SiteData);
  
  return {
    title: `${data.company.name} - ${data.company.description}`,
    description: data.hero.subtitle,
    keywords: [
      data.company.name,
      "Moving Service",
      "Professional Moving",
      "Moving Company",
      "Furniture Transport",
      "Moving Help",
      "House Clearance",
      "Office Moving",
      "Residential Moving",
      "Furniture Assembly"
    ],
  };
}
