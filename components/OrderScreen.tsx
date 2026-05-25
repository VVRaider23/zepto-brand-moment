"use client";

import { StatusBar } from "@/components/StatusBar";

type Props = { onPlaceOrder: () => void };

/*
 * Light-theme cart — direct port of the real Zepto checkout aesthetic.
 *
 * Source: Screenshots/Screenshot 2026-05-25 at 8.48.14 PM.png + 8.48.22 PM.png
 *   - cream background
 *   - product card with image tile, Title Case name, weight microcopy
 *   - green "Yay! You saved" banner with chevron
 *   - magenta full-width "Click to Pay" CTA pinned to footer
 *   - "Delivering in N mins" pattern
 */

export function OrderScreen({ onPlaceOrder }: Props) {
  return (
    <div className="flex flex-1 flex-col bg-surface-cream px-4 py-5 text-ink">
      <StatusBar theme="light" />

      {/* address bar — mirrors the "Other ▾  Z 502, cosmos..." pattern */}
      <div className="mb-3 flex items-start gap-2">
        <button className="-ml-1 mt-0.5 text-ink-soft" aria-label="back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-[15px] font-semibold leading-tight">
            Home <span className="text-ink-soft">▾</span>
          </div>
          <div className="text-[11px] text-ink-soft leading-tight">
            Magarpatta — Hadapsar, Pune
          </div>
        </div>
      </div>

      {/* green "Yay!" savings banner */}
      <div className="mb-3 flex items-center justify-between rounded-[8px] bg-accent-green/15 px-3 py-2 text-[12px] text-accent-green">
        <span>
          <span className="font-bold">Yay!</span> save up to{" "}
          <span className="font-bold">50% off</span> if you catch it at peak
        </span>
        <span>▾</span>
      </div>

      {/* product card */}
      <div className="mb-3 rounded-card border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-[13px]">
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
          <span>
            Delivering in{" "}
            <span className="font-bold text-ink">10 mins</span>
          </span>
          <span className="ml-auto text-ink-soft">1 item</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-surface-cream-soft">
            <div className="flex h-full w-full items-center justify-center text-3xl">
              {"\u{1F366}"}
            </div>
            {/* magenta + qty button mirrors Zepto's product card "+" */}
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-md border border-zepto-magenta bg-white text-[15px] font-bold text-zepto-magenta shadow-sm">
              1
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold leading-tight text-ink">
              Magnum Almond
            </div>
            <div className="text-[11px] text-ink-soft">1 bar (90 g)</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[14px] font-bold text-ink">{"\u20B9"}120</span>
              <span className="text-[11px] text-ink-mute line-through">
                {"\u20B9"}140
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* bill summary */}
      <div className="mb-3 rounded-card border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-2 text-[12px] font-bold uppercase tracking-[1.5px] text-ink-soft">
          Bill Summary
        </div>
        <div className="flex justify-between text-[13px] text-ink">
          <span>Item Total</span>
          <span>
            <span className="text-ink-mute line-through">{"\u20B9"}140</span>{" "}
            <span className="font-bold">{"\u20B9"}120</span>
          </span>
        </div>
        <div className="mt-1 flex justify-between text-[13px] text-ink">
          <span>Delivery</span>
          <span className="font-semibold text-accent-green">FREE</span>
        </div>
      </div>

      {/* CTA pinned to footer */}
      <div className="mt-auto">
        <button
          onClick={onPlaceOrder}
          className="w-full cursor-pointer rounded-row bg-zepto-magenta px-4 py-[15px] text-[15px] font-bold text-white shadow-lg shadow-zepto-magenta/30 transition-transform active:scale-[0.98]"
        >
          Place Order · {"\u20B9"}120
        </button>
        <div className="mt-3 text-center text-[11px] text-ink-mute">
          ↓ tap to start the moment
        </div>
      </div>
    </div>
  );
}
