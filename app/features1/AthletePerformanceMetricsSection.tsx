import Image from "next/image";

export default function AthletePerformanceMetricsSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-last">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/metrics-section.png"
                alt="Athlete performance metrics benchmark dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-first">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Athlete Performance Metrics</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
              Benchmark Your Athlete Marketing
            </h2>
            <p className="text-white/60 text-lg mb-5">
              Measure how your athletes and campaigns perform compared to the rest of the market. JABA tracks every metric and benchmarks performance across brands, sports, and platforms.
            </p>
            <ul className="list-disc pl-5 text-white/65 space-y-2 mb-6">
              <li>Benchmark athlete posts vs other brand campaigns</li>
              <li>Measure engagement rate, reach, and content performance</li>
              <li>Track logo exposure time and brand visibility</li>
              <li>Compare caption styles and content formats</li>
              <li>Identify top-performing athlete content</li>
              <li>Analyze sponsored vs organic campaign results</li>
            </ul>
            <div className="mt-6 flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm max-w-md backdrop-blur-sm hover:border-[#C8FF00]/40 hover:bg-white/[0.09] transition-all duration-300 cursor-default">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[14px] w-[14px] text-white/30" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="text-white/50 font-normal tracking-wide">&quot;How do my athletes perform vs other campaigns?&quot;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
