import { NextResponse } from "next/server";
import { getMaps } from "@/lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    let maps = await getMaps();

    if (search) {
      maps = maps.filter(
        (m) =>
          m.name_en.toLowerCase().includes(search) ||
          m.name_zh.includes(search) ||
          m.id.toLowerCase().includes(search)
      );
    }

    const total = maps.length;
    const start = (page - 1) * limit;
    const paginated = maps.slice(start, start + limit);

    return NextResponse.json({
      maps: paginated,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch maps" }, { status: 500 });
  }
}
