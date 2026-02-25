"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.9, 0.2, 1] } },
};

export default function AgencyPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="border-t border-line"
    >
      <section className="grid border-b border-line px-6 py-14 md:grid-cols-12 md:px-12">
        <motion.h2
          variants={item}
          className="md:col-span-4 font-display text-4xl uppercase tracking-wideplus"
        >
          Operations Without Fire Drills
        </motion.h2>
        <motion.p variants={item} className="mt-4 md:col-span-8 md:mt-0 max-w-3xl text-white/75">
          Give athlete managers one operating layer for outreach, approvals, fulfillment, and reporting so staff can spend more time with talent.
        </motion.p>
      </section>

      <motion.section variants={container} className="grid border-b border-line md:grid-cols-3">
        {["Automated follow-up reminders", "Centralized athlete comms timeline", "Deliverable completion tracking"].map((text) => (
          <motion.div key={text} variants={item} className="border-line px-6 py-10 md:border-r md:px-10 last:md:border-r-0">
            <p className="text-xs uppercase tracking-[0.15em] text-accent">Workflow</p>
            <p className="mt-4 text-lg text-white/85">{text}</p>
          </motion.div>
        ))}
      </motion.section>

      <section className="grid px-6 py-14 md:grid-cols-12 md:px-12">
        <motion.h3 variants={item} className="md:col-span-4 font-display text-3xl uppercase tracking-wideplus">
          Built For Agency Scale
        </motion.h3>
        <motion.ul variants={container} className="mt-6 space-y-4 md:col-span-8 md:mt-0">
          {[
            "Standardize execution across every athlete book without adding admin headcount.",
            "Surface at-risk deliverables early with clear owner assignment and action dates.",
            "Package clean client updates in minutes, not end-of-week scramble sessions.",
          ].map((line) => (
            <motion.li key={line} variants={item} className="border-b border-line pb-4 text-white/75">
              {line}
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </motion.div>
  );
}
