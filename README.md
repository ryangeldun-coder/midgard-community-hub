# Midgard Community Hub

A community hub for **Ragnarok Online Zero (TWRoZ)** — built with Next.js 16 and deployed on Vercel.

## Features

- 🗡️ **Monster Database** — 324+ TWRoZ monsters with stats, drops, and spawn locations (fully in English)
- 📦 **Item Database** — 4,500+ items with translated names and descriptions
- 🔨 **Refine Simulator** — +1 to +20 refine rates (Elunium/Oridecon/Zelunium/Shadowdecon), BSB pity system, Monte Carlo cost analysis
- ⚗️ **Brewing Calculator** — Alchemist/Creator brewing success rates and batch analysis
- 🛠️ **Forge Simulator** — Blacksmith/Whitesmith weapon forging calculator
- 🌾 **Farming Optimizer** — Best farming spots and zeny/hr estimates
- 📈 **Leveling Path** — Optimal leveling routes by class and level
- 📜 **Lore** — Ragnarok Zero lore and story content

## Data Source

All game data is sourced from [twroz.wiki](https://twroz.wiki) (assets.twroz.wiki JSON endpoints) and translated to English via Google Translate.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Translation

The translated database lives in `src/data/items-translated.json`. To regenerate it (e.g. after a TWRoZ update):

1. Run the dev server: `npm run dev`
2. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
3. Click **Start Translation Build**

## Deployment

Deployed automatically via [Vercel](https://vercel.com) on every push to `main`.

Set no additional environment variables — all data is fetched from public APIs.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Framer Motion** — animations
- **Lucide React** — icons
- **Google Translate** (public API) — data translation pipeline
