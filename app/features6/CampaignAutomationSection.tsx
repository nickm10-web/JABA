import Image from "next/image";

export default function CampaignAutomationSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/campaignautomation.png"
                alt="JABA campaign automation dashboard managing multiple athlete campaigns"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Campaign Automation</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
              Manage Campaigns
              <br />
              <span className="text-[#C8FF00]">at Scale.</span>
            </h2>
            <p className="text-white/60 text-lg mb-5">
              Customize brand briefs based on athletes voice, content style, personality along with brands campaign. Make each piece of content feel personalized.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
