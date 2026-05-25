import html2canvas from "html2canvas-pro";

export async function shareCard(cardEl: HTMLElement): Promise<"shared" | "downloaded" | "cancelled"> {
  const canvas = await html2canvas(cardEl, {
    scale: 2,
    backgroundColor: "#1a0033",
    useCORS: true,
    logging: false,
  });

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob returned null"))),
      "image/png"
    )
  );

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
        text: "saved my magnum on zepto",
      });
      return "shared";
    } catch (err) {
      const e = err as DOMException;
      if (e?.name === "AbortError") return "cancelled";
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return "downloaded";
}
