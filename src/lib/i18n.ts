import { usePathname } from 'next/navigation';

export type Language = 'de' | 'en';

export function getLanguageFromPathname(pathname: string): Language {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'de';
}

export function useLanguageFromURL(): Language {
  const pathname = usePathname();
  return getLanguageFromPathname(pathname);
}

export function buildLocalizedUrl(path: string, language: Language): string {
  const baseUrl = 'https://asamabd-umzug.de';
  const prefix = language === 'en' ? '/en' : '/de';
  return `${baseUrl}${prefix}${path}`;
}

export function getAlternateLanguageUrl(currentPath: string, currentLanguage: Language): string {
  const otherLanguage = currentLanguage === 'de' ? 'en' : 'de';
  const cleanPath = currentPath.replace(/^\/(de|en)/, '');
  return buildLocalizedUrl(cleanPath, otherLanguage);
}
