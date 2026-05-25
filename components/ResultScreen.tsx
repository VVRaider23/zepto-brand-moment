"use client";

import { useRef, useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import { shareCard } from "@/lib/share";

type Props = {
  freezePercent: number;
  onTargetPercent: number;
  onRetry: () => void;
};

export function ResultScreen({
  freezePercent,
  onTargetPercent,
  onRetry,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "capturing" | "done" | "error"
  >("idle");

  async function handleShare() {
    if (!cardRef.current) return;
    setShareStatus("capturing");
    try {
      const result = await shareCard(cardRef.current);
      setShareStatus(result === "cancelled" ? "idle" : "done");
    } catch (err) {
      console.error("share failed", err);
      setShareStatus("error");
    }
  }

  const buttonLabel =
    shareStatus === "capturing"
      ? "capturing…"
      : shareStatus === "done"
        ? "shared ✓"
        : shareStatus === "error"
          ? "try again"
          : "share my save";

  return (
    <div className="text-center">
      <div className="mb-1 text-[11px] tracking-[1px] text-text-light">
        your save
      </div>

      <div className="my-3 text-center">
        <ResultCard
          ref={cardRef}
          freezePercent={freezePercent}
          onTargetPercent={onTargetPercent}
        />
      </div>

      <button
        onClick={handleShare}
        disabled={shareStatus === "capturing"}
        className="mb-2 w-full cursor-pointer rounded-row bg-zepto-magenta px-4 py-[13px] text-sm font-medium text-white transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {buttonLabel}
      </button>
      <button
        onClick={onRetry}
        className="w-full cursor-pointer rounded-row border border-zepto-magenta px-4 py-[11px] text-[13px] text-zepto-magenta"
      >
        try again
      </button>
    </div>
  );
}
