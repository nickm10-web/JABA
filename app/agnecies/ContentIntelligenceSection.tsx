import Image from "next/image";

export default function ContentIntelligenceSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-first">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/jaba-content-intelligence.png"
                alt="JABA content intelligence hub analyzing athlete social media posts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-last">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Content Intelligence</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
              1M+ Posts Analyzed.
              <br />
              Across Every Brand.
            </h2>
            <p className="text-white/60 text-lg mb-5">
              JABA analyzes every piece of athlete content across your portfolio. Understand what performs best, how brands are showing up, and what content your athletes should be posting based on real engagement patterns.
            </p>
            <ul className="list-disc pl-5 text-white/65 space-y-2 mb-6">
              <li>Search every athlete post across your network</li>
              <li>Track logo placement and brand visibility</li>
              <li>Analyze hooks, pacing, and caption style</li>
              <li>Compare sponsored vs organic performance</li>
              <li>Discover trends across thousands of campaigns</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
