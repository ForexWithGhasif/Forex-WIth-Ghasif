# Forex With Ghasif — Design System

A luxury fintech design system for **Forex With Ghasif (FWG)**, a premium forex
trading-signals, mentorship, and market-education brand. The system is built to
make every surface feel like a high-end financial institution: **champagne gold
on warm obsidian**, calm motion, tabular trading data, and restrained glow.

> The single brand artifact provided by the client was the FWG logo (a gold
> metallic monogram with a bullish green arrow and candlesticks). Everything
> else — palette, type, tone, components — was art-directed from that mark.

---

## Sources

- `uploads/Untitled document.pdf` — contained one asset: the **FWG logo**
  (extracted to `assets/fwg-logo.png`). No codebase, Figma, or copy were provided.
- No fonts were supplied — webfonts are **substituted from Google Fonts**
  (see Caveats). Flag for licensed replacement if the brand has chosen typefaces.

---

## Brand at a glance

| | |
|---|---|
| **Name** | Forex With Ghasif · short: **FWG** |
| **Category** | Forex signals · mentorship · market analysis · trading education |
| **Personality** | Premium, trustworthy, disciplined, exclusive, calm authority |
| **Promise** | Confidence, transparency, consistency — *education over hype* |
| **Signature** | Metallic gold mark on near-black; emerald = bullish, crimson = bearish |

---

## CONTENT FUNDAMENTALS — how FWG writes

The voice is a **disciplined mentor**, not a hype-man. It sells *process and
trust*, never get-rich-quick fantasy. Compliance-aware by default.

- **Person:** Speaks to the reader as **"you"**; the brand is **"we" / "Ghasif"**.
  ("You'll learn to read the market the way we do.")
- **Tone:** Confident, plain, precise. Calm certainty over exclamation. No
  pressure tactics; exclusivity is implied by quality, not countdown timers.
- **Casing:** Sentence case for headlines and buttons. UPPERCASE only for small
  eyebrows/kickers and stat labels (wide letter-spacing). Never all-caps sentences.
- **Numbers:** Always specific and tabular — `+612 pips`, `78.4% win rate`,
  `1:3 avg R:R`, `4,200+ members`. Mono font for any figure.
- **Claims & compliance:** Frame results as *track record*, never *guarantee*.
  Pair performance with a risk disclaimer. Preferred verbs: *learn, master,
  understand, join, trade with discipline*. Avoid: *guaranteed, risk-free,
  double your money, secret*.
- **Emoji:** **None.** Premium financial tone — emoji break it.
- **Examples**
  - Hero: *"Trade with conviction, not luck."*
  - Sub: *"Institutional-grade signals, live market breakdowns, and 1:1
    mentorship — built to make you a consistent trader, not a gambler."*
  - CTA: *"Join VIP Signals"* · *"Book a mentorship call"* · *"See the track record"*
  - Eyebrow: `PREMIUM FOREX EDUCATION`
  - Disclaimer: *"Trading involves substantial risk. Past performance is not
    indicative of future results."*

---

## VISUAL FOUNDATIONS

**Mood.** Quiet luxury. Deep obsidian canvas, content floating on near-invisible
glass cards, a single warm gold accent, and trading-green/red used *only* for
data meaning. Light mode is warm ivory, never clinical white.

- **Color.** Gold (`--gold-400/500`) is the one brand accent — used for the logo,
  key CTAs, focus, dividers, and metallic text. Emerald = bullish/up/success;
  crimson = bearish/down/danger — reserved for data semantics, not decoration.
  Backgrounds are a warm-cool obsidian ink scale (`--ink-950 → --ink-700`).
- **Type.** Display **Sora** (geometric authority) for headings; **Manrope**
  for body/UI; **Cormorant Garamond** italic for occasional luxury pull-quotes;
  **JetBrains Mono** tabular for every price, pip, percentage, and stat.
- **Spacing.** 8px grid. Generous section rhythm (`--section-y`, ~72–144px).
  Air is a luxury signal — let things breathe.
- **Backgrounds.** Mostly flat obsidian with subtle **radial gold/emerald glows**
  behind the hero and key sections (`--hero-glow`). Fine candlestick / grid
  motifs and faint chart lines as texture — never loud. No stock photography of
  handshakes or city skylines; prefer abstract chart/data visuals and the logo.
- **Gradients.** Used for *metal*, not backdrops: the gold metallic gradient
  (`--grad-gold`) on the wordmark and accents, soft gold (`--grad-gold-soft`)
  for text clip. Avoid purple/blue SaaS gradients entirely.
- **Glass & blur.** Sticky nav and floating UI use `--surface-glass` +
  `backdrop-filter: blur(--blur-md)`. Cards are barely-there translucent panels
  (`--surface-card`) with a hairline border and a 1px top highlight (the metal sheen).
- **Borders.** Hairlines (`--border-subtle/default`). Gold borders
  (`--border-gold`) only on featured/active elements.
- **Radii.** Soft but architectural: `--radius-md` (14px) for buttons/inputs,
  `--radius-lg/xl` (20–28px) for cards and panels, pill for chips/badges.
- **Shadows.** Deep, soft, low-opacity dark shadows (`--shadow-card/lg`).
  Interactive gold elements add a restrained gold glow (`--glow-gold-sm/md`) —
  used sparingly so it stays special.
- **Cards.** Translucent surface + hairline border + inset top highlight + soft
  drop shadow. Featured cards swap the border to gold and add a faint gold glow.
- **Motion.** Premium decel easing (`--ease-out`). Fades + small rises (8–16px),
  never bounce. Hover = subtle lift + glow; press = slight shrink (0.98).
  Theme switch is a 500ms cross-fade of colors. Respect reduced-motion.
- **Hover states.** Buttons brighten/gain glow; cards lift 2–4px and reveal gold
  border; links shift to gold. **Press:** scale 0.98 + remove glow.
- **Imagery vibe.** Warm, dark, high-contrast; gold/green/red accents on black.
  Abstract market visuals, candlestick fragments, equity curves. Slight grain
  acceptable. Never bright, flat, or pastel.

---

## ICONOGRAPHY

- **System:** **Lucide** (`https://unpkg.com/lucide@latest`) — clean 1.75–2px
  stroke icons that match the calm fintech tone. Loaded via CDN in cards/kits.
  This is a **substitution** (the brand shipped no icon set) — swap if the brand
  adopts a custom set.
- **Usage:** Outline (stroke) style only; `currentColor` so icons inherit text
  color (gold on accents, secondary elsewhere). Common glyphs: `trending-up`,
  `candlestick-chart`, `line-chart`, `shield-check`, `bell-ring`, `graduation-cap`,
  `crown`, `gem`, `zap`, `users`, `check`. Trading direction uses `arrow-up-right`
  (bullish/emerald) and `arrow-down-right` (bearish/crimson).
- **Emoji:** Never used.
- **Unicode:** Sparingly — `↗ ↘` arrows acceptable inline for price moves.
- **Logo:** `assets/fwg-logo.png` — the gold FWG monogram. Works on dark out of
  the box; on light, place on an obsidian chip or use at small scale with care.

---

## INDEX — what's in here

**Foundations / tokens** (root `styles.css` → imports):
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css`
- `tokens/effects.css` · `tokens/motion.css` · `tokens/base.css`

**Components** (`components/`) — reusable React primitives:
- `core/Button`, `core/Badge`, `core/Card`, `core/Stat`, `core/PriceTag`,
  `core/Input`, `core/PlanCard`, `core/SectionHeading`, `core/Logo`

**UI kits** (`ui_kits/`):
- `website/` — the premium FWG **multi-page** marketing site. Seven routed pages
  sharing one sticky navbar (Home · About · Services · Performance · Pricing ·
  Blog · Contact), active-page highlighting, mobile menu, dark/light toggle, and
  a shared footer. **No login/signup UI.** Entry: `index.html`. Pages:
  `index.html`, `about.html`, `services.html`, `performance.html`,
  `pricing.html`, `blog.html`, `contact.html`. Shared chrome in `Layout.jsx`;
  content blocks in `Sections.jsx` / `Sections2.jsx`; page bodies in
  `Pages1.jsx` / `Pages2.jsx`; primitives in `kit.jsx`; charts in `Visuals.jsx`;
  page CSS in `site.css`.

**Specimen cards** — small `@dsCard` HTML files across `tokens/` and
`components/` populate the Design System tab (Colors, Type, Spacing, Brand,
Components).

**Other**
- `SKILL.md` — Agent-Skill manifest for downloadable use.
- `assets/fwg-logo.png` — primary logo.

---

## CAVEATS
- **Fonts substituted** from Google Fonts (Sora / Manrope / Cormorant Garamond /
  JetBrains Mono). No brand fonts were provided — confirm or replace.
- **Icons substituted** (Lucide). No brand icon set was provided.
- **Palette art-directed**, not client-specified — gold-on-obsidian was derived
  from the logo. Open to redirection.
