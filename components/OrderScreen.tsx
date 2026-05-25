"use client";

type Props = { onPlaceOrder: () => void };

export function OrderScreen({ onPlaceOrder }: Props) {
  return (
    <div>
      <div className="mb-1.5 text-[13px] text-text-light">your cart</div>

      <div className="mb-3 flex items-center gap-3 rounded-row bg-zepto-purple-mid p-[14px]">
        {/* product tile uses Zepto orange to mirror their app icon "z" color */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zepto-orange text-2xl">
          {"\u{1F366}"}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">Magnum almond</div>
          <div className="text-[11px] text-text-light">single bar · 90g</div>
        </div>
        <div className="text-sm font-medium">{"\u20B9"}120</div>
      </div>

      <div className="mb-2 flex items-center justify-between rounded-row bg-zepto-purple-mid p-[14px] text-[13px]">
        <div>delivery in</div>
        <div className="font-medium text-zepto-magenta">10 min</div>
      </div>

      {/* green savings strip — mirrors Zepto's "Yay! You saved" banner */}
      <div className="mb-4 flex items-center justify-center gap-1.5 rounded-row bg-accent-green/15 px-3 py-2 text-[11px] text-accent-green">
        <span className="font-medium">save up to 50% if you catch it at peak</span>
      </div>

      <button
        onClick={onPlaceOrder}
        className="w-full cursor-pointer rounded-row bg-zepto-magenta px-4 py-[14px] text-[15px] font-medium text-white transition-transform active:scale-[0.98]"
      >
        place order · {"\u20B9"}120
      </button>

      <div className="mt-3.5 text-center text-[11px] text-text-muted">
        ↓ tap to start
      </div>
    </div>
  );
}
