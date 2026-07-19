import type { MetadataRoute } from 'next';

const siteUrl = 'https://asamabd-umzug.de';

const pages = [
  { path: '/de', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/en', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/de/faq', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/en/faq', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/agb', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
