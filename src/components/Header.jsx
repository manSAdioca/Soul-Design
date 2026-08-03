import logo from '@/assets/logo.webp'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 md:py-8 flex justify-center pointer-events-none">
      <div className="relative">
        <div className="absolute inset-0 bg-[#FF6A00]/20 blur-xl rounded-full scale-150" />
        <img src={logo} alt="Soul Logo" className="h-12 md:h-16 relative z-10" />
      </div>
    </header>
  )
}
