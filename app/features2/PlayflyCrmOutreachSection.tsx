export default function PlayflyCrmOutreachSection() {
  return (
    <section className="relative z-10 py-16 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-1 lg:order-1">
            <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">CRM + AI Outreach</span>
            <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
              AI Relationship Management <span className="text-[#C8FF00]">&amp; Pitch Creation.</span>
            </h2>
            <p className="text-white/60 text-lg mb-5">
              JABA keeps your deal pipeline organized and moving. It finds the right contact, pulls brand deal history, drafts outreach, logs every interaction, and tells you exactly who to follow up with next.
            </p>

            <ul className="list-disc pl-5 text-white/65 space-y-2 mb-6">
              <li>Find verified brand and agency contacts</li>
              <li>See brand deal history and audience overlap</li>
              <li>Generate outreach drafts in seconds</li>
              <li>Auto-log activity and set follow-up reminders</li>
              <li>Keep every deal moving in one place</li>
            </ul>

          </div>

          <div className="order-2 lg:order-2">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <img
                src="/CRM.png"
                alt="CRM flow: contact discovery, brand deal database, and AI outreach"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
