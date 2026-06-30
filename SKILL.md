---
name: forex-with-ghasif-design
description: Use this skill to generate well-branded interfaces and assets for Forex With Ghasif (FWG), a premium forex signals, mentorship, and market-education brand — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a luxury gold-on-obsidian fintech aesthetic.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out (e.g. `assets/fwg-logo.png`) and create static HTML files that link `styles.css` for the design tokens. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

Key foundations:
- **Vibe:** luxury fintech — champagne gold (`--gold-400`) on warm obsidian (`--ink-950`); emerald = bullish, crimson = bearish (data only). Dark is the hero theme; light mode is warm ivory (flip `data-theme`).
- **Type:** Sora (display), Manrope (body), Cormorant Garamond (serif accent), JetBrains Mono (all numbers).
- **Tone:** disciplined mentor — confident, transparent, education-over-hype, never guarantees. No emoji.
- **Components** (`components/`): Button, Badge, Card, Stat, PriceTag, Input, SectionHeading, Logo, PlanCard — load `_ds_bundle.js` and read from `window.ForexWithGhasifDesignSystem_e958d4`.
- **UI kit** (`ui_kits/website/`): a full **multi-page** site (Home, About,
  Services, Performance, Pricing, Blog, Contact) — reference for layout,
  navigation, sections, and motion. No login UI by design.
- **Icons:** Lucide (outline), via CDN.

If the user invokes this skill without other guidance, ask what they want to build or design, ask a few clarifying questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
