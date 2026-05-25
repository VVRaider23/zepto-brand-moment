import { ReactNode } from "react";
import { BrandBackground } from "@/components/BrandBackground";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zepto-purple-edge p-5">
      <div className="relative flex w-full max-w-[380px] min-h-[780px] flex-col overflow-hidden rounded-phone text-text-primary">
        <BrandBackground />
        <div className="relative z-10 flex flex-1 flex-col px-4 py-5">
          <div className="mb-3 flex items-center justify-between text-[11px] text-text-light">
            <span>11:08 PM</span>
            <span className="flex items-center gap-1">5G 100%</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
