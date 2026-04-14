'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = language === 'de' ? 'en' : 'de';
    setLanguage(newLang);

    // Update URL to match the new language
    const pathWithoutLang = pathname.replace(/^\/(de|en)/, '');
    router.push(`/${newLang}${pathWithoutLang || ''}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
      aria-label={`Switch to ${language === 'de' ? 'English' : 'Deutsch'}`}
    >
      <GlobeAltIcon className="h-4 w-4" />
      <span>{language === 'de' ? 'EN' : 'DE'}</span>
    </button>
  );
} 