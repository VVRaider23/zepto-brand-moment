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

  return (
    <div
      ref={ref}
      className="rounded-card bg-zepto-purple-mid px-[14px] py-[18px]"
    >
      <div className="mb-1 text-[10px] tracking-[2px] text-text-light uppercase">
        catch it at peak
      </div>

      <div className="mx-auto mb-3 h-[150px] w-[110px]">
        <MagnumSVG meltLevel={meltLevel} />
      </div>

      <div className="text-[52px] font-medium leading-none text-zepto-magenta">
        {freezePercent}%
      </div>
      <div className="mt-1 text-[11px] text-text-light">frozen at peak</div>

      <div className="my-3 border-t border-[#422680]" />

      <div className="flex justify-around text-[11px] text-text-light">
        <div>
          <div className="text-[17px] font-medium text-white">
            {tier.discount}
          </div>
          <div>discount</div>
        </div>
        <div>
          <div className="text-[17px] font-medium text-white">
            {onTargetPercent}%
          </div>
          <div>on target</div>
        </div>
        <div>
          <div className="text-[17px] font-medium text-white">{tier.rank}</div>
          <div>mumbai</div>
        </div>
      </div>

      <div className="mt-3 text-[13px] italic text-zepto-magenta">
        {tier.tagline}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] tracking-[1.5px] text-text-muted uppercase">
        <span>zepto in 10</span>
      </div>
    </div>
  );
});
