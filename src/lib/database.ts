import {
  translateElement,
  translateRace,
  translateSize,
  translateSpecialStatus,
  translateEquipSlot,
  translateZone,
  translateItemName,
} from "@/lib/translations";
import { getItemNameEN } from "@/lib/item-names";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ITEMS_TRANSLATED_PATH   = join(process.cwd(), "src", "data", "items-translated.json");
const MONSTERS_TRANSLATED_PATH = join(process.cwd(), "src", "data", "monsters-translated.json");

let itemsTranslated:   Record<string, { name_en: string; description_en: string }> | null = null;
let monstersTranslated: Record<string, { name_en: string }> | null = null;

function loadTranslations() {
  // Always reload from disk to pick up newly written files
  if (!itemsTranslated && existsSync(ITEMS_TRANSLATED_PATH)) {
    try { itemsTranslated = JSON.parse(readFileSync(ITEMS_TRANSLATED_PATH, "utf-8")); } catch {}
  }
  if (!monstersTranslated && existsSync(MONSTERS_TRANSLATED_PATH)) {
    try { monstersTranslated = JSON.parse(readFileSync(MONSTERS_TRANSLATED_PATH, "utf-8")); } catch {}
  }
}

/** Call this to force a full cache reset (e.g. after generating new translations) */
export function invalidateCache() {
  monstersCache = null;
  itemsCache    = null;
  lastFetched   = 0;
  itemsTranslated   = null;
  monstersTranslated = null;
}

const ASSETS_BASE = "https://assets.twroz.wiki";

// In-memory cache to avoid repeated fetches
let monstersCache: Record<string, Monster> | null = null;
let itemsCache: Record<string, Item> | null = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

export interface MonsterDrop {
  item_id: number;
  name: string;
  rate: number | string;
  icon_url: string;
  slot: string;
  card_prefix_name: string;
}

export interface MonsterSpawn {
  map_name: string;
  description: string;
}

export interface MonsterSkill {
  SkillNameComment: string;
  SkillNameZhTW: string;
  SkillID: number;
  SkillLv: number;
  Rate: string;
  State: string;
}

export interface Monster {
  id: number;
  name_en: string;
  name_zh: string;
  released: boolean;
  is_valid: boolean;
  level: number;
  element: string;
  element_level: number;
  race: string;
  size: string;
  hp: number;
  defense: number;
  magic_defense: number;
  base_exp: number;
  job_exp: number;
  attack_min: number;
  attack_max: number;
  flee_95: number;
  hit_100: number;
  image_url: string;
  special_status: string[];
  drops: MonsterDrop[];
  spawns: MonsterSpawn[];
  skills: MonsterSkill[];
}

export interface ItemDrop {
  monster_id: number;
  monster_name: string;
  rate: number;
  image_url: string;
}

export interface Item {
  id: number;
  name_en: string;
  name_zh: string;
  category: string;
  slot: string;
  description: string;
  icon_url: string;
  slots: number;
  attack: number;
  defense: number;
  weapon_level: number;
  required_level: number;
  weight: number;
  buy_price: number;
  sell_price: number;
  equip_jobs: string;
  can_trade: boolean;
  costume: boolean;
  card_prefix_name: string;
  dropped_by: ItemDrop[];
}

function transformMonster(id: string, raw: any): Monster {
  loadTranslations();
  const translated = monstersTranslated?.[id];
  const nameFromRaw = raw.name?.en?.trim() || "";
  const nameEN = nameFromRaw || translated?.name_en || raw.name?.zh_tw || "";
  return {
    id: raw.id ?? parseInt(id),
    name_en: nameEN,
    name_zh: raw.name?.zh_tw || "",
    released: raw.released ?? true,
    is_valid: raw.is_valid ?? true,
    level: raw.basic_info?.level ?? 0,
    element: translateElement(raw.basic_info?.element?.type ?? ""),
    element_level: raw.basic_info?.element?.level ?? 1,
    race: translateRace(raw.basic_info?.race ?? ""),
    size: translateSize(raw.basic_info?.size ?? ""),
    hp: raw.stats?.hp ?? 0,
    defense: raw.stats?.defense ?? 0,
    magic_defense: raw.stats?.magic_defense ?? 0,
    base_exp: raw.stats?.exp?.base ?? 0,
    job_exp: raw.stats?.exp?.job ?? 0,
    attack_min: raw.stats?.attack?.min ?? 0,
    attack_max: raw.stats?.attack?.max ?? 0,
    flee_95: raw.stats?.flee_95_percent ?? 0,
    hit_100: raw.stats?.hit_100_percent ?? 0,
    image_url: `${ASSETS_BASE}${raw.image_url.startsWith("/") ? raw.image_url : "/" + raw.image_url}`,
    special_status: translateSpecialStatus(raw.special_status ?? []),
    drops: (raw.drops ?? []).map((d: any) => ({
      item_id: d.item_id,
      name: getItemNameEN(d.item_id, translateItemName(d.name) || d.name),
      rate: d.rate,
      icon_url: `${ASSETS_BASE}/${d.icon_url}`,
      slot: translateEquipSlot(d.slot ?? ""),
      card_prefix_name: d.card_prefix_name,
    })),
    spawns: (raw.spawns ?? []).map((s: any) => ({
      map_name: s.map_name,
      description: translateZone(s.description) || s.description,
    })),
    skills: raw.skills ?? [],
  };
}

function transformItem(id: string, raw: any): Item {
  loadTranslations();
  const translated = itemsTranslated?.[id];
  const zhName = raw.name?.zh_tw || "";
  const nameEN = translated?.name_en || getItemNameEN(raw.id ?? parseInt(id), translateItemName(zhName) || zhName);
  const descEN = translated?.description_en || raw.description?.official_clean || raw.description?.official || "";
  return {
    id: raw.id ?? parseInt(id),
    name_en: nameEN,
    name_zh: zhName,
    category: raw.category || "",
    slot: translateEquipSlot(raw.slot || ""),
    description: descEN,
    icon_url: `${ASSETS_BASE}${raw.icon_url || `/images/items/${id}.gif`}`,
    slots: raw.slotCount ?? 0,
    attack: raw.attack ?? 0,
    defense: raw.defense ?? 0,
    weapon_level: raw.weapon_level ?? 0,
    required_level: raw.required_level ?? 0,
    weight: raw.attributes?.weight ?? 0,
    buy_price: raw.attributes?.buy_price ?? 0,
    sell_price: raw.attributes?.sell_price ?? 0,
    equip_jobs: raw.equip_jobs || "",
    can_trade: raw.can_trade ?? true,
    costume: raw.costume ?? false,
    card_prefix_name: raw.card_prefix_name || "",
    dropped_by: (raw.dropped_by ?? []).map((d: any) => ({
      monster_id: d.monster_id,
      monster_name: d.monster_name,
      rate: d.rate,
      image_url: `${ASSETS_BASE}/${d.image_url}`,
    })),
  };
}

async function fetchAndCache() {
  const now = Date.now();
  if (monstersCache && itemsCache && now - lastFetched < CACHE_TTL) return;

  try {
    const [monstersRes, itemsRes] = await Promise.all([
      fetch(`${ASSETS_BASE}/monsters_display_index.json`, { next: { revalidate: 21600 } }),
      fetch(`${ASSETS_BASE}/items_database.json`, { next: { revalidate: 21600 } }),
    ]);

    const rawMonsters = await monstersRes.json();
    const rawItems = await itemsRes.json();

    monstersCache = {};
    for (const [id, data] of Object.entries(rawMonsters)) {
      const monster = transformMonster(id, data);
      if (monster.is_valid && monster.released) {
        monstersCache[id] = monster;
      }
    }

    itemsCache = {};
    for (const [id, data] of Object.entries(rawItems)) {
      itemsCache[id] = transformItem(id, data);
    }

    lastFetched = now;
  } catch (err) {
    console.error("Failed to fetch wiki data:", err);
    if (!monstersCache) monstersCache = {};
    if (!itemsCache) itemsCache = {};
  }
}

export async function getMonsters(): Promise<Monster[]> {
  await fetchAndCache();
  return Object.values(monstersCache ?? {}).sort((a, b) => a.level - b.level);
}

export async function getMonster(id: number): Promise<Monster | null> {
  await fetchAndCache();
  return monstersCache?.[id.toString()] ?? null;
}

export async function getItems(): Promise<Item[]> {
  await fetchAndCache();
  return Object.values(itemsCache ?? {});
}

export async function getItem(id: number): Promise<Item | null> {
  await fetchAndCache();
  return itemsCache?.[id.toString()] ?? null;
}
