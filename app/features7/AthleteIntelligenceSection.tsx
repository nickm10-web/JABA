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
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">Find the Perfect Athlete for Your Brand.</h2>
            <p className="text-white/60 text-base md:text-lg mb-6">
              Get the full picture of every athlete — metrics, content style, caption style, and the best ways to activate them.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <h4 className="text-xs font-bold text-[#C8FF00] uppercase tracking-wide mb-1">&gt; Athlete Metrics</h4>
                <p className="text-white/55 text-xs leading-relaxed">Followers, engagement, audience growth, and historical content performance.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <h4 className="text-xs font-bold text-[#C8FF00] uppercase tracking-wide mb-1">&gt; Content &amp; Caption Style</h4>
                <p className="text-white/55 text-xs leading-relaxed">Tone, storytelling style, visual content themes, and posting patterns.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <h4 className="text-xs font-bold text-[#C8FF00] uppercase tracking-wide mb-1">&gt; Brand Alignment Score</h4>
                <p className="text-white/55 text-xs leading-relaxed">Audience overlap, past sponsorship performance, and content relevance.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <h4 className="text-xs font-bold text-[#C8FF00] uppercase tracking-wide mb-1">&gt; Reputation &amp; Sentiment</h4>
                <p className="text-white/55 text-xs leading-relaxed">Comment sentiment, online reputation signals, and engagement patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
