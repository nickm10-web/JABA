import Image from "next/image";

export default function AthleteIntelligenceSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2">
            <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 aspect-[1/1] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/agency/damar%20hamlin%20athlete%20intel.png"
                alt="Athlete analytics preview featuring Damar Hamlin"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-1">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Talent Discovery</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">Find the Perfect Athlete&ndash;Brand Fit.</h2>
            <p className="text-white/60 text-lg mb-4">
              Get the full picture of every athlete - metrics, content style, caption style, and the best ways to activate them.
            </p>
            <p className="text-white/60 text-lg mb-4">
              Finding and researching talent and their brand fit - athlete metrics, content and caption style, online reputation, comment sentiment, performance in sponsored content and more. JABA&rsquo;s AI surfaces the right fits, ranked by alignment score.
            </p>
            <p className="mt-8 mb-2 text-[10px] uppercase tracking-widest text-white/25">Try asking JABA</p>
            <div className="mt-6 flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm max-w-sm backdrop-blur-sm hover:border-[#C8FF00]/40 hover:bg-white/[0.09] transition-all duration-300 cursor-default">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[14px] w-[14px] text-white/30" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="text-white/50 font-normal tracking-wide">&quot;Find me mission-driven athletes&quot;</span>
              <span className="ml-auto text-[#C8FF00]/60 text-xs font-semibold tracking-widest uppercase">Ask →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
