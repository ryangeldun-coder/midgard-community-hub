import { NextResponse } from "next/server";
import { getMonsters } from "@/lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const element = searchParams.get("element") || "";
  const race = searchParams.get("race") || "";
  const size = searchParams.get("size") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    let monsters = await getMonsters();

    if (search) {
      monsters = monsters.filter(
        (m) =>
          m.name_en.toLowerCase().includes(search) ||
          m.name_zh.includes(search)
      );
    }
    if (element) monsters = monsters.filter((m) => m.element === element);
    if (race) monsters = monsters.filter((m) => m.race === race);
    if (size) monsters = monsters.filter((m) => m.size === size);

    const total = monsters.length;
    const start = (page - 1) * limit;
    const paginated = monsters.slice(start, start + limit);

    return NextResponse.json({
      monsters: paginated,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch monsters" }, { status: 500 });
  }
}
