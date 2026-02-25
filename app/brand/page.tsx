"use client";

import { useRef, useState, useEffect } from "react";

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

export default function BrandPage() {
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
        <span className="text-xs tracking-[0.2em] border border-[#333] px-3 py-1 text-[#999]">FOR BRANDS</span>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-32 px-8 border-b border-[#1a1a1a] text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-6 uppercase">JABA FOR BRANDS</p>
          <h1
            className="text-white leading-none mb-8"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
          >
            DISCOVER. ACTIVATE.<br />
            <span style={{ color: '#CAFF00' }}>MEASURE.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            JABA helps brands find the right athletes, manage campaign execution, and track performance with first-party data.
          </p>
        </div>
      </section>

      {/* ATHLETE DISCOVERY */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">ATHLETE DISCOVERY</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2
              className="text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              FIND THE RIGHT<br />
              ATHLETES.<br />
              <span style={{ color: '#CAFF00' }}>BEFORE ANYONE ELSE DOES.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              Stop scouting Instagram manually. JABA gives you a structured, searchable athlete database - filtered by sport, school, geography, audience demographics, and topic affinity. Find athletes already posting about your category before you even reach out.
            </p>
          </div>

          {/* Filter Bar Mock */}
          <div className="border border-white/10 rounded-sm p-4 mb-6 flex flex-wrap gap-3 bg-[#111111]">
            {[
              { label: 'SPORT', value: 'Football' },
              { label: 'SCHOOL', value: 'SEC Conference' },
              { label: 'GEOGRAPHY', value: 'Southeast' },
              { label: 'TOPIC', value: 'Fitness + Lifestyle' },
              { label: 'MIN FOLLOWERS', value: '50K+' },
              { label: 'MIN EMV', value: '$500+' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 border border-white/10 px-3 py-2 rounded-sm bg-black/40">
                <span className="text-[10px] tracking-[0.15em] text-white/30">{f.label}</span>
                <span className="text-xs text-white font-medium">{f.value}</span>
                <span className="text-white/20 text-xs ml-1">×</span>
              </div>
            ))}
            <div className="flex items-center gap-2 border border-[#CAFF00]/30 px-3 py-2 rounded-sm ml-auto">
              <span className="text-xs text-[#CAFF00]">38 athletes match</span>
            </div>
          </div>

          {/* Athlete Results */}
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
              <span>ATHLETE</span>
              <span>FOLLOWERS</span>
              <span>AVG EMV</span>
              <span>TOPIC AFFINITY</span>
              <span>MARKETABILITY</span>
            </div>
            {[
              { name: 'Marcus Webb', school: 'Ohio State · Football', followers: '1.2M', emv: '$1,840', topic: 'Fitness, Game Day', score: 94, organic: true },
              { name: 'Dani Torres', school: 'UConn · Women\'s Basketball', followers: '674K', emv: '$980', topic: 'Lifestyle, Fashion', score: 93, organic: false },
              { name: 'Jordan Ellis', school: 'Michigan · Football', followers: '812K', emv: '$1,210', topic: 'Fitness, Outdoors', score: 92, organic: true },
              { name: 'Aaliyah Reeves', school: 'LSU · Women\'s Basketball', followers: '651K', emv: '$890', topic: 'Beauty, Lifestyle', score: 94, organic: false },
              { name: 'Tyler Brooks', school: 'Alabama · Baseball', followers: '412K', emv: '$620', topic: 'Fitness, Gaming', score: 88, organic: true },
            ].map((a, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                <div>
                  <p className="text-white text-sm font-medium">{a.name}</p>
                  <p className="text-white/30 text-xs">{a.school}</p>
                  {a.organic && (
                    <span className="text-[9px] tracking-widest text-[#CAFF00] border border-[#CAFF00]/30 px-1.5 py-0.5 mt-1 inline-block">ORGANIC POSTS ABOUT YOUR CATEGORY</span>
                  )}
                </div>
                <span className="text-white/60 text-sm">{a.followers}</span>
                <span className="text-[#CAFF00] text-sm">{a.emv}</span>
                <span className="text-white/40 text-xs">{a.topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#CAFF00] text-sm font-medium">{a.score}</span>
                  <span className="text-white/20 text-xs">/ 100</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Filter by sport, school, geography, audience demographics, or topic cluster. EMV calculated using JABA's proprietary formula. Sort by marketability, followers, or brand fit.</p>
        </div>
      </section>

      {/* CONTENT TRACKING */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">CONTENT TRACKING</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              EVERY POST.<br />EVERY ATHLETE.<br />EVERY FORMAT.
            </h2>
            <p className="text-[#999] max-w-xl mb-12">
              JABA automatically tracks every piece of content connected to your brand - whether the athlete tagged you, appeared in your content, or collabed on a post.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222]">
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#CAFF00] text-sm mb-3">✦ ATHLETE TAGGED</div>
                <div className="text-white font-medium mb-2">Posts where the athlete directly tags your brand account.</div>
                <div className="text-[#999] text-sm">Captured across Instagram and TikTok automatically.</div>
              </div>
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#CAFF00] text-sm mb-3">✦ ATHLETE IN CONTENT</div>
                <div className="text-white font-medium mb-2">Posts where the athlete appears on behalf of your brand, tagged or not.</div>
                <div className="text-[#999] text-sm">Vision scanning picks up untagged brand appearances.</div>
              </div>
              <div className="p-8">
                <div className="text-[#CAFF00] text-sm mb-3">✦ BRAND COLLAB</div>
                <div className="text-white font-medium mb-2">Co-created content where both brand and athlete are credited as collaborators.</div>
                <div className="text-[#999] text-sm">Tracked as a separate post type with collab-specific metrics.</div>
              </div>
            </div>
            <div className="mt-6 px-6 py-4 border border-[#222] text-[#999] text-sm">
              Scraped and processed automatically. No manual submission required.
            </div>
          </Section>
        </div>
      </section>

      {/* AGGREGATED METRICS / DASHBOARD */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">YOUR DASHBOARD</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              ONE VIEW. EVERY<br />ATHLETE. ALL THE DATA.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-[#222] mb-8">
              <div className="p-6 border-r border-[#222]">
                <div className="text-white text-xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem" }}>496.3M</div>
                <div className="text-[#888] text-xs tracking-[0.1em]">AGGREGATE FOLLOWERS</div>
              </div>
              <div className="p-6 border-r border-[#222]">
                <div className="text-[#CAFF00] text-xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem" }}>60.9M</div>
                <div className="text-[#888] text-xs tracking-[0.1em]">TOTAL ENGAGEMENT</div>
              </div>
              <div className="p-6 border-r border-[#222]">
                <div className="text-white text-xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem" }}>10.9M</div>
                <div className="text-[#888] text-xs tracking-[0.1em]">VIDEO VIEWS</div>
              </div>
              <div className="p-6 border-r border-[#222]">
                <div className="text-[#CAFF00] text-xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem" }}>+110.8%</div>
                <div className="text-[#888] text-xs tracking-[0.1em]">REACH GROWTH (90D)</div>
              </div>
              <div className="p-6">
                <div className="text-white text-xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem" }}>$73.9K</div>
                <div className="text-[#888] text-xs tracking-[0.1em]">EARNED MEDIA VALUE</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222] border-t-0">
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#aaa] text-xs tracking-[0.2em] mb-4">METRICS INCLUDED</div>
                <div className="space-y-2">
                  {["AGGREGATED TOTALS","AVERAGED PER ATHLETE","TOTAL ROSTER","TOTAL CONTENT","COMMENTS","CAPTIONS ANALYSIS","ENGAGEMENT RATE","VIDEO VIEWS"].map(m => (
                    <div key={m} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#CAFF00]" />
                      <span className="text-[#ccc] text-sm tracking-[0.1em]">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <div className="text-[#aaa] text-xs tracking-[0.2em] mb-4">CONNECTED PLATFORMS</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#CAFF00]" />
                    <span className="text-white text-sm tracking-[0.1em]">✓ INSTAGRAM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#CAFF00]" />
                    <span className="text-white text-sm tracking-[0.1em]">✓ TIKTOK</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#333]" />
                    <span className="text-[#777] text-sm tracking-[0.1em]">TWITTER/X - SOON</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#333]" />
                    <span className="text-[#777] text-sm tracking-[0.1em]">YOUTUBE - SOON</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* TALENT PERFORMANCE */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">TALENT PERFORMANCE</p>
            <h2 className="text-white leading-none mb-6" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              YOUR ATHLETES.<br />THEIR NUMBERS.
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              Every athlete is tracked individually - their overall social metrics AND their specific performance on your brand's campaigns. See who moves the needle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-[#222] mb-6">
              {[
                { name: "Marcus Webb", school: "Ohio State", pos: "WR · Football", reach: "548.5K", campaign: "+32,778% vs avg", badge: "TOP 1%", headshot: "/football_player.png" },
                { name: "Dani Torres", school: "UConn", pos: "G · Women's Basketball", reach: "674K", campaign: "34.4% ER", badge: "TOP 1%", headshot: "/WBB_player.png" },
                { name: "Jordan Ellis", school: "Michigan", pos: "QB · Football", reach: "812K", campaign: "Spring Launch", badge: "TOP 5%", headshot: "/MBB_player.png" },
                { name: "Aaliyah Reeves", school: "LSU", pos: "G · Women's Basketball", reach: "651K", campaign: "Summer Campaign", badge: "TOP 1%", headshot: "/Volleyball_player.png" },
              ].map((a, i) => (
                <div key={a.name} className={`p-6 ${i < 3 ? "border-r border-[#222]" : ""}`}>
                  <img
                    src={a.headshot}
                    alt={`${a.name} headshot`}
                    className="mb-3 h-10 w-10 rounded-full object-cover object-top"
                  />
                  <div className="text-white font-semibold mb-1">{a.name}</div>
                  <div className="text-[#888] text-xs tracking-[0.1em] mb-4">{a.school} · {a.pos}</div>
                  <div className="text-[#999] text-xs mb-1">TOTAL REACH</div>
                  <div className="text-white text-sm mb-3">{a.reach} followers</div>
                  <div className="text-[#999] text-xs mb-1">CAMPAIGN PERF</div>
                  <div className="text-white text-sm mb-3">{a.campaign}</div>
                  <span className="text-[#CAFF00] text-xs border border-[#CAFF00] px-2 py-0.5 tracking-[0.1em]">{a.badge}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border border-[#222] text-[#999] text-sm">
              Track each athlete's individual metrics alongside their specific performance on your campaigns - sorted by impact.
            </div>
          </Section>
        </div>
      </section>

      {/* CAMPAIGN VISIBILITY */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">CAMPAIGN VISIBILITY</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              SEE EXACTLY WHAT<br />EACH CAMPAIGN DELIVERED.
            </h2>
            <div className="border border-[#222]">
              <div className="grid grid-cols-5 px-6 py-3 border-b border-[#222] text-[#777] text-xs tracking-[0.15em]">
                <span>CAMPAIGN</span><span>STATUS</span><span>ATHLETE</span><span>NEXT DELIVERABLE</span><span>TIMELINE</span>
              </div>
              {[
                { name: "YOUR BRAND SPRING 2025", status: "RUNNING", athlete: "Marcus Webb", next: "Photo shoot scheduled", days: "120 DAYS LEFT", warn: false },
                { name: "YOUR BRAND SUMMER PUSH", status: "DRAFT", athlete: "Dani Torres", next: "Contract review", days: "45 DAYS LEFT", warn: true },
                { name: "YOUR BRAND FALL CAMPAIGN", status: "RUNNING", athlete: "Jordan Ellis", next: "Post deliverable due", days: "18 DAYS LEFT", warn: false },
              ].map((c, i) => (
                <div key={c.name} className={`grid grid-cols-5 px-6 py-5 items-center ${i < 2 ? "border-b border-[#1a1a1a]" : ""}`}>
                  <span className="text-white text-sm font-medium">{c.name}</span>
                  <span className={`text-xs tracking-[0.1em] ${c.status === "RUNNING" ? "text-[#CAFF00]" : "text-[#999]"}`}>● {c.status}</span>
                  <span className="text-[#999] text-sm">{c.athlete}</span>
                  <span className="text-[#999] text-sm">{c.next}</span>
                  <div>
                    <span className="text-[#999] text-xs">● {c.days}</span>
                    {c.warn && <div className="text-[#ff6b35] text-xs mt-1">⚠ 2 QC ISSUES</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 px-6 py-4 border border-[#222] text-[#999] text-sm">
              Track every active deal from draft to done. See next deliverable, days remaining, and quality issues flagged in real time.
            </div>
          </Section>
        </div>
      </section>

      {/* BENCHMARK */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">BENCHMARK</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              HOW DO YOU<br />STACK UP?
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA benchmarks your athlete content three ways - so you always know if you're getting above-average performance or leaving ROI on the table.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222]">
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#CAFF00] text-sm mb-3">✦ YOUR OWN POSTS</div>
                <div className="text-white font-semibold mb-2">Sponsored vs. Unsponsored</div>
                <div className="text-[#999] text-sm">See how your sponsored athlete posts compare to your brand's organic content - engagement, reach, and saves.</div>
              </div>
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#CAFF00] text-sm mb-3">✦ INDUSTRY BENCHMARK</div>
                <div className="text-white font-semibold mb-2">vs. Other Brands</div>
                <div className="text-[#999] text-sm">Compare your campaign performance against other brands sponsoring athletes in your industry, by company size and overall market.</div>
              </div>
              <div className="p-8">
                <div className="text-[#CAFF00] text-sm mb-3">✦ SPORT / CONFERENCE / NCAA</div>
                <div className="text-white font-semibold mb-2">vs. Your Category</div>
                <div className="text-[#999] text-sm">Benchmark against brands sponsoring athletes in the same sport, conference, or NCAA division as your partners.</div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* MARKET INTELLIGENCE */}
      <section className="py-24 px-8 border-b border-[#1a1a1a] bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">MARKET INTELLIGENCE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2
              className="text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              SEE WHO YOUR<br />
              COMPETITORS<br />
              <span style={{ color: '#CAFF00' }}>ARE WORKING WITH.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA tracks every brand-athlete deal across the platform. See which athletes your competitors are activating, what categories are heating up, and where the whitespace is - before you negotiate your next deal.
            </p>
          </div>

          {/* Competitive Intel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'COMPETITOR ACTIVITY',
                heading: 'Brand X signed 4 new football athletes this month.',
                sub: 'All SEC. Average follower count: 890K. Category: Footwear.',
                tag: '● ACTIVE NOW',
                tagColor: '#CAFF00',
              },
              {
                label: 'CATEGORY TREND',
                heading: 'Women\'s basketball is the fastest-growing NIL category.',
                sub: '+34% more brand deals signed vs. same period last year.',
                tag: '↑ TRENDING',
                tagColor: '#CAFF00',
              },
              {
                label: 'WHITESPACE ALERT',
                heading: 'No major apparel brand is active with SEC baseball athletes.',
                sub: '12 athletes in your target demo with no current apparel deal.',
                tag: '✦ OPPORTUNITY',
                tagColor: '#CAFF00',
              },
            ].map((card, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111] hover:border-white/20 transition-colors">
                <p className="text-[10px] tracking-[0.15em] text-white/30 mb-3">{card.label}</p>
                <p className="text-white text-sm font-medium leading-snug mb-3">{card.heading}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{card.sub}</p>
                <span className="text-[10px] tracking-widest font-medium" style={{ color: card.tagColor }}>{card.tag}</span>
              </div>
            ))}
          </div>

          {/* Competitor Deal Table */}
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-4 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
              <span>COMPETITOR BRAND</span>
              <span>ATHLETES ACTIVATED</span>
              <span>CATEGORY</span>
              <span>EST. SPEND</span>
            </div>
            {[
              { brand: 'Brand X', athletes: '14 athletes', category: 'Footwear · Football', spend: '$420K est.' },
              { brand: 'Brand Y', athletes: '9 athletes', category: 'Apparel · Multi-sport', spend: '$280K est.' },
              { brand: 'Brand Z', athletes: '6 athletes', category: 'Beverage · Basketball', spend: '$190K est.' },
              { brand: 'Brand W', athletes: '11 athletes', category: 'Finance · Football', spend: '$340K est.' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-white text-sm font-medium">{row.brand}</span>
                <span className="text-white/60 text-sm">{row.athletes}</span>
                <span className="text-white/40 text-sm">{row.category}</span>
                <span className="text-[#CAFF00] text-sm">{row.spend}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Competitor data is aggregated and anonymized from JABA's platform network. Actual brand names visible on full platform access.</p>
        </div>
      </section>

      {/* CREATIVE INTELLIGENCE */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">CREATIVE INTELLIGENCE</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              WHAT'S ACTUALLY<br />IN THE CONTENT?
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA analyzes the creative elements of every piece of content - not just the numbers, but what was actually in the video.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222]">
              <div className="p-8 border-r border-[#222] border-b border-b-[#222]">
                <div className="text-[#999] text-2xl mb-4">▶</div>
                <div className="text-white font-semibold mb-2">Video Length</div>
                <div className="text-[#999] text-sm">Average duration per post, broken down by platform and format.</div>
              </div>
              <div className="p-8 border-b border-[#222]">
                <div className="text-[#999] text-2xl mb-4">◻</div>
                <div className="text-white font-semibold mb-2">Logo Usage</div>
                <div className="text-[#999] text-sm">How long your logo appears on screen per post and where it lands in the video timeline.</div>
              </div>
              <div className="p-8 border-r border-[#222]">
                <div className="text-[#999] text-2xl mb-4">≡</div>
                <div className="text-white font-semibold mb-2">Caption Analysis</div>
                <div className="text-[#999] text-sm">What language, tone, hashtags, and calls-to-action appear across your sponsored content.</div>
              </div>
              <div className="p-8">
                <div className="text-[#999] text-2xl mb-4">◈</div>
                <div className="text-white font-semibold mb-2">Content Breakdown</div>
                <div className="text-[#999] text-sm">What was actually in the video - product placement, lifestyle, game footage, behind-the-scenes.</div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* AI INTELLIGENCE */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">AI INTELLIGENCE</p>
            <h2 className="text-white leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              WHAT WORKED.<br />WHAT DIDN'T.<br />AND WHY.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="border border-[#222] p-8 md:mr-0">
                <div className="space-y-8">
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-3">✦ WHAT WORKED FOR YOUR BRAND</div>
                    <div className="text-[#ccc] text-sm leading-relaxed mb-2">Top-performing posts cluster around short-form video (15-25s). Posts with strong hooks in the first 2 seconds outperformed the rest by 4.1x.</div>
                    <div className="text-[#777] text-xs tracking-[0.1em]">CONFIDENCE: HIGH</div>
                  </div>
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-3">✦ WHAT DIDN'T WORK</div>
                    <div className="text-[#ccc] text-sm leading-relaxed mb-2">Static image posts generated 3.2x lower engagement than video. Long captions (200+ words) correlated with below-average saves.</div>
                    <div className="text-[#777] text-xs tracking-[0.1em]">SOURCE: LAST 90 DAYS</div>
                  </div>
                  <div>
                    <div className="text-[#CAFF00] text-sm mb-3">✦ VS OTHER BRANDS</div>
                    <div className="text-[#ccc] text-sm leading-relaxed mb-2">Your engagement rate is 0.4% above the industry average for brands sponsoring NCAA football athletes. Reach growth outperforms 78% of comparable brands.</div>
                    <div className="text-[#777] text-xs tracking-[0.1em]">BENCHMARK: INDUSTRY</div>
                  </div>
                </div>
              </div>
              <div className="border border-[#222] border-l-0 p-8 grid grid-cols-2 gap-0 content-start">
                <div className="p-6 border-r border-b border-[#222]">
                  <div className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "2rem" }}>16.4K</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">CAMPAIGN POSTS</div>
                </div>
                <div className="p-6 border-b border-[#222]">
                  <div className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "2rem" }}>60.1M</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">TOTAL LIKES</div>
                </div>
                <div className="p-6 border-r border-[#222]">
                  <div className="text-[#CAFF00] text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "2rem" }}>60.9M</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">ENGAGEMENT</div>
                </div>
                <div className="p-6">
                  <div className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "2rem" }}>827.2K</div>
                  <div className="text-[#888] text-xs tracking-[0.1em]">TOTAL COMMENTS</div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* CONTENT HUB */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">CONTENT HUB</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              SAVED LISTS.<br />TRENDING CONTENT.<br />ALWAYS CURRENT.
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA's Content Hub lets you save and organize content by category - trending posts, content by topic, by athlete type, or by campaign. Filtered for your brand's specific needs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#222] mb-6">
              {[
                { label: "Trending This Week", count: "24 posts" },
                { label: "Product Placement", count: "18 posts" },
                { label: "Short-Form Top Performers", count: "31 posts" },
                { label: "Game Day Content", count: "47 posts" },
              ].map((item, i) => (
                <div key={item.label} className={`p-6 ${i < 3 ? "border-r border-[#222]" : ""}`}>
                  <div className="text-white text-sm font-medium mb-1">{item.label}</div>
                  <div className="text-[#CAFF00] text-xs">{item.count}</div>
                </div>
              ))}
            </div>
            <div className="border border-[#222] p-6">
              <div className="text-[#aaa] text-xs tracking-[0.2em] mb-4">FILTER BY TALENT TYPE</div>
              <div className="flex gap-3">
                {["ATHLETE", "INFLUENCER", "MUSICAL ARTIST", "ALL TALENT"].map((t, i) => (
                  <span key={t} className={`text-xs px-3 py-1.5 border tracking-[0.1em] ${i === 0 ? "border-[#CAFF00] text-[#CAFF00]" : "border-[#333] text-[#888]"}`}>{t}</span>
                ))}
              </div>
              <p className="text-[#999] text-sm mt-4">Content isn't just for athletes. JABA tracks performance across all talent categories - athletes, influencers, and musical artists.</p>
            </div>
          </Section>
        </div>
      </section>

      {/* SOCIAL LISTENING */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <p className="text-[#aaa] text-xs tracking-[0.3em] mb-4">ALWAYS ON</p>
            <h2 className="text-white leading-none mb-8" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              REAL-TIME. YOUR BRAND.<br />YOUR COMPETITORS.
            </h2>
            <p className="text-[#999] max-w-xl mb-10">
              JABA monitors social conversation around your brand and your competitors 24/7. See what's trending, what athletes are saying, and where momentum is shifting - before you need to report on it.
            </p>
            <div className="flex gap-3 mb-6">
              <span className="text-xs px-3 py-1.5 border border-[#CAFF00] text-[#CAFF00] tracking-[0.1em]">YOUR BRAND</span>
              <span className="text-xs px-3 py-1.5 border border-[#333] text-[#888] tracking-[0.1em]">COMPETITORS</span>
            </div>
            {/* Mock social listening feed */}
            <div className="mt-8 space-y-3">
              {[
                { platform: 'TW', handle: '@marcuswebb', text: 'Big thanks to Brand X for the gear this season - best fit I\'ve had all year.', time: '2h ago', sentiment: 'POSITIVE', sentColor: '#CAFF00' },
                { platform: 'IG', handle: '@danitorres_hoops', text: 'Game day ready with my favorite brand. Nothing hits different.', time: '5h ago', sentiment: 'POSITIVE', sentColor: '#CAFF00' },
                { platform: 'TW', handle: '@nilsportsnews', text: 'Brand X expanding NIL roster ahead of March - 4 new athletes signed this week.', time: '8h ago', sentiment: 'NEUTRAL', sentColor: 'rgba(255,255,255,0.4)' },
                { platform: 'IG', handle: '@jordanellis_qb', text: 'Switching up my training setup this off-season. Trying some new things.', time: '12h ago', sentiment: 'NEUTRAL', sentColor: 'rgba(255,255,255,0.4)' },
              ].map((post, i) => (
                <div key={i} className="flex items-start gap-4 border border-white/10 px-5 py-4 rounded-sm hover:border-white/20 transition-colors">
                  <span className="text-[10px] tracking-widest text-white/30 border border-white/10 px-2 py-1 mt-0.5">{post.platform}</span>
                  <div className="flex-1">
                    <p className="text-white/60 text-xs font-medium mb-1">{post.handle}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{post.text}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] tracking-widest mb-1" style={{ color: post.sentColor }}>{post.sentiment}</p>
                    <p className="text-white/20 text-xs">{post.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4">Monitoring 24/7 across Instagram and Twitter/X. Competitor tracking available on request.</p>
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
