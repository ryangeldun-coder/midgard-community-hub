import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dressing Room Simulator | Midgard Community Hub",
  description: "Preview Ragnarok Zero costume headgears and robes from real game sprites. Mix and match to plan your look.",
  keywords: "ragnarok zero costumes, headgear preview, dressing room, robe simulator, costume planner".split(", "),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
