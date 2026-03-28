import dynamic from 'next/dynamic';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VisitorTracker from '@/components/VisitorTracker';
import FloatingCTA from '@/components/FloatingCTA';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';

// Dynamic imports for better performance
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div>Loading...</div>
});

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div>Loading...</div>
});

const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <div>Loading...</div>
});

const ImageSwiper = dynamic(() => import('@/components/ImageSwiper'), {
  loading: () => <div>Loading...</div>
});

const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <div>Loading...</div>
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div>Loading...</div>
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div>Loading...</div>
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px] bg-accent-900"></div>
});

export default function DeHome() {
  return (
    <>
      <VisitorTracker />
      <link rel="preload" as="image" href="/images/logo.webp" />
      
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema()),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema()),
        }}
      />

      <main className="relative">
        <Navbar />
        <Hero />
        
        <section id="services" className="scroll-mt-16">
          <Services />
        </section>

        <section id="about" className="scroll-mt-16">
          <About />
        </section>

        <section id="pricing" className="scroll-mt-16">
          <Pricing />
        </section>

        <section id="gallery" className="scroll-mt-16">
          <ImageSwiper />
        </section>

        <section id="reviews" className="scroll-mt-16">
          <Reviews />
        </section>

        <section id="faq" className="scroll-mt-16">
          <FAQ />
        </section>

        <section id="contact" className="scroll-mt-16">
          <Contact />
        </section>

        <Footer />
        <FloatingCTA />
      </main>
    </>
  );
}
