/*
 * Mirrors the visual treatment of Zepto's "INTRODUCING SPECIAL DEALS" promo
 * overlay (see Screenshots/Screenshot 2026-05-25 at 8.40.50 PM.png):
 *
 *   - deep purple base
 *   - three soft radial glows in the corners (purple-magenta-blue)
 *   - faint scattered "cosmic" dots across the field
 *
 * Rendered once behind PhoneFrame children. Pointer-events: none so it never
 * blocks game touches. All decorative — purely visual atmosphere.
 */

const DOTS: Array<{ x: number; y: number; r: number; o: number }> = [
  { x: 14, y: 8, r: 1.2, o: 0.55 },
  { x: 78, y: 6, r: 0.9, o: 0.4 },
  { x: 32, y: 14, r: 1.6, o: 0.7 },
  { x: 64, y: 18, r: 1, o: 0.45 },
  { x: 88, y: 26, r: 1.3, o: 0.5 },
  { x: 8, y: 36, r: 1.1, o: 0.55 },
  { x: 22, y: 48, r: 0.8, o: 0.35 },
  { x: 92, y: 58, r: 1.4, o: 0.6 },
  { x: 12, y: 72, r: 1, o: 0.45 },
  { x: 46, y: 82, r: 1.2, o: 0.5 },
  { x: 72, y: 78, r: 0.9, o: 0.4 },
  { x: 30, y: 92, r: 1.3, o: 0.55 },
  { x: 82, y: 94, r: 1.1, o: 0.45 },
  { x: 56, y: 30, r: 0.7, o: 0.3 },
  { x: 18, y: 60, r: 0.9, o: 0.4 },
];

export function BrandBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* base gradient — deep purple top, slightly redder bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #4a2189 0%, #2d1454 45%, #1e0b3e 100%)",
        }}
      />

      {/* corner glows */}
      <div
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
        style={{ background: "#ec4080" }}
      />
      <div
        className="absolute -right-20 top-32 h-64 w-64 rounded-full opacity-35 blur-3xl"
        style={{ background: "#7dd3fc" }}
      />
      <div
        className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "#8b5cf6" }}
      />

      {/* cosmic dots */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r * 0.4}
            fill="#ffffff"
            opacity={d.o}
          />
        ))}
      </svg>
    </div>
  );
}
