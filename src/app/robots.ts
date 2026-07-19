import type { MetadataRoute } from 'next';

const siteUrl = 'https://asamabd-umzug.de';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/', '/_vercel/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
