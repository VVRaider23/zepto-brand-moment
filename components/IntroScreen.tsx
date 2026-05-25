"use client";

import { useEffect, useRef } from "react";
import { COLOR } from "@/lib/constants";
import { BrandBackground } from "@/components/BrandBackground";
import { StatusBar } from "@/components/StatusBar";

type Props = { onComplete: () => void };

export function IntroScreen({ onComplete }: Props) {
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);
  const line4Ref = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const countdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lines = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      line4Ref.current,
      taglineRef.current,
    ];
    const countdown = countdownRef.current;
    if (!countdown) return;

    const timers: number[] = [];
    const schedule = (at: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, at));
    };

    schedule(150, () => lines[0] && (lines[0].style.opacity = "1"));
    schedule(500, () => lines[1] && (lines[1].style.opacity = "1"));
    schedule(1700, () => lines[2] && (lines[2].style.opacity = "1"));
    schedule(2050, () => lines[3] && (lines[3].style.opacity = "1"));
    schedule(3100, () => lines[4] && (lines[4].style.opacity = "1"));
    schedule(4100, () => {
      for (const el of lines) if (el) el.style.opacity = "0";
    });
    schedule(4400, () => {
      countdown.textContent = "3";
      countdown.style.opacity = "1";
      countdown.style.transform = "scale(1)";
    });
    schedule(5000, () => {
      countdown.textContent = "2";
      countdown.style.transform = "scale(1.1)";
    });
    schedule(5600, () => {
      countdown.textContent = "1";
      countdown.style.transform = "scale(1.2)";
    });
    schedule(6200, () => {
      countdown.textContent = "GO";
      countdown.style.transform = "scale(1.4)";
      countdown.style.color = COLOR.FROST;
    });
    schedule(6700, () => {
      countdown.style.opacity = "0";
      onComplete();
    });

    return () => {
      for (const id of timers) clearTimeout(id);
    };
  }, [onComplete]);

  return (
    <div className="relative flex flex-1 flex-col text-text-primary">
      <BrandBackground />
      <div className="relative z-10 flex flex-1 flex-col px-4 py-5 text-center">
        <StatusBar theme="dark" />
        <div className="relative pt-12">
          <div
            ref={line1Ref}
            className="mb-5 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[3px] text-text-light"
            style={{ opacity: 0, transition: "opacity 0.4s" }}
          >
            <span className="text-zepto-magenta">+</span>
            <span>zepto delivers in</span>
            <span className="text-zepto-magenta">+</span>
          </div>
          <div
            ref={line2Ref}
            className="mb-[30px] text-[56px] font-bold leading-none text-accent-yellow"
            style={{ opacity: 0, transition: "opacity 0.4s" }}
          >
            10 minutes
          </div>
          <div
            ref={line3Ref}
            className="mb-2 text-[12px] font-bold uppercase tracking-[3px] text-text-light"
            style={{ opacity: 0, transition: "opacity 0.4s" }}
          >
            save your magnum in
          </div>
          <div
            ref={line4Ref}
            className="mb-10 text-[56px] font-bold leading-none text-zepto-magenta"
            style={{ opacity: 0, transition: "opacity 0.4s" }}
          >
            10 seconds
          </div>
          <div
            ref={taglineRef}
            className="text-[15px] italic text-white"
            style={{ opacity: 0, transition: "opacity 0.4s" }}
          >
            catch the cold <span className="text-accent-yellow">·</span>{" "}
            don&rsquo;t let go
          </div>
          <div
            ref={countdownRef}
            className="absolute inset-x-0 text-[120px] font-bold text-zepto-magenta"
            style={{
              top: 200,
              opacity: 0,
              transform: "scale(1)",
              transition: "all 0.3s",
            }}
          >
            3
          </div>
        </div>
      </div>
    </div>
  );
}
