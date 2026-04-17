import { NextResponse } from "next/server";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { translateAll } from "@/lib/google-translate";

const ASSETS_BASE = "https://assets.twroz.wiki";
const DATA_DIR = join(process.cwd(), "src", "data");
const ITEMS_OUT  = join(DATA_DIR, "items-translated.json");
const MONSTERS_OUT = join(DATA_DIR, "monsters-translated.json");

export async function POST(request: Request) {
  const { target } = await request.json().catch(() => ({ target: "both" }));
  const results: Record<string, any> = {};

  // Ensure data directory exists
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

  // ── TRANSLATE ITEMS ───────────────────────────────────────
  if (target === "items" || target === "both") {
    console.log("[build-db] Fetching items...");
    const rawRes = await fetch(`${ASSETS_BASE}/items_database.json`);
    const raw: Record<string, any> = await rawRes.json();
    const ids = Object.keys(raw);

    // Collect all Chinese names and descriptions
    const names = ids.map((id) => raw[id].name?.zh_tw || "");
    const descs = ids.map((id) => raw[id].description?.official_clean || raw[id].description?.official || "");

    console.log(`[build-db] Translating ${ids.length} item names...`);
    const namesEN = await translateAll(names, 20, 120);

    console.log(`[build-db] Translating ${ids.length} item descriptions...`);
    const descsEN = await translateAll(descs, 8, 200); // descriptions are longer, smaller batch

    // Build translated map: { [id]: { name_en, description_en } }
    const translatedItems: Record<string, { name_en: string; description_en: string }> = {};
    ids.forEach((id, i) => {
      translatedItems[id] = {
        name_en: namesEN[i] || names[i],
        description_en: descsEN[i] || descs[i],
      };
    });

    writeFileSync(ITEMS_OUT, JSON.stringify(translatedItems, null, 2));
    results.items = { count: ids.length, file: ITEMS_OUT };
    console.log(`[build-db] Items saved to ${ITEMS_OUT}`);
  }

  // ── TRANSLATE MONSTERS ────────────────────────────────────
  if (target === "monsters" || target === "both") {
    console.log("[build-db] Fetching monsters...");
    const rawRes = await fetch(`${ASSETS_BASE}/monsters_display_index.json`);
    const raw: Record<string, any> = await rawRes.json();
    const ids = Object.keys(raw).filter((id) => !raw[id].name?.en);

    // Only translate monsters that lack an English name
    const names = ids.map((id) => raw[id].name?.zh_tw || "");
    console.log(`[build-db] Translating ${ids.length} monster names without English...`);
    const namesEN = await translateAll(names, 25, 100);

    const translatedMonsters: Record<string, { name_en: string }> = {};
    ids.forEach((id, i) => {
      translatedMonsters[id] = { name_en: namesEN[i] || names[i] };
    });

    writeFileSync(MONSTERS_OUT, JSON.stringify(translatedMonsters, null, 2));
    results.monsters = { count: ids.length, file: MONSTERS_OUT };
    console.log(`[build-db] Monsters saved to ${MONSTERS_OUT}`);
  }

  return NextResponse.json({ success: true, results });
}

export async function GET() {
  const status = {
    items:    existsSync(ITEMS_OUT),
    monsters: existsSync(MONSTERS_OUT),
  };
  return NextResponse.json(status);
}
