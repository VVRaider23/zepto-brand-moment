import { forwardRef } from "react";
import { MagnumSVG } from "@/components/MagnumSVG";
import { computeResult } from "@/lib/tier";

type Props = {
  freezePercent: number;
  onTargetPercent: number;
};

export const ResultCard = forwardRef<HTMLDivElement, Props>(function ResultCard(
  { freezePercent, onTargetPercent },
  ref
) {
  const tier = computeResult(freezePercent);
  const meltLevel = Math.max(0, Math.min(1, 1 - freezePercent / 100));
  const isLegendary = freezePercent >= 85;
  const noDiscount = freezePercent < 5;

  return (
    <div
      ref={ref}
      className="rounded-card bg-zepto-purple-mid px-[14px] py-[18px]"
    >
      <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] tracking-[2px] uppercase">
        <span className="text-zepto-orange font-extrabold">z</span>
        <span className="text-text-light">catch it at peak</span>
      </div>

      <div className="mx-auto mb-3 h-[150px] w-[110px]">
        <MagnumSVG meltLevel={meltLevel} />
      </div>

      {/* hero number — bold geometric, brief-style weight. yellow on legendary saves. */}
      <div
        className={`text-[64px] font-bold leading-none tracking-tight ${
          isLegendary ? "text-accent-yellow" : "text-zepto-magenta"
        }`}
      >
        {freezePercent}%
      </div>
      <div className="mt-1 text-[11px] text-text-light">
        frozen at <span className="text-accent-yellow font-bold">peak</span>
      </div>

      <div className="my-3 border-t border-[#422680]" />

      <div className="flex justify-around text-[11px] text-text-light">
        <div>
          <div
            className={`text-[18px] font-bold ${
              noDiscount ? "text-text-muted" : "text-accent-green"
            }`}
          >
            {tier.discount}
          </div>
          <div>discount</div>
        </div>
        <div>
          <div className="text-[18px] font-bold text-white">
            {onTargetPercent}%
          </div>
          <div>on target</div>
        </div>
        <div>
          <div className="text-[18px] font-bold text-white">{tier.rank}</div>
          <div>mumbai</div>
        </div>
      </div>

      <div className="mt-3 text-[13px] italic text-zepto-magenta">
        {tier.tagline}
      </div>

      {/* echoes the brief's one-line provocation, brief-style color treatment */}
      <div className="mt-4 border-t border-[#422680] pt-3 text-[11px] leading-tight text-text-light">
        the brand you scream{" "}
        <span className="text-accent-yellow font-bold">for</span>.
        <br />
        not the brand you scream{" "}
        <span className="text-text-muted font-bold">into</span>.
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] tracking-[1.5px] uppercase">
        <span className="text-zepto-orange font-extrabold">z</span>
        <span className="text-text-muted">zepto in 10</span>
      </div>
    </div>
  );
});
