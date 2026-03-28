'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div>Loading...</div>
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen"></div>
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px] bg-accent-900"></div>
});

export default function FAQPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <FAQ />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
