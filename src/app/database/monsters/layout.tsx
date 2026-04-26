import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monster Database",
  description: "Complete Ragnarok Zero monster database with precise TWRoZ stats, spawn locations, and drops.",
  keywords: "ragnarok zero monsters, twroz monster database, monster stats".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
