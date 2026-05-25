"use client";

import { useEffect } from "react";

type Platform = "whatsapp" | "instagram" | "facebook" | "save" | "copy";

type Props = {
  open: boolean;
  busyPlatform: Platform | null;
  toast: string | null;
  onPick: (p: Platform) => void;
  onClose: () => void;
};

const ITEMS: Array<{
  id: Platform;
  label: string;
  helper: string;
  bg: string;
  icon: React.ReactNode;
}> = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    helper: "image + text · paste in chat",
    bg: "bg-[#25D366]",
    icon: (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="white">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.755 2.722.755.345 0 2.395-.602 2.295-.602.286 0 .444.057.602.114.516.143.673 1.39.673 1.92 0 .057-.043.215-.057.273-.014.057-.043.143-.043.215v.387c0 1.476-1.318 2.708-2.808 2.708-.717 0-1.39-.115-2.063-.33-1.117-.358-2.106-.917-3.024-1.633-1.318-1.03-2.508-2.235-3.51-3.566C5.71 18.18 4.92 16.5 4.45 14.83a8.466 8.466 0 0 1-.4-2.48c0-1.06.187-2.05.6-2.98 1.115-2.49 3.625-4.07 6.348-4.07 2.265 0 4.357 1.058 5.74 2.838 1.117 1.448 1.733 3.21 1.733 5.05 0 3.452-3.024 6.062-6.346 6.062-1.39 0-2.78-.443-3.97-1.218l-2.32.625.66-2.235z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    helper: "saves image · open IG, upload to story",
    bg: "bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] to-[#D62976]",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    helper: "shares link · opens share dialog",
    bg: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
        <path d="M13.5 22v-8h2.7l.4-3.13H13.5V8.86c0-.9.25-1.52 1.55-1.52h1.65V4.55a22 22 0 0 0-2.4-.13c-2.38 0-4 1.45-4 4.13v2.3H7.6V14h2.7v8h3.2z" />
      </svg>
    ),
  },
  {
    id: "save",
    label: "Save Image",
    helper: "download the PNG to your device",
    bg: "bg-zepto-purple-deep",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
    ),
  },
  {
    id: "copy",
    label: "Copy Link",
    helper: "copy this prototype URL",
    bg: "bg-zepto-purple-mid",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
      </svg>
    ),
  },
];

export function ShareSheet({
  open,
  busyPlatform,
  toast,
  onPick,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full rounded-t-[20px] bg-zepto-purple px-4 pb-5 pt-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25" />
        <div className="mb-1 text-center text-[13px] font-bold uppercase tracking-[2px] text-text-light">
          share your save
        </div>
        <div className="mb-3 text-center text-[11px] text-text-muted">
          pick a destination
        </div>

        <div className="space-y-2">
          {ITEMS.map((it) => {
            const busy = busyPlatform === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onPick(it.id)}
                disabled={busy}
                className="flex w-full items-center gap-3 rounded-row bg-white/5 px-3 py-2.5 text-left transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${it.bg}`}
                >
                  {it.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-bold text-white">
                    {it.label}
                  </span>
                  <span className="block text-[11px] text-text-muted">
                    {busy ? "preparing…" : it.helper}
                  </span>
                </span>
                <span className="text-text-muted">›</span>
              </button>
            );
          })}
        </div>

        {toast && (
          <div className="mt-3 rounded-row border border-accent-green/30 bg-accent-green/10 px-3 py-2 text-center text-[12px] text-accent-green">
            {toast}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-row border border-white/15 px-4 py-2.5 text-[13px] text-text-light"
        >
          close
        </button>
      </div>
    </div>
  );
}
