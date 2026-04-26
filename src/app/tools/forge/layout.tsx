import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forge Mastery Simulator",
  description: "Blacksmith weapon forging success rate calculator for Ragnarok Zero.",
  keywords: "blacksmith forge rates, ragnarok zero forging, whitesmith crafting".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
