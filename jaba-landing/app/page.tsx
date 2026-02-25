"use client";

import { animate, useMotionValue, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AgencyPage from "@/components/AgencyPage";
import BrandPage from "@/components/BrandPage";
import TabSwitcher from "@/components/TabSwitcher";

type TabKey = "brands" | "agencies";

function HeroMetric({ activeTab }: { activeTab: TabKey }) {
  const value = useMotionValue(0);
  const [display, setDisplay] = useState("0.0M+");

  useMotionValueEvent(value, "change", (latest) => {
    if (activeTab === "brands") {
      setDisplay(`${latest.toFixed(1)}M+`);
      return;
    }

    const upper = Math.max(0, Math.round(latest));
    const lower = Math.max(0, Math.round(upper * 0.7));
    setDisplay(`${lower}\u2013${upper}`);
  });

  useEffect(() => {
    const target = activeTab === "brands" ? 808.6 : 10;
    value.set(0);
    const controls = animate(value, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [activeTab, value]);

  return (
    <div className="mt-8 border-t border-line pt-6 md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-12">
      <p className="font-display text-7xl uppercase leading-none tracking-wideplus text-accent md:text-8xl">
        {display}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.13em] text-white/70">
        {activeTab === "brands"
          ? "Total Social Reach"
          : "Hours Saved Per Week Per Staff Member"}
      </p>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("brands");

  return (
    <main className="min-h-screen bg-base text-white">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <nav className="flex items-center justify-between border-b border-line py-6">
          <p className="text-lg font-extrabold tracking-[0.13em]">JABA</p>
          <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />
        </nav>

        <section className="grid border-b border-line py-16 md:grid-cols-10 md:gap-8 md:py-20">
          <div className="md:col-span-6">
            <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-wideplus md:text-8xl">
              This Is What
              <br />
              Jaba Looks Like
              <br />
              On Your Side.
            </h1>
            <p className="mt-8 max-w-xl text-base text-white/75 md:text-lg">
              {activeTab === "brands"
                ? "Real-time visibility into every athlete you work with \u2014 all in one place."
                : "The operating system your athlete management has been missing."}
            </p>
          </div>

          <div className="md:col-span-4">
            <HeroMetric activeTab={activeTab} />
          </div>
        </section>

        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
          >
            {activeTab === "brands" ? <BrandPage /> : <AgencyPage />}
          </motion.section>
        </AnimatePresence>

        <footer className="flex flex-col gap-4 border-t border-line py-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold tracking-[0.12em] text-white">JABA</p>
          <p>\u00a9 2026 JABA</p>
          <a href="#" className="underline decoration-line underline-offset-4 transition hover:text-accent">
            Schedule a follow-up
          </a>
        </footer>
      </div>
    </main>
  );
}
