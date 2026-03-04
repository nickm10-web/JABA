import Image from "next/image";

export default function AthleteIntelligenceSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-first lg:order-last">
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

          <div className="order-last lg:order-first">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Talent Discovery</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">Find the Perfect Athlete&ndash;Brand Fit.</h2>
            <p className="text-white/60 text-lg mb-4">
              Get the full picture of every athlete &mdash; metrics, content style, caption style, and the best ways to activate them.
            </p>
            <p className="text-white/60 text-lg mb-4">
              Finding and researching talent and their brand fit &mdash; athlete metrics, content and caption style, online reputation, comment sentiment, performance in sponsored content and more. JABA&rsquo;s AI surfaces the right fits, ranked by alignment score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
