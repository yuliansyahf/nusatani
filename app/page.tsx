import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import MasalahSection from '@/components/landing/MasalahSection';
import LangkahSection from '@/components/landing/LangkahSection';
import TestimoniSection from '@/components/landing/TestimoniSection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main style={{
      background: 'url(/background/publicdashb.svg) center top / 100% auto no-repeat, #f4f8f4',
      minHeight: '100vh'
    }}>
      <Navbar />
      <Hero />
      <MasalahSection />
      <LangkahSection />
      <TestimoniSection />
      <Footer />
    </main>
  );
}
