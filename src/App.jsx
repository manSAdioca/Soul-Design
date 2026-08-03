import {
  Header,
  Hero,
  Marquee,
  ProblemSection,
  SolutionSection,
  TestimonialSection,
  IntegrationSection,
  ContactSection,
  Footer
} from '@/components'

function App() {
  const currentNiche = typeof window !== 'undefined' && window.NICHE ? window.NICHE : 'default';

  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6A00]/30 bg-[#050505] relative overflow-hidden">
      <Header />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      {currentNiche === 'distribuidoras' ? <IntegrationSection /> : <TestimonialSection />}
      <ContactSection />
      <Footer />
    </main>
  )
}

export default App
