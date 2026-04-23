import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rogue & Stalker Guide | Ragnarok Zero Global Academy",
  description: "Master the Rogue class in Ragnarok Zero. High-efficiency Gank farming, Plagiarism versatility, and Bow Rogue ranged meta.",
  keywords: ["Ragnarok Zero", "Rogue Guide", "Stalker Build", "Gank Meta", "Plagiarism", "TWROZ Rogue"],
};

export default function RogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
