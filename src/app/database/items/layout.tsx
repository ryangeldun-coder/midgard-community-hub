import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Item Database",
  description: "Search thousands of items, weapons, and armors in the Ragnarok Zero database.",
  keywords: "ragnarok zero items, twroz item database, item drops".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
