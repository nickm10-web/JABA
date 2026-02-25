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
    <div className="bg-[#0A0A0A] min-h-screen text-white relative" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
              style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
            >
              AI THAT PROJECT<br />
              MANAGES ATHLETES<br />
              <span className="text-[#CAFF00]">AND THEIR DELIVERABLES.</span>
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
                  style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
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

      {/* BRAND DEALS */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">01 — BRAND DEALS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-white leading-none" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              FIND THE RIGHT CONTACT.<br />
              CLOSE THE RIGHT DEAL.<br />
              <span style={{ color: '#CAFF00' }}>EVERY TIME.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA gives sales teams a structured brand deal pipeline - whether they are already running outbound tools or just getting started. Find verified contacts, see every brand already spending on athletes, and pitch with AI-generated media kits built around audience overlap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: '🔍',
                title: 'Contact Discovery',
                desc: 'Find verified marketing directors, sponsorship leads, and brand managers. Search by name, company, or role using LinkedIn profiles and people directory data.',
                detail: 'LINKEDIN · CONTEXT SEARCH · VERIFIED CONTACTS'
              },
              {
                icon: '⊞',
                title: 'Brand Deal Database',
                desc: 'Every brand that has activated an athlete deal, with overlap scoring against your roster. View deal history, athlete count, EMV, and category before you reach out.',
                detail: 'DEAL HISTORY · ATHLETE OVERLAP · CATEGORY FILTERS'
              },
              {
                icon: '◻',
                title: 'Interactive Media Kits',
                desc: "AI-generated pitch decks that show a brand exactly where their audience overlaps with your athlete's following. Built to close.",
                detail: 'AUTO-GENERATED · LIVE DATA · BRAND-SPECIFIC'
              },
            ].map((card, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111] hover:border-white/20 transition-colors">
                <span className="text-2xl mb-4 block">{card.icon}</span>
                <p className="text-white font-medium text-sm mb-2">{card.title}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{card.desc}</p>
                <p className="text-[10px] tracking-[0.15em] text-white/20">{card.detail}</p>
              </div>
            ))}
          </div>

          {/* CRM + AI Email block */}
          <div className="border border-white/10 rounded-sm p-6 bg-[#111111]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-[10px] tracking-[0.15em] text-white/30 mb-3">CRM + AI OUTREACH</p>
                <p className="text-white font-medium text-sm mb-2">AI handles the follow-up. You handle the close.</p>
                <p className="text-white/40 text-xs leading-relaxed">JABA's CRM automates responses, logs every touch, and drafts personalized outreach emails in seconds. No more copy-paste. No more missed follow-ups.</p>
              </div>
              <div className="space-y-3">
                <div className="border border-white/10 rounded-sm p-4 bg-black/40">
                  <p className="text-[10px] tracking-widest text-white/30 mb-2">AI DRAFT - OUTREACH EMAIL</p>
                  <p className="text-white/60 text-xs leading-relaxed">"Hi [Name], I wanted to reach out about a potential NIL partnership with Marcus Webb. His audience has a 34% overlap with the 18-24 demographic, and he is actively posting in the footwear category with strong game-day engagement..."</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[9px] tracking-widest border border-[#CAFF00]/30 text-[#CAFF00] px-2 py-1">USE DRAFT</span>
                    <span className="text-[9px] tracking-widest border border-white/10 text-white/30 px-2 py-1">REGENERATE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATHLETE MANAGEMENT */}
      <section className="py-24 px-8 border-b border-[#1a1a1a] bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">02 — ATHLETE MANAGEMENT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-white leading-none" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              OFF THE SPREADSHEET.<br />
              OUT OF YOUR INBOX.<br />
              <span style={{ color: '#CAFF00' }}>INTO ONE SYSTEM.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              If you're not in sales, you're managing - and right now that probably means Asana, Notion, Monday, or a spreadsheet. JABA replaces all of it. Calendars, contracts, deliverables, and campaign execution in one place - with an AI assistant that monitors everything so you don't have to.
            </p>
          </div>

          {/* Workflow Table */}
          <div className="border border-white/10 rounded-sm overflow-hidden mb-6">
            <div className="grid grid-cols-5 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
              <span>DATE</span>
              <span>TASK</span>
              <span>CAMPAIGN</span>
              <span>ATHLETE</span>
              <span>STATUS</span>
            </div>
            {[
              { date: 'Oct 20 · 2:00 PM', task: 'Instagram Story - Training Day', campaign: 'FALL CAMPAIGN', athlete: 'Marcus Webb', status: '● OVERDUE', statusColor: '#ff4444' },
              { date: 'Oct 22 · 10:30 AM', task: 'YouTube - Game Day Vlog', campaign: 'SOCIAL MEDIA Q4', athlete: 'Dani Torres', status: '✓ COMPLETED', statusColor: '#CAFF00' },
              { date: 'Oct 25 · 12:00 PM', task: 'TikTok - Product Feature', campaign: 'BRAND A COLLAB', athlete: 'Jordan Ellis', status: '◎ PENDING', statusColor: 'rgba(255,255,255,0.4)' },
              { date: 'Oct 28 · 3:00 PM', task: 'Photo Shoot - Lifestyle', campaign: 'FALL CAMPAIGN', athlete: 'Aaliyah Reeves', status: '◎ SCHEDULED', statusColor: 'rgba(255,255,255,0.4)' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                <span className="text-white/30 text-xs">{row.date}</span>
                <span className="text-white text-sm">{row.task}</span>
                <span className="text-white/40 text-xs">{row.campaign}</span>
                <span className="text-white/60 text-sm">{row.athlete}</span>
                <span className="text-xs font-medium" style={{ color: row.statusColor }}>{row.status}</span>
              </div>
            ))}
          </div>

          {/* Deal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { status: '● RUNNING', statusColor: '#CAFF00', name: 'SPRING CAMPAIGN', brand: 'Brand Partner A', athlete: 'Marcus Webb', next: 'Photo shoot scheduled', days: '● 120 DAYS LEFT' },
              { status: '◎ DRAFT', statusColor: 'rgba(255,255,255,0.4)', name: 'SUMMER PUSH', brand: 'Brand Partner B', athlete: 'Dani Torres', next: 'Contract review', days: '◎ 45 DAYS LEFT' },
              { status: '⚠ QC ISSUE', statusColor: '#FFAA00', name: 'FALL ACTIVATION', brand: 'Brand Partner C', athlete: 'Jordan Ellis', next: '2 posts flagged', days: '⚠ 2 QC ISSUES' },
            ].map((card, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111] hover:border-white/20 transition-colors">
                <p className="text-xs font-medium mb-1" style={{ color: card.statusColor }}>{card.status}</p>
                <p className="text-white font-medium mb-1" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.2rem' }}>{card.name}</p>
                <p className="text-white/30 text-xs mb-4">{card.brand}</p>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-white/40">Athlete</span><span className="text-xs text-white/70">{card.athlete}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-white/40">Next</span><span className="text-xs text-white/70">{card.next}</span></div>
                  <div className="pt-2 border-t border-white/5"><span className="text-xs" style={{ color: card.statusColor }}>{card.days}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Roster strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Marcus Webb', sport: 'Football', img: '/football_player.png', followers: '1.2M', er: '41.4%', score: 96 },
              { name: 'Dani Torres', sport: "Women's Basketball", img: '/WBB_player.png', followers: '674K', er: '34.4%', score: 92 },
              { name: 'Jordan Ellis', sport: "Men's Basketball", img: '/MBB_player.png', followers: '812K', er: '16.3%', score: 88 },
              { name: 'Aaliyah Reeves', sport: "Women's Volleyball", img: '/Volleyball_player.png', followers: '651K', er: '36.9%', score: 94 },
            ].map((a, i) => (
              <div key={i} className="border border-white/10 rounded-sm bg-[#111111] overflow-hidden">
                <img src={a.img} alt={a.name} className="w-full h-64 object-cover object-top" />
                <div className="p-4">
                  <p className="text-white font-medium text-sm">{a.name}</p>
                  <p className="text-white/40 text-xs mb-3">{a.sport}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-[10px] text-white/30">MARKETABILITY</span><span className="text-[10px] text-[#CAFF00]">{a.score}</span></div>
                    <div className="flex justify-between"><span className="text-[10px] text-white/30">FOLLOWERS</span><span className="text-[10px] text-white/60">{a.followers}</span></div>
                    <div className="flex justify-between"><span className="text-[10px] text-white/30">ER</span><span className="text-[10px] text-white/60">{a.er}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ANALYTICS */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">03 — CONTENT INTELLIGENCE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-white leading-none" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              300,000+ POSTS.<br />
              ANALYZED.<br />
              <span style={{ color: '#CAFF00' }}>SO YOU KNOW WHAT WORKS.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA watches every post - sponsored and organic - and surfaces what&apos;s actually working: formats, timing, hooks. Share reports directly with brands. Generate a data-backed content strategy in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '✦', label: 'WHAT WORKED', conf: 'CONFIDENCE: HIGH', desc: 'Short-form video (15-25s) with strong hooks in the first 2 seconds outperformed all other formats by 4.1x across your roster.' },
              { icon: '✦', label: 'WHAT DIDN\'T', conf: 'SOURCE: LAST 90 DAYS', desc: 'Static image posts generated 3.2x lower engagement than video. Long captions (200+ words) correlated with below-average saves.' },
              { icon: '✦', label: 'VS OTHER BRANDS', conf: 'BENCHMARK: INDUSTRY', desc: 'Your campaign ER is 0.4% above industry average for brands sponsoring NCAA football athletes. Reach growth outperforms 78% of comparable campaigns.' },
            ].map((item, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111]">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[#CAFF00] text-sm">{item.icon} {item.label}</span>
                  <span className="text-[9px] tracking-widest text-white/20">{item.conf}</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Campaign share strip */}
          <div className="border border-white/10 rounded-sm p-6 bg-[#111111] flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] tracking-[0.15em] text-white/30 mb-1">CAMPAIGN RESULT - SHAREABLE WITH BRAND</p>
              <p className="text-white font-medium text-sm">Marcus Webb × Brand A - Fall Campaign</p>
              <p className="text-[#CAFF00] text-xs mt-1">TOP 5% OF ALL BRAND POSTS ON JABA</p>
            </div>
            <div className="flex gap-6">
              {[['16.4K', 'POSTS'], ['60.1M', 'LIKES'], ['1.9M', 'SAVES'], ['827.2K', 'COMMENTS']].map(([val, label], i) => (
                <div key={i} className="text-center">
                  <p className="text-[#CAFF00] font-medium" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.5rem' }}>{val}</p>
                  <p className="text-[9px] tracking-widest text-white/30">{label}</p>
                </div>
              ))}
            </div>
            <span className="text-[9px] tracking-widest border border-[#CAFF00]/30 text-[#CAFF00] px-3 py-2">SHARE REPORT →</span>
          </div>

          {/* Topic tiles */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-8">
            {[['3,508','GAME DAY'],['2,272','LIFESTYLE'],['1,162','FASHION'],['3,571','TEAM'],['1,350','FAMILY'],['481','FITNESS'],['522','MOTIVATION'],['212','PRACTICE']].map(([count, topic], i) => (
              <div key={i} className="border border-white/10 p-3 text-center rounded-sm hover:border-[#CAFF00]/30 transition-colors">
                <p className="text-[#CAFF00]" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.25rem' }}>{count}</p>
                <p className="text-[9px] tracking-[0.1em] text-white/30">{topic}</p>
              </div>
            ))}
          </div>
          {/* Generate Strategy */}
          <div className="mt-10 border border-[#CCFF00]/20 rounded-sm p-6 bg-[#CCFF00]/5">
            <div className="flex items-start justify-between gap-8">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#CCFF00]/60 mb-2">AI-GENERATED STRATEGY</p>
                <p className="text-white font-medium text-sm mb-3">Marcus Webb x Brand A - Q2 Content Strategy</p>
                <div className="space-y-2">
                  <p className="text-white/50 text-xs">✦ Lead with 15-20s vertical video. His hook-rate on short-form is 3.8x higher than static.</p>
                  <p className="text-white/50 text-xs">✦ Post Tuesday-Thursday 11am-1pm EST. His audience peaks in that window (+28% reach vs. off-peak).</p>
                  <p className="text-white/50 text-xs">✦ Avoid long captions. Posts under 40 words get 2.1x more saves on his account.</p>
                  <p className="text-white/50 text-xs">✦ Use game-day context. His top 10 performing posts all reference active competition.</p>
                </div>
              </div>
              <button
                className="shrink-0 border border-[#CCFF00]/40 text-[#CCFF00] text-xs tracking-widest px-5 py-3 hover:bg-[#CCFF00] hover:text-black transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
              >
                GENERATE STRATEGY →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR ASSISTANT */}
      <section className="py-24 px-8 border-b border-[#1a1a1a] bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">04 — YOUR ASSISTANT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-white leading-none mb-6" style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                IT TEXTS YOU<br />
                WHEN SOMETHING<br />
                <span style={{ color: '#CAFF00' }}>NEEDS ATTENTION.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                JABA includes an AI assistant that runs your workflow via iMessage. It sends reminders, flags late deliverables, alerts you when something goes wrong, and handles follow-ups - so you don't have to manually track every deadline.
              </p>
              <div className="space-y-3">
                {[
                  'Texts you automatically when a deliverable is overdue or at risk',
                  'Sends reminders to athletes before deadlines — without you asking',
                  'Drafts follow-up emails to brand contacts when timelines slip',
                  'Alerts you when a campaign goes off track or a QC issue is flagged',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#CAFF00] text-xs mt-0.5">✦</span>
                    <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* iMessage mock */}
            <div className="border border-white/10 rounded-3xl overflow-hidden bg-[#0b0b0b] max-w-sm ml-auto w-full">
              <div className="border-b border-white/10 px-4 py-3 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
                  <img src="/jaba-face.png" alt="JABA contact" className="w-8 h-8 object-contain" />
                </div>
                <p className="text-white text-sm font-medium">JABA</p>
              </div>
              <div className="p-4 space-y-3 min-h-[320px]">
                <div className="flex justify-start">
                  <div className="bg-[#2c2c2e] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white/80 text-sm">Hey - Marcus Webb's Instagram Story for Brand A is due tomorrow at 9am. He hasn't submitted yet.</p>
                    <p className="text-white/20 text-xs mt-1">9:14 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#0A84FF] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">Can you send him a reminder?</p>
                    <p className="text-white/50 text-xs mt-1">9:15 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#2c2c2e] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white/80 text-sm">Done. Reminder sent to Marcus. I'll alert you again at 6pm if he still hasn't submitted.</p>
                    <p className="text-white/20 text-xs mt-1">9:15 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#2c2c2e] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white/80 text-sm">Heads up - Tyler Brooks kept the quotation marks in his brand post caption. Looks like he copied and pasted the draft exactly.</p>
                    <p className="text-white/20 text-xs mt-1">9:17 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#0A84FF] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">Thank you.</p>
                    <p className="text-white/50 text-xs mt-1">9:18 AM</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 px-4 py-3 flex gap-2">
                <div className="flex-1 bg-white/5 rounded-full px-4 py-2">
                  <p className="text-white/20 text-sm">Message</p>
                </div>
              </div>
            </div>
          </div>
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
