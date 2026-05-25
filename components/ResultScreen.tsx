"use client";

import { useRef, useState } from "react";
import { ResultCard } from "@/components/ResultCard";
import { ShareSheet } from "@/components/ShareSheet";
import { BrandBackground } from "@/components/BrandBackground";
import { StatusBar } from "@/components/StatusBar";
import {
  copyLink,
  saveImage,
  shareFacebook,
  shareInstagram,
  shareWhatsApp,
} from "@/lib/share";

type Props = {
  freezePercent: number;
  onTargetPercent: number;
  onRetry: () => void;
};

type Platform = "whatsapp" | "instagram" | "facebook" | "save" | "copy";

export function ResultScreen({
  freezePercent,
  onTargetPercent,
  onRetry,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [busy, setBusy] = useState<Platform | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function handlePick(p: Platform) {
    if (!cardRef.current) return;
    setBusy(p);
    setToast(null);
    try {
      switch (p) {
        case "whatsapp":
          await shareWhatsApp(cardRef.current);
          setToast("image saved · WhatsApp opened");
          break;
        case "instagram":
          await shareInstagram(cardRef.current);
          setToast("image saved · open Instagram and upload to your story");
          break;
        case "facebook":
          await shareFacebook(cardRef.current);
          setToast("image saved · Facebook share opened");
          break;
        case "save":
          await saveImage(cardRef.current);
          setToast("image saved to your device");
          break;
        case "copy":
          await copyLink();
          setToast("link copied to clipboard");
          break;
      }
    } catch (err) {
      console.error("share failed", err);
      setToast("something broke. try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col text-text-primary">
      <BrandBackground />
      <div className="relative z-10 flex flex-1 flex-col px-4 py-5 text-center">
        <StatusBar theme="dark" />

        <div className="mb-1 text-[11px] font-bold uppercase tracking-[2px] text-text-light">
          your save
        </div>

        <div className="my-3 text-center">
          <ResultCard
            ref={cardRef}
            freezePercent={freezePercent}
            onTargetPercent={onTargetPercent}
          />
        </div>

        <div className="mt-auto">
          <button
            onClick={() => setSheetOpen(true)}
            className="mb-2 w-full cursor-pointer rounded-row bg-zepto-magenta px-4 py-[14px] text-[15px] font-bold text-white shadow-lg shadow-zepto-magenta/30 transition-transform active:scale-[0.98]"
          >
            Share my save
          </button>
          <button
            onClick={onRetry}
            className="w-full cursor-pointer rounded-row border border-zepto-magenta px-4 py-[12px] text-[13px] font-semibold text-zepto-magenta"
          >
            Try again
          </button>
        </div>
      </div>

      <ShareSheet
        open={sheetOpen}
        busyPlatform={busy}
        toast={toast}
        onPick={handlePick}
        onClose={() => {
          setSheetOpen(false);
          setToast(null);
        }}
      />
    </div>
  );
}
