"use client";

import { useEffect, useRef } from "react";
import { COLOR, GAME } from "@/lib/constants";

type Props = {
  onComplete: (freezePercent: number, onTargetPercent: number) => void;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  onTarget: boolean;
};

export function GameScreen({ onComplete }: Props) {
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const coldSpotRef = useRef<SVGCircleElement | null>(null);
  const coldSpotRingRef = useRef<SVGCircleElement | null>(null);
  const cursorGroupRef = useRef<SVGGElement | null>(null);
  const cursorZRef = useRef<SVGTextElement | null>(null);
  const cursorGlowRef = useRef<SVGCircleElement | null>(null);
  const particleLayerRef = useRef<SVGGElement | null>(null);
  const bgMagnumBodyRef = useRef<SVGRectElement | null>(null);

  const meterFillRef = useRef<HTMLDivElement | null>(null);
  const meterTextRef = useRef<HTMLSpanElement | null>(null);
  const statusTextRef = useRef<HTMLSpanElement | null>(null);
  const timeLeftRef = useRef<HTMLSpanElement | null>(null);

  // refs holding the doneness flag so listeners and rAF callbacks can be cancelled cleanly
  const completedRef = useRef(false);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    // frame-mutable state lives in closures, not React state
    let startTime = 0;
    let rafId = 0;
    let currentPct = 100;
    const coldPos = { x: 170, y: 190 };
    const nextTarget = { x: 170, y: 190 };
    let lastTargetTime = 0;
    const finger = { x: -100, y: -100, active: false };
    let onTargetFrames = 0;
    let totalFrames = 0;
    let particles: Particle[] = [];
    let cursorSize = GAME.CURSOR_BASE_SIZE;
    let cursorTargetSize = GAME.CURSOR_BASE_SIZE;
    let particleId = 0;

    function pickNextTarget() {
      const margin = GAME.COLD_RADIUS + 10;
      nextTarget.x = margin + Math.random() * (GAME.VIEW_W - 2 * margin);
      nextTarget.y = margin + Math.random() * (GAME.VIEW_H - 2 * margin);
      lastTargetTime = performance.now();
    }

    function spawnParticle(x: number, y: number, onTarget: boolean) {
      particles.push({
        id: particleId++,
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.3 + Math.random() * 0.6,
        life: 1.0,
        size: 2 + Math.random() * 2,
        onTarget,
      });
      if (particles.length > GAME.PARTICLE_MAX) particles.shift();
    }

    function renderParticles() {
      let html = "";
      for (const p of particles) {
        const color = p.onTarget ? COLOR.FROST : COLOR.ORANGE;
        html +=
          '<circle cx="' +
          p.x.toFixed(1) +
          '" cy="' +
          p.y.toFixed(1) +
          '" r="' +
          (p.size * p.life).toFixed(1) +
          '" fill="' +
          color +
          '" opacity="' +
          (p.life * 0.7).toFixed(2) +
          '"/>';
      }
      if (particleLayerRef.current) {
        particleLayerRef.current.innerHTML = html;
      }
    }

    function updateParticles() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
      }
      particles = particles.filter((p) => p.life > 0);
    }

    function getSvgPoint(clientX: number, clientY: number) {
      const rect = wrap!.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * GAME.VIEW_W,
        y: ((clientY - rect.top) / rect.height) * GAME.VIEW_H,
      };
    }

    function readEventPoint(e: PointerEvent | TouchEvent | MouseEvent) {
      if ("touches" in e && e.touches[0]) {
        return { cx: e.touches[0].clientX, cy: e.touches[0].clientY };
      }
      const m = e as MouseEvent | PointerEvent;
      return { cx: m.clientX, cy: m.clientY };
    }

    function handlePointerMove(e: PointerEvent | TouchEvent | MouseEvent) {
      if (!startTime) return;
      const { cx, cy } = readEventPoint(e);
      const p = getSvgPoint(cx, cy);
      finger.x = p.x;
      finger.y = p.y;
      finger.active = true;
    }

    function handlePointerDown(e: PointerEvent | TouchEvent | MouseEvent) {
      e.preventDefault();
      handlePointerMove(e);
    }

    function handlePointerEnd() {
      finger.active = false;
    }

    function updateCursor() {
      const grp = cursorGroupRef.current;
      const z = cursorZRef.current;
      const glow = cursorGlowRef.current;
      if (!grp || !z || !glow) return;
      if (!finger.active) {
        grp.setAttribute("transform", "translate(-100,-100)");
        return;
      }
      cursorSize += (cursorTargetSize - cursorSize) * 0.18;
      z.setAttribute("font-size", cursorSize.toFixed(1));
      glow.setAttribute("r", (cursorSize * 0.85).toFixed(1));
      grp.setAttribute(
        "transform",
        "translate(" +
          finger.x.toFixed(1) +
          "," +
          finger.y.toFixed(1) +
          ")"
      );
    }

    function tick() {
      const now = performance.now();
      const elapsed = now - startTime;
      const t = elapsed / GAME.DURATION_MS;

      const baseInterval = GAME.TARGET_INTERVAL_START_MS;
      const targetInterval = Math.max(
        GAME.TARGET_INTERVAL_END_MS,
        baseInterval - t * (baseInterval - GAME.TARGET_INTERVAL_END_MS)
      );
      if (now - lastTargetTime > targetInterval) pickNextTarget();

      const easeSpeed = GAME.EASE_SPEED_BASE + t * GAME.EASE_SPEED_RAMP;
      coldPos.x += (nextTarget.x - coldPos.x) * easeSpeed;
      coldPos.y += (nextTarget.y - coldPos.y) * easeSpeed;
      coldSpotRef.current?.setAttribute("cx", coldPos.x.toString());
      coldSpotRef.current?.setAttribute("cy", coldPos.y.toString());
      coldSpotRingRef.current?.setAttribute("cx", coldPos.x.toString());
      coldSpotRingRef.current?.setAttribute("cy", coldPos.y.toString());

      const dx = finger.x - coldPos.x;
      const dy = finger.y - coldPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const onTarget = finger.active && dist < GAME.COLD_RADIUS;

      totalFrames++;
      if (onTarget) {
        onTargetFrames++;
        currentPct = Math.min(100, currentPct + GAME.ON_TARGET_FREEZE_GAIN);
        cursorZRef.current?.setAttribute("fill", COLOR.FROST);
        cursorGlowRef.current?.setAttribute("fill", COLOR.FROST);
        cursorTargetSize = GAME.CURSOR_BASE_SIZE * GAME.CURSOR_SHRINK_ON_TARGET;
        if (statusTextRef.current) {
          statusTextRef.current.textContent = "on target";
          statusTextRef.current.style.color = COLOR.FROST;
        }
      } else {
        const meltRate =
          GAME.OFF_TARGET_MELT_BASE +
          Math.min(GAME.OFF_TARGET_MELT_RAMP, t * GAME.OFF_TARGET_MELT_RAMP);
        currentPct = Math.max(0, currentPct - meltRate);
        cursorZRef.current?.setAttribute("fill", COLOR.ORANGE);
        cursorGlowRef.current?.setAttribute("fill", COLOR.ORANGE);
        cursorTargetSize =
          GAME.CURSOR_BASE_SIZE *
          (finger.active ? GAME.CURSOR_GROW_OFF_TARGET : 1.0);
        if (statusTextRef.current) {
          statusTextRef.current.textContent = finger.active
            ? "off target"
            : "no touch";
          statusTextRef.current.style.color = COLOR.DANGER;
        }
      }

      if (finger.active && Math.random() < GAME.PARTICLE_SPAWN_PROB) {
        spawnParticle(finger.x, finger.y, onTarget);
      }
      updateParticles();
      renderParticles();
      updateCursor();

      if (meterFillRef.current) {
        meterFillRef.current.style.width = currentPct + "%";
        meterFillRef.current.style.background =
          currentPct > 60
            ? COLOR.MAGENTA
            : currentPct > 30
              ? COLOR.AMBER
              : COLOR.RED;
      }
      if (meterTextRef.current) {
        meterTextRef.current.textContent = Math.round(currentPct) + "% frozen";
      }

      // background Magnum melt in real-time (crude rect — Day 4 swaps in parametric SVG)
      const body = bgMagnumBodyRef.current;
      if (body) {
        const height = (180 * currentPct) / 100;
        const y = 125 + (180 - height);
        body.setAttribute("height", height.toString());
        body.setAttribute("y", y.toString());
      }

      if (timeLeftRef.current) {
        timeLeftRef.current.textContent =
          Math.max(0, (GAME.DURATION_MS - elapsed) / 1000).toFixed(1) + "s";
      }

      if (elapsed < GAME.DURATION_MS) {
        rafId = requestAnimationFrame(tick);
      } else {
        finishGame();
      }
    }

    function finishGame() {
      if (completedRef.current) return;
      completedRef.current = true;
      cancelAnimationFrame(rafId);
      const saved = Math.round(currentPct);
      const onTimePct =
        totalFrames > 0 ? Math.round((onTargetFrames / totalFrames) * 100) : 0;
      onComplete(saved, onTimePct);
    }

    // attach listeners imperatively with passive:false where needed
    wrap.addEventListener("mousemove", handlePointerMove as EventListener);
    wrap.addEventListener("mousedown", handlePointerDown as EventListener);
    wrap.addEventListener("mouseup", handlePointerEnd);
    wrap.addEventListener("mouseleave", handlePointerEnd);
    wrap.addEventListener("touchmove", handlePointerMove as EventListener, {
      passive: false,
    });
    wrap.addEventListener("touchstart", handlePointerDown as EventListener, {
      passive: false,
    });
    wrap.addEventListener("touchend", handlePointerEnd);

    const startDelay = setTimeout(() => {
      startTime = performance.now();
      pickNextTarget();
      rafId = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mousemove", handlePointerMove as EventListener);
      wrap.removeEventListener("mousedown", handlePointerDown as EventListener);
      wrap.removeEventListener("mouseup", handlePointerEnd);
      wrap.removeEventListener("mouseleave", handlePointerEnd);
      wrap.removeEventListener(
        "touchmove",
        handlePointerMove as EventListener
      );
      wrap.removeEventListener(
        "touchstart",
        handlePointerDown as EventListener
      );
      wrap.removeEventListener("touchend", handlePointerEnd);
    };
  }, [onComplete]);

  return (
    <div className="text-center">
      <div className="mb-2 flex items-center justify-between text-[11px] text-text-light">
        <span>catch it at peak</span>
        <span ref={timeLeftRef}>10.0s</span>
      </div>
      <div className="mb-2.5 text-sm font-medium">
        keep the frost on the cold spot
      </div>

      <div className="relative mb-1 h-2 overflow-hidden rounded-[4px] bg-zepto-purple-mid">
        <div
          ref={meterFillRef}
          className="absolute inset-y-0 left-0 h-full w-full bg-zepto-magenta"
        />
      </div>
      <div className="mb-2 flex justify-between text-[11px] text-text-muted">
        <span>melting</span>
        <span ref={meterTextRef}>100% frozen</span>
        <span ref={statusTextRef}>on target</span>
      </div>

      <div
        ref={canvasWrapRef}
        className="relative h-[380px] w-full select-none overflow-hidden rounded-[14px] bg-zepto-purple-deep"
        style={{
          touchAction: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      >
        <svg
          viewBox={`0 0 ${GAME.VIEW_W} ${GAME.VIEW_H}`}
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="coldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={COLOR.FROST_LIGHT} stopOpacity="0.9" />
              <stop offset="60%" stopColor={COLOR.FROST} stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
            </radialGradient>
            <filter id="frostGlow">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* faded crude background Magnum — Day 4 swaps in parametric SVG */}
          <g opacity={0.22}>
            <rect x={155} y={80} width={14} height={50} fill="#d4a574" rx={2} />
            <rect
              ref={bgMagnumBodyRef}
              x={135}
              y={125}
              width={55}
              height={180}
              fill="#3a1f0a"
              rx={6}
            />
          </g>

          <g ref={particleLayerRef} />

          <circle
            ref={coldSpotRef}
            cx={170}
            cy={190}
            r={GAME.COLD_RADIUS}
            fill="url(#coldGrad)"
          />
          <circle
            ref={coldSpotRingRef}
            cx={170}
            cy={190}
            r={GAME.COLD_RADIUS}
            fill="none"
            stroke={COLOR.FROST_LIGHT}
            strokeWidth={1.5}
            opacity={0.8}
            strokeDasharray="3 3"
          />

          <g ref={cursorGroupRef} transform="translate(-100,-100)">
            <circle
              ref={cursorGlowRef}
              r={22}
              fill={COLOR.ORANGE}
              opacity={0.22}
            />
            <text
              ref={cursorZRef}
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="system-ui,-apple-system,sans-serif"
              fontWeight={800}
              fontSize={GAME.CURSOR_BASE_SIZE}
              fill={COLOR.ORANGE}
              filter="url(#frostGlow)"
            >
              Z
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-text-muted">
        drag the frosty Z to follow the cold spot
      </div>
    </div>
  );
}
