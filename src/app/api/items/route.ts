import { NextResponse } from "next/server";
import { getItems } from "@/lib/database";

// Maps filter group name to the Chinese category prefixes we match against
const GROUP_PREFIXES: Record<string, string[]> = {
  "Consumable": ["消耗"],
  "Weapon":     ["武器"],
  "Armor":      ["防具"],
  "Card":       ["卡片"],
  "Material":   ["材料"],
  "Costume":    ["服飾"],
  "Ammo":       ["箭矢"],
  "Special":    ["特殊", "任務", "寵物"],
};

function matchesGroup(category: string, group: string): boolean {
  if (group === "All" || !group) return true;
  const prefixes = GROUP_PREFIXES[group];
  if (!prefixes) return false;
  return prefixes.some((p) => category.startsWith(p) || category === p);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const group  = searchParams.get("group") || "All";
  const page   = parseInt(searchParams.get("page") || "1");
  const limit  = parseInt(searchParams.get("limit") || "60");

  try {
    let items = await getItems();

    // Server-side category group filter
    if (group && group !== "All") {
      items = items.filter((i) => matchesGroup(i.category, group));
    }

    // Text search
    if (search) {
      items = items.filter(
        (i) =>
          i.name_zh.toLowerCase().includes(search) ||
          i.name_en.toLowerCase().includes(search)
      );
    }

    const total = items.length;
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);

    return NextResponse.json({ items: paginated, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
