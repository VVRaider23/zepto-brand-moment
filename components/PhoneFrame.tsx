import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-zepto-purple-edge p-5">
      <div className="relative flex w-full max-w-[380px] min-h-[780px] flex-col overflow-hidden rounded-phone bg-surface-cream">
        {children}
      </div>
    </div>
  );
}
