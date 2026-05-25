import html2canvas from "html2canvas-pro";

const SHARE_TEXT =
  "i caught it at peak on zepto — save your magnum in 10 seconds";

export async function captureCard(cardEl: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(cardEl, {
    scale: 2,
    backgroundColor: "#1a0033",
    useCORS: true,
    logging: false,
  });
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob returned null"))),
      "image/png"
    )
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function saveImage(cardEl: HTMLElement) {
  const blob = await captureCard(cardEl);
  downloadBlob(blob, "catch-it-at-peak.png");
}

export async function shareNative(
  cardEl: HTMLElement
): Promise<"shared" | "downloaded" | "cancelled"> {
  const blob = await captureCard(cardEl);
  const file = new File([blob], "catch-it-at-peak.png", { type: "image/png" });

  if (
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({
        files: [file],
        title: "i caught it at peak",
        text: SHARE_TEXT,
      });
      return "shared";
    } catch (err) {
      const e = err as DOMException;
      if (e?.name === "AbortError") return "cancelled";
    }
  }

  downloadBlob(blob, "catch-it-at-peak.png");
  return "downloaded";
}

export async function shareWhatsApp(cardEl: HTMLElement) {
  // WhatsApp web share intent carries only text + url, not a file attachment.
  // Workaround: download the PNG first so the user has it ready, then deep-link
  // into WhatsApp with our promo text. The user attaches the saved PNG manually.
  await saveImage(cardEl);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(`${SHARE_TEXT} → ${url}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
}

export async function shareInstagram(cardEl: HTMLElement) {
  // Instagram has no public web share endpoint. Best we can do: save the image
  // and prompt the user to open IG and upload to their story.
  await saveImage(cardEl);
}

export async function shareFacebook(cardEl: HTMLElement) {
  // Facebook sharer.php carries only a URL — the og:image on that URL becomes
  // the preview. Download the rendered PNG so the user has it locally too.
  await saveImage(cardEl);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const sharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(sharerUrl, "_blank", "width=600,height=600");
}

export async function copyLink() {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  }
}
