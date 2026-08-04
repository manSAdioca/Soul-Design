import { useEffect } from 'react';
import { captureUTMs } from '@/utils/utm';
import {
  Header,
  Hero,
  Marquee,
  ProblemSection,
  SolutionSection,
  TestimonialSection,
  ContactSection,
  Footer
} from '@/components'

function App() {
  const currentNiche = import.meta.env.VITE_NICHE || 'default';

  useEffect(() => {
    captureUTMs();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6A00]/30 bg-[#050505] relative overflow-hidden">
      <Header />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <TestimonialSection />
      <ContactSection niche={currentNiche} />
      <Footer />
    </main>
  )
}

export default App
