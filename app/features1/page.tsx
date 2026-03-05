"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import LifecycleRow from "./LifecycleRow";
import AthleteIntelligenceSection from "./AthleteIntelligenceSection";
import ContentIntelligenceSection from "./ContentIntelligenceSection";
import AthletePerformanceMetricsSection from "./AthletePerformanceMetricsSection";
import CampaignAutomationSection from "./CampaignAutomationSection";

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
  const [showMainVideo, setShowMainVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showBottomShort, setShowBottomShort] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
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
                  src="https://www.youtube.com/embed/0BCwKKac75Q?rel=0&autoplay=1"
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
                  <Image src="/video-1-thumbnail.png" alt="Meet JABA video thumbnail" fill className="object-cover" priority />
                  <span className="absolute inset-0 bg-black/15" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="h-16 w-16 rounded-full bg-white/90 text-black flex items-center justify-center text-xl shadow-lg">▶</span>
                    <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Click to watch</span>
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
            <h2 className="text-3xl md:text-5xl font-bold font-bricolage text-white mb-16">JABA uses AI to manage the whole lifecycle of a campaign</h2>
            <LifecycleRow />
          </Reveal>
        </section>

        <section className="relative z-10 py-20 px-6 bg-black">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className="order-1 md:order-2">
              <span className="inline-block text-xs font-medium border border-white/20 text-white/60 px-3 py-1 rounded-full mb-4">
                Text Assistant
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
            </Reveal>
            <Reveal className="order-2 md:order-1">
              <div className="relative w-full max-w-[520px] mx-auto md:mx-0 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/jaba-text-assistant-v2.png"
                  alt="JABA AI assistant managing campaign deliverables through chat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <AthleteIntelligenceSection />

        <ContentIntelligenceSection />
        <AthletePerformanceMetricsSection />

        <CampaignAutomationSection />

        <section className="relative z-10 py-20 px-6 bg-black">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="w-full order-2 md:order-1">
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
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <span className="h-14 w-14 rounded-full bg-white/90 text-black flex items-center justify-center text-lg shadow-lg">
                          ▶
                        </span>
                        <span className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Click to watch</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
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
                <span className="md:hidden">Hear from Founder &amp; CEO Jordon Rooney</span>
                <span className="hidden md:inline">← Hear from Founder &amp; CEO Jordon Rooney</span>
              </a>
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
