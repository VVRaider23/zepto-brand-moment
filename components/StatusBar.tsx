type Props = { theme: "light" | "dark" };

export function StatusBar({ theme }: Props) {
  const color = theme === "light" ? "text-ink-soft" : "text-text-light";
  return (
    <div
      className={`mb-3 flex items-center justify-between text-[11px] ${color}`}
    >
      <span>11:08 PM</span>
      <span className="flex items-center gap-1">5G 100%</span>
    </div>
  );
}
