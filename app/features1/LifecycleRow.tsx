import Image from "next/image";
import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type StageIcon = (props: IconProps) => ReactElement;

function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.9" aria-hidden {...props}>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4.5h6M9 10h6M9 14h4" strokeLinecap="round" />
      <path d="m9 14.5 1.4 1.4L13 13.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LaunchArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.9" aria-hidden {...props}>
      <path d="M12 19V5" strokeLinecap="round" />
      <path d="m7 10 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

const STAGES: Array<{ topLabel: string; bottomLabel: string; iconSrc?: string; Icon?: StageIcon }> = [
  { topLabel: "FIND", bottomLabel: "Talent", iconSrc: "/school-logos/icon_find.png" },
  { topLabel: "LAUNCH", bottomLabel: "Campaign", Icon: LaunchArrowIcon },
  { topLabel: "MANAGE", bottomLabel: "Deliverables", Icon: ClipboardIcon },
  { topLabel: "OPTIMIZE", bottomLabel: "Content", iconSrc: "/school-logos/icon_optimize.png" },
  { topLabel: "REPORT", bottomLabel: "Results", iconSrc: "/school-logos/icon_report.png" },
  { topLabel: "BENCHMARK", bottomLabel: "Performance", iconSrc: "/school-logos/icon_benchmark.png" },
];

function LifecycleNode({ topLabel, bottomLabel, iconSrc, Icon }: { topLabel: string; bottomLabel: string; iconSrc?: string; Icon?: StageIcon }) {
  return (
    <div className="rounded-2xl border border-[#C8FF00]/40 bg-white/[0.04] backdrop-blur-md flex flex-col items-center justify-center gap-3 shadow-[0_0_24px_rgba(200,255,0,0.1)] hover:shadow-[0_0_40px_rgba(200,255,0,0.22)] hover:border-[#C8FF00]/75 transition-all duration-300 w-full h-[130px] md:w-[145px] md:h-[140px] px-4 py-6">
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        {iconSrc ? (
          <span className="rounded-xl bg-[#C8FF00]/10 p-2.5">
            <Image src={iconSrc} alt="" aria-hidden width={20} height={20} className="h-7 w-7 object-contain brightness-[2] saturate-[3]" />
          </span>
        ) : (
          Icon && (
            <span className="rounded-xl bg-[#C8FF00]/10 p-2.5">
              <Icon className="h-7 w-7 object-contain text-[#C8FF00]" />
            </span>
          )
        )}
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
            <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} iconSrc={stage.iconSrc} Icon={stage.Icon} />
            {index < STAGES.length - 1 && <StageArrow />}
          </li>
        ))}
      </ol>

      <div className="md:hidden" aria-label="FIND to BENCHMARK lifecycle flow">
        <ol className="flex items-center justify-center gap-2 w-full">
          {firstRow.map((stage, index) => (
            <li key={stage.topLabel} className="flex items-center gap-1.5 flex-1 min-w-0">
              <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} iconSrc={stage.iconSrc} Icon={stage.Icon} />
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
              <LifecycleNode topLabel={stage.topLabel} bottomLabel={stage.bottomLabel} iconSrc={stage.iconSrc} Icon={stage.Icon} />
              {index < secondRow.length - 1 && <StageArrow />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
