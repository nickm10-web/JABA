import { useEffect, useState } from "react";

const SCHEDULE_DATA: Record<string, { campaign: string; deliverables: string; tasks: { icon: string; title: string; sub: string }[] }> = {
  Mo: {
    campaign: "Nike Social Campaign: Tevin Jones",
    deliverables: "4 / 5 deliverables completed",
    tasks: [
      { icon: "📸", title: "Instagram Post Due", sub: "Approval required by 5:00 PM" },
      { icon: "💬", title: "Brand Follow Up", sub: "Waiting on creative feedback" },
    ],
  },
  Tu: {
    campaign: "Adidas Fall Drop: Marcus Webb",
    deliverables: "2 / 4 deliverables completed",
    tasks: [
      { icon: "🎵", title: "TikTok Video Submission", sub: "Due by 3:00 PM" },
      { icon: "📄", title: "Contract Addendum Review", sub: "Requested by brand legal" },
    ],
  },
  We: {
    campaign: "Vuori Brand Launch: Jordan Ellis",
    deliverables: "1 / 3 deliverables completed",
    tasks: [
      { icon: "📧", title: "Pitch Email to Vuori", sub: "Follow-up from last week" },
      { icon: "📸", title: "Lifestyle Photo Shoot", sub: "Asset due to brand by EOD" },
    ],
  },
  Th: {
    campaign: "Nike Social Campaign: Tevin Jones",
    deliverables: "5 / 5 deliverables completed",
    tasks: [
      { icon: "✅", title: "Campaign Wrap Report", sub: "Auto-generated — ready to share" },
      { icon: "💰", title: "Invoice Submitted", sub: "$8,500 — Net 30" },
    ],
  },
  Fr: {
    campaign: "Fabletics NIL Deal: Harper Murray",
    deliverables: "3 / 5 deliverables completed",
    tasks: [
      { icon: "⚠️", title: "Missed Deadline — Instagram Story", sub: "Was due Wed — follow-up sent" },
      { icon: "📅", title: "Rescheduled Shoot Confirmed", sub: "Next Monday 10AM" },
    ],
  },
  Sa: {
    campaign: "Alo Yoga Partnership: Dani Torres",
    deliverables: "2 / 2 deliverables completed",
    tasks: [
      { icon: "📊", title: "Campaign Performance Report", sub: "ER 4.2% — above benchmark" },
      { icon: "🤝", title: "Renewal Conversation Flagged", sub: "Brand expressed interest" },
    ],
  },
  Su: {
    campaign: "Nike Social Campaign: Tevin Jones",
    deliverables: "4 / 5 deliverables completed",
    tasks: [
      { icon: "📸", title: "Instagram Post Due", sub: "Approval required by 5:00 PM" },
      { icon: "💬", title: "Brand Follow Up", sub: "Waiting on creative feedback" },
    ],
  },
};

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function ScheduleDashboard() {
  const [activeDay, setActiveDay] = useState<string>("Mo");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveDay((prev) => {
          const idx = DAYS.indexOf(prev as typeof DAYS[number]);
          return DAYS[(idx + 1) % DAYS.length];
        });
        setTransitioning(false);
      }, 300);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  const data = SCHEDULE_DATA[activeDay];

  return (
    <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <p className="text-white font-semibold text-sm">Agency Execution Overview</p>
        <p className="text-white/40 text-xs mt-0.5">All active campaigns, deliverables, and timelines</p>
      </div>
      <div className="mx-3 mt-3 bg-zinc-800 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xs">⚡</span>
          <span className="text-white/50 text-xs uppercase tracking-wider">Active Campaigns :</span>
        </div>
        <div
          className="flex items-center justify-between"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(4px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <div>
            <p className="text-white text-sm font-medium">{data.campaign}</p>
            <p className="text-white/40 text-xs mt-0.5">{data.deliverables}</p>
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-[#C8FF00] flex items-center justify-center flex-shrink-0 ml-3" style={{ boxShadow: "0 0 8px rgba(200,255,0,0.3)" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C8FF00]" />
          </div>
        </div>
      </div>
      <div className="mx-3 mt-3 mb-3 bg-zinc-800 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm">📅</span>
          <span className="text-white/60 text-xs font-medium">Schedule</span>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-3">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs py-1 rounded-md transition-all duration-300 cursor-default"
              style={{
                backgroundColor: activeDay === day ? "#7B5CF0" : "transparent",
                color: activeDay === day ? "white" : "rgba(255,255,255,0.35)",
                fontWeight: activeDay === day ? "600" : "400",
                transform: activeDay === day ? "scale(1.05)" : "scale(1)",
                boxShadow: activeDay === day ? "0 0 12px rgba(123,92,240,0.5)" : "none",
              }}
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className="space-y-2"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {data.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-zinc-700/60 rounded-lg p-2.5">
              <span className="text-sm flex-shrink-0 mt-0.5">{task.icon}</span>
              <div className="min-w-0">
                <p className="text-white/80 text-xs font-medium leading-tight">{task.title}</p>
                <p className="text-white/40 text-[10px] mt-0.5 leading-tight">{task.sub}</p>
              </div>
              <div className="ml-auto flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AthletePerformanceMetricsSection() {
  return (
    <section className="relative z-10 py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="md:col-start-2 md:row-start-1">
          <ScheduleDashboard />
        </div>
        <div className="md:col-start-1 md:row-start-1">
          <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
            Campaign Execution
          </span>
          <h3 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
            Centralize Campaign Execution Across Every Athlete
          </h3>
          <p className="text-white/60 mb-3">
            As deal volume grows, agencies need a single system to track campaigns, deliverables, and timelines across their entire roster.
          </p>
          <p className="text-white/60 mb-6">
            JABA gives teams real-time visibility into what is live, what is due, and what needs attention so nothing slips through the cracks.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Campaign visibility", "Deliverable progress", "Timeline coordination"].map((tag) => (
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
