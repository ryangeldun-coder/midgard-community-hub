import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sage & Scholar Guide | Ragnarok Zero Global Academy",
  description: "Master the Sage class in Ragnarok Zero. Auto-Spell Battle Mage, Party Elemental Endows, and Magic Control meta.",
  keywords: ["Ragnarok Zero", "Sage Guide", "Scholar Build", "Auto-Spell", "Elemental Endow", "TWROZ Sage"],
};

export default function SageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
