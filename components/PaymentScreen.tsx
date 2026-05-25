"use client";

import { useEffect, useRef, useState } from "react";
import { StatusBar } from "@/components/StatusBar";

type Props = { onComplete: () => void };

/*
 * Light-theme success screen, fires after "Pay Now". Auto-advances in ~2 s.
 *
 * Visual reference: Screenshot 2026-05-25 at 8.49.00 PM.png ("Payment Processing.."
 * with the green bag icon). We replace the spinner with a check-draw and the
 * processing copy with success copy, then transition into the brand moment.
 */

export function PaymentScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const tickRef = useRef<number | null>(null);
  const advanceRef = useRef<number | null>(null);

  useEffect(() => {
    tickRef.current = window.setTimeout(() => setPhase("done"), 600);
    advanceRef.current = window.setTimeout(onComplete, 2200);
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
      if (advanceRef.current) clearTimeout(advanceRef.current);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-1 flex-col bg-surface-cream px-4 py-5 text-ink">
      <StatusBar theme="light" />

      <div className="flex flex-1 flex-col items-center justify-center">
        {/* success disc — green ring, white check inside */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-accent-green/15"
            style={{
              transform: phase === "done" ? "scale(1)" : "scale(0.7)",
              opacity: phase === "done" ? 1 : 0,
              transition: "all 0.45s cubic-bezier(.2,.9,.3,1.2)",
            }}
          />
          <div
            className="absolute inset-2 flex items-center justify-center rounded-full bg-accent-green shadow-lg shadow-accent-green/30"
            style={{
              transform: phase === "done" ? "scale(1)" : "scale(0.5)",
              opacity: phase === "done" ? 1 : 0,
              transition: "all 0.5s cubic-bezier(.2,.9,.3,1.2) 80ms",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M12 23l7 7 14-16"
                strokeDasharray="40"
                strokeDashoffset={phase === "done" ? 0 : 40}
                style={{ transition: "stroke-dashoffset 0.5s ease 220ms" }}
              />
            </svg>
          </div>
          {/* tiny zepto Z above the disc */}
          <div
            className="absolute -top-2 right-0 flex h-7 w-7 items-center justify-center rounded-md bg-zepto-purple text-[14px] font-extrabold text-zepto-orange shadow-md"
            style={{
              opacity: phase === "done" ? 1 : 0,
              transform: phase === "done" ? "translateY(0)" : "translateY(6px)",
              transition: "all 0.4s ease 380ms",
            }}
          >
            z
          </div>
        </div>

        <div
          className="text-[26px] font-bold leading-tight text-ink"
          style={{
            opacity: phase === "done" ? 1 : 0.4,
            transition: "opacity 0.4s ease 280ms",
          }}
        >
          Payment Successful
        </div>
        <div
          className="mt-1 text-[13px] text-ink-soft"
          style={{
            opacity: phase === "done" ? 1 : 0,
            transition: "opacity 0.4s ease 380ms",
          }}
        >
          {"\u20B9"}120 paid via UPI
        </div>

        {/* order summary row */}
        <div
          className="mt-6 w-full rounded-card border border-black/5 bg-white p-4 shadow-sm"
          style={{
            opacity: phase === "done" ? 1 : 0,
            transform: phase === "done" ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.45s ease 500ms",
          }}
        >
          <div className="mb-2 flex items-center gap-2 text-[13px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 7v5l3 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-ink-soft">Delivering in</span>
            <span className="ml-auto text-[15px] font-bold text-ink">
              10 mins
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-cream-soft text-xl">
              {"\u{1F366}"}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-ink leading-tight">
                Magnum Almond
              </div>
              <div className="text-[11px] text-ink-soft">1 bar (90 g)</div>
            </div>
            <div className="text-[14px] font-bold text-ink">
              {"\u20B9"}120
            </div>
          </div>
        </div>

        {/* teaser line that the brand moment is about to fire */}
        <div
          className="mt-6 text-center text-[12px] uppercase tracking-[2px] text-zepto-magenta"
          style={{
            opacity: phase === "done" ? 1 : 0,
            transition: "opacity 0.4s ease 800ms",
          }}
        >
          {"\u2014"} saving your magnum {"\u2014"}
        </div>
      </div>
    </div>
  );
}
