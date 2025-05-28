import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

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
  title: "Modern Umzug - Professional Moving Services",
  description: "Professional moving services with a modern approach. Stress-free moving with our experienced team. ✓ Fair prices ✓ Expert consultation ✓ Reliable service",
  keywords: [
    "Modern Moving",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Providers>
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
