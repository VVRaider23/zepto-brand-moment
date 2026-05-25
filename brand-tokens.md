# Zepto brand system

Pulled from the live Zepto app (Screenshots/ captured 2026-05-25) and the official Builder Series brief PDF. The brief's homework ask reads: *"Zepto's brand system: colour, type, spacing, voice, microcopy patterns. Open the live app. Pull the tokens."* — this document is that pull.

---

## 1. Colour

The Zepto palette is split across two contexts:

### App mode (the day-to-day Zepto experience)

Background is white/cream, text is near-black. Accents pop on the light surface.

| Token | Hex | Where it appears | Role |
|---|---|---|---|
| `zepto-magenta` | `#ec4080` | "Use App", "Click to Pay", "+" qty controls | Primary CTA |
| `zepto-orange` | `#f26057` | The "z" letter inside the app icon | Brand mark accent |
| `accent-green` | `#22c55e` | "Yay! You saved ₹154", "48% OFF" badges | Wins / savings |
| `accent-yellow` | `#ffd60a` | "₹9" starting-at pills, sale chips | Sale callouts |
| `text-ink` | `#1f1735` | Product names, headlines | Primary text |
| `text-secondary` | `#6b6080` | "1 pc (120 ml)", "Berry Love · 10 mins" | Secondary text |
| `surface-cream` | `#fdf9f3` | Cart background, modal background | Base surface |

### Moment mode (the promo / brand-moment overlay)

Background is deep purple with cosmic glow. White text, magenta + yellow signals. This is the visual mode our prototype lives in.

| Token | Hex | Where it appears | Role |
|---|---|---|---|
| `zepto-purple` | `#3d1c71` | App icon base, "INTRODUCING SPECIAL DEALS" overlay | Hero surface |
| `zepto-purple-mid` | `#2d1454` | Sub-cards inside the overlay | Card surface |
| `zepto-purple-deep` | `#1e0b3e` | Deepest shadow, game canvas | Container shadow |
| `zepto-purple-edge` | `#0f0420` | Outermost screen edge | Outer frame |
| `zepto-magenta` | `#ec4080` | Hero callouts, ornament `+`, primary CTA | CTA + hero word |
| `accent-yellow` | `#ffd60a` | "ten minutes" win-word in the brief, "₹9" sale pill | Hero highlight, win-word |
| `accent-green` | `#22c55e` | Savings strip on result card | Win confirmation |
| `frost` | `#7dd3fc` | (not in real Zepto — game-specific) | On-target signal |

### Why both modes matter for us

Our prototype is a *brand moment* — by definition it lives in moment mode. But the wrapping context (order screen) is the user inside their cart, so we lift textural cues from app mode (Title Case product names, "Delivering in 10 mins" pattern, green "Yay!" savings strip) and place them inside the moment-mode surface so the moment feels native to the cart they just left.

---

## 2. Type

Zepto uses a heavy geometric sans. We approximate with **Geist** (Vercel's geometric sans, self-hosted via `next/font/google`).

### Weights in use

| Weight | Where |
|---|---|
| 400 / regular | Body text, secondary labels |
| 500 / medium | Section headers, lighter buttons |
| 600 / semibold | Product names |
| 700 / bold | Stat numbers, "Delivering in 10 mins", CTAs |
| 800 / extrabold | Hero numbers, the cursor Z, brand marks |

### Size ramp

| Role | Size | Weight | Notes |
|---|---|---|---|
| Mega hero (intro "10 minutes") | 56–64px | 700 | Yellow on dark, brief-style |
| Card hero (result %) | 64px | 700 | Magenta default, yellow on legendary |
| Section CAPS ("YOUR CART", "+ INTRODUCING +") | 12px | 700 | Tracking 1.5–3px |
| Body / labels | 13–15px | 400–600 | |
| Captions ("1 pc (120 ml)") | 11px | 400 | text-light |

### Case rules (extracted from screenshots)

- **Product names**: Title Case — `Magnum Almond`, `Go Zero Raspberry Duet`
- **Section headers**: UPPER CASE with letter-spacing — `YOUR CART`, `INTRODUCING`
- **Action buttons**: Title Case — `Place Order`, `Click to Pay`, `Explore Offer`
- **Status microcopy**: Sentence case — `Delivering in 10 mins`, `Yay! You saved ₹154`
- **Casual / brand-moment overlays**: lowercase — `catch it at peak`, `frozen at peak`

---

## 3. Spacing

| Token | Px | Where |
|---|---|---|
| `radius-phone` | 24 | Phone frame outer corners |
| `radius-card` | 16 | Result card, hero modals |
| `radius-row` | 12 | Cart rows, CTAs, savings strip |
| Card padding | 14–18 | Inside `radius-row` and `radius-card` |
| Section gap | 8–12 | Between rows in the cart |
| Screen padding | 16–20 | Phone frame interior horizontal |
| Touch target min | 44 | All tap regions |

The rhythm is built on a **4-step scale**: 4 / 8 / 12 / 16 / 24 / 32 px. No arbitrary in-betweens.

---

## 4. Voice

Three modes Zepto uses, distinct purposes:

### Confirmational ("we got your back")

> "Delivering in 9 mins"
> "Yay! You saved ₹154"
> "Forgot something?"

Friendly, direct, contraction-free, ends without exclamation unless it's a celebration. Our `Place Order` confirmation strip uses this tone.

### Promotional ("look at this")

> "+ INTRODUCING +"
> "SPECIAL DEALS"
> "STARTING AT ₹9"

Bigger, all-caps, ornament `+` decorations, yellow callouts on key numbers. Our intro reveal uses this tone.

### Brand-moment ("a wink between us")

> "catch it at peak"
> "a little drippy"
> "you let it melt completely"

Lowercase, witty, slightly self-aware, no period at end. Our result-card tagline and game header use this tone.

**Never:**
- "Click here", "Tap to continue" (use the actual verb — "Place Order", "Pay Now")
- Apology-heavy ("Sorry, we couldn't…" → "Couldn't load. Tap to retry.")
- Wall-of-text legal copy in user-facing surfaces

---

## 5. Microcopy patterns

| Pattern | Live Zepto example | Our equivalent |
|---|---|---|
| Time promise | "Delivering in 9 mins" | "Delivering in 10 mins" |
| Savings affirmation | "Yay! You saved ₹154" | "Yay! save up to 50% if you catch it at peak" |
| Hero CTA with price | "Click to Pay ₹280" | "Place Order · ₹120" |
| Promo overlay header | "+ INTRODUCING + / SPECIAL DEALS" | "+ zepto delivers in + / 10 minutes" |
| Win-word treatment | "ten minutes" highlighted yellow in brief | "10 minutes" yellow in intro, "peak" yellow on result card |
| Brand-moment closer | (none in app) | "the brand you scream for. not the brand you scream into." |

---

## 6. The cosmic background

Reference: Screenshot 2 — "INTRODUCING SPECIAL DEALS" overlay.

The overlay sits on a deep purple gradient (lighter purple top-centre, darker bottom-edges) with three soft glowing colour orbs (magenta, frost-blue, lavender-purple) blurred large in the corners, and 15 small white "cosmic dots" scattered across the field at varied opacities. This is the visual mode Zepto uses whenever they want the screen to *feel like a brand moment* rather than a cart row.

Our `BrandBackground.tsx` reproduces this pattern and sits behind every PhoneFrame child. The order screen's cart rows are `bg-zepto-purple-mid/80` with backdrop-blur — they let a hint of the cosmic glow show through, so the cart feels like it lives inside the moment, not on a flat slab.

---

## Source artefacts

- `Screenshots/Screenshot 2026-05-25 at 8.34.00 PM.png` — home / category nav
- `Screenshots/Screenshot 2026-05-25 at 8.40.50 PM.png` — Special Deals overlay (the primary moment-mode reference)
- `Screenshots/Screenshot 2026-05-25 at 8.48.14 PM.png` — checkout, cart items, qty controls
- `Screenshots/Screenshot 2026-05-25 at 8.48.22 PM.png` — Bill Summary, "Click to Pay" CTA
- `Screenshots/Screenshot 2026-05-25 at 8.49.00 PM.png` — payment processing, app banner
- `Scream for Ice Cream · Zepto · Problem Statement (1).pdf` — the brief itself
- `app/globals.css` — colour tokens as Tailwind v4 `@theme` variables
- `lib/constants.ts` — same hex values mirrored for imperative SVG mutation inside the game loop
- `components/BrandBackground.tsx` — the cosmic overlay pattern
