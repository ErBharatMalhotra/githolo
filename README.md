# GitHolo

**Turn any GitHub profile into a 3D Holographic Developer Trading Card.**

Interactive · 4K Export · Viral Share · Zero Watermarks · Open Source

---

## Live Demo

**[githolo.bharatdn.com](https://githolo.bharatdn.com)**

---

## Features

- **10 Collectible Themes** — Cyberpunk Neon, Gold Foil, Obsidian Matte, Tokyo Dark, Retro 90s Gameboy, Matrix Code, Vaporwave Sunset, Nordic Frost, Cosmic Holo, Secret Rare Prismatic
- **Real GitHub Telemetry** — Commits, PRs, stars, followers, streak, languages, pinned repos
- **RPG Stat Engine** — Attack (Velocity), Defense (Stability), Mana (Diversity), Luck (Magnetism), Overall Power
- **Archetype Classification** — 12 developer archetypes with rarity tiers (Standard → Mythic)
- **Ultimate Skills** — Unique signature moves per archetype
- **3D Holographic Cards** — Mouse/gyro tilt physics, foil shaders, depth-layered visuals
- **4K PNG / PNG / SVG Export** — Print-ready captures with one click
- **Viral Sharing** — One-click X/Twitter intent + copy link
- **README Embed** — Markdown & HTML snippets for GitHub profiles
- **Battle Arena** — Head-to-head card battles at `/battle?p1=USER1&p2=USER2`
- **Dynamic OG Images** — Auto-generated social cards via `/api/og/[username]`
- **Edge-Cached API** — 24hr TTL GitHub GraphQL endpoint at `/api/github/[username]`

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Data:** GitHub GraphQL API (native fetch, zero deps)
- **Export:** html-to-image
- **Testing:** Vitest + jsdom + @testing-library/react

---

## Getting Started

```bash
# Clone & install
git clone https://github.com/ErBharatMalhotra/GitHolo.git
cd GitHolo
npm install

# Add GitHub token (required for API)
echo "GITHUB_TOKEN=ghp_your_token_here" > .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter a GitHub username.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token (classic) with `read:user` and `repo` scopes |

---

## Project Structure

```
src/
├── app/
│   ├── (main)/page.tsx          # Homepage with search & live preview
│   ├── [username]/
│   │   ├── page.tsx             # SSR profile page with OG metadata
│   │   └── ProfileClient.tsx    # Interactive profile client
│   ├── api/
│   │   ├── github/[username]/   # Edge-cached GraphQL data API
│   │   └── og/[username]/       # Dynamic OG image (ImageResponse)
│   ├── battle/                  # Battle arena page
│   ├── globals.css              # Design tokens & animations
│   └── layout.tsx               # Root layout + SEO metadata
├── components/
│   ├── card/
│   │   ├── HoloCard.tsx         # 3D tilt card with foil shaders
│   │   └── ThemeSelector.tsx    # 5-theme picker
│   ├── export/DownloadButton.tsx    # 4K/PNG/SVG export
│   ├── share/ViralShare.tsx       # X intent + copy link
│   └── embed/ReadmeEmbed.tsx      # Markdown/HTML snippets
├── lib/
│   ├── engine/
│   │   ├── types.ts             # DevStats, CardTheme, RarityTier, DevArchetype
│   │   └── archetype.ts         # RPG stats, archetypes, rarity, ultimate skills
│   └── github.ts                # GraphQL query + data transformation
└── __tests__/                   # Unit & component tests (21 passing)
```

---

## API Reference

### `GET /api/github/[username]`

Returns enriched `DevStats` for a GitHub user. Cached 24h at edge.

**Response:**
```json
{
  "username": "torvalds",
  "name": "Linus Torvalds",
  "avatarUrl": "...",
  "bio": "...",
  "totalCommits": 12345,
  "totalPRs": 123,
  "totalStars": 456,
  "totalForks": 78,
  "followers": 9999,
  "following": 12,
  "publicRepos": 42,
  "streakDays": 1234,
  "nightOwlPercentage": 67,
  "prMergeRate": 92,
  "topLanguages": [{ "name": "C", "percentage": 65, "color": "#555555" }],
  "pinnedRepos": [...],
  "archetype": "Code Sage",
  "archetypeTitle": "The Ancient Maintainer",
  "archetypeDescription": "...",
  "rarity": "Legendary",
  "rarityPercentile": "Top 1% Developer",
  "ultimateSkill": "KERNEL COMMIT: BENEVOLENT DICTATOR",
  "rpgStats": { "atk": 95, "def": 88, "mana": 72, "luck": 99, "overall": 89 }
}
```

### `GET /api/og/[username]?theme=cyberpunk`

Returns a dynamic PNG OG image for social sharing. Accepts `theme` query param (one of 5 themes).

---

## Deployment

Deployed on Vercel with custom domain `githolo.bharatdn.com`.

1. Push to `main` → auto-deploys
2. Add `GITHUB_TOKEN` in Vercel project settings → Environment Variables
3. Configure custom domain in Vercel → Domains

---

## License

MIT — Built with ♥ by [ErBharatMalhotra](https://bharatdn.com)

---

## Tags

`nextjs` `typescript` `tailwindcss` `github-api` `trading-card` `3d-graphics` `holographic` `developer-tools` `open-source` `vercel` `og-image` `edge-functions`