"use client";

import { motion } from "framer-motion";

type TabKey = "brands" | "agencies";

type TabSwitcherProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "brands", label: "FOR BRANDS" },
  { key: "agencies", label: "FOR AGENCIES" },
];

export default function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="relative flex items-center gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className="relative pb-2 text-xs font-semibold tracking-[0.12em] text-white/90 transition hover:text-white"
        >
          {tab.label}
          {activeTab === tab.key ? (
            <motion.span
              layoutId="tab-underline"
              className="absolute inset-x-0 -bottom-px h-[2px] bg-accent"
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}
