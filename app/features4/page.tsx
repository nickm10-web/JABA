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

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-56px)",
        transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function FadeRight({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(56px)",
        transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.92)",
        transition: `opacity ${dur} ${easing} ${delay}ms, transform ${dur} ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
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

      frame += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 1 }} />;
}

function SectionBadge({ label }: { label: string }) {
  return <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">{label}</span>;
}

function SpendingTable() {
  const athletes = [
    { name: "Tevin Jones", total: "$165,000", cap: "$120,000", offset: "$45,000", deal: "Burger Deal Q4", amount2: "$25,000" },
    { name: "Marcus Webb", total: "$115,000", cap: "$85,000", offset: "$30,000", deal: "Nike Endorsement", amount2: "$20,000" },
    { name: "Jordan Ellis", total: "$95,000", cap: "$70,000", offset: "$25,000", deal: "Vuori Campaign", amount2: "$15,000" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-3.5">
        <h3 className="font-bricolage text-sm font-bold uppercase tracking-wider text-white">Spending Plans</h3>
        <span className="rounded-full border border-white/15 px-3 py-0.5 text-[10px] uppercase tracking-widest text-white/50">Commodities Tracker</span>
        <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[9px] text-white/40">i</span>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
            <span className="text-white/30">📅</span>
            <span>11/14/2025</span>
            <span className="text-white/30">to</span>
            <span>11/14/2026</span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
            Yearly <span className="ml-1 text-white/30">▾</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-4">
        <div className="px-5 py-5" style={{ background: "#18181b" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] text-emerald-400">$</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Total Budget</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-white">$20,595,000</p>
          <p className="mt-0.5 text-[10px] text-white/30">Cap + Offset</p>
        </div>
        <div className="px-5 py-5" style={{ background: "#18181b" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-yellow-500/20 text-[10px] text-yellow-400">$</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Salary Cap</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-yellow-400">$20,500,000</p>
          <p className="mt-0.5 text-[10px] text-white/30">Max: $20.5M</p>
        </div>
        <div className="px-5 py-5" style={{ background: "#18181b" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-[10px] text-blue-300">+</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Offset</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-blue-300">$95,000</p>
          <p className="mt-0.5 text-[10px] text-white/30">From deals</p>
        </div>
        <div className="px-5 py-5" style={{ background: "#18181b" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-pink-500/20 text-[10px] text-pink-400">⊞</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Total Deals</span>
          </div>
          <p className="text-lg md:text-2xl font-bold text-white">5</p>
          <p className="mt-0.5 text-[10px] text-white/30">Active deals</p>
        </div>
      </div>

      {/* Table */}
      <div className="p-5">
        <div className="overflow-x-auto rounded-xl border border-white/8 bg-black/30">
          {/* Table header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr_1fr] gap-2 border-b border-white/8 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
            <span className="flex items-center gap-1">Athlete Name <span className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/10 text-[8px] text-white/50">+</span></span>
            <span>Total Amount</span>
            <span>Salary Cap</span>
            <span>Offset</span>
            <span className="flex items-center gap-1">Deal 1 <span className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500/30 text-[8px] text-red-400">−</span></span>
            <span>Amount 2</span>
          </div>
          {/* Table rows */}
          {athletes.map((a) => (
            <div key={a.name} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr_1fr] gap-2 border-b border-white/5 px-4 py-3.5 text-sm last:border-b-0">
              <span className="text-white/80">{a.name}</span>
              <span className="text-white/60">{a.total}</span>
              <span className="text-white/60">{a.cap}</span>
              <span className="text-white/60">{a.offset}</span>
              <span className="text-white/60">{a.deal}</span>
              <span className="text-white/60">{a.amount2}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Features4Page() {
  const [showMainVideo, setShowMainVideo] = useState(false);
  const [showBottomShort, setShowBottomShort] = useState(false);

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
      <main className="relative overflow-x-hidden bg-black font-sans text-white" style={{ zIndex: 1 }}>
        <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-black px-6 md:px-12">
          <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={42} className="object-contain" />
          <a
            href="https://calendly.com/jordon-jaba/jaba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/25 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] px-5 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)]"
          >
            Book a call
          </a>
        </nav>

        <section
          className="relative flex min-h-[72vh] flex-col items-center justify-center px-6 text-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.86)), url('/header-bg-without-balls.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,241,53,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(45,80,30,0.35),transparent_45%)]" />
          <StarField />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black z-[2]" />
          <FadeUp delay={100} className="relative z-10">
            <h1 className="mx-auto max-w-5xl font-bebas text-[2.6rem] leading-[0.95] text-[#C8F135] sm:text-5xl md:text-8xl">
              NIL Is Evolving Faster Than the Systems Built to Support It
            </h1>
          </FadeUp>
          <FadeUp delay={220} className="relative z-10">
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              Third-party NIL unlocks opportunity - and thousands of deliverables to manage.
            </p>
          </FadeUp>
          <FadeUp delay={340} className="relative z-10">
            <a
              href="https://calendly.com/jordon-jaba/jaba"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] px-7 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)]"
            >
              Demo JABA <span className="text-base">↗</span>
            </a>
          </FadeUp>
        </section>

        <section className="relative z-10 overflow-hidden bg-black py-6">
          <FadeUp>
            <p className="mb-6 text-center text-sm tracking-wide text-white/50">
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
            <div className="flex flex-shrink-0 items-center gap-10" style={{ animation: "marquee 28s linear infinite", willChange: "transform" }}>
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={`${logo.alt}-${i}`} className="flex min-w-[68px] flex-shrink-0 flex-col items-center gap-2">
                  {logo.src ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="flex h-10 w-auto items-center justify-center rounded-full px-3 text-xs font-bold tracking-wider text-white"
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
                  <p className="text-center text-[10px] leading-none text-white/55">{logo.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-black px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <FadeUp>
              <SectionBadge label="Operational Reality" />
              <h2 className="font-bricolage text-4xl font-bold leading-tight text-white md:text-5xl">
                More Deals. More Opportunities. More to Manage.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-white/65">
                Athletic departments are now managing hundreds of athletes, thousands of deliverables, and the approvals, follow-ups, payments, and reporting tied to execution.
              </p>
              <p className="mt-4 text-lg font-semibold text-white/80">Right now, this is all manual work.</p>
            </FadeUp>
          </div>
        </section>

        <section
          className="relative overflow-hidden px-6 py-24 text-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0.78), rgba(0,0,0,0.88)), radial-gradient(circle at top, rgba(200,241,53,0.16), transparent 38%), url('/header-bg-without-balls.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="mx-auto max-w-6xl">
            <FadeUp>
              <h2 className="font-bricolage text-3xl font-black text-[#C8F135] md:text-5xl lg:text-7xl">
                We Built AI to Fix This.
              </h2>
              <p className="mt-4 font-bricolage text-2xl font-bold text-white md:text-3xl lg:text-5xl">Meet JABA.</p>
            </FadeUp>
            <ScaleIn className="mx-auto mt-14 max-w-5xl">
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-[#C8F135]/30"
                style={{ boxShadow: "0 0 60px 12px rgba(180,255,0,0.35)" }}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#C8F135]/30 bg-black">
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
            </ScaleIn>
            <FadeUp className="mt-16">
              <h3 className="font-bricolage text-2xl font-bold text-white md:text-3xl lg:text-5xl">
                AI that manages the whole campaign lifecycle.
              </h3>
            </FadeUp>
            <FadeUp className="mt-10">
              <div className="flex justify-center px-0 md:px-4">
                <div className="flex w-full max-w-4xl items-center gap-0 overflow-x-auto md:overflow-x-visible rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-5 md:px-6">
                  <div className="flex min-w-[80px] md:min-w-0 flex-1 flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-[#C8F135]/30 bg-zinc-800">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Pitch</span>
                    <span className="mt-0.5 text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Brand Deals</span>
                  </div>
                  <span className="mx-1 md:mx-2 text-lg text-zinc-600 shrink-0">→</span>
                  <div className="flex min-w-[80px] md:min-w-0 flex-1 flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-[#C8F135]/30 bg-zinc-800">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Build</span>
                    <span className="mt-0.5 text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Campaigns</span>
                  </div>
                  <span className="mx-1 md:mx-2 text-lg text-zinc-600 shrink-0">→</span>
                  <div className="flex min-w-[80px] md:min-w-0 flex-1 flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-[#C8F135]/30 bg-zinc-800">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M9 7h6M9 11h6M9 15h4" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Manage</span>
                    <span className="mt-0.5 text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Deliverables</span>
                  </div>
                  <span className="mx-1 md:mx-2 text-lg text-zinc-600 shrink-0">→</span>
                  <div className="flex min-w-[80px] md:min-w-0 flex-1 flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-[#C8F135]/30 bg-zinc-800">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Track</span>
                    <span className="mt-0.5 text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Every Approval</span>
                  </div>
                  <span className="mx-1 md:mx-2 text-lg text-zinc-600 shrink-0">→</span>
                  <div className="flex min-w-[80px] md:min-w-0 flex-1 flex-col items-center">
                    <div className="mb-3 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl border border-[#C8F135]/30 bg-zinc-800">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8F135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap">Showcase ROI</span>
                    <span className="mt-0.5 text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Performance</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="relative z-10 overflow-hidden bg-black px-6 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeLeft className="order-2 lg:order-first">
              <div className="relative w-full max-w-[520px] mx-auto md:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/jaba-text-assistant-v2.png"
                  alt="JABA text assistant helping manage NIL deliverables and campaign execution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            </FadeLeft>
            <FadeUp className="order-1 lg:order-last">
              <SectionBadge label="AI Workflow" />
              <h2 className="font-bricolage text-3xl font-bold leading-tight text-white md:text-4xl">
                JABA Acts as the Athlete&apos;s Assistant So You Don&apos;t Have To
              </h2>
              <p className="mt-5 text-lg text-white/60">
                JABA manages the operational work behind every deal and campaign.
              </p>
              <p className="mt-4 text-lg text-white/60">
                JABA stays on top of deliverables, deadlines, approvals, follow ups, missed posts, and issues as they happen so nothing slips through the cracks.
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="relative z-10 overflow-hidden bg-black px-6 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeLeft>
              <SectionBadge label="Campaign Execution" />
              <h2 className="font-bricolage text-3xl font-bold leading-tight text-white md:text-4xl">
                Centralize Campaign Execution Across Every Athlete
              </h2>
              <p className="mt-5 text-lg text-white/60">
                As deal volume grows, athletic departments need a single system to track campaigns, deliverables, and timelines across their entire roster.
              </p>
              <p className="mt-4 text-lg text-white/60">
                JABA gives teams real-time visibility into what is live, what is due, and what needs attention so nothing slips through the cracks.
              </p>
            </FadeLeft>
            <FadeRight>
              <div className="relative w-full max-w-[520px] mx-auto md:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
            </FadeRight>
          </div>
        </section>

        <section className="relative z-10 overflow-hidden py-16 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <FadeLeft className="order-2 lg:order-first">
                <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/content-intelligence-v3.png"
                    alt="JABA content intelligence hub analyzing athlete social media posts"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </FadeLeft>

              <FadeRight className="order-1 lg:order-last">
                <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Content Intelligence</span>
                <h2 className="font-bricolage text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
                  1M+ Posts Analyzed.
                </h2>
                <p className="text-white/60 text-lg mb-5">
                  See what your athletes&apos; content is delivering and why. Explore posts across sports, brands, and platforms to understand what&apos;s driving engagement and how your program is showing up in NIL content.
                </p>
                <ul className="list-disc pl-5 text-white/65 space-y-2 mb-6">
                  <li>Search every athlete post across your roster</li>
                  <li>Track brand visibility and logo placement in posts</li>
                  <li>Analyze hooks, pacing, and caption style</li>
                  <li>Compare sponsored vs organic content performance</li>
                  <li>Discover NIL trends across your entire program</li>
                </ul>
                <div className="mt-6 flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm max-w-md backdrop-blur-sm hover:border-[#C8FF00]/40 hover:bg-white/[0.09] transition-all duration-300 cursor-default">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[14px] w-[14px] text-white/30" aria-hidden>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-white/50 font-normal tracking-wide">&quot;What NIL content is performing best in my program?&quot;</span>
                </div>
              </FadeRight>
            </div>
          </div>
        </section>

        <section className="relative z-10 overflow-hidden bg-black px-6 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeLeft>
              <SectionBadge label="Built for the Athlete Economy" />
              <h2 className="font-bricolage text-3xl font-bold leading-tight text-white md:text-4xl">
                We&apos;re Making it Easy for Everyone to Work With Athletes.
              </h2>
              <p className="mt-5 text-lg text-white/60">
                Athletes stay focused on their sport while leveraging their influence away from it.
              </p>
              <a
                href="https://calendly.com/jordon-jaba/jaba"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/5"
              >
                Hear from Founder &amp; CEO Jordon Rooney →
              </a>
            </FadeLeft>
            <FadeRight>
              <div className="ml-auto mr-0 w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#C8F135]/30 bg-[#111] shadow-[0_0_60px_rgba(180,255,0,0.35)]">
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
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-lg text-black shadow-lg">
                          ▶
                        </span>
                        <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white opacity-80 backdrop-blur-sm">
                          Click to watch
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </FadeRight>
          </div>
        </section>

        <section className="relative z-10 bg-black px-6 py-24 text-center">
          <div className="mx-auto max-w-6xl">
            <FadeUp>
              <SectionBadge label="Outsmart NIL Go" />
              <h2 className="font-bricolage text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                NIL Valuation and Spending Plan
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg text-white/60">
                Build compliant third-party NIL deals while tracking spend, offsets, and remaining budget in one system.
              </p>
            </FadeUp>
            <ScaleIn className="mx-auto mt-12 max-w-5xl">
              <SpendingTable />
            </ScaleIn>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              <FadeLeft>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-7">
                  <h3 className="font-bricolage text-2xl font-bold text-white">Deal Builder</h3>
                  <p className="mt-3 text-white/60">
                    Structure third-party NIL deals with clarity, consistency, and audit-ready documentation.
                  </p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-white/65">
                    <li>Standardized deal structures</li>
                    <li>Clear compensation breakdowns</li>
                    <li>Consistent inputs across athletes and brands</li>
                  </ul>
                </div>
              </FadeLeft>
              <FadeRight>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-7">
                  <h3 className="font-bricolage text-2xl font-bold text-white">NIL Go Valuation</h3>
                  <p className="mt-3 text-white/60">
                    Generate compliant, defensible valuations aligned with NIL Go guidelines.
                  </p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-white/65">
                    <li>Transparent valuation logic</li>
                    <li>Defensible spend recommendations</li>
                    <li>Confidence for compliance and leadership</li>
                  </ul>
                </div>
              </FadeRight>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-black px-6 py-24 text-center">
          <FadeUp>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-bricolage text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Ready to See JABA in Action?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
                Book a demo and see how JABA helps athletic departments manage NIL at scale.
              </p>
              <a
                href="https://calendly.com/jordon-jaba/jaba"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] px-7 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)]"
              >
                Demo JABA <span className="text-base">↗</span>
              </a>
            </div>
          </FadeUp>
        </section>

        <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 pb-10 pt-20">
          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
              <div>
                <Image src="/jaba-wordmark.png" alt="JABA" width={120} height={40} className="object-contain" />
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">Socials</p>
                <div className="flex flex-col gap-2">
                  <a href="https://www.instagram.com/jaba/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-[#C8F135]">
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/company/jaba-ai/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors hover:text-[#C8F135]"
                  >
                    Linkedin
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-4 h-px bg-white/10" />
            <p className="text-xs text-white/40">© All rights reserved</p>
          </div>
        </footer>
      </main>
    </>
  );
}
