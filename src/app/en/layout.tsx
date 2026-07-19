import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { generateLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  ...generateMetadata('en'),
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

export default function ENLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      {children}
    </>
  );
}
