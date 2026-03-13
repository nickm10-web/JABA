import Image from "next/image";

const IMESSAGE_THREAD = [
  { from: "jaba", text: "Hey — Marcus Webb's Instagram Story for Nike Campaign is due tomorrow at 9am. He hasn't submitted yet.", time: "9:14 AM" },
  { from: "agent", text: "Can you send him a reminder?", time: "9:15 AM" },
  { from: "jaba", text: "Done. Reminder sent to Marcus. I'll alert you again at 6pm if he still hasn't submitted.", time: "9:15 AM" },
  { from: "jaba", text: "Heads up — Tyler Brooks kept the quotation marks in his brand post caption. Looks like he copied and pasted the draft exactly.", time: "9:17 AM" },
  { from: "agent", text: "Thank you.", time: "9:18 AM" },
  { from: "jaba", text: "Tevin Jones has 4 of 5 Nike deliverables completed. One Instagram Reel is still pending approval — due today by 5pm.", time: "9:31 AM" },
  { from: "agent", text: "Who needs to approve it?", time: "9:32 AM" },
  { from: "jaba", text: "The brand contact is Sarah Chen at Nike. I drafted a follow-up email to her. Want me to send it?", time: "9:32 AM" },
  { from: "agent", text: "Yes, send it.", time: "9:33 AM" },
  { from: "jaba", text: "Sent. I'll notify you when she responds.", time: "9:33 AM" },
  { from: "jaba", text: "New deal opportunity: Vuori has worked with 3 athletes similar to Marcus Webb's profile. 73% audience overlap. Want me to pull their contact?", time: "10:05 AM" },
  { from: "agent", text: "Pull it and draft a pitch.", time: "10:06 AM" },
  { from: "jaba", text: "Done. Luis Ortega, Sponsorship Director at Vuori. Pitch drafted based on Marcus's Q3 performance data. Ready to review.", time: "10:06 AM" },
  { from: "agent", text: "Perfect. Send it over.", time: "10:07 AM" },
  { from: "jaba", text: "Invoice reminder: the NIL deal payment from Brand A for Jordan Ellis is 3 days overdue. Want me to flag it?", time: "11:22 AM" },
  { from: "agent", text: "Flag it and send a follow-up.", time: "11:23 AM" },
  { from: "jaba", text: "Done. Follow-up sent to the brand finance team. I'll escalate if no response in 48 hours.", time: "11:23 AM" },
];

function IMessageCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col" style={{ height: "420px" }}>
      <div className="flex flex-col items-center pt-2 pb-2 border-b border-white/10 flex-shrink-0 bg-zinc-900">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1 shadow-lg overflow-hidden">
          <Image src="/jaba-face.png" alt="JABA" width={28} height={28} className="object-contain" />
        </div>
        <p className="text-white text-sm font-semibold">JABA</p>
      </div>
      <div
        className="flex-1 overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)",
        }}
      >
        <div style={{ animation: "imessageScroll 90s linear infinite", willChange: "transform", paddingTop: "12px" }}>
          {[...IMESSAGE_THREAD, ...IMESSAGE_THREAD].map((msg, i) => (
            <div key={i} className={`flex px-3 mb-2 ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
              <div style={{ maxWidth: "78%" }}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-snug ${
                    msg.from === "agent" ? "bg-[#2563eb] text-white rounded-br-sm" : "bg-zinc-700 text-white rounded-bl-sm"
                  }`}
                  style={{ fontSize: "12.5px" }}
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] text-white/30 mt-0.5 ${msg.from === "agent" ? "text-right" : "text-left"} px-1`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 pb-3 pt-2 border-t border-white/10 flex-shrink-0 bg-zinc-900">
        <div className="bg-zinc-800 rounded-full px-4 py-2 flex items-center border border-white/10">
          <span className="text-white/30 text-sm flex-1" style={{ fontSize: "13px" }}>Message</span>
          <div className="w-6 h-6 rounded-full bg-[#2563eb] flex items-center justify-center ml-2 flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentIntelligenceSection() {
  return (
    <section className="relative z-10 py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="md:order-2">
          <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
            AI Workflow
          </span>
          <h3 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
            JABA Acts as the Agency&apos;s Execution Layer
          </h3>
          <p className="text-white/60 mb-3">
            JABA handles the day-to-day operational work across athlete campaigns so your team does not have to chase deliverables, approvals, or timelines.
          </p>
          <p className="text-white/60 mb-6">
            It coordinates execution across athletes, brands, and campaigns while your team stays focused on strategy and relationships.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Deliverables Tracking", "Approvals & Follow-Ups", "Invoices & Reporting"].map((tag) => (
              <span key={tag} className="text-xs border border-white/20 text-white/60 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <IMessageCard />
        </div>
      </div>
    </section>
  );
}
