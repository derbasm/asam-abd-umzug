import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

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

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div>Loading...</div>
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div>Loading...</div>
});

export default function Home() {
  return (
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

      <section id="contact" className="scroll-mt-16">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
