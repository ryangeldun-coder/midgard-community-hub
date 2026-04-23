import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hunter & Sniper Guide | Ragnarok Zero Global Academy",
  description: "Master the Hunter class in Ragnarok Zero. Precise Double Strafe sniping, Auto-Blitz Falconer, and Memorial Dungeon trap strategies.",
  keywords: ["Ragnarok Zero", "Hunter Guide", "Sniper Build", "Double Strafe", "Falconer", "TWROZ Hunter"],
};

export default function HunterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
