# DESIGN_SYSTEM.md

> The official design reference for GitHolo. Every future page, section, component, and UI update follows this design system.

---

## 1. Project overview

- **Website / product name:** GitHolo
- **Website type:** 3D Holographic Developer Trading Card Generator & Battle Arena
- **Surface profile:** Landing / Marketing + App / Product UI + Redesign
- **Platform:** Web (Next.js 16 App Router, Tailwind CSS v4, Framer Motion)
- **Target users:** Software engineers, open-source maintainers, developers sharing achievements
- **Main design goal:** Turn GitHub stats into legendary 3D collectible trading cards with realistic holographic foils, interactive tilt physics, 4K export, and battle arena mechanics with zero AI slop.

## 2. Brand direction

- **Visual style:** Cyberpunk / Gaming Trading Card High-Tech Minimal
- **Mood & tone:** Immersive, collectible, precise, high-performance, prestige
- **Design personality:** Technical-Futuristic & Collectible Arcade
- **Design concept:** "A high-end trading card grading vault where developer telemetry is minted into physical-feeling holographic assets with precision instrumentation and tactile tilt feedback."
- **Reference style used:** Linear, Vercel, Stripe, and high-end collectible card grading platforms (PSA/Pokemon TCG live renderers).
- **Voice & UX copy:** Confident, concise, developer-centric, punchy telemetry metrics.

## 3. Color system

| Role | Color | Hex / OKLCH | Usage |
|---|---|---|---|
| 60% — Dominant | Deep Obsidian / Pitch Black | `#09090b` (`oklch(0.12 0.01 240)`) | Page backgrounds, card containers, dark base |
| 30% — Secondary | Charcoal Surface Raised | `#18181b` (`oklch(0.18 0.01 240)`) | Panels, inputs, card backdrops, badge trays |
| 10% — Accent | Cyber Cyan / Amber / Fuchsia | `#22d3ee` / `#fbbf24` / `#f43f5e` | CTAs, active highlights, Holographic foil sheen, rarity badges |

- **Separation:** Depth-first using subtle background contrast (`bg-black/40` or `bg-zinc-900/60`) and soft shadows rather than heavy borders.
- **Dark mode:** Native dark theme with tinted near-black base and luminous cyberpunk accent glows.

## 4. Typography system

- **Brand personality:** Technical Mono + Clean Grotesque
- **Font family:** Geist / Inter (body) + Space Mono / JetBrains Mono (metrics, badges, card stats)
- **Type scale:**
  - `display`: `text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight`
  - `h1`: `text-2xl sm:text-3xl font-bold tracking-tight`
  - `h2`: `text-lg sm:text-xl font-semibold`
  - `body`: `text-base text-zinc-300 leading-relaxed`
  - `mono`: `font-mono text-xs sm:text-sm tracking-wide`
- **Body text size:** 16px minimum (`text-base`).

## 5. Layout system

- **Container widths:** `max-w-6xl mx-auto px-4 py-12`
- **Hero composition:** Centered high-impact title with quick search input and instant reactive card loading.
- **Card layout:** 3D perspective wrapper (`perspective-[1200px]`), dynamic tilt transformation (`rotateX`, `rotateY`), and dual-layer holographic foil shaders (`mix-blend-color-dodge`).

## 6. Component system

- **HoloCard:** 3D interactive tilt trading card with mouse/gyro physics and 5 collectible themes (Cyberpunk Neon, Gold Foil, Obsidian Matte, Tokyo Dark, Retro 90s Gameboy).
- **ThemeSelector:** Grid-based theme picker with live color previews.
- **DownloadButton:** 4K / PNG / SVG export utility using `html-to-image`.
- **ViralShare:** One-click X/Twitter intent sharing and copy link.
- **ReadmeEmbed:** Markdown & HTML snippet generator for GitHub profile README embedding.
- **Core Metrics & RPG Breakdown:** Visual stat bars for Attack, Defense, Mana, and Luck derived from GitHub commit velocity, PR merge rate, language diversity, and follower pull.

## 7. Card & section style

- **Radius:** `rounded-2xl` for cards, `rounded-xl` for panels and inputs.
- **Shadows:** Soft luminous glows (`shadow-[0_0_30px_rgba(6,182,212,0.25)]`).
- **Foil effect:** Dynamic multi-stop gradient layers responding to cursor coordinates (`clientX`, `clientY`).

## 8. Icon system

- **Library:** Lucide React (`Sparkles`, `Search`, `Shield`, `Zap`, `Flame`, `Trophy`, `Code2`, `Palette`, `Download`, `Share2`).
- **Consistency:** Monochromatic icon accents mapped to respective stat colors (Red for ATK, Blue for DEF, Purple for MANA, Amber for LUCK).

## 9. Image & asset rules

- **Avatar:** GitHub avatar images fetched live with contrast enhancement (`filter contrast-110`).
- **Icons & Badges:** Crisp vector SVG icons with zero raster artifacts.

## 10. Animation & interaction system

- **Hover/Tilt:** 100ms instant response on mouse move with smooth CSS transitions (`transition-transform duration-100 ease-out`).
- **Accessibility:** Fully keyboard accessible, high contrast ratios (`> 4.5:1` on all text pairs), reduced-motion safe.
- **Performance:** Zero layout shifts (CLS < 0.1), fast client-side rendering with edge-cached GraphQL API fallback.

## 11. Accessibility rules

- WCAG AA compliance enforced across all text and UI elements.
- Clear `:focus-visible` outlines on all interactive inputs and buttons.

## 12. Anti-AI-slop rules

- No generic unstyled default UI libraries.
- No default purple gradient landing pages without purpose — every theme is grounded in collectible trading card lore.
- Zero placeholder fake names — real GitHub telemetry or clear loading states.

## 13. Future page instructions

Every future page or component must reuse the tokens, card physics, font scale, and theme styles documented above.

## 14. Update policy

Any updates to card themes or RPG formulas must be immediately reflected in this file.
