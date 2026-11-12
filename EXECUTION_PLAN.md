# SPEC-DRIVEN EXECUTION PLAN: GitHolo 🎴
> **Target Subdomain:** `https://githolo.bharatdn.com`  
> **Methodology:** Spec-Driven Development + TDD & Structured Workflows  
> **Status:** Execution Ready  
> **License:** MIT (100% Free & Open Source)

---

## 🎯 1. Product Vision & Architecture Brief

**GitHolo** converts any GitHub username into a high-octane 3D Holographic Trading Card with dynamic RPG stats, custom archetypes, and foil reflection shaders. 

### Why `githolo.bharatdn.com` is brilliant:
1. Zero domain purchase friction.
2. Directly boosts authority and traffic for your parent domain `bharatdn.com`.
3. Demonstrates your "ship fast solo" builder ethos.

---

## 📅 2. Sprint Agenda & Execution Timeline (14-Day Sprint)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Core Engine & Ingestion (Days 1 - 4)                          │
│ ├─ GitHub GraphQL API Aggregator & Rate-Limit Safeguard                │
│ ├─ RPG Stat & Archetype Engine (Formulaic calculation)                 │
│ └─ Unit & Contract Tests for Stat Balancing                            │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Visual Card Studio & 3D Shaders (Days 5 - 9)                  │
│ ├─ CSS 3D Matrix / Gyroscope & Mouse Tilt Physics                      │
│ ├─ Holographic Rainbow Foil & Particle Shader Effect                   │
│ ├─ 5 Collectible Themes (Cyberpunk, Gold Foil, Obsidian, Retro 90s)    │
│ └─ Customization Panel (toggle stats, badges, bio)                     │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Export Engine & Edge Caching (Days 10 - 12)                   │
│ ├─ High-DPI Client-Side PNG & WebP Render (`html-to-image`)           │
│ ├─ Cloudflare / Edge Cache for Instant Re-renders                      │
│ └─ Dynamic OpenGraph (OG) Image Generation for Twitter & LinkedIn      │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Viral Launch & Distribution (Days 13 - 14)                    │
│ ├─ Pre-filled Viral Tweet Trigger ("I just drew my Dev Card...")      │
│ ├─ Deploy to `githolo.bharatdn.com`                                    │
│ └─ Post to Reddit (r/webdev, r/SideProject), HackerNews, and X         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 3. Detailed Component Breakdown (Spec-Kit)

### Module A: The GitHub Ingestion & Stat Calculator (`/lib/engine/`)
```typescript
interface DevStats {
  username: string;
  name: string;
  avatarUrl: string;
  totalCommits: number;
  totalPRs: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
  streakDays: number;
  archetype: DevArchetype;
  rarity: "Mythic" | "Legendary" | "Epic" | "Rare" | "Standard";
  rpgStats: {
    atk: number;  // Commit Velocity (0 - 99)
    def: number;  // Code Stability & Issue Hygiene (0 - 99)
    mana: number; // Language Diversity (0 - 99)
    luck: number; // Stargazer Pull (0 - 99)
  };
}
```

#### Archetype Determination Rules:
- **Systems Paladin:** Rust / C / C++ > 40%
- **Polyglot Alchemist:** 4+ languages each with > 15% presence
- **Midnight Sorcerer:** > 45% commits pushed between 10 PM – 4 AM
- **The Code Arbiter:** PR merge acceptance rate > 85%
- **Iron Monolith:** Consecutive commit streak > 60 days

---

### Module B: 3D Holographic Foil Renderer (`/components/card/`)
- **Card Layers:**
  1. **Base Layer:** Dark obsidian or cyberpunk backdrop with avatar, handle, and badges.
  2. **Texture Layer:** High-frequency metallic specular map.
  3. **Holographic Foil Layer:** Blended CSS gradient with `mix-blend-mode: color-dodge` responsive to `pointermove` or `deviceorientation`.
  4. **Glass Reflection Layer:** Diagonal gloss sheen simulating slabbed graded collector cards (PSA style).

---

### Module C: Rate-Limit Shield (60/hr to Infinite)
1. **Client-Side Fetching First:** Data is pulled directly using the user's browser where possible, or via an edge-cached Next.js Route Handler.
2. **Edge TTL:** 24-hour cache on fetched profile data. If `@ErBharatMalhotra` is queried 5,000 times on Twitter, it consumes **1 API point** on GitHub.

---

## 📋 4. Action Items Checklist for Bharat

- [ ] **Day 1:** Run `npx create-next-app@latest githolo --typescript --tailwind --app` in `D:\new idea\GitHolo`
- [ ] **Day 2:** Build `/api/github/[username]` with GraphQL single-query resolver.
- [ ] **Day 3:** Build RPG Stat Engine unit tests.
- [ ] **Day 4:** Build the interactive 3D Card component with holographic foil CSS.
- [ ] **Day 5:** Add PNG download with `html-to-image`.
- [ ] **Day 6:** Setup DNS on Cloudflare: `githolo.bharatdn.com` $\rightarrow$ Vercel.
- [ ] **Day 7:** Launch and distribute!
