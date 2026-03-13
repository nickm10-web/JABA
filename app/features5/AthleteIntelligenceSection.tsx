export default function AthleteIntelligenceSection() {
  const tasks = [
    { icon: "📸", label: "Instagram Post — Need Approval", sub: "Due Sep 18", statusColor: "#C8FF00" },
    { icon: "🎵", label: "TikTok Post — Missed Window", sub: "Was due Sep 15", statusColor: "#ff6b35" },
    { icon: "💰", label: "Invoice Due — NIL Deal", sub: "Due Sep 20", statusColor: "#C8FF00" },
    { icon: "📧", label: "Brand Follow-Up Needed", sub: "Last contacted Sep 14", statusColor: "#888" },
    { icon: "📄", label: "Contract Update Required", sub: "Requested Sep 16", statusColor: "#C8FF00" },
    { icon: "✅", label: "Campaign Brief Approved", sub: "Approved Sep 17", statusColor: "#C8FF00" },
    { icon: "⚠️", label: "Missing Deliverable — Brand A", sub: "Overdue Sep 12", statusColor: "#ff6b35" },
    { icon: "📅", label: "Content Calendar Deadline", sub: "Due Sep 22", statusColor: "#a78bfa" },
  ];

  return (
    <section className="relative z-10 py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="md:col-start-2 md:row-start-1">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex gap-1 px-4 pt-3 pb-0 border-b border-white/10 flex-shrink-0">
              <button className="px-3 py-2 text-sm text-white font-medium border-b-2 border-white">All Tasks</button>
              <button className="px-3 py-2 text-sm text-white/40">Waiting for approval</button>
            </div>
            <div
              style={{
                height: "260px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "40px",
                  background: "linear-gradient(to bottom, rgb(24,24,27), transparent)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40px",
                  background: "linear-gradient(to top, rgb(24,24,27), transparent)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  animation: "taskScroll 12s linear infinite",
                  willChange: "transform",
                }}
              >
                {[...tasks, ...tasks].map((item, i) => (
                  <div key={`${item.label}-${i}`} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="text-sm text-white font-medium leading-tight">{item.label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.statusColor, boxShadow: `0 0 8px ${item.statusColor}80` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-1">
          <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
            Operational Scale
          </span>
          <h3 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
            Replace Manual Deliverable Tracking
          </h3>
          <p className="text-white/60 mb-2">
            Once a deal is signed, execution becomes the bottleneck.
          </p>
          <p className="text-white/60 mb-6">
            JABA replaces spreadsheets, reminders, and checklists with a single system that tracks every deliverable, deadline, and approval across athletes and campaigns.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Deliverables & Deadlines", "Approval Status", "Missed Windows"].map((tag) => (
              <span key={tag} className="text-xs border border-white/20 text-white/60 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
