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
  let currentNiche = 'default';
  if (typeof window !== 'undefined') {
    if (window.location.hostname.includes('corretores')) {
      currentNiche = 'corretores';
    } else if (window.location.hostname.includes('distribuidoras')) {
      currentNiche = 'distribuidoras';
    } else if (window.NICHE) {
      currentNiche = window.NICHE;
    }
  }

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
