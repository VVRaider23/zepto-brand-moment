export const GAME = {
  VIEW_W: 340,
  VIEW_H: 380,
  DURATION_MS: 10_000,
  COLD_RADIUS: 34,
  CURSOR_BASE_SIZE: 28,
  ON_TARGET_FREEZE_GAIN: 0.2,
  OFF_TARGET_MELT_BASE: 0.18,
  OFF_TARGET_MELT_RAMP: 0.62,
  TARGET_INTERVAL_START_MS: 1700,
  TARGET_INTERVAL_END_MS: 450,
  EASE_SPEED_BASE: 0.026,
  EASE_SPEED_RAMP: 0.038,
  CURSOR_SHRINK_ON_TARGET: 0.88,
  CURSOR_GROW_OFF_TARGET: 1.18,
  PARTICLE_SPAWN_PROB: 0.85,
  PARTICLE_MAX: 60,
} as const;

// Mirrors --color-* tokens in globals.css. Used by GameScreen for direct
// SVG attribute mutation in the rAF loop (where Tailwind classes can't reach).
export const COLOR = {
  MAGENTA: "#ec4080",
  ORANGE: "#f26057",
  FROST: "#7dd3fc",
  FROST_LIGHT: "#bae6fd",
  PURPLE_DEEP: "#1e0b3e",
  PURPLE_MID: "#2d1454",
  YELLOW: "#ffd60a",
  GREEN: "#22c55e",
  AMBER: "#f59e0b",
  RED: "#dc2626",
  DANGER: "#f87171",
} as const;
