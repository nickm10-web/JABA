"use client";

import { useEffect, useRef, useState } from "react";
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

const ATHLETES = [
  { name: "Marcus Webb", school: "Ohio State · Football", followers: "1.2M", emv: "$1,840" },
  { name: "Dani Torres", school: "UConn · Women's Basketball", followers: "674K", emv: "$980" },
  { name: "Jordan Ellis", school: "Michigan · Football", followers: "812K", emv: "$1,210" },
  { name: "Aaliyah Reeves", school: "LSU · Women's Basketball", followers: "651K", emv: "$890" },
  { name: "Tyler Brooks", school: "Alabama · Baseball", followers: "412K", emv: "$620" },
  { name: "Simone Carter", school: "Texas · Track & Field", followers: "389K", emv: "$540" },
  { name: "DeShawn Miles", school: "Georgia · Football", followers: "920K", emv: "$1,450" },
  { name: "Priya Nair", school: "Stanford · Swimming", followers: "278K", emv: "$410" },
  { name: "Cam Rodriguez", school: "Florida · Basketball", followers: "1.1M", emv: "$1,680" },
  { name: "Nia Washington", school: "Tennessee · Softball", followers: "344K", emv: "$490" },
];

const COMPETITORS = [
  { brand: "Brand X", athletes: "14 athletes", category: "Footwear · Football", spend: "$420K est." },
  { brand: "Brand Y", athletes: "9 athletes", category: "Apparel · Multi-sport", spend: "$280K est." },
  { brand: "Brand Z", athletes: "6 athletes", category: "Beverage · Basketball", spend: "$190K est." },
  { brand: "Brand W", athletes: "11 athletes", category: "Finance · Football", spend: "$340K est." },
];

const ANALYTICS_METRICS = ["Engagement Rate", "Video Views", "EMV", "Comments", "Captions Analysis"];
const PIPELINE_STEPS = [
  { icon: "search", label: "Discover athletes" },
  { icon: "eye", label: "Track content" },
  { icon: "chart-up", label: "Analyze performance" },
  { icon: "bar-chart", label: "Benchmark competitors" },
  { icon: "target", label: "Measure ROI" },
] as const;

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
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionBadge({ label }: { label: string }) {
  return <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">{label}</span>;
}

function PipelineIcon({ icon }: { icon: (typeof PIPELINE_STEPS)[number]["icon"] }) {
  if (icon === "search") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    );
  }
  if (icon === "eye") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    );
  }
  if (icon === "chart-up") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#C8FF00]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    );
  }
  if (icon === "bar-chart") {
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

export default function Brand2Page() {
  const [activeMetric, setActiveMetric] = useState(0);
  const [typedStrategy, setTypedStrategy] = useState("");
  const strategyText = "Lead with short video and post Tue-Thu between 11am-1pm.";
  const athletes = ATHLETES;
  const scrollAthletes = [...athletes, ...athletes];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % ANALYTICS_METRICS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let typeInterval: ReturnType<typeof setInterval> | undefined;
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const runTyping = () => {
      if (cancelled) return;
      setTypedStrategy("");
      let i = 0;
      typeInterval = setInterval(() => {
        setTypedStrategy(strategyText.slice(0, i + 1));
        i++;
        if (i >= strategyText.length) {
          if (typeInterval) clearInterval(typeInterval);
          retryTimeout = setTimeout(runTyping, 3000);
        }
      }, 35);
    };

    runTyping();

    return () => {
      cancelled = true;
      if (typeInterval) clearInterval(typeInterval);
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [strategyText]);

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
        <div
          style={{
            position: "absolute",
            top: "62%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-8%",
            left: "25%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,92,240,0.3) 0%, rgba(123,92,240,0.08) 45%, transparent 70%)",
            filter: "blur(40px)",
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
          className="relative min-h-[82vh] flex flex-col items-center justify-start text-center px-6 pt-24 md:pt-28 pb-14"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.82)), url('/header-bg-without-balls.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black z-[2]" />
          <Reveal className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold font-bricolage leading-tight text-white mx-auto">
              DISCOVER. ACTIVATE.
              <br />
              <span className="text-[#C8FF00]">MEASURE.</span>
            </h1>
          </Reveal>
          <Reveal className="relative z-10">
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              JABA helps brands find the right athletes, manage campaign execution, and track performance with first-party data.
            </p>
          </Reveal>
          <Reveal className="relative z-10">
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

        <section className="relative z-10 py-20 px-6 bg-[rgba(0,0,0,0.78)] text-center border-b border-[#1a1a1a]">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold font-bricolage text-white mb-16">AI that manages the whole brand campaign lifecycle.</h2>
            <div className="flex flex-wrap justify-center items-start gap-0 max-w-5xl mx-auto">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-3 px-2">
                    <div className="w-24 h-24 border border-[#C8FF00]/50 rounded-2xl flex items-center justify-center bg-gradient-to-b from-[#12170a] to-[#090b06] shadow-[0_0_18px_rgba(200,255,0,0.18)]">
                      <PipelineIcon icon={step.icon} />
                    </div>
                    <p className="text-[#C8FF00] text-sm font-semibold whitespace-pre-line text-center leading-tight max-w-[120px]">{step.label}</p>
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

        <section className="relative z-10 py-10 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <SectionBadge label="Discovery" />
                <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
                  Find the Right Athletes.
                  <br />
                  <span className="text-[#C8FF00]">Before Anyone Else Does.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Stop scouting Instagram manually. JABA gives you a structured, searchable athlete database - filtered by sport, school, geography, audience demographics, and topic affinity. Find athletes already posting about your category before you even reach out.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Find Athletes</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Filter by Sport</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">EMV Score</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-[#111] border border-white/10 rounded-2xl p-4 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="border border-white/10 rounded-sm p-3 mb-3 bg-black/40">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {[
                        { label: "SPORT", value: "Football" },
                        { label: "SCHOOL", value: "SEC Conference" },
                      ].map((f) => (
                        <div key={f.label} className="inline-flex items-center gap-1.5 text-[10px] bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-white/70">
                          <span className="text-white/40">{f.label}</span>
                          <span className="text-white font-medium">{f.value}</span>
                          <span className="text-white/30">×</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {[
                        { label: "GEOGRAPHY", value: "Southeast" },
                        { label: "TOPIC", value: "Fitness + Lifestyle" },
                      ].map((f) => (
                        <div key={f.label} className="inline-flex items-center gap-1.5 text-[10px] bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-white/70">
                          <span className="text-white/40">{f.label}</span>
                          <span className="text-white font-medium">{f.value}</span>
                          <span className="text-white/30">×</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: "MIN FOLLOWERS", value: "50K+" },
                          { label: "MIN EMV", value: "$500+" },
                        ].map((f) => (
                          <div key={f.label} className="inline-flex items-center gap-1.5 text-[10px] bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-white/70">
                            <span className="text-white/40">{f.label}</span>
                            <span className="text-white font-medium">{f.value}</span>
                            <span className="text-white/30">×</span>
                          </div>
                        ))}
                      </div>
                      <button className="text-xs text-[#C8FF00] border border-[#C8FF00]/30 rounded-md px-3 py-1.5 hover:bg-[#C8FF00]/10 transition-colors">
                        38 athletes match
                      </button>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-3 py-2 border-b border-white/10">
                      <span className="text-[9px] tracking-widest text-white/30 uppercase">ATHLETE</span>
                      <span className="text-[9px] tracking-widest text-white/30 uppercase">FOLLOWERS</span>
                      <span className="text-[9px] tracking-widest text-white/30 uppercase">EMV</span>
                    </div>
                    <div className="h-[280px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#111111] to-transparent z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none" />
                      <div style={{ animation: "tableScroll 20s linear infinite" }}>
                        {scrollAthletes.map((a, i) => {
                          return (
                            <div
                              key={`${a.name}-${i}`}
                              className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-3 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <div>
                                <p className="text-xs font-medium text-white truncate">{a.name}</p>
                                <p className="text-[10px] text-white/40 truncate">{a.school}</p>
                              </div>
                              <span className="text-xs text-white/60 self-center">{a.followers}</span>
                              <span className="text-xs text-[#C8FF00] font-medium self-center">{a.emv}</span>
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

        <section className="relative z-10 py-10 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal className="order-first">
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-[#C8FF00]/20 bg-[#C8FF00]/5 px-3 py-2.5">
                    <p className="text-[11px] tracking-widest text-[#C8FF00] uppercase">✦ Athlete Tagged</p>
                    <p className="text-xs text-white/70">Instagram + TikTok</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-[#C8FF00]/20 bg-[#C8FF00]/5 px-3 py-2.5">
                    <p className="text-[11px] tracking-widest text-[#C8FF00] uppercase">✦ Athlete in Content</p>
                    <p className="text-xs text-white/70">Vision scanning</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                    <p className="text-[11px] tracking-widest text-white/70 uppercase">▶ Video Length</p>
                    <p className="text-xs text-white/60">Avg. per platform</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                    <p className="text-[11px] tracking-widest text-white/70 uppercase">◆ Content Breakdown</p>
                    <p className="text-xs text-white/60">Product · Lifestyle</p>
                  </div>
                </div>
                <div className="border-t border-white/10 my-4" />
                <p className="text-[9px] tracking-widest text-white/30 uppercase mb-2">PERFORMANCE OVERVIEW</p>
                <p className="text-sm font-medium text-white mb-0.5">Marcus Webb × Brand A — Fall Campaign</p>
                <p className="text-[10px] tracking-widest text-[#C8FF00] uppercase mb-4">TOP 5% OF ALL BRAND POSTS ON JABA</p>
                <div className="w-full">
                  <div className="flex items-start gap-3 py-2.5 border-b border-white/5 transition-all duration-300 rounded-sm">
                    <span className="text-[10px] tracking-widest font-semibold uppercase w-28 shrink-0 mt-0.5 transition-colors duration-300 text-[#C8FF00]">WHAT WORKED</span>
                    <span className="text-xs text-white/70">Short 15-25s videos with strong hooks outperformed by 4.1x.</span>
                  </div>
                  <div className="flex items-start gap-3 py-2.5 border-b border-white/5 transition-all duration-300 rounded-sm">
                    <span className="text-[10px] tracking-widest font-semibold uppercase w-28 shrink-0 mt-0.5 transition-colors duration-300 text-red-400">WHAT DIDN&apos;T</span>
                    <span className="text-xs text-white/70">Static images and long captions drove below-average engagement.</span>
                  </div>
                  <div className="flex items-start gap-3 py-2.5 border-b border-white/5 transition-all duration-300 rounded-sm">
                    <span className="text-[10px] tracking-widest font-semibold uppercase w-28 shrink-0 mt-0.5 transition-colors duration-300 text-blue-400">VS INDUSTRY</span>
                    <span className="text-xs text-white/70">ER is +0.4% above average and reach beats 78% of peers.</span>
                  </div>
                  <div className="flex items-start gap-3 py-2.5 bg-[#C8FF00]/5 border-l-2 border-[#C8FF00] pl-2 -ml-2 rounded-sm">
                    <span className="text-[10px] tracking-widest font-semibold text-[#C8FF00] uppercase bg-[#C8FF00]/10 rounded px-1.5 py-0.5 w-28 shrink-0 mt-0.5">AI-GENERATED STRATEGY</span>
                    <span className="text-xs text-white/70">{typedStrategy}<span className="animate-pulse">|</span></span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="order-last">
              <div>
                <span className="inline-block text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 mb-4">Content Intelligence</span>
                <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
                  1M+ Posts Analyzed.
                  <br />
                  <span className="text-[#C8FF00]">Automatically.</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8">JABA captures every piece of content connected to your brand — tagged or not. Over a million posts analyzed so you always know what&apos;s working, what isn&apos;t, and exactly what to do about it.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Auto-Tracked</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">What Worked</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">AI Strategy</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 py-10 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <SectionBadge label="Analytics" />
                <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
                  One View. Every Athlete.
                  <br />
                  <span className="text-[#C8FF00]">All the Data.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  Filter by sport, school, geography, audience demographics, or topic cluster. EMV calculated using JABA&apos;s proprietary formula. Sort by marketability, followers, or brand fit.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Aggregate Stats</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Platform Breakdown</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Reach Growth</span>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Dashboard Overview</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "496.3M", label: "Total Followers", tone: "text-[#C8FF00]" },
                      { value: "60.9M", label: "Total Engagement", tone: "text-[#C8FF00]" },
                      { value: "10.9M", label: "Video Views", tone: "text-[#C8FF00]" },
                      { value: "+110.8%", label: "Reach Growth", tone: "text-[#C8FF00]" },
                      { value: "$73.9K", label: "Earned Media Value", tone: "text-white" },
                      { value: "847", label: "Total Posts", tone: "text-white" },
                    ].map((stat) => (
                      <div key={stat.label} className="border border-white/10 rounded-lg p-3 bg-black/30">
                        <div className={`text-xl font-bold ${stat.tone}`}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 my-4" />
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Metrics</div>
                      <div className="space-y-1.5">
                        {ANALYTICS_METRICS.map((metric, i) => (
                          <div
                            key={metric}
                            className={`flex items-center gap-2 py-1.5 transition-all duration-300 ${activeMetric === i ? "text-white" : "text-white/40"}`}
                          >
                            <span className={`w-2 h-2 rounded-sm transition-all duration-300 ${activeMetric === i ? "bg-[#C8FF00] scale-125" : "bg-white/20"}`} />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Platforms</div>
                      <div className="space-y-1.5 text-xs">
                        <div className="text-white">✓ Instagram</div>
                        <div className="text-white">✓ TikTok</div>
                        <div className="text-white/30">○ Twitter/X - Soon</div>
                        <div className="text-white/30">○ YouTube - Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-10 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-first lg:order-last">
                <SectionBadge label="Competitive Intelligence" />
                <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-white mb-4 leading-tight">
                  Know Where You Stand.
                  <br />
                  <span className="text-[#C8FF00]">See What&apos;s Coming.</span>
                </h2>
                <p className="text-white/60 text-lg mb-6">
                  JABA benchmarks your campaign performance three ways and tracks every brand-athlete deal across the market - so you always know if you&apos;re winning and where the next opportunity is.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Competitor Spend</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Industry Benchmark</span>
                  <span className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1">Whitespace Alerts</span>
                </div>
              </Reveal>

              <Reveal className="order-last lg:order-first">
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5">
                  <div className="flex flex-col gap-2 mb-5">
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-28 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">COMPETITOR ACTIVITY</p>
                        <span className="text-[9px] tracking-wider text-[#C8FF00] uppercase font-medium">● ACTIVE NOW</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">Brand X signed 4 new football athletes this month.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">All SEC. Average follower count: 890K. Category: Footwear.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-28 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">CATEGORY TREND</p>
                        <span className="text-[9px] tracking-wider text-blue-400 uppercase font-medium">↑ TRENDING</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">Women's basketball is the fastest-growing NIL category.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">+34% more brand deals signed vs. same period last year.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/10 rounded-xl px-4 py-3 bg-black/40 hover:border-white/20 transition-colors">
                      <div className="shrink-0 w-28 pt-0.5">
                        <p className="text-[9px] tracking-[0.12em] text-white/30 uppercase leading-tight mb-1">WHITESPACE ALERT</p>
                        <span className="text-[9px] tracking-wider text-[#C8FF00] uppercase font-medium">✦ OPPORTUNITY</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white leading-snug mb-0.5">No major apparel brand is active with SEC baseball athletes.</p>
                        <p className="text-[11px] text-white/40 leading-relaxed">12 athletes in your target demo with no current apparel deal.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-sm overflow-hidden">
                    <div className="sticky top-0 z-20 grid grid-cols-4 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
                      <span>COMPETITOR BRAND</span>
                      <span>ATHLETES ACTIVATED</span>
                      <span>CATEGORY</span>
                      <span>EST. SPEND</span>
                    </div>
                    <div className="h-[180px] overflow-hidden relative">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-zinc-900 to-transparent z-10" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#111] to-transparent z-10" />
                      <div style={{ animation: "20s linear infinite tableScroll", willChange: "transform" }}>
                        {[...COMPETITORS, ...COMPETITORS].map((row, i) => {
                          return (
                            <div
                              key={`${row.brand}-${i}`}
                              className="grid grid-cols-4 items-center px-3 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                            >
                              <span className="font-medium text-white group-hover:text-[#C8FF00] transition-colors">{row.brand}</span>
                              <span className="text-white/60 text-sm">{row.athletes}</span>
                              <span className="text-white/40 text-xs">{row.category}</span>
                              <span className="text-[#C8FF00] text-sm font-medium">{row.spend}</span>
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

        <section className="relative z-10 py-24 px-6 bg-[rgba(0,0,0,0.78)]">
          <Reveal>
            <div
              className="max-w-[780px] mx-auto rounded-3xl py-16 px-12 border border-white/10 text-center"
              style={{
                background: "linear-gradient(135deg, #2d1b6e 0%, #1a0f4a 50%, #0d0820 100%)",
                boxShadow: "0 0 80px 20px rgba(123, 92, 240, 0.15)",
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold font-bricolage text-white text-center">Let&apos;s Talk About Your Brand</h2>
              <p className="text-white/60 text-lg mt-4 text-center">See how brands use JABA to find and manage athlete partnerships at scale.</p>
              <a
                href="https://calendly.com/jordon-jaba/jaba"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-white px-7 py-3 rounded-full font-semibold transition-all hover:scale-105 bg-gradient-to-br from-[#c084fc] via-[#7B5CF0] to-[#38bdf8] shadow-[0_0_30px_rgba(123,92,240,0.45),0_0_60px_rgba(56,189,248,0.15)] border border-white/25 hover:shadow-[0_0_40px_rgba(123,92,240,0.65),0_0_70px_rgba(56,189,248,0.25)]"
              >
                Book a demo ↗
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="relative pt-20 pb-10 px-6 border-t border-white/10 bg-black overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center bottom, rgba(123,92,240,0.22), transparent 55%)" }} />
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </div>
  );
}
