"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}
const easing = "cubic-bezier(0.16,1,0.3,1)";
const dur = "0.75s";
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(44px)",
      transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
    }}>{children}</div>
  );
}
function FadeLeft({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-56px)",
      transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
    }}>{children}</div>
  );
}
function FadeRight({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(56px)",
      transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
    }}>{children}</div>
  );
}
function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "scale(1)" : "scale(0.88)",
      transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
    }}>{children}</div>
  );
}
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    // Stars with position, velocity toward center, and twinkle
    type Star = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    };
    const makeStars = (): Star[] => Array.from({ length: 160 }, () => {
      // Start at random position
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      // Direction vector toward center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const dx = cx - x;
      const dy = cy - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = Math.random() * 0.25 + 0.08; // slow drift
      return {
        x,
        y,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        r: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.5 + 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
      };
    });
    let stars = makeStars();
    let frame = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      stars = stars.map(star => {
        // Move toward center
        let x = star.x + star.vx;
        let y = star.y + star.vy;
        // If too close to center, respawn at a random edge
        const distToCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distToCenter < 30) {
          // Respawn on a random edge
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
          else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
          else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
          else { x = 0; y = Math.random() * canvas.height; }
          // Recalculate velocity toward center from new position
          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = Math.random() * 0.25 + 0.08;
          return { ...star, x, y, vx: (dx/dist)*speed, vy: (dy/dist)*speed };
        }
        return { ...star, x, y };
      });
      stars.forEach(star => {
        const twinkle = 0.55 + 0.45 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      });
      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── Animated cursor for AI chat mockup ──────────────────────────────────────
function BlinkingCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: visible ? 1 : 0 }}>|</span>;
}
// ─── Typed text animation ─────────────────────────────────────────────────────
function TypedText({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [inView, text, speed]);
  return <span ref={ref}>{displayed}<BlinkingCursor /></span>;
}
// ─── Logo marquee ────────────────────────────────────────────────────────────
const LOGOS: { src?: string; alt: string; label?: string; color?: string }[] = [
  { src: "/school-logos/ohio-state.png", alt: "Ohio State" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png", alt: "Alabama" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/2.png", alt: "Auburn" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png", alt: "Georgia" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png", alt: "Purdue" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/275.png", alt: "Wisconsin" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/87.png", alt: "Notre Dame" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/142.png", alt: "Missouri" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/8.png", alt: "Arkansas" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/258.png", alt: "Virginia" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/12.png", alt: "Arizona" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/9.png", alt: "ASU" },
  { src: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png", alt: "Baylor" },
  { src: "/school-logos/Big3.png", alt: "BIG3" },
  { src: "/school-logos/AU.png", alt: "Athletes Unlimited" },
];
const SCROLL_TASKS = [
  { icon: "📸", label: "Instagram Post — Need Approval", sub: "Due Sep 18", statusColor: "#C8FF00" },
  { icon: "🎵", label: "TikTok Post — Missed Window", sub: "Was due Sep 15", statusColor: "#ff6b35" },
  { icon: "💰", label: "Invoice Due — NIL Deal", sub: "Due Sep 20", statusColor: "#C8FF00" },
  { icon: "📧", label: "Brand Follow-Up Needed", sub: "Last contacted Sep 14", statusColor: "#888" },
  { icon: "📄", label: "Contract Update Required", sub: "Requested Sep 16", statusColor: "#C8FF00" },
  { icon: "✅", label: "Campaign Brief Approved", sub: "Approved Sep 17", statusColor: "#C8FF00" },
  { icon: "⚠️", label: "Missing Deliverable — Brand A", sub: "Overdue Sep 12", statusColor: "#ff6b35" },
  { icon: "📅", label: "Content Calendar Deadline", sub: "Due Sep 22", statusColor: "#a78bfa" },
];
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
const LIFECYCLE_STEPS = [
  { icon: "🤝", label: "Pitch brand deals" },
  { icon: "📋", label: "Build campaigns" },
  { icon: "✅", label: "Manage athletes\\nand deliverables" },
  { icon: "🧾", label: "Track every post\\nand approval" },
  { icon: "📈", label: "Showcase ROI" },
];
// ─── SVG neon icons ───────────────────────────────────────────────────────────
function HandshakeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#C8FF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      {/* Presentation board on a stand */}
      <rect x="14" y="12" width="36" height="26" rx="3" />
      <line x1="32" y1="38" x2="32" y2="48" />
      <line x1="22" y1="48" x2="42" y2="48" />
      {/* Chart bars inside board */}
      <line x1="22" y1="32" x2="22" y2="26" />
      <line x1="28" y1="32" x2="28" y2="22" />
      <line x1="34" y1="32" x2="34" y2="24" />
      <line x1="40" y1="32" x2="40" y2="19" />
      {/* Upward trend arrow */}
      <polyline points="22,30 28,24 34,26 40,19" />
      <polyline points="37,19 40,19 40,22" />
      {/* Sparkle */}
      <path d="M46 10 L47 8 L48 10 L50 11 L48 12 L47 14 L46 12 L44 11 Z" strokeWidth="1.2" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#C8FF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      {/* Bottom layer */}
      <path d="M10 46 L32 54 L54 46 L32 38 Z" fill="rgba(200,255,0,0.04)" />
      {/* Middle layer */}
      <path d="M10 36 L32 44 L54 36 L32 28 Z" fill="rgba(200,255,0,0.06)" />
      {/* Top layer */}
      <path d="M10 26 L32 34 L54 26 L32 18 Z" fill="rgba(200,255,0,0.09)" />
      {/* Connecting lines on right side */}
      <path d="M54 26 L54 36" strokeOpacity="0.5" />
      <path d="M54 36 L54 46" strokeOpacity="0.35" />
      {/* Small spark/star top right */}
      <path d="M50 14 L51.5 11 L53 14 L56 15.5 L53 17 L51.5 20 L50 17 L47 15.5 Z" strokeWidth="1.2" fill="rgba(200,255,0,0.15)" />
    </svg>
  );
}
function ChecklistIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#C8FF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      <rect x="14" y="10" width="36" height="46" rx="5" fill="rgba(200,255,0,0.05)" />
      <rect x="25" y="6" width="14" height="7" rx="3" fill="rgba(200,255,0,0.12)" stroke="#C8FF00" strokeWidth="1.5" />
      <rect x="20" y="21" width="8" height="8" rx="2" />
      <path d="M22 25 L24.5 27.5 L28 22.5" strokeWidth="2.1" />
      <line x1="33" y1="25" x2="44" y2="25" />
      <rect x="20" y="33" width="8" height="8" rx="2" />
      <path d="M22 37 L24.5 39.5 L28 34.5" strokeWidth="2.1" />
      <line x1="33" y1="37" x2="44" y2="37" />
      <rect x="20" y="45" width="8" height="8" rx="2" />
      <path d="M22 49 L24.5 51.5 L28 46.5" strokeWidth="2.1" />
      <line x1="33" y1="49" x2="44" y2="49" />
    </svg>
  );
}
function ReceiptCheckIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#C8FF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      {/* Receipt body */}
      <path d="M16 8 L16 52 L20 49 L24 52 L28 49 L32 52 L36 49 L40 52 L44 49 L48 52 L48 8 Z" fill="rgba(200,255,0,0.05)" />
      {/* Receipt lines */}
      <line x1="22" y1="18" x2="42" y2="18" />
      <line x1="22" y1="24" x2="38" y2="24" />
      <line x1="22" y1="30" x2="36" y2="30" />
      {/* Approval stamp circle */}
      <circle cx="34" cy="42" r="11" fill="rgba(200,255,0,0.1)" />
      {/* Big checkmark inside stamp */}
      <path d="M27 42 L32 47 L42 35" strokeWidth="2.5" />
    </svg>
  );
}
function ChartUpIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#C8FF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      {/* Chart border */}
      <rect x="8" y="8" width="48" height="48" rx="6" fill="rgba(200,255,0,0.04)" />
      {/* Grid lines subtle */}
      <line x1="8" y1="44" x2="56" y2="44" strokeOpacity="0.2" strokeDasharray="2 2" />
      <line x1="8" y1="32" x2="56" y2="32" strokeOpacity="0.2" strokeDasharray="2 2" />
      <line x1="8" y1="20" x2="56" y2="20" strokeOpacity="0.2" strokeDasharray="2 2" />
      {/* Bar chart bars */}
      <rect x="14" y="36" width="7" height="14" rx="2" fill="rgba(200,255,0,0.2)" stroke="#C8FF00" strokeWidth="1.5" />
      <rect x="24" y="28" width="7" height="22" rx="2" fill="rgba(200,255,0,0.2)" stroke="#C8FF00" strokeWidth="1.5" />
      <rect x="34" y="20" width="7" height="30" rx="2" fill="rgba(200,255,0,0.3)" stroke="#C8FF00" strokeWidth="1.5" />
      {/* Trend line above bars */}
      <path d="M17 34 L27 26 L37 18" strokeWidth="2" />
      {/* Arrow head */}
      <path d="M33 17 L37 18 L36 22" strokeWidth="2" />
      {/* Small sparkle top right */}
      <path d="M48 14 L49 11 L50 14 L53 15 L50 16 L49 19 L48 16 L45 15 Z" strokeWidth="1.2" fill="rgba(200,255,0,0.2)" />
    </svg>
  );
}
function IMessageCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col" style={{ height: "420px" }}>
      {/* Header — JABA contact */}
      <div className="flex flex-col items-center pt-2 pb-2 border-b border-white/10 flex-shrink-0 bg-zinc-900">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1 shadow-lg overflow-hidden">
          <Image src="/jaba-face.png" alt="JABA" width={28} height={28} className="object-contain" />
        </div>
        <p className="text-white text-sm font-semibold">JABA</p>
      </div>
      {/* Scrolling message thread */}
      <div
        className="flex-1 overflow-hidden relative"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent)" }}
      >
        <div
          style={{
            animation: "imessageScroll 90s linear infinite",
            willChange: "transform",
            paddingTop: "12px",
          }}
        >
          {/* Render messages TWICE for seamless loop */}
          {[...IMESSAGE_THREAD, ...IMESSAGE_THREAD].map((msg, i) => (
            <div
              key={i}
              className={`flex px-3 mb-2 ${msg.from === "agent" ? "justify-end" : "justify-start"}`}
            >
              <div style={{ maxWidth: "78%" }}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-snug ${
                    msg.from === "agent"
                      ? "bg-[#2563eb] text-white rounded-br-sm"
                      : "bg-zinc-700 text-white rounded-bl-sm"
                  }`}
                  style={{ fontSize: "12.5px" }}
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] text-white/30 mt-0.5 ${msg.from === "agent" ? "text-right" : "text-left"} px-1`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Input bar */}
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
      {/* Card header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <p className="text-white font-semibold text-sm">Agency Execution Overview</p>
        <p className="text-white/40 text-xs mt-0.5">All active campaigns, deliverables, and timelines</p>
      </div>
      {/* Active campaign row */}
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
          <div
            className="w-7 h-7 rounded-full border-2 border-[#C8FF00] flex items-center justify-center flex-shrink-0 ml-3"
            style={{ boxShadow: "0 0 8px rgba(200,255,0,0.3)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#C8FF00]" />
          </div>
        </div>
      </div>
      {/* Schedule section */}
      <div className="mx-3 mt-3 mb-3 bg-zinc-800 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm">📅</span>
          <span className="text-white/60 text-xs font-medium">Schedule</span>
        </div>
        {/* Day tabs */}
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
        {/* Task items for active day */}
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
export default function Agency2Page() {
  const [showMainVideo, setShowMainVideo] = useState(false);
  const [showBottomShort, setShowBottomShort] = useState(false);
  const { ref: operationalRealityRef, inView: operationalRealityInView } = useInView(0.15);
  const { ref: mediaKitRef, inView: mediaKitInView } = useInView(0.15);
  const { ref: performanceCardRef, inView: performanceCardInView } = useInView(0.15);

  const perfPosts = useCountUp(16400, performanceCardInView, 1200);
  const perfLikes = useCountUp(60100000, performanceCardInView, 1200);
  const perfSaves = useCountUp(1900000, performanceCardInView, 1200);
  const perfComments = useCountUp(827000, performanceCardInView, 1200);

  const formatMetric = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-15%",
            width: "70vw",
            height: "70vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,92,240,0.28) 0%, rgba(123,92,240,0.08) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "-20%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,60,220,0.22) 0%, rgba(100,60,220,0.06) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "25%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,92,240,0.32) 0%, rgba(123,92,240,0.08) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
      <main className="text-white font-sans overflow-x-hidden relative" style={{ zIndex: 1 }}>
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 relative z-10 flex items-center justify-between px-6 md:px-12 h-16 bg-black border-b border-white/5">
        <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={42} className="object-contain" />
        <a href="https://calendly.com/jordon-jaba/jaba" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium px-5 py-2 rounded-full text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]">
          Book a call
        </a>
      </nav>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[82vh] flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-28 pb-14"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.82)), url('/header-bg-without-balls.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <StarField />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black z-[2]" />
        <FadeUp delay={100} className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold font-bricolage leading-tight text-[#C8FF00] mx-auto">
            AI BUILT FOR
            <br />
            ATHLETE AGENCIES
          </h1>
        </FadeUp>
        <FadeUp delay={250} className="relative z-10">
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            JABA coordinates contracts, campaigns, timelines, and execution across athletes and brands so nothing slips and nothing gets missed.
          </p>
        </FadeUp>
        <FadeUp delay={400} className="relative z-10">
          <a href="https://calendly.com/jordon-jaba/jaba" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]">
            Demo JABA <span className="text-base">↗</span>
          </a>
        </FadeUp>
      </section>
      {/* ── LOGOS MARQUEE ── */}
      <section className="relative z-10 py-12 overflow-hidden bg-black">
        <FadeUp>
          <p className="text-center text-sm text-white/50 mb-6 tracking-wide">
            JABA is trusted across college athletics &amp; pro sports
          </p>
        </FadeUp>
        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)",
          }}
        >
          <div
            className="flex gap-10 items-center flex-shrink-0"
            style={{
              animation: "marquee 28s linear infinite",
              willChange: "transform",
            }}
          >
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="flex-shrink-0">
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                    style={{ display: "block" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="w-auto h-10 px-3 flex items-center justify-center rounded-full text-white font-bold text-xs tracking-wider"
                    style={{
                      background: logo.color ? `${logo.color}22` : "rgba(255,255,255,0.08)",
                      border: `1px solid ${logo.color ? logo.color + "66" : "rgba(255,255,255,0.2)"}`,
                      color: logo.color || "rgba(255,255,255,0.7)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {logo.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          @keyframes taskScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes imessageScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}</style>
      </section>
      {/* ── SEE IT IN ACTION ── */}
      <section className="relative z-10 bg-[rgba(0,0,0,0.78)] py-20 px-6">
        <FadeUp>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-bricolage text-white text-center mb-10">
              See JABA in Action.
            </h2>
            <ScaleIn>
              <div
                className="relative mx-auto w-full max-w-[340px] rounded-[44px] border border-white/10 p-3"
                style={{
                  background: "#111111",
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 0 80px 20px rgba(180,255,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black rounded-full z-10" />
                <div className="rounded-[34px] overflow-hidden aspect-[9/16]">
                  <iframe
                    src="https://www.youtube.com/embed/0BCwKKac75Q?autoplay=0&loop=1&playlist=0BCwKKac75Q&rel=0&modestbranding=1&controls=1"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="See JABA in Action"
                  />
                </div>
              </div>
            </ScaleIn>
          </div>
        </FadeUp>
      </section>
      {/* ── OPERATIONAL REALITY ── */}
      <section className="relative z-10 py-24 px-6 text-center bg-[rgba(0,0,0,0.78)]">
        <FadeUp>
          <span className="inline-block text-xs font-medium border border-white/20 text-white/70 px-3 py-1 rounded-full mb-6">
            Operational Reality
          </span>
        </FadeUp>
        <FadeUp delay={100}>
          <h2 className="text-4xl md:text-6xl font-extrabold font-bricolage text-white max-w-2xl mx-auto leading-tight">
            More Deals.
            <br />
            More Opportunities.
            <br />
            <span className="text-[#C8FF00]">More to Manage.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={200}>
          <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto">
            Agencies are now managing hundreds of athletes, thousands of deliverables, and the approvals, follow-ups, payments, and reporting tied to execution.
          </p>
          <p className="mt-3 text-lg text-white/75">Right now, this is all manual work.</p>
        </FadeUp>
      </section>

      <section
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('/school-logos/Background_image_2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div ref={operationalRealityRef} className="relative z-10">
          <p
            className="text-6xl md:text-8xl font-black font-bricolage italic text-[#C8FF00]"
            style={{
              opacity: operationalRealityInView ? 1 : 0,
              transform: operationalRealityInView ? "translateY(0) scale(1)" : "translateY(60px) scale(0.92)",
              transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms`,
            }}
          >
            We Built AI to Fix This.
          </p>
          <p
            className="mt-12 md:mt-16 text-4xl md:text-5xl font-black font-bricolage text-[#C8FF00]"
            style={{
              opacity: operationalRealityInView ? 1 : 0,
              transform: operationalRealityInView ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 450ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 450ms`,
            }}
          >
            Meet JABA.
          </p>
        </div>
      </section>
      {/* ── VIDEO SECTION ── */}
      <section className="relative z-10 py-20 px-6 flex justify-center bg-[rgba(0,0,0,0.78)]">
        <div
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 60px 12px rgba(180,255,0,0.35)" }}
        >
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-[#C8FF00]/30">
            {showMainVideo ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/tkxrYJrkaPA?rel=0&autoplay=1"
                title="JABA demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                aria-label="Play video"
                className="absolute inset-0"
                onClick={() => setShowMainVideo(true)}
              >
                <Image src="/DAMAR%20HAMLIN%20%282%29.png" alt="Meet JABA video thumbnail" fill className="object-cover" priority />
                <span className="absolute inset-0 bg-black/15" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-16 w-16 rounded-full bg-white/90 text-black flex items-center justify-center text-xl">▶</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>
      {/* ── LIFECYCLE FLOW ── */}
      <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)] text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold font-bricolage text-white mb-16">
            AI that manages the whole campaign lifecycle.
          </h2>
        </FadeUp>
        <div className="flex flex-wrap justify-center items-start gap-0 max-w-5xl mx-auto">
          {[
            { SvgIcon: HandshakeIcon, label: "Pitch brand deals" },
            { SvgIcon: LayersIcon, label: "Build campaigns" },
            { SvgIcon: ChecklistIcon, label: "Manage athletes\nand deliverables" },
            { SvgIcon: ReceiptCheckIcon, label: "Track every post\nand approval" },
            { SvgIcon: ChartUpIcon, label: "Showcase ROI" },
          ].map(({ SvgIcon, label }, i) => (
            <FadeUp key={i} delay={i * 120} className="flex items-center">
              <div className="flex flex-col items-center gap-3 px-2">
                <div className="w-24 h-24 border border-[#C8FF00]/50 rounded-2xl flex items-center justify-center bg-gradient-to-b from-[#12170a] to-[#090b06] shadow-[0_0_18px_rgba(200,255,0,0.18)]">
                  <SvgIcon />
                </div>
                <p className="text-[#C8FF00] text-sm font-semibold whitespace-pre-line text-center leading-tight max-w-[120px]">
                  {label}
                </p>
              </div>
              {i < 4 && (
                <div className="hidden md:flex items-center mx-1 mb-10">
                  <svg width="56" height="8" viewBox="0 0 56 8">
                    <circle cx="3" cy="4" r="1.5" fill="#C8FF00" opacity="0.8" />
                    <line x1="7" y1="4" x2="48" y2="4" stroke="#C8FF00" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                  </svg>
                  <svg width="8" height="8" viewBox="0 0 8 8" className="-ml-1">
                    <path d="M0 4 L8 4 M5 1 L8 4 L5 7" stroke="#C8FF00" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              )}
            </FadeUp>
          ))}
        </div>
      </section>
      {/* ── BENTO 1: Replace Manual Deliverable Tracking ── */}
      <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: UI Card */}
          <FadeLeft className="md:col-start-1 md:row-start-1">
            <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
              {/* Tab bar */}
              <div className="flex gap-1 px-4 pt-3 pb-0 border-b border-white/10 flex-shrink-0">
                <button className="px-3 py-2 text-sm text-white font-medium border-b-2 border-white">All Tasks</button>
                <button className="px-3 py-2 text-sm text-white/40">Waiting for approval</button>
              </div>
              {/* Scrolling list container */}
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
                  {[...SCROLL_TASKS, ...SCROLL_TASKS].map((item, i) => (
                    <div key={`${item.label}-${i}`} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm text-white font-medium leading-tight">{item.label}</p>
                          <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.statusColor, boxShadow: `0 0 8px ${item.statusColor}80` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeLeft>
          {/* Right: Text */}
          <FadeRight>
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
          </FadeRight>
        </div>
      </section>
      {/* ── BENTO 2: AI Execution Layer ── */}
      <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Right: Text */}
          <FadeLeft className="md:order-2">
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
          </FadeLeft>
          {/* Right: AI Chat mockup */}
          <FadeRight>
            <IMessageCard />
          </FadeRight>
        </div>
      </section>
      {/* ── BENTO 3: Centralize Campaign Execution ── */}
      <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Right: Dashboard mockup */}
          <FadeLeft className="md:col-start-2 md:row-start-1">
            <ScheduleDashboard />
          </FadeLeft>
          {/* Left: Text */}
          <FadeRight className="md:col-start-1 md:row-start-1">
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
          </FadeRight>
        </div>
      </section>
      {/* ── PERFORMANCE ── */}
      <section className="relative z-10 bg-[rgba(0,0,0,0.78)] py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <FadeRight className="md:col-start-2 md:row-start-1">
            <span className="inline-block text-xs font-medium border border-white/20 text-white/60 rounded-full px-3 py-1 mb-4">
              Performance
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold font-bricolage text-white leading-tight">1M+ Posts Analyzed.</h3>
            <h3 className="text-3xl md:text-4xl font-extrabold font-bricolage text-[#C8FF00] leading-tight">So You Know What Works.</h3>
            <p className="text-white/60 text-sm leading-relaxed mt-4 mb-6">
              JABA watches every post — sponsored and organic — and surfaces what&apos;s actually working: formats, timing, and hooks. Walk into every brand meeting looking like a content expert.
            </p>
            <div className="flex flex-wrap gap-2">
              {["What Worked", "Benchmarks", "AI Strategy", "Shareable Reports"].map((tag) => (
                <span key={tag} className="text-xs border border-white/20 text-white/60 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </FadeRight>

          <FadeLeft className="md:col-start-1 md:row-start-1">
            <div
              ref={performanceCardRef}
              className="bg-zinc-900 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 0 50px rgba(200,255,0,0.1), inset 0 0 0 1px rgba(200,255,0,0.08)" }}
            >
              <div className="px-4 pt-4 pb-3 border-b border-white/10">
                <p className="text-white/30 text-[10px] uppercase tracking-widest">PERFORMANCE OVERVIEW</p>
                <p className="text-white text-sm font-semibold mt-0.5">Marcus Webb × Brand A — Fall Campaign</p>
                <p className="text-[#C8FF00] text-[10px] font-bold tracking-wide">TOP 5% OF ALL BRAND POSTS ON JABA</p>
              </div>

              <div className="px-4 py-4 flex items-center justify-between border-b border-white/10 gap-2">
                {[{ n: perfPosts, label: "POSTS" }, { n: perfLikes, label: "LIKES" }, { n: perfSaves, label: "SAVES" }, { n: perfComments, label: "COMMENTS" }].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <p className="text-[#C8FF00] text-2xl font-black">{formatMetric(stat.n)}</p>
                    <p className="text-white/35 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-white/5">
                <div className="px-4 py-3 flex items-start justify-between gap-3">
                  <p className="text-[#C8FF00] text-[10px] font-bold tracking-wider uppercase flex-shrink-0 w-28">✦ WHAT WORKED</p>
                  <p className="text-white/55 text-xs leading-relaxed">Short-form video (15-25s) outperformed all other formats by 4.1x across your roster.</p>
                </div>
                <div className="px-4 py-3 flex items-start justify-between gap-3">
                  <p className="text-orange-400 text-[10px] font-bold tracking-wider uppercase flex-shrink-0 w-28">✦ WHAT DIDN&apos;T</p>
                  <p className="text-white/55 text-xs leading-relaxed">Static images generated 3.2x lower engagement. Long captions correlated with below-average saves.</p>
                </div>
                <div className="px-4 py-3 flex items-start justify-between gap-3">
                  <p className="text-[#a78bfa] text-[10px] font-bold tracking-wider uppercase flex-shrink-0 w-28">✦ VS INDUSTRY</p>
                  <p className="text-white/55 text-xs leading-relaxed">Campaign ER is 0.4% above industry average. Reach growth outperforms 78% of comparable campaigns.</p>
                </div>
              </div>

              <div className="px-4 py-3 bg-zinc-800/50 flex items-start justify-between gap-3">
                <p className="text-[#C8FF00] text-[10px] font-bold tracking-wider uppercase flex-shrink-0 w-28">✦ AI-GENERATED STRATEGY</p>
                <p className="text-white/50 text-xs leading-relaxed">Lead with 15-20s vertical video · Post Tue-Thu 11am-1pm · Avoid long captions</p>
              </div>
            </div>
          </FadeLeft>
        </div>
      </section>
      {/* ── ATHLETE ECONOMY ── */}
      <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <FadeLeft className="md:col-start-1 md:row-start-1">
            <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
              Built for the Athlete Economy
            </span>
            <h3 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
              We&apos;re Making it Easy for Everyone to Work With Athletes.
            </h3>
            <p className="text-white/60 mb-6">
              Athletes stay focused on their sport while leveraging their influence away from it.
            </p>
            <a href="https://calendly.com/jordon-jaba/jaba" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
              Hear from Founder &amp; CEO Jordon Rooney →
            </a>
          </FadeLeft>
          {/* Right: Video */}
          <FadeRight className="md:col-start-2 md:row-start-1">
            <div className="ml-auto mr-0 w-full max-w-[340px] rounded-2xl border border-[#C8FF00]/30 bg-[#111] shadow-[0_0_60px_rgba(180,255,0,0.35)] overflow-hidden">
              <div className="relative aspect-[9/16] bg-black">
                {showBottomShort ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/HK-j2ESVSvI?rel=0&autoplay=1"
                    title="JABA Shorts video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setShowBottomShort(true)}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/Thumnail_video.png"
                      alt="Video thumbnail"
                      fill
                      className="object-cover"
                      priority
                    />
                    <span className="absolute inset-0 bg-black/25" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="h-14 w-14 rounded-full bg-white/90 text-black flex items-center justify-center text-lg">
                        ▶
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </FadeRight>
        </div>
      </section>
      {/* ── BRAND DEALS ── */}
      <section className="relative z-10 bg-[rgba(0,0,0,0.78)] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center">
              <span className="inline-block text-xs font-medium border border-white/20 text-white/60 rounded-full px-3 py-1 mb-6">
                Brand Deals
              </span>
              <h2 className="text-5xl md:text-7xl font-extrabold font-bricolage text-white leading-tight text-center">
                Find the Right Contact.
                <br />
                Close the Right Deal.
                <br />
                <span className="text-[#C8FF00]">Every Time.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/60 text-lg mt-4">
                JABA&apos;s database of over 300,000 brands is focused on athlete brand deals, not corporate sponsorships. JABA has the contact info and deal history of every brand that has ever worked with an athlete.
              </p>
              <p className="max-w-2xl mx-auto text-white/60 text-lg mt-4">
                Our AI generates the media kit and crafts the pitch showing the brand exactly how they can work with your athletes.
              </p>
            </div>
          </FadeUp>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <ScaleIn delay={0}>
              <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden p-6 flex flex-col h-full hover:border-white/20 transition-all duration-300">
                <div className="text-2xl mb-3">🔍</div>
                <p className="text-white font-semibold text-base mb-2">Contact Discovery</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Find verified marketing directors, sponsorship leads, and brand managers. Search by name, company, or role using LinkedIn profiles and people directory data.
                </p>
                <div className="mt-auto">
                  <div className="bg-zinc-800 rounded-xl p-3 mt-2 h-[180px]">
                    <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">Contact Search Results</p>
                    {[
                      { name: "Sarah Chen", role: "Head of Partnerships · Alo" },
                      { name: "Luis Ortega", role: "Sponsorship Director · Vuori" },
                      { name: "Maya Johnson", role: "Brand Manager · Fabletics" },
                    ].map((row, i) => (
                      <FadeUp key={row.name} delay={i * 150}>
                        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                          <div>
                            <p className="text-white text-sm font-medium">{row.name}</p>
                            <p className="text-white/40 text-xs">{row.role}</p>
                          </div>
                          <span className="bg-blue-600 text-white text-[9px] px-1 rounded">in</span>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["LinkedIn Verified", "300K+ Brands"].map((tag) => (
                      <span key={tag} className="text-[10px] border border-white/15 text-white/50 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>

            <ScaleIn delay={120}>
              <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden p-6 flex flex-col h-full hover:border-white/20 transition-all duration-300">
                <div className="text-2xl mb-3">⊞</div>
                <p className="text-white font-semibold text-base mb-2">Brand Deal Database</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Over 300,000 brands that have activated athlete deals. Contact info, deal history, EMV, and category filters included.
                </p>
                <div className="mt-auto">
                  <div className="bg-zinc-800 rounded-xl p-3 mt-2 h-[180px]">
                    <div className="flex items-center pb-1 mb-1 gap-2">
                      <div className="flex-1 text-[10px] text-white/30 uppercase tracking-wider">BRAND</div>
                      <div className="w-12 text-center text-[10px] text-white/30 uppercase tracking-wider">DEALS</div>
                      <div className="w-20 text-right text-[10px] text-white/30 uppercase tracking-wider">OVERLAP</div>
                    </div>
                    {[
                      {
                        brand: "Alo",
                        logo: "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://aloyoga.com&size=128",
                        deals: "287",
                        overlap: "87% match",
                        hot: true,
                      },
                      {
                        brand: "Vuori",
                        logo: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://vuori.com&size=128",
                        deals: "164",
                        overlap: "73% match",
                      },
                      {
                        brand: "Fabletics",
                        logo: "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://fabletics.com&size=128",
                        deals: "312",
                        overlap: "68% match",
                      },
                    ].map((row, i) => (
                      <FadeUp key={row.brand} delay={i * 120}>
                        <div className="flex items-center py-2 border-b border-white/5 hover:bg-white/5 transition-colors gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <img
                              src={row.logo}
                              alt={row.brand}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded-sm object-contain bg-white flex-shrink-0"
                              style={{ width: 20, height: 20, flexShrink: 0 }}
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                            <span className="text-sm text-white truncate">{row.brand}</span>
                          </div>
                          <div className="w-12 flex-shrink-0 text-center">
                            <span className="text-sm text-white/70">{row.deals}</span>
                          </div>
                          <div className="w-20 flex-shrink-0 text-right">
                            <span className={row.hot ? "text-sm text-[#C8FF00] font-semibold" : "text-sm text-white/70"}>{row.overlap}</span>
                          </div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Deal History", "EMV Data", "Category Filters"].map((tag) => (
                      <span key={tag} className="text-[10px] border border-white/15 text-white/50 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>

            <ScaleIn delay={240}>
              <div
                ref={mediaKitRef}
                className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden p-6 flex flex-col h-full hover:border-white/20 transition-all duration-300"
              >
                <div className="text-2xl mb-3">◻</div>
                <p className="text-white font-semibold text-base mb-2">Interactive Media Kits</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  AI-generated pitch decks that show a brand exactly where their audience overlaps with your athlete&apos;s following. Built to close.
                </p>
                <div className="mt-auto">
                  <div className="bg-zinc-800 rounded-xl p-3 mt-2 h-[180px]">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white text-sm font-semibold">Demar Johnson</p>
                      <span className="bg-zinc-700 text-white/60 text-[10px] px-2 rounded-full">FOOTWEAR</span>
                    </div>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Audience Overlap</p>
                    <div className="text-white/50 text-xs space-y-0.5">
                      <p>Primary audience: 18-24</p>
                      <p>Top platform: Instagram Reels</p>
                      <p>Best fit: Lifestyle + Training</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-[#C8FF00] text-xs mb-1">34% overlap with brand target</p>
                      <div className="w-full bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#C8FF00] rounded-full"
                          style={{
                            width: mediaKitInView ? "34%" : "0%",
                            transition: "width 1.2s ease-out",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Auto-Generated", "Live Data", "Brand-Specific"].map((tag) => (
                      <span key={tag} className="text-[10px] border border-white/15 text-white/50 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          <div className="mt-5">
            <FadeUp>
              <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="inline-block text-xs font-medium border border-[#7B5CF0]/40 bg-[#7B5CF0]/20 text-[#a78bfa] rounded-full px-3 py-1">
                      CRM + AI Outreach
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-3">
                      AI handles the follow-up. You handle the close.
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      JABA&apos;s CRM automates responses, logs every touch, and drafts personalized outreach emails in seconds. No more copy-paste. No more missed follow-ups.
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-xl p-4 border border-white/10">
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mb-3">AI Draft · Outreach Email</p>
                    <div className="bg-zinc-700 rounded-lg p-3 text-white/70 text-sm leading-relaxed italic min-h-[120px]">
                      <TypedText
                        text="Hi [Name], I wanted to reach out about a potential NIL partnership with Marcus Webb. His audience has a 34% overlap with the 18-24 demographic, and he is actively posting in the footwear category with strong game-day engagement..."
                        speed={25}
                      />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]">
                        USE DRAFT
                      </button>
                      <button className="border border-white/20 text-white/60 text-xs px-4 py-2 rounded-full hover:border-white/40 transition-colors">
                        REGENERATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Deliverables & Deadlines", "Approval Status", "Missed Windows", "Automated Follow-Ups", "CRM Integration"].map((tag) => (
                <span key={tag} className="text-xs border border-white/15 text-white/50 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
      {/* ── CTA SECTION ── */}
      <section className="relative z-10 py-24 px-6 bg-[rgba(0,0,0,0.78)]">
        <ScaleIn>
          <div
            className="max-w-[780px] mx-auto rounded-3xl py-16 px-12 border border-white/10 text-center"
            style={{
              background: "linear-gradient(135deg, #2d1b6e 0%, #1a0f4a 50%, #0d0820 100%)",
              boxShadow: "0 0 80px 20px rgba(123, 92, 240, 0.15)",
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold font-bricolage text-white text-center">Let&apos;s Talk About Your Agency</h2>
            <p className="text-white/60 text-lg mt-4 text-center">See how agencies use JABA to manage deliverables at scale.</p>
            <a
              href="https://calendly.com/jordon-jaba/jaba"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-white px-7 py-3 rounded-full font-semibold transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
            >
              Book a call ↗
            </a>
          </div>
        </ScaleIn>
      </section>
      {/* ── FOOTER ── */}
      <footer className="relative pt-20 pb-10 px-6 border-t border-white/10 bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at center bottom, rgba(123,92,240,0.22), transparent 55%)"
        }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-10">
            <div>
              <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={40} className="object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">Socials</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/jaba/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C8FF00] transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/company/jaba-ai/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C8FF00] transition-colors">Linkedin</a>
              </div>
            </div>
          </div>
          <div className="h-px bg-white/10 mb-4" />
          <p className="text-xs text-white/40">© All right reserved</p>
        </div>
      </footer>
    </main>
    </>
  );
}
