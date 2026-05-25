"use client";

type Props = { onPlaceOrder: () => void };

/*
 * Voice mirrors real Zepto cart screens:
 *  - Title Case product names ("Magnum Almond Single")
 *  - Sentence case section labels ("Your cart")
 *  - "Delivering in 10 mins" pattern (not "delivery in 10 min")
 *  - Green "Yay! You'll save" banner mirrors their checkout confirmation
 *  - Bold magenta full-width CTA at the foot
 */

export function OrderScreen({ onPlaceOrder }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-1.5 text-[12px] font-medium uppercase tracking-[1.5px] text-text-light">
        Your cart
      </div>

      <div className="mb-3 flex items-center gap-3 rounded-row border border-white/5 bg-zepto-purple-mid/80 p-[14px] backdrop-blur">
        {/* product tile uses Zepto orange to mirror their app icon "z" color */}
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-zepto-orange text-2xl shadow-lg shadow-zepto-orange/30">
          {"\u{1F366}"}
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold leading-tight">
            Magnum Almond
          </div>
          <div className="text-[11px] text-text-light">Single bar · 90 g</div>
        </div>
        <div className="text-[15px] font-bold">{"\u20B9"}120</div>
      </div>

      <div className="mb-2 flex items-center justify-between rounded-row border border-white/5 bg-zepto-purple-mid/80 p-[14px] text-[13px] backdrop-blur">
        <div className="text-text-light">Delivering in</div>
        <div className="text-[18px] font-bold text-accent-yellow leading-none">
          10 mins
        </div>
      </div>

      {/* green "Yay! you saved" strip — mirrors checkout savings banner */}
      <div className="mb-4 flex items-center justify-center gap-1.5 rounded-row border border-accent-green/30 bg-accent-green/10 px-3 py-2 text-[12px] text-accent-green">
        <span className="font-semibold">Yay!</span>
        <span>save up to 50% if you catch it at peak</span>
      </div>

      <div className="mt-auto">
        <button
          onClick={onPlaceOrder}
          className="w-full cursor-pointer rounded-row bg-zepto-magenta px-4 py-[15px] text-[15px] font-bold text-white shadow-lg shadow-zepto-magenta/30 transition-transform active:scale-[0.98]"
        >
          Place Order · {"\u20B9"}120
        </button>

        <div className="mt-3.5 text-center text-[11px] text-text-muted">
          ↓ tap to start
        </div>
      </div>
    </div>
  );
}
