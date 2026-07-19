import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import { generateMetadata } from "@/lib/metadata";
import { generateLocalBusinessSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// SEO-optimierte Metadata
export const metadata: Metadata = {
  ...generateMetadata('de'),
  
  // Enhanced Icons Configuration
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicon.png', sizes: '120x120', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
  },
  
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const isEnglish = pathname.startsWith('/en');
  const isLanguageRoute = pathname.startsWith('/de') || pathname.startsWith('/en');
  // /de and /en have their own layout that already injects this schema;
  // only the language-agnostic routes (legal pages, admin) need it here.
  const localBusinessSchema = isLanguageRoute ? null : generateLocalBusinessSchema();

  return (
    <html lang={isEnglish ? 'en' : 'de'} className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {localBusinessSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
        )}
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-white"
        >
          Zum Inhalt springen
        </a>
        <ErrorBoundary>
          <AnalyticsLoader />
          <Providers>
            <main id="main-content" className="flex min-h-screen flex-col" tabIndex={-1}>
              {children}
            </main>
          </Providers>
          <ConsentBanner />
        </ErrorBoundary>
      </body>
    </html>
  );
}
