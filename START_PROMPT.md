# 🚀 GitHolo — COPY-PASTE THIS PROMPT INTO TAB 1

> **Project:** GitHolo (3D Holographic Dev Trading Cards)  
> **Target:** `https://githolo.bharatdn.com`  
> **Working Dir:** `D:\new idea\GitHolo`

---

## 👇 PASTE THIS EXACT PROMPT IN YOUR FIRST TERMINAL TAB:

```bash
cd "D:\new idea\GitHolo"

# 1. Initialize Next.js 15 + TypeScript + Tailwind + App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack

# 2. Install core dependencies
npm i @octokit/graphql @octokit/rest html-to-image lucide-react clsx tailwind-merge framer-motion
npm i -D @types/node

# 3. Configure Git: YOUR NAME ONLY — NO CO-AUTHORED TRAILERS
git config user.name "ErBharatMalhotra"
git config user.email "bharat@bharatdn.com"

# Disable any co-authored-by footers globally for this repo
git config commit.trailer "false"
git config commit.cleanup "strip"

# 4. First commit: Scaffold
git add .
git commit -m "chore: scaffold GitHolo — Next.js 15 + Tailwind v4 + TypeScript"
git push -u origin main

# 5. Open the plan for reference
code EXECUTION_PLAN.md
```

---

## 🎯 IMMEDIATE NEXT STEPS (After scaffold):
1. **Create `/lib/github.ts`** — Single GraphQL query for profile + top repos + contribution calendar
2. **Create `/lib/engine/archetype.ts`** — RPG Stat Calculator & Archetype/Rarity Engine
3. **Create `/components/card/HoloCard.tsx`** — 3D Tilt + Holographic Foil CSS Shader
4. **Create `/app/api/github/[username]/route.ts`** — Edge-cached API endpoint (24hr TTL)
5. **Create `/components/export/DownloadButton.tsx`** — `html-to-image` 4K PNG/WebP export

---

## ⚡ GIT RULES (ENFORCED IN THIS REPO):
| Rule | Config |
|------|--------|
| **Author Name** | `ErBharatMalhotra` |
| **Author Email** | `bharat@bharatdn.com` |
| **No Co-Authored-By** | `commit.trailer=false` + `commit.cleanup=strip` |
| **No AI Footers** | Explicitly disabled |
| **Commit Style** | Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`) |

---

## 📋 REFERENCE FILES IN THIS FOLDER:
- `README.md` — Product PRD & Vision
- `EXECUTION_PLAN.md` — 14-Day Sprint Breakdown

**Happy Building! 🎴✨**