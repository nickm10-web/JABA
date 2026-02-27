"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";

type LogoItem = { src?: string; alt: string; label?: string; color?: string };

const LOGOS: LogoItem[] = [
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

const PORTFOLIO_ROWS = [
  { brand: "Brand A - Footwear", athletes: "12 athletes", campaigns: "3 running", next: "Instagram Story · Mar 2", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
  { brand: "Brand B - Apparel", athletes: "8 athletes", campaigns: "2 running", next: "YouTube Vlog · Mar 5", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
  { brand: "Brand C - Beverage", athletes: "5 athletes", campaigns: "1 running", next: "TikTok Series · Mar 8", status: "⚠ QC ISSUE", statusClass: "text-yellow-400" },
  { brand: "Brand D - Finance", athletes: "3 athletes", campaigns: "1 running", next: "Contract Review", status: "◎ DRAFT", statusClass: "text-white/40" },
  { brand: "Brand E - Retail", athletes: "7 athletes", campaigns: "2 running", next: "Photo Shoot · Mar 12", status: "● RUNNING", statusClass: "text-[#C8FF00]" },
];

const MATCH_ROWS = [
  { athlete: "Marcus Webb", sub: "Football · 1.2M followers", brand: "Brand A - Footwear", detail: "92% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Dani Torres", sub: "Women's Basketball · 674K", brand: "Brand B - Apparel", detail: "HIGH alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Jordan Ellis", sub: "Football · 812K", brand: "Brand E - Retail", detail: "Outreach pending", tag: "REACHED OUT", tagClass: "text-white/40" },
  { athlete: "Aaliyah Reeves", sub: "Women's Basketball · 651K", brand: "Brand C - Beverage", detail: "88% alignment", tag: "✦ NEW MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Tyler Brooks", sub: "Alabama · Baseball · 412K", brand: "Brand D - Finance", detail: "85% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
  { athlete: "Simone Carter", sub: "Texas · Track · 389K", brand: "Brand A - Footwear", detail: "81% alignment", tag: "✦ MATCH", tagClass: "text-[#C8FF00]" },
];

const REPORTING_ROWS = [
  { brand: "Brand A - Footwear", reach: "808.6M", engagement: "60.9M", emv: "$73.9K", perf: "+110.8% REACH", tier: "TOP 1%" },
  { brand: "Brand B - Apparel", reach: "496.3M", engagement: "44.2M", emv: "$51.2K", perf: "+88.4% REACH", tier: "TOP 5%" },
  { brand: "Brand C - Beverage", reach: "312.1M", engagement: "28.7M", emv: "$32.8K", perf: "+64.2% REACH", tier: "TOP 10%" },
  { brand: "Brand E - Retail", reach: "241.8M", engagement: "19.4M", emv: "$24.1K", perf: "+41.3% REACH", tier: "TOP 15%" },
];

const TOOLS = [
  { icon: "↗", title: "Brand Performance Report", desc: "One-click report · live data · ranked athletes" },
  { icon: "◻", title: "Athlete Pitch Deck", desc: "Auto-generated media kit for any athlete" },
  { icon: "⊞", title: "Portfolio Summary", desc: "Aggregated portfolio view for QBRs" },
  { icon: "◈", title: "Brand-Athlete Match Report", desc: "AI-generated. Data-backed.", comingSoon: true },
];

const MATCH_REPORT_TEXT = "AI-generated. Data-backed.";

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
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
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

export default function AOR2Page() {
  const [activePortfolioRow, setActivePortfolioRow] = useState(0);
  const [showMainVideo, setShowMainVideo] = useState(false);
  const { ref: operationalRealityRef, inView: operationalRealityInView } = useInView(0.15);
  const [activeMatchRow, setActiveMatchRow] = useState(0);
  const [activeReportingRow, setActiveReportingRow] = useState(0);
  const [activeToolRow, setActiveToolRow] = useState(0);
  const [typedMatchReport, setTypedMatchReport] = useState("");
  const [showBottomShort, setShowBottomShort] = useState(false);

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

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.82)), url('/header-bg-without-balls.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <StarField />
          <div className="pointer-events-none absolute inset-0 bg-black/60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black z-[2]" />
          <Reveal className="relative z-10 [transition-delay:80ms]">
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 font-bricolage text-white mx-auto">
              ONE PLATFORM.
              <br />
              EVERY BRAND.
              <br />
              <span className="text-[#C8FF00]">EVERY ATHLETE.</span>
            </h1>
          </Reveal>
          <Reveal className="relative z-10 [transition-delay:180ms]">
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
              JABA gives agencies of record a single command center to manage athlete partnerships across every brand in their portfolio  -  with the data, tools, and intelligence to prove ROI at every level.
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
          <Reveal>
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
                        border: `1px solid ${logo.color ? `${logo.color}66` : "rgba(255,255,255,0.2)"}`,
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
        </section>

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
              Agencies of record are now managing multiple brand clients, hundreds of athletes, thousands of deliverables, and the approvals, follow-ups, payments, and reporting tied to execution.
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

        <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)] text-center border-b border-[#1a1a1a]">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold font-bricolage text-white mb-16">AI that manages the whole AOR workflow.</h2>
            <div className="flex flex-wrap justify-center items-start gap-0 max-w-5xl mx-auto">
              {[
                "Manage portfolio",
                "Match athletes",
                "Track campaigns",
                "Report to brands",
                "Benchmark results",
              ].map((label, i) => (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center gap-3 px-2">
                    <div className="w-24 h-24 border border-[#C8FF00]/50 rounded-2xl flex items-center justify-center bg-gradient-to-b from-[#12170a] to-[#090b06] shadow-[0_0_18px_rgba(200,255,0,0.18)]">
                      <PipelineIcon step={i} />
                    </div>
                    <p className="text-[#C8FF00] text-sm font-semibold whitespace-pre-line text-center leading-tight max-w-[120px]">{label}</p>
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
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="relative z-10 py-16 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Portfolio Management" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Manage Every Brand You Represent.
                  <br />
                  <span className="text-[#C8FF00]">In One View.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  JABA&apos;s Brand Portfolio Dashboard gives AORs a bird&apos;s-eye view of every client brand  -  their active deals, athlete rosters, campaign performance, and upcoming deliverables  -  without switching logins or tabs.
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
                      <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr] text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-3 py-3 bg-white/5">
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
                              className={`grid grid-cols-[2fr_1fr_1fr_2fr_1fr] gap-2 px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                                activePortfolioRow === real ? "bg-white/5 border-l-2 border-[#C8FF00]" : ""
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

        <section className="relative z-10 py-16 bg-[#0A0A0A]">
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
                            className={`grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                              activeMatchRow === real ? "bg-white/5 border-l-2 border-[#C8FF00]" : ""
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs text-white font-medium truncate">{row.athlete}</p>
                              <p className="text-[10px] text-white/40 truncate">{row.sub}</p>
                            </div>
                            <div className="min-w-0 text-right">
                              <p className="text-xs text-white/60 truncate">{row.brand}</p>
                              <p className="text-[10px] text-white/40 truncate">{row.detail}</p>
                            </div>
                            <span className={`text-[10px] font-bold self-center ${row.tagClass}`}>{row.tag}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="order-first lg:order-last">
                <SectionBadge label="AI Matching" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  JABA Matches Athletes to the Right Brand.
                  <br />
                  <span className="text-[#C8FF00]">Automatically.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  AORs manage multiple brand clients with different audiences, categories, and goals. JABA&apos;s AI evaluates your full athlete database against each brand&apos;s specific criteria  -  surfacing the right fits, ranked by alignment score.
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

        <section className="relative z-10 py-16 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <SectionBadge label="Brand Reporting" />
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  Report to Every Brand.
                  <br />
                  At Once.
                  <br />
                  <span className="text-[#C8FF00]">With Real Data.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Each brand client gets their own dashboard  -  reach, engagement, earned media value, and campaign performance. You manage the portfolio. JABA generates the reports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Live Dashboards</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">EMV Tracking</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Portfolio Reports</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "2.1B+", label: "TOTAL PORTFOLIO REACH" },
                      { value: "47", label: "ACTIVE DEALS" },
                      { value: "$2.4M", label: "EARNED MEDIA VALUE" },
                      { value: "4.2%", label: "AVG ENGAGEMENT RATE" },
                    ].map((stat) => (
                      <div key={stat.label} className="border border-white/10 rounded-lg p-3 bg-black/30">
                        <p className="text-2xl font-bold text-[#C8FF00]">{stat.value}</p>
                        <p className="text-[10px] uppercase text-white/40 tracking-widest mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 my-4" />

                  <div className="border border-white/10 rounded-sm overflow-hidden">
                    <div className="grid grid-cols-5 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-3 py-3 bg-white/5">
                      <span>BRAND</span>
                      <span>TOTAL REACH</span>
                      <span>ENG.</span>
                      <span>EMV</span>
                      <span>PERFORMANCE</span>
                    </div>
                    <div className="h-[160px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />
                      <div style={{ animation: "tableScroll 16s linear infinite" }}>
                        {[...REPORTING_ROWS, ...REPORTING_ROWS].map((row, i) => {
                          const real = i % REPORTING_ROWS.length;
                          return (
                            <div
                              key={`${row.brand}-${i}`}
                              className={`grid grid-cols-5 gap-2 px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                                activeReportingRow === real ? "bg-white/5 border-l-2 border-[#C8FF00]" : ""
                              }`}
                            >
                              <span className="text-xs text-white truncate">{row.brand}</span>
                              <span className="text-xs text-white/60 truncate">{row.reach}</span>
                              <span className="text-xs text-white/60 truncate">{row.engagement}</span>
                              <span className="text-xs text-[#C8FF00] truncate">{row.emv}</span>
                              <div>
                                <p className="text-[10px] text-white/60 truncate">{row.perf}</p>
                                <p className="text-[10px] text-[#C8FF00] font-bold truncate">{row.tier}</p>
                              </div>
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

        <section className="relative z-10 py-16 bg-[#0A0A0A]">
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
                  1M+ Posts Analyzed.
                  <br />
                  <span className="text-[#C8FF00]">Across Every Brand.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  JABA watches every piece of athlete content across your portfolio and generates the deliverables that used to take your team hours  -  in seconds.
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

        <section className="relative z-10 py-16 bg-[#0A0A0A]">
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
                  JABA benchmarks performance three ways for every brand in your portfolio  -  against their own prior campaigns, against their industry, and against comparable athlete categories. You walk into every QBR with context no one else has.
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

        <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)]">
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

        <section className="relative z-10 py-24 px-6 bg-[#0A0A0A]">
          <Reveal>
            <div
              className="max-w-[780px] mx-auto rounded-3xl py-16 px-12 border border-white/10 text-center"
              style={{
                background: "linear-gradient(135deg, #2d1b6e 0%, #1a0f4a 50%, #0d0820 100%)",
                boxShadow: "0 0 80px 20px rgba(123, 92, 240, 0.15)",
              }}
            >
              <h2 className="font-bricolage text-4xl md:text-5xl font-bold text-white mb-4">Let&apos;s Talk About Your Portfolio</h2>
              <p className="text-white/60 text-lg mb-8">
                See how AORs use JABA to manage athlete partnerships across every brand in their portfolio at scale.
              </p>
              <a
                href="https://calendly.com/jordon-jaba/jaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
              >
                Book a demo ↗
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="bg-[#0A0A0A] border-t border-white/5 px-6 py-10">
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
      `}</style>
    </div>
  );
}
