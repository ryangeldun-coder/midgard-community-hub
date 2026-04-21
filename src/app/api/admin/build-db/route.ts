import { NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { translateAll } from "@/lib/google-translate";
import { invalidateCache } from "@/lib/database";

const ASSETS_BASE = "https://assets.twroz.wiki";
const DATA_DIR = join(process.cwd(), "src", "data");
const ITEMS_OUT  = join(DATA_DIR, "items-translated.json");
const MONSTERS_OUT = join(DATA_DIR, "monsters-translated.json");

export async function POST(request: Request) {
  const { target } = await request.json().catch(() => ({ target: "both" }));
  const results: Record<string, any> = {};

  // Invalidate in-memory cache
  invalidateCache();

  // Ensure data directory exists
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

  const MONSTERS_DB_PATH = join(DATA_DIR, "monsters_db.json");
  const ITEMS_DB_PATH    = join(DATA_DIR, "items_db.json");

  // ── TRANSLATE ITEMS ───────────────────────────────────────
  if (target === "items" || target === "both") {
    console.log("[build-db] Loading items...");
    let raw: Record<string, any> = {};
    if (existsSync(ITEMS_DB_PATH)) {
      raw = JSON.parse(readFileSync(ITEMS_DB_PATH, "utf-8"));
    } else {
      const rawRes = await fetch(`${ASSETS_BASE}/items_database.json`);
      raw = await rawRes.json();
    }
    const ids = Object.keys(raw);
    const names = ids.map((id) => raw[id].name?.zh_tw || "");
    const descs = ids.map((id) => raw[id].description?.official_clean || raw[id].description?.official || "");

    // Collect all Chinese names and descriptions into combined blocks to prevent shifting
    const combined = ids.map((id, i) => `${names[i]} [DESC] ${descs[i]}`);

    console.log(`[build-db] Translating ${ids.length} item data blocks (Name + Desc)...`);
    const translatedBlocks = await translateAll(combined, 10, 150);

    const translatedItems: Record<string, { name_en: string; description_en: string }> = {};
    ids.forEach((id, i) => {
      const block = translatedBlocks[i] || combined[i];
      const [nameEN, descEN] = block.split("[DESC]").map(s => s.trim());
      translatedItems[id] = {
        name_en: nameEN || names[i],
        description_en: descEN || descs[i],
      };
    });

    writeFileSync(ITEMS_OUT, JSON.stringify(translatedItems, null, 2));
    results.items = { count: ids.length, file: ITEMS_OUT };
    console.log(`[build-db] Items saved to ${ITEMS_OUT}`);
  }

  // ── TRANSLATE MONSTERS ────────────────────────────────────
  if (target === "monsters" || target === "both") {
    console.log("[build-db] Loading monsters...");
    let raw: Record<string, any> = {};
    if (existsSync(MONSTERS_DB_PATH)) {
      raw = JSON.parse(readFileSync(MONSTERS_DB_PATH, "utf-8"));
    } else {
      const rawRes = await fetch(`${ASSETS_BASE}/monsters_display_index.json`);
      raw = await rawRes.json();
    }
    const ids = Object.keys(raw).filter((id) => !raw[id].name?.en);

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
