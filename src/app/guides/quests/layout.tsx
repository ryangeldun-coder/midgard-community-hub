import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ragnarok Zero Main Quest Guide | Midgard Epic Path",
  description: "Complete TWROZ-optimized main quest guide for Ragnarok Zero. Level 1-99 progression, Regional Coin farming, and Paradise Group quest integration.",
  keywords: ["Ragnarok Zero", "Main Quest", "Epic Quest", "TWROZ Guide", "Paradise Group", "Eden Quests", "Regional Coins"],
};

export default function QuestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
