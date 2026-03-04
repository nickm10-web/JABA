import Image from "next/image";

export default function ContentIntelligenceSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-none">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/content-intelligence.png"
                alt="JABA content intelligence hub analyzing athlete social media posts"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-none">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Content Intelligence</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
              1M+ Posts Analyzed.
              <br />
              Across Every Brand.
            </h2>
            <p className="text-white/60 text-lg mb-5">
              See what content performed best and why. Benchmark it vs other brand posts. Get AI-insights on every metric imaginable.
            </p>
            <ul className="list-disc pl-5 text-white/65 space-y-2 mb-6">
              <li>Search every athlete post across your network</li>
              <li>Track logo placement and brand visibility</li>
              <li>Analyze hooks, pacing, and caption style</li>
              <li>Compare sponsored vs organic performance</li>
              <li>Discover trends across thousands of campaigns</li>
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/40 italic max-w-md">
              <span className="text-[#C8FF00] not-italic">›</span>
              What sponsored athlete content performs the best?
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
