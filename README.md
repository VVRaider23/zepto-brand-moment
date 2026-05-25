# Catch It At Peak

A 15-second drag-to-follow micro-game that fires immediately after `place order` on Zepto. Save your Magnum from melting. The freezer % maps to your discount %. Share the result card.

A Zepto Builder Series Brief No. 01 prototype — the strategic argument lives in `Catch_It_At_Peak_Product_Document.docx`, the canonical mechanic spec in `v7-widget.html`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4
- `html2canvas-pro` for capturing the result card as a PNG
- Web Share API with download fallback for desktop
- No backend, no auth, no analytics

## Architecture

A single `/` route with a four-state machine inside `app/page.tsx`:

```
order  →  intro  →  game  →  result
```

Each screen lives in `components/` and receives a callback to advance the state.

The game loop in `components/GameScreen.tsx` is the only performance-sensitive part. It runs entirely on `requestAnimationFrame` with refs that mutate SVG attributes directly — React state is never touched per frame. Pointer events use `{ passive: false }` with `touch-action: none` on the game container so mobile drag does not scroll the page.

All tuned game constants live in `lib/constants.ts`. The discount-tier table lives in `lib/tier.ts`. Both are lifted verbatim from `v7-widget.html`.

## File map

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Root state machine |
| `components/PhoneFrame.tsx` | The deep-purple container that wraps every screen |
| `components/OrderScreen.tsx` | Mock cart + place-order CTA |
| `components/IntroScreen.tsx` | 6.7-second scripted reveal + 3-2-1-GO countdown |
| `components/GameScreen.tsx` | 15-second rAF game loop, pointer handlers, particles |
| `components/ResultScreen.tsx` | Wraps the card and exposes share / retry CTAs |
| `components/ResultCard.tsx` | The actual artifact (captured by html2canvas) |
| `components/MagnumSVG.tsx` | Parametric Magnum — `meltLevel` (0-1) drives shape + drips + puddle |
| `lib/constants.ts` | All game-loop constants (durations, radii, ramps) |
| `lib/tier.ts` | Freeze % → discount tier mapping |
| `lib/share.ts` | html2canvas-pro + Web Share API + download fallback |
| `app/globals.css` | Tailwind v4 `@theme` with Zepto brand tokens |

## 30-second walkthrough video

Record on a real iPhone in landscape:

1. (0-3s) Phone shows the Zepto-purple cart with one Magnum almond and "delivery in 10 min." Tap "place order."
2. (3-9s) Intro fires: "zepto delivers in 10 minutes / save your magnum in 15 seconds / catch the cold · don't let go" then 3-2-1-GO.
3. (9-24s) 15 seconds of dragging the frosty Z to follow the cold spot. Show on-target periods (frost-blue cursor) and off-target stumbles (magenta cursor, melt accelerating in the last 5 seconds).
4. (24-30s) Result card animates in with the achieved freeze %, the discount, the percentile, the tagline. Tap "share my save" — share sheet appears with the PNG.

## Brand tokens

Lifted from `v7-widget.html:32-38` and exposed via Tailwind v4 `@theme` in `app/globals.css`:

| Token | Hex | Role |
|-------|-----|------|
| `zepto-magenta` | `#e83a6e` | Cursor, CTAs, hero numbers |
| `zepto-purple` | `#1a0033` | Phone-frame background |
| `zepto-purple-mid` | `#2d1454` | Cart rows, result-card surface |
| `zepto-purple-deep` | `#0d001f` | Game canvas background |
| `frost` | `#7dd3fc` | On-target cursor, GO countdown |
| `frost-light` | `#bae6fd` | Cold-spot ring |

## Deploy

```bash
vercel
```

Auto-detected as Next.js. No environment variables. No vercel.json required.

## Out of scope

No auth. No payments. No real backend. No analytics. No notifications. No biscuit / Coke / chocolate variants (the platform argument lives in the strategy memo). No sound effects. No real leaderboard (rank is hardcoded per tier).
