export default function Marquee() {
  const repeatedText = "SITES QUE VENDEM TODOS OS DIAS \u2022 LAYOUTS PREMIUM \u2022 ALTA PERFORMANCE \u2022 FOCO EM CONVERSÃO \u2022 EXPERIÊNCIA DO USUÁRIO \u2022 ";
  const textArray = Array(5).fill(repeatedText).join(" "); // Repeat text enough times to fill 200% width

  return (
    <div className="relative w-full overflow-hidden bg-transparent h-[250px] flex items-center justify-center -mt-28 lg:-mt-40 z-20 pointer-events-none">
      
      {/* Background Marquee (Levemente desfocada, movendo para a direita) */}
      <div className="absolute w-[130%] rotate-[6deg] z-0 translate-y-2">
        <div className="bg-[#993b00] border-y border-[#ff6a00]/30 py-2 flex overflow-hidden whitespace-nowrap opacity-60">
          <div className="animate-marquee-right inline-block w-max text-lg md:text-xl font-bold text-white/60 tracking-wider uppercase">
            {textArray}
          </div>
          <div className="animate-marquee-right inline-block w-max text-lg md:text-xl font-bold text-white/60 tracking-wider uppercase">
            {textArray}
          </div>
        </div>
      </div>

      {/* Foreground Marquee (Nítida, cor vibrante, movendo para a esquerda) */}
      <div className="absolute w-[130%] -rotate-[6deg] z-10 -translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="bg-[#FF6A00] border-y-2 border-[#ff8533] py-2.5 flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-left inline-block w-max text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase drop-shadow-sm">
            {textArray}
          </div>
          <div className="animate-marquee-left inline-block w-max text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase drop-shadow-sm">
            {textArray}
          </div>
        </div>
      </div>

    </div>
  );
}
