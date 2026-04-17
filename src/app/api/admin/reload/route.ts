import { NextResponse } from "next/server";
import { invalidateCache } from "@/lib/database";

export async function POST() {
  invalidateCache();
  return NextResponse.json({ success: true, message: "Cache cleared — next request will reload all data with translations." });
}
