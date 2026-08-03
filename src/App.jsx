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
  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6A00]/30 bg-[#050505] relative overflow-hidden">
      <Header />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default App
