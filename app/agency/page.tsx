"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) { setVisible(true); return; }
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function AgencyPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white relative" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
      {/* Ambient purple glow - full page */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-10vh",
          left: "-10vw",
          width: "70vw",
          height: "70vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(110, 30, 195, 0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-10vh",
          right: "-10vw",
          width: "60vw",
          height: "60vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80, 15, 160, 0.14) 0%, transparent 65%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* All page content needs z-index above the glow */}
      <div className="relative" style={{ zIndex: 1 }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#1a1a1a] px-8 py-4 flex items-center justify-between">
        <img src="/jaba-wordmark.png" alt="JABA logo" className="h-14 w-auto" />
        <span className="text-xs tracking-[0.2em] border border-[#333] px-3 py-1 text-[#999]">FOR AGENCIES</span>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-32 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#777] text-xs tracking-[0.35em] mb-8">JABA FOR AGENCIES</p>
            <h1
              className="text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
            >
              AI THAT PROJECT<br />
              MANAGES ATHLETES<br />
              <span className="text-[#CAFF00]">AND THEIR<br />DELIVERABLES.</span>
            </h1>
            <p className="text-[#999] text-lg max-w-xl mx-auto">
              JABA coordinates contracts, campaigns, timelines, and execution across athletes and brands so nothing slips and nothing gets missed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#777] text-xs tracking-[0.3em] mb-4">SEE IT IN ACTION</p>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Left - copy */}
              <div className="flex-1">
                <h2
                  className="text-white leading-none mb-6"
                  style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  AI BUILT FOR THE<br />
                  PEOPLE WHO WORK<br />
                  WITH ATHLETES.
                </h2>
                <p className="text-[#999] text-base leading-relaxed max-w-sm">
                  JABA was built from the ground up for schools, agencies and brands managing NIL at scale. This is what that looks like.
                </p>
              </div>
              {/* Right - vertical video player */}
              <div className="flex-shrink-0">
                <div
                  className="border border-[#222] overflow-hidden"
                  style={{ width: "315px", height: "560px" }}
                >
                  <iframe
                    width="315"
                    height="560"
                    src="https://www.youtube.com/embed/0BCwKKac75Q"
                    title="AI Built for the People Who Work With Athletes."
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* OPERATIONS / WORKFLOW */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">OPERATIONS</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              EVERY TASK.<br />EVERY DEADLINE.<br />ONE PLACE.
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA's Workflow Terminal tracks every deliverable across every athlete and every campaign. Automated alerts mean you stop chasing and start managing.
            </p>
            <div className="border border-[#222]">
              <div className="grid grid-cols-5 px-6 py-3 border-b border-[#222] text-[#777] text-xs tracking-[0.15em]">
                <span>DATE</span><span>TASK</span><span>TYPE</span><span>ATHLETE</span><span>STATUS</span>
              </div>
              <div className="grid grid-cols-5 px-6 py-5 items-center border-b border-[#1a1a1a]">
                <div>
                  <div className="text-white text-sm">Oct 20 · 2:00 PM</div>
                  <div className="text-[#888] text-xs">Local time</div>
                </div>
                <div>
                  <div className="text-white text-sm">Instagram Story - Training Day</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">YOUR AGENCY FALL CAMPAIGN</div>
                </div>
                <span className="text-[#999] text-xs tracking-[0.1em]">TASK</span>
                <span className="text-[#999] text-sm">Marcus Webb</span>
                <span className="text-[#ff6b35] text-xs tracking-[0.1em]">● OVERDUE</span>
              </div>
              <div className="grid grid-cols-5 px-6 py-5 items-center">
                <div>
                  <div className="text-white text-sm">Oct 22 · 10:30 AM</div>
                  <div className="text-[#888] text-xs">Local time</div>
                </div>
                <div>
                  <div className="text-white text-sm">YouTube - Game Day Vlog</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">SOCIAL MEDIA Q4</div>
                </div>
                <span className="text-[#999] text-xs tracking-[0.1em]">TASK</span>
                <span className="text-[#999] text-sm">Dani Torres</span>
                <span className="text-[#CAFF00] text-xs tracking-[0.1em]">✓ COMPLETED</span>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* DEAL MANAGEMENT */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">DEAL MANAGEMENT</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              FROM DRAFT TO DONE -<br />END TO END.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222]">
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#CAFF00] text-xs tracking-[0.15em] mb-4">● RUNNING</div>
                <div className="text-white font-semibold mb-1">YOUR AGENCY SPRING CAMPAIGN</div>
                <div className="text-[#888] text-xs tracking-[0.1em] mb-4">BRAND PARTNER A</div>
                <div className="text-[#999] text-xs mb-1">Athlete:</div>
                <div className="text-[#999] text-sm mb-1">Marcus Webb</div>
                <div className="text-[#999] text-xs mb-1">Next:</div>
                <div className="text-[#999] text-sm mb-4">Photo shoot scheduled</div>
                <span className="text-[#999] text-xs">● 120 DAYS LEFT</span>
              </div>
              <div className="p-8">
                <div className="text-[#888] text-xs tracking-[0.15em] mb-4">● DRAFT</div>
                <div className="text-white font-semibold mb-1">YOUR AGENCY SUMMER PUSH</div>
                <div className="text-[#888] text-xs tracking-[0.1em] mb-4">BRAND PARTNER B</div>
                <div className="text-[#999] text-xs mb-1">Athlete:</div>
                <div className="text-[#999] text-sm mb-1">Dani Torres</div>
                <div className="text-[#999] text-xs mb-1">Next:</div>
                <div className="text-[#999] text-sm mb-4">Contract review</div>
                <div className="text-[#999] text-xs mb-1">● 45 DAYS LEFT</div>
                <div className="text-[#ff6b35] text-xs">⚠ 2 QC ISSUES</div>
              </div>
            </div>
            <div className="mt-4 px-6 py-4 border border-[#222] text-[#999] text-sm">
              View as grid, list, or analytics report. Build campaigns and assign athletes in one click.
            </div>
          </Section>
        </div>
      </section>

      {/* TALENT MANAGEMENT */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">TALENT MANAGEMENT</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              KNOW YOUR ENTIRE<br />ROSTER - AT A GLANCE.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#222] mb-4">
              {[
                { name: "Marcus Webb", sport: "Football", pos: "WR · YOUR AGENCY", score: 54, followers: "29K", er: "41.4%", headshot: "/football_player.png" },
                { name: "Dani Torres", sport: "Women's Basketball", pos: "G · YOUR AGENCY", score: 53, followers: "674K", er: "34.4%", headshot: "/WBB_player.png" },
                { name: "Jordan Ellis", sport: "Men's Basketball", pos: "YOUR AGENCY", score: 52, followers: "8.4K", er: "16.3%", headshot: "/MBB_player.png" },
                { name: "Aaliyah Reeves", sport: "Women's Volleyball", pos: "YOUR AGENCY", score: 54, followers: "2K", er: "36.9%", headshot: "/Volleyball_player.png" },
              ].map((a, i) => (
                <div key={a.name} className={`p-6 ${i < 3 ? "border-r border-[#222]" : ""}`}>
                  <img
                    src={a.headshot}
                    alt={`${a.name} headshot`}
                    className="mb-3 h-10 w-10 rounded-full object-cover object-top"
                  />
                  <div className="text-white font-semibold text-sm mb-1">{a.name}</div>
                  <div className="text-[#888] text-xs mb-4">{a.sport}</div>
                  <div className="text-[#999] text-xs tracking-[0.1em] mb-1">MARKETABILITY</div>
                  <div className="text-[#CAFF00] text-lg font-bold mb-3" style={{ fontFamily: "var(--font-display), sans-serif" }}>{a.score}</div>
                  <div className="text-[#999] text-xs tracking-[0.1em] mb-1">FOLLOWERS</div>
                  <div className="text-[#999] text-sm mb-3">{a.followers} followers</div>
                  <div className="text-[#999] text-xs tracking-[0.1em] mb-1">ER</div>
                  <div className="text-[#999] text-sm">{a.er} ER</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border border-[#222] text-[#999] text-sm">
              Filter by sport, position, or topic. Sort by marketability. Generate individual or roster media kits in one click.
            </div>
          </Section>
        </div>
      </section>

      {/* AI-POWERED MATCHING */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">AI-POWERED MATCHING</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              JABA FINDS THE BRANDS.<br />YOU CLOSE THE DEAL.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222] mb-4">
              {[
                { athlete: "Marcus Webb", followers: "1,285K followers", brand: "Brand A", status: "NIL Active", note: "Actively partners with football athletes", badge: "✦ MATCH" },
                { athlete: "Dani Torres", followers: "674K followers", brand: "Brand B", status: "NIL Active", note: "Actively partners with women's basketball athletes", badge: "✦ MATCH" },
                { athlete: "Jordan Ellis", followers: "561K followers", brand: "Brand C", status: "NIL Active", note: "Actively partners with golf athletes", badge: "REACHED OUT" },
              ].map((m, i) => (
                <div key={m.athlete} className={`p-6 ${i < 2 ? "border-r border-[#222]" : ""}`}>
                  <div className="text-white font-semibold mb-1">{m.athlete}</div>
                  <div className="text-[#888] text-xs mb-4">{m.followers}</div>
                  <div className="text-[#CAFF00] text-xs tracking-[0.1em] mb-3">{m.badge}</div>
                  <div className="text-white text-sm font-medium mb-1">{m.brand}</div>
                  <div className="text-[#CAFF00] text-xs mb-2">{m.status}</div>
                  <div className="text-[#888] text-xs">{m.note}</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border border-[#222] text-[#999] text-sm">
              38 athlete-brand matches identified across your roster. Ranked by brand fit, partnership history, and audience alignment.
            </div>
          </Section>
        </div>
      </section>

      {/* BUSINESS DEVELOPMENT */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">BUSINESS DEVELOPMENT</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              FIND THE RIGHT CONTACT.<br />EVERY TIME.
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA's Discover engine finds verified brand contacts - marketing directors, sponsorship leads, brand managers - and pulls them directly into your CRM. No cold list buying. No guessing.
            </p>
            <div className="border border-[#222] p-6 mb-4">
              <div className="flex items-center gap-3 border border-[#333] px-4 py-3 max-w-md mb-6">
                <span className="text-[#777]">🔍</span>
                <span className="text-[#777] text-sm">Find marketing directors at Nike...</span>
              </div>
              <div className="flex gap-4">
                <span className="text-xs px-3 py-1.5 border border-[#CAFF00] text-[#CAFF00] tracking-[0.1em]">PEOPLE DIRECTORY</span>
                <span className="text-xs px-3 py-1.5 border border-[#333] text-[#888] tracking-[0.1em]">LINKEDIN PROFILES</span>
              </div>
              <p className="text-[#999] text-sm mt-4">Search or apply filters to discover brand decision-makers.</p>
            </div>
          </Section>
        </div>
      </section>

      {/* AI TOOLS */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">AI TOOLS</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              DECKS. REPORTS.<br />MEDIA KITS. IN SECONDS.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#222]">
              {[
                { icon: "↗", label: "Create a Report", desc: "Build an analytics report with live data from your athletes and campaigns.", soon: false },
                { icon: "◻", label: "Athlete Pitch Deck", desc: "Auto-generate a media kit for any athlete or group - ready to send to brands in minutes.", soon: false },
                { icon: "⊞", label: "Social Graphic", desc: "AI-generated images with performance data overlays. Built for reports and social posts.", soon: false },
                { icon: "◈", label: "Recruit Pitch Deck", desc: "Show recruits their NIL potential with AI-powered projections.", soon: true },
              ].map((tool, i) => (
                <div key={tool.label} className={`p-8 ${i < 3 ? "border-r border-[#222]" : ""}`}>
                  <div className="text-[#CAFF00] text-2xl mb-4">{tool.icon}</div>
                  <div className="text-white font-semibold mb-2">{tool.label}</div>
                  <div className="text-[#999] text-sm">{tool.desc}</div>
                  {tool.soon && <div className="text-[#777] text-xs tracking-[0.15em] mt-3">COMING SOON</div>}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CONTENT INTELLIGENCE */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#777] text-xs tracking-[0.3em] mb-4">CONTENT INTELLIGENCE</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              OUR AI WATCHES<br />300,000+ PIECES<br />OF CONTENT.<br />
              <span className="text-[#CAFF00]">SO YOU DON'T HAVE TO.</span>
            </h2>
            <p className="text-[#999] max-w-2xl mb-12 text-lg leading-relaxed">
              JABA doesn't just track your athletes - it analyzes every athlete on the platform, sponsored and organic. Our AI watches video <em>and</em> static posts to surface what hooks, captions, formats, and timing are actually driving performance right now. Not just for your roster. Across all of them.
            </p>

            {/* Two column: left differentiators, right topic chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222] mb-4">
              <div className="p-8 border-r border-[#222]">
                <div className="space-y-6">
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-2">✦ VIDEO + STATIC</div>
                    <div className="text-white text-sm font-medium mb-1">AI that actually watches the content</div>
                    <div className="text-[#999] text-sm">Our AI processes video content frame-by-frame - hooks, logo placement, pacing, captions - not just likes and views.</div>
                  </div>
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-2">✦ SPONSORED VS. ORGANIC</div>
                    <div className="text-white text-sm font-medium mb-1">See what's working with and without a deal attached</div>
                    <div className="text-[#999] text-sm">Filter any insight by whether content was a paid partnership or organic - so you know exactly what format converts.</div>
                  </div>
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-2">✦ PLATFORM-WIDE SIGNAL</div>
                    <div className="text-white text-sm font-medium mb-1">Not just your roster. Everyone's</div>
                    <div className="text-[#999] text-sm">Trends and patterns are surfaced from 300K+ posts across every athlete on JABA - giving you an edge no single agency could build alone.</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="text-[#777] text-xs tracking-[0.2em] mb-6">FILTER BY TOPIC</div>
                <div className="grid grid-cols-2 gap-0 border border-[#222]">
                  {[
                    { topic: "GAME DAY", count: "3,508" },
                    { topic: "LIFESTYLE", count: "2,272" },
                    { topic: "FASHION", count: "1,162" },
                    { topic: "TEAM", count: "3,571" },
                    { topic: "FAMILY", count: "1,350" },
                    { topic: "FITNESS", count: "481" },
                    { topic: "MOTIVATION", count: "522" },
                    { topic: "PRACTICE", count: "212" },
                  ].map((t, i) => (
                    <div key={t.topic} className={`p-4 ${i % 2 === 0 ? "border-r border-[#222]" : ""} ${i < 6 ? "border-b border-[#222]" : ""}`}>
                      <div className="text-[#CAFF00] text-sm font-bold mb-0.5" style={{ fontFamily: "var(--font-display), sans-serif" }}>{t.count}</div>
                      <div className="text-[#888] text-xs tracking-[0.1em]">{t.topic}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border border-[#222] text-[#777] text-sm">
              Filter by topic, platform, sponsored vs. organic, sport, and performance tier. Know what's connecting before you need to report on it.
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src="/jaba-wordmark.png" alt="JABA logo" className="h-10 w-auto" />
          <span className="text-[#666] text-xs">© 2026 JABA</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
