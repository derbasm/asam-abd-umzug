import type { Metadata } from "next";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import { generateMetadata } from "@/lib/metadata";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";

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

export const metadata: Metadata = {
  ...generateMetadata('de'),
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

export default function DELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <ErrorBoundary>
          <AnalyticsLoader />
          <Providers>
            <main className="flex min-h-screen flex-col">
              {children}
            </main>
          </Providers>
          <ConsentBanner />
        </ErrorBoundary>
      </body>
    </html>
  );
}
