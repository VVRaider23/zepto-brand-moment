type Props = {
  meltLevel: number;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const STICK = { x: 62, y: 6, w: 14, h: 48, fill: "#d4a574" };
const BODY = { x: 28, y: 50, w: 84, fullH: 130, minH: 60, fill: "#3a1f0a" };
const HIGHLIGHT_FILL = "#5a3215";
const ICE_FILL = "#f7e7c4";
const DRIP_FILL = "#3a1f0a";
const PUDDLE_FILL = "#6b3d1a";

const DRIP_POSITIONS = [34, 50, 66, 82, 96];

export function MagnumSVG({ meltLevel, width, height, className }: Props) {
  const m = Math.max(0, Math.min(1, meltLevel));

  const bodyH = BODY.fullH - (BODY.fullH - BODY.minH) * m;
  const bodyBottom = BODY.y + bodyH;

  // drip count + length scale with meltLevel
  const dripCount = Math.min(DRIP_POSITIONS.length, Math.floor(m * 5 + (m > 0 ? 1 : 0)));
  const drips = Array.from({ length: dripCount }, (_, i) => {
    const x = DRIP_POSITIONS[i];
    const h = 8 + (28 * m + 4 * Math.sin(i * 1.7));
    const opacity = 0.55 + 0.35 * m;
    return { x, h, opacity };
  });

  const puddleOpacity = Math.max(0, (m - 0.4) * 1.4);
  const puddleY = 195;

  return (
    <svg
      viewBox="0 0 140 210"
      width={width ?? "100%"}
      height={height ?? "100%"}
      className={className}
      aria-hidden
    >
      {/* puddle (only visible when melting significantly) */}
      {puddleOpacity > 0 && (
        <ellipse
          cx={70}
          cy={puddleY}
          rx={42}
          ry={5}
          fill={PUDDLE_FILL}
          opacity={Math.min(0.7, puddleOpacity)}
        />
      )}

      {/* stick */}
      <rect
        x={STICK.x}
        y={STICK.y}
        width={STICK.w}
        height={STICK.h}
        rx={3}
        fill={STICK.fill}
      />

      {/* ice cream core visible at the bottom when melted (a sliver below the chocolate edge) */}
      {m > 0 && (
        <rect
          x={BODY.x + 4}
          y={bodyBottom - 6}
          width={BODY.w - 8}
          height={6}
          fill={ICE_FILL}
          opacity={Math.min(1, m * 1.5)}
          rx={2}
        />
      )}

      {/* main chocolate body */}
      <rect
        x={BODY.x}
        y={BODY.y}
        width={BODY.w}
        height={bodyH}
        rx={8}
        fill={BODY.fill}
      />

      {/* sheen highlight stripe */}
      <rect
        x={BODY.x + 8}
        y={BODY.y + 8}
        width={5}
        height={Math.max(8, bodyH - 18)}
        rx={2.5}
        fill={HIGHLIGHT_FILL}
        opacity={0.85}
      />

      {/* chocolate top band where it meets the stick */}
      <rect
        x={BODY.x - 2}
        y={BODY.y - 2}
        width={BODY.w + 4}
        height={10}
        rx={6}
        fill={BODY.fill}
      />

      {/* drips */}
      {drips.map((d, i) => (
        <rect
          key={i}
          x={d.x}
          y={bodyBottom - 1}
          width={4}
          height={d.h}
          rx={2}
          fill={DRIP_FILL}
          opacity={d.opacity}
        />
      ))}

      {/* drip droplet tips */}
      {drips.map((d, i) => (
        <circle
          key={`tip-${i}`}
          cx={d.x + 2}
          cy={bodyBottom - 1 + d.h + 1}
          r={2.4}
          fill={DRIP_FILL}
          opacity={d.opacity}
        />
      ))}
    </svg>
  );
}
