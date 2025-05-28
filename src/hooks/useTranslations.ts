import { useLanguage } from '@/contexts/LanguageContext';
import deData from '@/data/site-data.json';
import enData from '@/data/site-data-en.json';
import type { SiteData } from '@/types/site-data';

export function useTranslations() {
  const { language } = useLanguage();
  
  const data = language === 'de' ? (deData as SiteData) : (enData as SiteData);
  
  return {
    data,
    t: (key: string) => {
      const keys = key.split('.');
      let value: any = data;
      
      for (const k of keys) {
        if (value === undefined) return key;
        value = value[k];
      }
      
      return value || key;
    }
  };
} 