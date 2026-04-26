import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lore Archives",
  description: "Dive into the deep lore and stories of Midgard in Ragnarok Zero.",
  keywords: "ragnarok zero lore, ragnarok story, midgard history".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
