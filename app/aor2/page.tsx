"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";

type LogoItem = { src?: string; alt: string; label?: string; color?: string };

const LOGOS: LogoItem[] = [
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

const PORTFOLIO_ROWS = [
  { brand: "Brand A", athletes: "12 athletes", campaigns: "3 running", next: "Instagram Story · Mar 2", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
  { brand: "Brand B", athletes: "8 athletes", campaigns: "2 running", next: "YouTube Vlog · Mar 5", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
  { brand: "Brand C", athletes: "5 athletes", campaigns: "1 running", next: "TikTok Series · Mar 8", status: "⚠ QC ISSUE", statusClass: "text-yellow-400" },
  { brand: "Brand D", athletes: "3 athletes", campaigns: "1 running", next: "Contract Review", status: "◎ DRAFT", statusClass: "text-white/40" },
  { brand: "Brand E", athletes: "7 athletes", campaigns: "2 running", next: "Photo Shoot · Mar 12", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
];

const MATCH_ROWS = [
  { athlete: "Marcus Webb", sub: "Football · 1.2M followers", brand: "Brand A", detail: "92% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Dani Torres", sub: "Women's Basketball · 674K", brand: "Brand B", detail: "HIGH alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Jordan Ellis", sub: "Football · 812K", brand: "Brand E", detail: "Outreach pending", tag: "REACHED OUT", tagClass: "text-white/40" },
  { athlete: "Aaliyah Reeves", sub: "Women's Basketball · 651K", brand: "Brand C", detail: "88% alignment", tag: "✦ NEW MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Tyler Brooks", sub: "Alabama · Baseball · 412K", brand: "Brand D", detail: "85% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Simone Carter", sub: "Texas · Track · 389K", brand: "Brand A", detail: "81% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
];

const REPORTING_ROWS = [
  { brand: "Brand A", reach: "808.6M", engagement: "60.9M", emv: "$73.9K", baseline: "+18% vs athlete avg" },
  { brand: "Brand B", reach: "496.3M", engagement: "44.2M", emv: "$51.2K", baseline: "+11% vs last campaign" },
  { brand: "Brand C", reach: "312.1M", engagement: "28.7M", emv: "$32.8K", baseline: "-6% vs last campaign" },
  { brand: "Brand E", reach: "241.8M", engagement: "19.4M", emv: "$24.1K", baseline: "+9% vs athlete avg" },
];

const TOOLS = [
  { icon: "↗", title: "Brand Performance Report", desc: "One-click report · live data · ranked athletes" },
  { icon: "◻", title: "Athlete Pitch Deck", desc: "Auto-generated media kit for any athlete" },
  { icon: "⊞", title: "Portfolio Summary", desc: "Aggregated portfolio view for QBRs" },
  { icon: "◈", title: "Brand-Athlete Match Report", desc: "AI-generated. Data-backed.", comingSoon: true },
];

const MATCH_REPORT_TEXT = "AI-generated. Data-backed.";

const IMESSAGE_THREAD = [
  { from: "agent", text: "Can you check what’s still outstanding for the Nike campaign?", time: "9:14 AM" },
  { from: "jaba", text: "On it. 4 of 5 deliverables are complete - one Instagram Story is still missing for Friday.", time: "9:15 AM" },
  { from: "agent", text: "Got it. Please remind Marcus now and cc me.", time: "9:16 AM" },
  { from: "jaba", text: "Done - reminder sent. Story is due today at 6:00 PM, and I’ll follow up again in 2 hours if it’s still missing.", time: "9:17 AM" },
  { from: "jaba", text: "Also flagged: Tyler Brooks’ caption is missing the collab tag and has unapproved wording. Marked for quick review.", time: "9:19 AM" },
  { from: "agent", text: "Perfect. Anything else I should know?", time: "9:20 AM" },
  { from: "jaba", text: "One more: possible exclusivity conflict on Tavin Jones, plus a draft using restricted IP (old logo lockup). I requested revision before posting.", time: "9:22 AM" },
  { from: "jaba", text: "Payment is queued once final delivery is confirmed. Posting window is set for tomorrow, 12:00-2:00 PM.", time: "9:24 AM" },
];

const CAMPAIGN_PIPELINE_STAGES = [
  {
    name: "Briefing",
    count: 3,
    items: [
      { title: "Spring Drop", athletesCount: 6, dueLabel: "Due Thu" },
      { title: "Campus Tour", athletesCount: 4, dueLabel: "Due Mon" },
      { title: "Product Seeding", athletesCount: 8, dueLabel: "Due Fri" },
    ],
  },
  {
    name: "In Progress",
    count: 6,
    items: [
      { title: "Game Day Push", athletesCount: 5, dueLabel: "Live" },
      { title: "Summer Kit", athletesCount: 7, dueLabel: "Live" },
      { title: "City Pop-Up", athletesCount: 3, dueLabel: "Live" },
    ],
  },
  {
    name: "Ready to Post",
    count: 4,
    items: [
      { title: "Back to School", athletesCount: 6, dueLabel: "Due Fri" },
      { title: "Holiday Teaser", athletesCount: 4, dueLabel: "Due Sat" },
      { title: "Weekend Drop", athletesCount: 5, dueLabel: "Due Sun" },
    ],
  },
  {
    name: "Completed",
    count: 9,
    items: [
      { title: "Launch Week", athletesCount: 8, dueLabel: "Done" },
      { title: "Rivalry Night", athletesCount: 4, dueLabel: "Done" },
      { title: "Starter Pack", athletesCount: 3, dueLabel: "Done" },
    ],
  },
];


function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

function SectionBadge({ label }: { label: string }) {
  return <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">{label}</span>;
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    };

    const makeStars = (): Star[] =>
      Array.from({ length: 120 }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const dx = cx - x;
        const dy = cy - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = Math.random() * 0.22 + 0.06;
        return {
          x,
          y,
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          r: Math.random() * 1.4 + 0.4,
          opacity: Math.random() * 0.16 + 0.1,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
        };
      });

    let stars = makeStars();
    let frame = 0;
    let animId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars = stars.map((star) => {
        let x = star.x + star.vx;
        let y = star.y + star.vy;
        const distToCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

        if (distToCenter < 30) {
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) {
            x = Math.random() * canvas.width;
            y = 0;
          } else if (edge === 1) {
            x = canvas.width;
            y = Math.random() * canvas.height;
          } else if (edge === 2) {
            x = Math.random() * canvas.width;
            y = canvas.height;
          } else {
            x = 0;
            y = Math.random() * canvas.height;
          }
          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = Math.random() * 0.22 + 0.06;
          return { ...star, x, y, vx: (dx / dist) * speed, vy: (dy / dist) * speed };
        }
        return { ...star, x, y };
      });

      stars.forEach((star) => {
        const twinkle = 0.75 + 0.25 * Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
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
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />;
}

function PipelineIcon({ step }: { step: number }) {
  if (step === 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    );
  }
  if (step === 1) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    );
  }
  if (step === 3) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L9.75 17.964 6 18.75l.786-3.75L16.862 4.487Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 5.625 2.625 2.625" />
      </svg>
    );
  }
  if (step === 4) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m5.25 6a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 15.75V6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v9.75Z" />
      </svg>
    );
  }
  if (step === 5) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-8.25a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6v12a2.25 2.25 0 0 0 2.25 2.25h6.75m6-6 2.25 2.25m0 0L19.5 18.75m2.25-2.25H15m-7.5-6h4.5m-4.5 3h3m-3-6h6" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
  );
}

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
        <div style={{ animation: "imessageScroll 72s linear infinite", willChange: "transform", paddingTop: "12px" }}>
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

export default function Agency2Page() {
  const [activePortfolioRow, setActivePortfolioRow] = useState(0);
  const [showMainVideo, setShowMainVideo] = useState(false);
    const [activeMatchRow, setActiveMatchRow] = useState(0);
  const [activeReportingRow, setActiveReportingRow] = useState(0);
  const [activeToolRow, setActiveToolRow] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [typedMatchReport, setTypedMatchReport] = useState("");
  const [showBottomShort, setShowBottomShort] = useState(false);
  const [pipelineBarsReady, setPipelineBarsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePortfolioRow((prev) => (prev + 1) % PORTFOLIO_ROWS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMatchRow((prev) => (prev + 1) % MATCH_ROWS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReportingRow((prev) => (prev + 1) % REPORTING_ROWS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveToolRow((prev) => (prev + 1) % TOOLS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeToolRow === 3) {
      setTypedMatchReport("");
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedMatchReport(MATCH_REPORT_TEXT.slice(0, i + 1));
        i++;
        if (i >= MATCH_REPORT_TEXT.length) clearInterval(typeInterval);
      }, 35);
      return () => clearInterval(typeInterval);
    }
  }, [activeToolRow]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPipelineBarsReady(true);
      return;
    }
    setPipelineBarsReady(false);
    const id = window.setTimeout(() => setPipelineBarsReady(true), 60);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const maxPipelineCount = Math.max(...CAMPAIGN_PIPELINE_STAGES.map((stage) => stage.count));

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <div
          style={{
            position: "absolute",
            top: "-12%",
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
            top: "28%",
            right: "-20%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,60,220,0.22) 0%, rgba(100,60,220,0.06) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <main className="relative z-10">
        <nav className="sticky top-0 z-50 relative z-10 flex items-center justify-between px-6 md:px-12 h-16 bg-black border-b border-white/5">
          <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={42} className="object-contain" />
          <a
            href="https://calendly.com/jordon-jaba/jaba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium px-5 py-2 rounded-full text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
          >
            Book a demo
          </a>
        </nav>

        <section
          className="relative min-h-[72vh] flex flex-col items-center justify-center text-center px-6 pt-0 pb-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.72)), url('/header-bg-without-balls.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <StarField />
          <div className="pointer-events-none absolute inset-0 bg-black/50" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black z-[2]" />
          <Reveal className="relative z-10 [transition-delay:80ms]">
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 font-bricolage text-white mx-auto">
              ATHLETE BRAND
              <br />
              CAMPAIGNS,
              <br />
              <span className="text-[#C8FF00]">MANAGED FOR YOU.</span>
            </h1>
          </Reveal>
          <Reveal className="relative z-10 [transition-delay:180ms]">
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
              This is JABA. AI that makes it easy to collaborate with athletes.
            </p>
          </Reveal>
          <Reveal className="relative z-10 [transition-delay:280ms]">
            <a
              href="https://calendly.com/jordon-jaba/jaba"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
            >
              Demo JABA <span className="text-base">↗</span>
            </a>
          </Reveal>
        </section>

        <section className="bg-black py-12 overflow-hidden relative z-10">
          <Reveal className="relative z-10">
            <p className="text-center text-sm text-white/50 mb-6 tracking-wide">JABA is trusted across college athletics &amp; pro sports</p>
          </Reveal>
          <div
            className="relative flex overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)",
            }}
          >
            <div className="flex gap-10 items-center flex-shrink-0" style={{ animation: "marquee 28s linear infinite", willChange: "transform" }}>
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[68px]">
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
                        border: `1px solid ${logo.color ? `${logo.color}66` : "rgba(255,255,255,0.2)"}`,
                        color: logo.color || "rgba(255,255,255,0.7)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {logo.label}
                    </div>
                  )}
                  <p className="text-[10px] leading-none text-white/55 whitespace-nowrap text-center">
                    {logo.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section className="relative z-10 py-20 px-6 flex justify-center bg-black">
          <div
            className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden"
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

        <section
          className="relative z-10 py-28 px-6 text-center overflow-hidden"
          style={{
            backgroundImage: "url('/school-logos/Background_image_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-black/72" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold font-bricolage text-white mb-16">JABA helps agencies manage the whole lifecycle of a campaign.</h2>
            <div className="flex flex-wrap justify-center items-start gap-x-4 gap-y-6 md:gap-x-6 max-w-5xl mx-auto">
              {[
                "Reminders",
                "Follow-ups",
                "Checking on posts",
                "Contracts being signed",
                "Approvals",
                "Reporting",
              ].map((label, i) => (
                <div key={label} className="w-[126px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 border border-[#C8FF00]/50 rounded-2xl flex items-center justify-center bg-gradient-to-b from-[#12170a] to-[#090b06] shadow-[0_0_18px_rgba(200,255,0,0.18)]">
                      <PipelineIcon step={i} />
                    </div>
                    <p className="text-[#C8FF00] text-sm font-semibold whitespace-pre-line text-center leading-tight max-w-[120px]">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Campaign Management" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Manage Every Campaign
                  <br />
                  You&apos;re Running.
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Find athletes. Give an offer to them or their agency. Start a campaign. Manage deliverables. Track results. JABA gives your team a single dashboard to run it all without switching logins or tabs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Portfolio View</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Campaign Status</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Live Deliverables</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <p className="text-[10px] tracking-widest text-white/40 uppercase mb-3">PORTFOLIO OVERVIEW</p>
                  <div className="border border-white/10 rounded-sm overflow-hidden">
                      <div className="grid grid-cols-[1.9fr_1fr_1fr_1.9fr_1.1fr] gap-3 text-[9px] tracking-[0.08em] text-white/30 border-b border-white/10 px-4 py-3 bg-white/5">
                        <span>BRAND</span>
                        <span>ATHLETES</span>
                        <span>CAMPAIGNS</span>
                        <span>NEXT DUE</span>
                        <span>STATUS</span>
                      </div>
                    <div className="h-[260px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div style={{ animation: "tableScroll 18s linear infinite" }}>
                        {[...PORTFOLIO_ROWS, ...PORTFOLIO_ROWS].map((row, i) => {
                          const real = i % PORTFOLIO_ROWS.length;
                          return (
                            <div
                              key={`${row.brand}-${i}`}
                              className={`grid grid-cols-[1.9fr_1fr_1fr_1.9fr_1.1fr] gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                                activePortfolioRow === real ? "bg-white/5 shadow-[inset_2px_0_0_0_#C8FF00]" : ""
                              }`}
                            >
                              <span className="text-sm text-white truncate">{row.brand}</span>
                              <span className="text-xs text-white/60 truncate">{row.athletes}</span>
                              <span className="text-xs text-white/60 truncate">{row.campaigns}</span>
                              <span className="text-xs text-white/40 truncate">{row.next}</span>
                              <span className={`text-[10px] font-semibold ${row.statusClass}`}>{row.status}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal className="order-last lg:order-first">
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <p className="text-[10px] tracking-widest text-white/40 uppercase">ATHLETE-BRAND MATCHES</p>
                  <p className="text-[11px] text-white/40 mb-4">54 matches identified · Ranked by alignment score</p>
                  <div className="h-[240px] overflow-hidden relative border border-white/10 rounded-sm">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />
                    <div style={{ animation: "tableScroll 20s linear infinite" }}>
                      {[...MATCH_ROWS, ...MATCH_ROWS].map((row, i) => {
                        const real = i % MATCH_ROWS.length;
                        return (
                          <div
                            key={`${row.athlete}-${i}`}
                            className={`grid grid-cols-[1fr_120px_120px] gap-3 px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                              activeMatchRow === real ? "bg-white/5 shadow-[inset_2px_0_0_0_#C8FF00]" : ""
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs text-white font-medium truncate">{row.athlete}</p>
                              <p className="text-[10px] text-white/40 truncate">{row.sub}</p>
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-xs text-white/60 truncate">{row.brand}</p>
                              <p className="text-[10px] text-white/40 truncate">{row.detail}</p>
                            </div>
                            <span className={`text-[10px] font-bold self-center justify-self-end whitespace-nowrap ${row.tagClass}`}>{row.tag}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="order-first lg:order-last">
                <SectionBadge label="Talent Discovery" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Find the Right Athletes
                  <br />
                  For Every Brand.
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Finding and researching talent and their brand fit  -  athlete metrics, content and caption style, online reputation, comment sentiment, performance in sponsored content and more. JABA&apos;s AI surfaces the right fits, ranked by alignment score.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">AI-Powered</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Alignment Score</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Multi-Brand</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Campaign Analytics" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Report on Every Campaign and Benchmark Results.
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Give every brand a clean, always-up-to-date view of performance across posts and activations. Track engagement, earned media value, and delivery status - then compare each campaign against your past campaigns and athlete baselines to prove ROI and improve the next one.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Live Campaign Dashboards</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">EMV Tracking</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Campaign Benchmarks</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "2.1B+", label: "TOTAL CAMPAIGN REACH" },
                      { value: "47", label: "ACTIVE CAMPAIGNS" },
                      { value: "$2.4M", label: "EARNED MEDIA VALUE" },
                      { value: "4.2%", label: "AVG ENGAGEMENT RATE" },
                    ].map((stat, i) => (
                      <div key={stat.label} className="relative border border-white/10 rounded-lg p-3 bg-black/30 overflow-hidden">
                        <p className="text-2xl font-bold text-[#C8FF00]">{stat.value}</p>
                        <p className="text-[10px] uppercase text-white/40 tracking-widest mt-1">{stat.label}</p>
                        {!prefersReducedMotion && (
                          <span
                            aria-hidden="true"
                            className="campaign-stat-sweep pointer-events-none absolute inset-0"
                            style={{ animationDelay: `${i * 120}ms` }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 my-4" />

                  <div className="campaign-table-scroll border border-white/10 rounded-sm overflow-hidden">
                    <div className="grid grid-cols-[1.05fr_0.85fr_0.85fr_0.8fr_1.45fr] text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-3 py-3 bg-white/5">
                      <span>CAMPAIGN</span>
                      <span>REACH</span>
                      <span>ENG.</span>
                      <span>EMV</span>
                      <span>VS BASELINE</span>
                    </div>
                    <div className="h-[160px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div className="campaign-table-marquee" style={{ animation: prefersReducedMotion ? "none" : "campaignMarquee 28s linear infinite" }}>
                        {[...REPORTING_ROWS, ...REPORTING_ROWS].map((row, i) => {
                          const real = i % REPORTING_ROWS.length;
                          const campaignName = row.brand.replace("Brand", "Campaign");
                          const baselineUp = row.baseline.startsWith("+");
                          return (
                            <div
                              key={`${row.brand}-${i}`}
                              className={`grid grid-cols-[1.05fr_0.85fr_0.85fr_0.8fr_1.45fr] gap-2 px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                                activeReportingRow === real ? "bg-white/5 shadow-[inset_2px_0_0_0_#C8FF00]" : ""
                              }`}
                            >
                              <span className="text-xs text-white truncate">{campaignName}</span>
                              <span className="text-xs text-white/60 truncate">{row.reach}</span>
                              <span className="text-xs text-white/60 truncate">{row.engagement}</span>
                              <span className="text-xs text-[#C8FF00] truncate">{row.emv}</span>
                              <span
                                className={`text-[9px] font-medium inline-flex items-center rounded-full border px-2.5 py-1 w-fit whitespace-nowrap ${
                                  baselineUp
                                    ? "text-[#C8FF00] border-[#C8FF00]/30 bg-[#C8FF00]/10"
                                    : "text-yellow-300 border-yellow-300/30 bg-yellow-300/10"
                                }`}
                              >
                                {row.baseline}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal className="order-last lg:order-first">
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="space-y-1">
                    {[
                      { label: "VIDEO + STATIC", value: "AI watches hooks, logo placement, pacing, captions" },
                      { label: "SPONSORED VS ORGANIC", value: "Filter by paid or organic per brand client" },
                      { label: "CROSS-BRAND SIGNAL", value: "Trends from 300K+ posts across your portfolio" },
                      { label: "TOPIC BREAKDOWN", value: "3,508 Game Day · 2,272 Lifestyle · 1,162 Fashion" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors">
                        <span className="text-[#C8FF00] text-xs shrink-0 mt-0.5">✦</span>
                        <span className="text-[10px] tracking-widest font-bold text-white uppercase w-36 shrink-0">{item.label}</span>
                        <span className="text-xs text-white/50">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 my-4" />

                  <div className="space-y-2">
                    {TOOLS.map((tool, i) => (
                      <div
                        key={tool.title}
                        className={`flex items-start gap-3 py-2 border-b border-white/5 last:border-b-0 transition-all duration-300 ${
                          activeToolRow === i ? "bg-[#C8FF00]/5 border-l-2 border-[#C8FF00] pl-2 -ml-2" : ""
                        }`}
                      >
                        <span className="text-[#C8FF00] text-sm mt-0.5">{tool.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-white font-semibold">
                            {tool.title}
                            {tool.comingSoon && <span className="ml-2 text-[9px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">COMING SOON</span>}
                          </p>
                          {i === 3 && activeToolRow === 3 ? (
                            <p className="text-xs text-white/50">{typedMatchReport}<span className="animate-pulse">|</span></p>
                          ) : (
                            <p className="text-xs text-white/50">{tool.desc}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="order-first lg:order-last">
                <SectionBadge label="Content & AI Tools" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  1M+ Posts Analyzed
                  <br />
                  <span className="text-[#C8FF00]">Across Every Brand.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  JABA watches every piece of athlete content. We&apos;ll give you the insights on which content performs best and what your talent should be posting based on persona. See what other brands are doing as well.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Content Analysis</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">AI-Generated Reports</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Cross-Brand Signal</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Campaign Automation" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Manage Campaigns
                  <br />
                  <span className="text-[#C8FF00]">at Scale.</span>
                </h2>
                <p className="text-white/60 text-lg mb-5">
                  Customize brand briefs based on athletes voice, content style, personality along with brands campaign. Make each piece of content feel personalized.
                </p>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <p className="text-[10px] tracking-widest text-white/40 uppercase">CAMPAIGN PIPELINE</p>
                  <p className="text-[11px] text-white/45 mt-1 mb-3">Track every deliverable across athletes and brands.</p>
                  <div className="relative mb-4 border border-white/10 rounded-lg bg-black/30 px-3 py-3 overflow-hidden">
                    {!prefersReducedMotion && <span aria-hidden="true" className="pipeline-kpi-sweep absolute inset-0 pointer-events-none" />}
                    <div className="grid grid-cols-3 gap-3 relative z-10">
                      <div>
                        <p className="text-lg font-bold text-[#C8FF00] leading-none">12</p>
                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/40 mt-1">Active Campaigns</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#C8FF00] leading-none">47</p>
                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/40 mt-1">Athletes</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#C8FF00] leading-none">183</p>
                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/40 mt-1">Deliverables</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 divide-y divide-white/10">
                    {CAMPAIGN_PIPELINE_STAGES.map((stage) => {
                      const fillPct = Math.round((stage.count / maxPipelineCount) * 100);
                      const previewItems = stage.items.slice(0, 2);
                      const remaining = stage.items.length - previewItems.length;
                      return (
                        <div key={stage.name} className="pt-3 first:pt-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 truncate">{stage.name}</p>
                              <span className="text-[10px] text-[#C8FF00] border border-[#C8FF00]/30 bg-[#C8FF00]/10 rounded-full px-2 py-0.5">
                                {stage.count}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/40 hover:text-white/60 transition-colors whitespace-nowrap">View all</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#C8FF00] transition-[width] duration-700 ease-out"
                              style={{ width: prefersReducedMotion ? `${fillPct}%` : pipelineBarsReady ? `${fillPct}%` : "0%" }}
                            />
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {previewItems.map((item) => (
                              <span
                                key={`${stage.name}-${item.title}`}
                                className="inline-flex max-w-full items-center text-[10px] text-white/70 border border-white/10 rounded-full px-2 py-1 bg-black/30"
                              >
                                <span className="truncate">{item.title}</span>
                                <span className="ml-1 text-white/40 whitespace-nowrap">· {item.athletesCount} athletes · {item.dueLabel}</span>
                              </span>
                            ))}
                            {remaining > 0 && <span className="text-[10px] text-white/40 self-center">+{remaining} more</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        <section className="relative z-10 py-20 px-6 bg-black">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <IMessageCard />
            </Reveal>
            <Reveal>
              <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
                AI Workflow
              </span>
              <h3 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
                JABA Acts as the Agency&apos;s <span className="text-[#C8FF00]">Execution Layer.</span>
              </h3>
              <p className="text-white/60 mb-3">
                JABA&apos;s AI will manage every deliverable for you and send reminders on:
              </p>
              <ul className="text-white/60 mb-6 list-disc pl-5 space-y-1">
                <li>Posting time</li>
                <li>Incorrect caption, missed collab tag, etc.</li>
                <li>Improper use of IP</li>
                <li>Athlete breaking exclusivity</li>
                <li>Missed deadlines or missing assets</li>
                <li>Payment status and posting windows</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Deliverables Tracking", "Approvals & Follow-Ups", "Invoices & Reporting"].map((tag) => (
                  <span key={tag} className="text-xs border border-white/20 text-white/60 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Benchmarking" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Show Every Brand
                  <br />
                  How They
                  <br />
                  <span className="text-[#C8FF00]">Stack Up.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Track every metric possible and compare performance across every brand you manage  -  against their own past campaigns, against their industry, and against comparable athlete categories. Walk into every QBR with context no one else has.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Internal Benchmark</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Industry Comparison</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Sport / Category</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">BENCHMARK TYPES</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-32 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">INTERNAL BENCHMARK</p>
                        <span className="text-[9px] tracking-wider text-[#C8FF00] uppercase font-medium">✦ SPONSORED VS ORGANIC</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">Compare each brand&apos;s sponsored vs. organic athlete content.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">Engagement, reach, and saves  -  per brand client.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-32 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">INDUSTRY BENCHMARK</p>
                        <span className="text-[9px] tracking-wider text-blue-400 uppercase font-medium">↑ CATEGORY LEADERS</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">Compare campaign performance against category competitors.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">By company size and overall market  -  for every brand you manage.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-32 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">SPORT / CATEGORY</p>
                        <span className="text-[9px] tracking-wider text-[#C8FF00] uppercase font-medium">✦ CONFERENCE COMP</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">Benchmark against brands sponsoring the same athletes.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">Same sport, conference, or NCAA division across your portfolio.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-20 px-6 bg-black">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="md:col-start-2 md:row-start-1">
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
            </div>

            <div className="md:col-start-1 md:row-start-1">
              <div className="ml-0 mr-auto w-full max-w-[340px] rounded-2xl border border-[#C8FF00]/30 bg-[#111] shadow-[0_0_60px_rgba(180,255,0,0.35)] overflow-hidden">
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
            </div>
          </div>
        </section>

        <section className="relative z-10 py-24 px-6 bg-black">
          <Reveal>
            <div
              className="max-w-[780px] mx-auto rounded-3xl py-16 px-12 border border-white/10 text-center"
              style={{
                background: "linear-gradient(135deg, #2d1b6e 0%, #1a0f4a 50%, #0d0820 100%)",
                boxShadow: "0 0 80px 20px rgba(123, 92, 240, 0.15)",
              }}
            >
              <h2 className="font-bricolage text-4xl md:text-5xl font-bold text-white mb-4">Let&apos;s Talk About Your Campaigns</h2>
              <p className="text-white/60 text-lg mb-8">
                See how agencies use JABA to find athletes, run campaigns, and prove ROI  -  all in one place.
              </p>
              <a
                href="https://calendly.com/jordon-jaba/jaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
              >
                Demo JABA ↗
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="bg-black border-t border-white/5 px-6 py-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={40} className="object-contain" />
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <span className="text-white/20 uppercase tracking-widest text-xs">SOCIALS</span>
              <a href="https://www.instagram.com/jaba/?hl=en" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.linkedin.com/company/jaba-ai/?viewAsMember=true" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
            <span className="text-white/20 text-xs">© All right reserved</span>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes imessageScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes campaignMarquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes campaignShimmer {
          0% { transform: translateX(-120%); opacity: 0; }
          25% { opacity: 0.24; }
          70% { opacity: 0.2; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        .campaign-table-scroll:hover .campaign-table-marquee {
          animation-play-state: paused;
        }
        .campaign-stat-sweep {
          background: linear-gradient(100deg, transparent 25%, rgba(200,255,0,0.24) 50%, transparent 75%);
          animation: campaignShimmer 820ms ease-out 1 both;
        }
        .pipeline-kpi-sweep {
          background: linear-gradient(100deg, transparent 25%, rgba(200,255,0,0.2) 50%, transparent 75%);
          animation: campaignShimmer 900ms ease-out 1 both;
        }
        @media (prefers-reduced-motion: reduce) {
          .campaign-table-marquee,
          .campaign-stat-sweep,
          .pipeline-kpi-sweep {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
