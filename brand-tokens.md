# Zepto brand tokens

Extracted by visual inspection of real Zepto app screenshots captured 2026-05-25, stored in `Screenshots/`. These supersede the v7 widget's approximations.

## Palette

| Token | Hex | Where it appears in real Zepto | Where we use it |
|-------|-----|--------------------------------|-----------------|
| `zepto-magenta` | `#ec4080` | "Use App" button, "Click to Pay" CTA | Primary CTAs, hero numbers, freeze meter (high), tagline |
| `zepto-purple` | `#3d1c71` | App icon background, "INTRODUCING SPECIAL DEALS" overlay | Phone-frame surface |
| `zepto-purple-mid` | `#2d1454` | Sub-surfaces, card backgrounds | Cart rows, result-card body |
| `zepto-purple-deep` | `#1e0b3e` | Deepest overlay shade | Game canvas background |
| `zepto-purple-edge` | `#0f0420` | Outermost screen edge | Body background |
| `zepto-orange` | `#f26057` | The literal "z" letter in the app icon | Game cursor (the Z), product tile, card branding marks |
| `accent-yellow` | `#ffd60a` | Sale callouts ("STARTING AT ₹9") | Legendary-save hero number (≥85%) |
| `accent-green` | `#22c55e` | "Yay! You saved ₹154" banner, discounted prices | Discount display on result card, savings hint on order screen |
| `frost` | `#7dd3fc` | (not in real Zepto — game-specific) | On-target cursor + GO countdown |

## Why these specific choices

The v7 widget gave us a workable approximation. The screenshots changed two important things:

1. **The Zepto Z is orange, not magenta.** In the app icon, the bag tag, and the "Get everything in mins" promo, the "z" is rendered in `#f26057` orange on dark purple. Making the in-game cursor that same orange is the single strongest brand signal we can land — the user is literally dragging a tiny Zepto app icon around the screen.

2. **Magenta is the CTA color, green is the savings color.** Real Zepto uses magenta for "do this thing" and green for "you got this benefit." Our result card now mirrors that: the hero `%` is magenta (the brand spine), the *discount* number is green (the win you earned).

## Typography

Real Zepto uses a custom geometric sans. We approximate with Geist (Vercel's geometric sans, self-hosted via `next/font/google`). Lowercase-heavy in microcopy, ALL CAPS for promotional rails, mixed for product names. Hero numbers use medium weight (500), CTAs use medium (500), supporting text varies 400–500.

## Source files

- `app/globals.css` — Tailwind v4 `@theme` token block
- `lib/constants.ts` — `COLOR` object mirrors the same hex values for imperative SVG mutation inside the game loop
- `Screenshots/` — the original captures used for sampling
