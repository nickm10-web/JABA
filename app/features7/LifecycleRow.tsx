import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type StageIcon = (props: IconProps) => ReactElement;

/* ── Step Icons ── */

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <path d="M12 2C12 2 7 7.5 7 13c0 2.5 1.5 4.5 3 5.5l2 3.5 2-3.5c1.5-1 3-3 3-5.5C17 7.5 12 2 12 2z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" />
      <path d="M7 13S4 12 3 10m14 3s3-1 4-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClipboardCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3h6v2H9z" />
      <path d="m9 13 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="3" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="6" width="4" height="14" rx="1" />
      <rect x="17" y="2" width="4" height="18" rx="1" />
    </svg>
  );
}

function GaugeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.8" aria-hidden {...props}>
      <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" />
      <path d="M12 12l3.5-3.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="#C8FF00" stroke="none" />
      <path d="M5.5 16h1M17.5 16h1M8 8.5l.7.7M15.3 8.5l-.7.7M12 5.5v1" strokeLinecap="round" />
    </svg>
  );
}

/* ── Arrow Icons ── */

function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden {...props}>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 7 6 5-6 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden {...props}>
      <path d="M12 5v14" strokeLinecap="round" />
      <path d="m7 13 5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Stage Data ── */

const STAGES: Array<{ topLabel: string; bottomLabel: string; Icon: StageIcon }> = [
  { topLabel: "FIND", bottomLabel: "Talent", Icon: SearchIcon },
  { topLabel: "GENERATE", bottomLabel: "Concepts", Icon: GearIcon },
  { topLabel: "LAUNCH", bottomLabel: "Campaign", Icon: RocketIcon },
  { topLabel: "MANAGE", bottomLabel: "Deliverables", Icon: ClipboardCheckIcon },
  { topLabel: "REPORT", bottomLabel: "Results", Icon: BarChartIcon },
  { topLabel: "BENCHMARK", bottomLabel: "Performance", Icon: GaugeIcon },
];

/* ── Components ── */

function LifecycleNode({ topLabel, bottomLabel, Icon }: { topLabel: string; bottomLabel: string; Icon: StageIcon }) {
  return (
    <div className="rounded-2xl border border-[#C8FF00]/40 bg-white/[0.04] backdrop-blur-md flex flex-col items-center justify-center gap-3 shadow-[0_0_24px_rgba(200,255,0,0.1)] hover:shadow-[0_0_40px_rgba(200,255,0,0.22)] hover:border-[#C8FF00]/75 transition-all duration-300 w-full h-[130px] md:w-[145px] md:h-[140px] px-4 py-6">
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <span className="rounded-xl bg-[#C8FF00]/10 p-2.5">
          <Icon className="h-7 w-7 text-[#C8FF00]" />
        </span>
        <span className="leading-tight text-white text-center">
          <span className="block text-[15px] font-bold uppercase tracking-[0.1em] text-white text-center">{topLabel}</span>
          <span className="block text-[12px] font-medium uppercase tracking-[0.06em] text-white/45 text-center">{bottomLabel}</span>
        </span>
      </div>
    </div>
  );
}

function StageArrow() {
  return <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-[#C8FF00]/90 md:h-5 md:w-5 md:text-[#C8FF00]/50" />;
}

export default function LifecycleRow() {
  const firstRow = STAGES.slice(0, 3);
  const secondRow = STAGES.slice(3);

  return (
    <div
      className="mx-auto w-full max-w-6xl rounded-[28px] border border-white/15 bg-white/[0.05] px-4 py-8 md:px-10 md:py-12 backdrop-blur-2xl"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 28px rgba(200,255,0,0.1)" }}
      role="group"
      aria-label="Campaign lifecycle stages"
    >
      <ol className="hidden md:flex items-center justify-center gap-2" aria-label="FIND to BENCHMARK lifecycle flow">
        {STAGES.map((stage, index) => (
          <li key={stage.topLabel} className="flex items-center gap-2 md:gap-1.5">
            <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} Icon={stage.Icon} />
            {index < STAGES.length - 1 && <StageArrow />}
          </li>
        ))}
      </ol>

      <div className="md:hidden" aria-label="FIND to BENCHMARK lifecycle flow">
        <ol className="flex items-center justify-center gap-2 w-full">
          {firstRow.map((stage, index) => (
            <li key={stage.topLabel} className="flex items-center gap-1.5 flex-1 min-w-0">
              <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} Icon={stage.Icon} />
              {index < firstRow.length - 1 && <StageArrow />}
            </li>
          ))}
        </ol>

        <div className="my-3 flex justify-center">
          <ArrowDownIcon className="h-4 w-4 text-[#C8FF00]/85" />
        </div>

        <ol className="flex items-center justify-center gap-2 w-full">
          {secondRow.map((stage, index) => (
            <li key={stage.topLabel} className="flex items-center gap-1.5 flex-1 min-w-0">
              <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} Icon={stage.Icon} />
              {index < secondRow.length - 1 && <StageArrow />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
