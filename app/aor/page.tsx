'use client'
export default function AORPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white relative overflow-x-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
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
      <main className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <img src="/jaba-wordmark.png" alt="JABA logo" className="h-14 w-auto" />
          <span className="text-xs tracking-[0.2em] text-white/60 border border-white/20 px-4 py-2">FOR AORs</span>
        </div>
      </nav>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <p className="text-xs tracking-[0.3em] text-white/40 mb-8 uppercase relative z-10">JABA FOR AORs</p>
        <h1 className="text-[72px] md:text-[100px] lg:text-[120px] leading-[0.9] mb-8 relative z-10" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          <span className="text-white block">ONE PLATFORM.</span>
          <span className="text-white block">EVERY BRAND.</span>
          <span className="text-[#CCFF00] block">EVERY ATHLETE.</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto relative z-10 leading-relaxed">
          JABA gives agencies of record a single command center to manage athlete partnerships across every brand in their portfolio - with the data, tools, and intelligence to prove ROI at every level.
        </p>
      </section>
      {/* SEE IT IN ACTION */}
      <section className="py-24 px-8 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/40 mb-6 uppercase">See It In Action</p>
            <h2
              className="leading-none mb-6 text-white"
              style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              AI BUILT FOR THE<br />
              PEOPLE WHO WORK<br />
              WITH ATHLETES.
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              JABA was built from the ground up for schools, agencies and brands managing NIL at scale. This is what that looks like.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[300px] md:w-[340px] aspect-[9/16] rounded-sm overflow-hidden border border-white/10">
              <iframe
                src="https://www.youtube.com/embed/0BCwKKac75Q"
                title="JABA Platform Demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      {/* PORTFOLIO COMMAND CENTER */}
      <section className="py-24 px-6 border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">PORTFOLIO OVERVIEW</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              MANAGE EVERY<br />BRAND YOU REPRESENT.<br />
              <span className="text-[#CCFF00]">IN ONE VIEW.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA's Brand Portfolio Dashboard gives AORs a bird's-eye view of every client brand - their active deals, athlete rosters, campaign performance, and upcoming deliverables - without switching logins or tabs.
            </p>
          </div>
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-5 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
              <span>BRAND</span>
              <span>ATHLETES</span>
              <span>ACTIVE CAMPAIGNS</span>
              <span>NEXT DELIVERABLE</span>
              <span>STATUS</span>
            </div>
            {[
              { brand: 'Brand A - Footwear', athletes: 12, campaigns: 3, next: 'Instagram Story · Mar 2', status: '● RUNNING', color: '#CCFF00' },
              { brand: 'Brand B - Apparel', athletes: 8, campaigns: 2, next: 'YouTube Vlog · Mar 5', status: '● RUNNING', color: '#CCFF00' },
              { brand: 'Brand C - Beverage', athletes: 5, campaigns: 1, next: 'TikTok Series · Mar 8', status: '⚠ QC ISSUE', color: '#FFAA00' },
              { brand: 'Brand D - Finance', athletes: 3, campaigns: 1, next: 'Contract Review', status: '◎ DRAFT', color: '#ffffff50' },
              { brand: 'Brand E - Retail', athletes: 7, campaigns: 2, next: 'Photo Shoot · Mar 12', status: '● RUNNING', color: '#CCFF00' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-white text-sm font-medium">{row.brand}</span>
                <span className="text-white/60 text-sm">{row.athletes} athletes</span>
                <span className="text-white/60 text-sm">{row.campaigns} running</span>
                <span className="text-white/40 text-xs pt-0.5">{row.next}</span>
                <span className="text-xs font-medium" style={{ color: row.color }}>{row.status}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Filter by brand, sport, campaign status, or deliverable type. Export portfolio reports in one click.</p>
        </div>
      </section>
      {/* CROSS-BRAND CAMPAIGN MANAGEMENT */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">CAMPAIGN MANAGEMENT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              CAMPAIGNS ACROSS<br />EVERY BRAND.<br />
              <span className="text-[#CCFF00]">ZERO CHAOS.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA tracks every deliverable across every athlete across every brand you manage. Automated alerts flag overdue tasks, QC issues, and upcoming deadlines - so nothing slips.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                status: '● RUNNING', statusColor: '#CCFF00',
                brand: 'BRAND A SPRING CAMPAIGN', client: 'Brand A - Footwear',
                athletes: 'Marcus Webb + 4 others', next: 'Instagram Story scheduled', days: '● 84 DAYS LEFT',
              },
              {
                status: '⚠ QC ISSUE', statusColor: '#FFAA00',
                brand: 'BRAND C GAME DAY PUSH', client: 'Brand C - Beverage',
                athletes: 'Dani Torres', next: '2 posts flagged for review', days: '⚠ 2 QC ISSUES',
              },
              {
                status: '◎ DRAFT', statusColor: 'rgba(255,255,255,0.3)',
                brand: 'BRAND D SUMMER PUSH', client: 'Brand D - Finance',
                athletes: 'Jordan Ellis', next: 'Contract pending signature', days: '◎ 45 DAYS LEFT',
              },
            ].map((card, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111] hover:border-white/20 transition-colors">
                <p className="text-xs font-medium mb-1" style={{ color: card.statusColor }}>{card.status}</p>
                <p className="text-xl text-white mb-1" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>{card.brand}</p>
                <p className="text-xs text-white/30 mb-4">{card.client}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-white/40">Athletes</span>
                    <span className="text-xs text-white/70">{card.athletes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/40">Next</span>
                    <span className="text-xs text-white/70">{card.next}</span>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-xs" style={{ color: card.statusColor }}>{card.days}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">View as grid, list, or analytics report. Filter by brand client or campaign status.</p>
        </div>
      </section>
      {/* AI-POWERED ATHLETE–BRAND MATCHING */}
      <section className="py-24 px-6 border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">AI-POWERED MATCHING</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              JABA MATCHES ATHLETES<br />TO THE RIGHT BRAND.<br />
              <span className="text-[#CCFF00]">AUTOMATICALLY.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              AORs manage multiple brand clients with different audiences, categories, and goals. JABA's AI evaluates your full athlete database against each brand's specific criteria - surfacing the right fits, ranked by alignment score.
            </p>
          </div>
          <div className="space-y-3 mb-6">
            {[
              { athlete: 'Marcus Webb', sport: 'Football · 1.2M followers', brand: 'Brand A - Footwear', reason: 'Actively partners with football athletes. 92% audience alignment.', match: '✦ MATCH', matchColor: '#CCFF00' },
              { athlete: 'Dani Torres', sport: "Women's Basketball · 674K followers", brand: 'Brand B - Apparel', reason: "Top-performing women's basketball athlete. Brand values alignment: HIGH.", match: '✦ MATCH', matchColor: '#CCFF00' },
              { athlete: 'Jordan Ellis', sport: 'Football · 812K followers', brand: 'Brand E - Retail', reason: 'Outreach sent 3 days ago. Response pending.', match: 'REACHED OUT', matchColor: 'rgba(255,255,255,0.4)' },
              { athlete: 'Aaliyah Reeves', sport: "Women's Basketball · 651K followers", brand: 'Brand C - Beverage', reason: 'New recommendation. 88% audience-brand alignment score.', match: '✦ NEW MATCH', matchColor: '#CCFF00' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_120px] items-center border border-white/10 px-6 py-4 rounded-sm hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-medium text-sm">{row.athlete}</p>
                  <p className="text-white/40 text-xs">{row.sport}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium">{row.brand}</p>
                  <p className="text-white/30 text-xs">{row.reason}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium whitespace-nowrap" style={{ color: row.matchColor }}>{row.match}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs">54 athlete–brand matches identified across your portfolio. Ranked by brand fit, partnership history, and audience alignment.</p>
        </div>
      </section>
      {/* AGGREGATED BRAND REPORTING */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">BRAND REPORTING</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              REPORT TO EVERY<br />BRAND. AT ONCE.<br />
              <span className="text-[#CCFF00]">WITH REAL DATA.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              Each brand client gets their own dashboard - reach, engagement, earned media value, and campaign performance. You manage the portfolio. JABA generates the reports.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'TOTAL PORTFOLIO REACH', value: '2.1B+', sub: 'across all brand clients' },
              { label: 'ACTIVE DEALS', value: '47', sub: 'running across 8 brands' },
              { label: 'EARNED MEDIA VALUE', value: '$2.4M', sub: 'last 90 days' },
              { label: 'AVG ENGAGEMENT RATE', value: '4.2%', sub: 'above industry avg' },
            ].map((m, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm bg-[#111111]">
                <p className="text-[10px] tracking-[0.15em] text-white/30 mb-2">{m.label}</p>
                <p className="text-4xl text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>{m.value}</p>
                <p className="text-xs text-white/30 mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-5 text-[10px] tracking-[0.15em] text-white/30 border-b border-white/10 px-6 py-3 bg-white/5">
              <span>BRAND</span>
              <span>TOTAL REACH</span>
              <span>ENGAGEMENT</span>
              <span>EMV</span>
              <span>PERFORMANCE</span>
            </div>
            {[
              { brand: 'Brand A - Footwear', reach: '808.6M', eng: '60.9M', emv: '$73.9K', perf: '+110.8% REACH', tier: 'TOP 1%' },
              { brand: 'Brand B - Apparel', reach: '496.3M', eng: '44.2M', emv: '$51.2K', perf: '+88.4% REACH', tier: 'TOP 5%' },
              { brand: 'Brand C - Beverage', reach: '312.1M', eng: '28.7M', emv: '$32.8K', perf: '+64.2% REACH', tier: 'TOP 10%' },
              { brand: 'Brand E - Retail', reach: '241.8M', eng: '19.4M', emv: '$24.1K', perf: '+41.3% REACH', tier: 'TOP 15%' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-5 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-white text-sm font-medium">{row.brand}</span>
                <span className="text-white/60 text-sm">{row.reach}</span>
                <span className="text-white/60 text-sm">{row.eng}</span>
                <span className="text-[#CCFF00] text-sm">{row.emv}</span>
                <div>
                  <p className="text-white/60 text-xs">{row.perf}</p>
                  <p className="text-[#CCFF00] text-xs">{row.tier}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TALENT ROSTER */}
      <section className="py-24 px-6 border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">TALENT MANAGEMENT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              YOUR FULL ATHLETE<br />DATABASE.<br />
              <span className="text-[#CCFF00]">SEARCHABLE. RANKABLE.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              Every athlete across every brand you manage, in one place. Filter by sport, audience size, engagement rate, or brand compatibility. Know who's available, who's committed, and who's the best fit for what's next.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Marcus Webb', sport: 'Football', headshot: '/football_player.png', followers: '1.2M', er: '41.4%', score: 94, brand: 'Brand A' },
              { name: 'Dani Torres', sport: "Women's Basketball", headshot: '/WBB_player.png', followers: '674K', er: '34.4%', score: 93, brand: 'Brand B' },
              { name: 'Jordan Ellis', sport: "Men's Basketball", headshot: '/MBB_player.png', followers: '812K', er: '16.3%', score: 92, brand: 'Brand E' },
              { name: 'Aaliyah Reeves', sport: "Women's Volleyball", headshot: '/Volleyball_player.png', followers: '651K', er: '36.9%', score: 94, brand: 'Brand C' },
            ].map((a, i) => (
              <div key={i} className="border border-white/10 rounded-sm overflow-hidden hover:border-white/20 transition-colors">
                <div className="h-64 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                  <img
                    src={a.headshot}
                    alt={`${a.name} headshot`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <p className="text-white font-medium text-sm">{a.name}</p>
                  <p className="text-white/40 text-xs mb-3">{a.sport}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-white/30">MARKETABILITY</span>
                      <span className="text-[10px] text-[#CCFF00]">{a.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-white/30">FOLLOWERS</span>
                      <span className="text-[10px] text-white/60">{a.followers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-white/30">ER</span>
                      <span className="text-[10px] text-white/60">{a.er}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/5">
                      <span className="text-[10px] text-white/30">BRAND</span>
                      <span className="text-[10px] text-[#CCFF00]">{a.brand}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Filter by sport, brand, engagement tier, or availability. Generate individual or portfolio media kits in one click.</p>
        </div>
      </section>
      {/* AI TOOLS */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">AI TOOLS</p>
          <h2 className="text-5xl md:text-6xl leading-tight mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            DECKS. REPORTS.<br />
            <span className="text-[#CCFF00]">PITCHES. IN SECONDS.</span>
          </h2>
          <p className="text-white/50 text-base mb-12 max-w-2xl">JABA generates the deliverables that take your team hours - in seconds. Built specifically for AOR workflows.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '↗', title: 'Brand Performance Report', desc: 'One-click report for any brand client - live data, ranked athletes, campaign insights.' },
              { icon: '◻', title: 'Athlete Pitch Deck', desc: 'Auto-generate a media kit for any athlete. Ready to pitch to any brand in your portfolio.' },
              { icon: '⊞', title: 'Portfolio Summary', desc: 'Aggregated view of your entire AOR portfolio. Perfect for QBRs and executive reviews.' },
              { icon: '◈', title: 'Brand–Athlete Match Report', desc: 'Show why a specific athlete is the right fit for a specific brand. AI-generated. Data-backed.', soon: true },
            ].map((tool, i) => (
              <div key={i} className="border border-white/10 p-6 rounded-sm hover:border-[#CCFF00]/30 transition-colors relative">
                {tool.soon && (
                  <span className="absolute top-4 right-4 text-[9px] tracking-[0.15em] text-white/30 border border-white/10 px-2 py-0.5">COMING SOON</span>
                )}
                <span className="text-2xl text-[#CCFF00] mb-4 block">{tool.icon}</span>
                <p className="text-white font-medium text-sm mb-2">{tool.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CONTENT INTELLIGENCE */}
      <section className="py-24 px-6 border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">CONTENT INTELLIGENCE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              OUR AI WATCHES<br />300,000+ PIECES<br />
              <span className="text-[#CCFF00]">OF CONTENT.</span>
            </h2>
            <div className="pt-4 space-y-6">
              <p className="text-white/50 text-base leading-relaxed">
                JABA analyzes every athlete post - across your brands and across the full platform. Surface what's working, what format converts, and which athletes are overperforming for their category.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'VIDEO + STATIC', desc: 'AI that actually watches the content - hooks, logo placement, pacing, captions. Not just likes and views.' },
                  { label: 'SPONSORED VS. ORGANIC', desc: 'Filter any insight by paid or organic - know exactly what format converts for each brand client.' },
                  { label: 'CROSS-BRAND SIGNAL', desc: 'Surface trends from 300K+ posts - giving your portfolio an edge no single brand could build alone.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[#CCFF00] text-xs mt-0.5">✦</span>
                    <div>
                      <p className="text-white text-xs font-medium mb-1">{item.label}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { topic: 'GAME DAY', count: '3,508' },
              { topic: 'LIFESTYLE', count: '2,272' },
              { topic: 'FASHION', count: '1,162' },
              { topic: 'TEAM', count: '3,571' },
              { topic: 'FAMILY', count: '1,350' },
              { topic: 'FITNESS', count: '481' },
              { topic: 'MOTIVATION', count: '522' },
              { topic: 'PRACTICE', count: '212' },
            ].map((t, i) => (
              <div key={i} className="border border-white/10 p-3 text-center rounded-sm hover:border-[#CCFF00]/30 transition-colors cursor-pointer">
                <p className="text-xl text-[#CCFF00]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>{t.count}</p>
                <p className="text-[9px] tracking-[0.1em] text-white/30">{t.topic}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Filter by topic, platform, brand category, sport, and performance tier.</p>
        </div>
      </section>
      {/* BENCHMARKING */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-white/40 mb-4">BENCHMARK</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              SHOW EVERY BRAND<br />HOW THEY<br />
              <span className="text-[#CCFF00]">STACK UP.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed pt-4">
              JABA benchmarks performance three ways for every brand in your portfolio - against their own prior campaigns, against their industry, and against comparable athlete categories. You walk into every QBR with context no one else has.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'INTERNAL BENCHMARK', desc: "Sponsored vs. Unsponsored - see how each brand's athlete content compares to their organic posts across engagement, reach, and saves." },
              { label: 'INDUSTRY BENCHMARK', desc: "Compare each brand's campaign performance against competitors in their category, by company size and overall market." },
              { label: 'SPORT / CATEGORY', desc: 'Benchmark against brands sponsoring athletes in the same sport, conference, or NCAA division - for every brand you manage.' },
            ].map((b, i) => (
              <div key={i} className="border border-white/10 p-8 rounded-sm bg-[#111111]">
                <span className="text-[#CCFF00] text-sm mb-4 block">✦</span>
                <p className="text-white font-medium text-sm mb-3">{b.label}</p>
                <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl leading-tight mb-8" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            LET&apos;S TALK ABOUT<br />
            <span className="text-[#CCFF00]">YOUR PORTFOLIO.</span>
          </h2>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 py-6 flex items-center justify-between">
        <img src="/jaba-wordmark.png" alt="JABA logo" className="h-10 w-auto" />
        <span className="text-white/20 text-xs">© 2026 JABA</span>
      </footer>
      </main>
      </div>
    </div>
  )
}
