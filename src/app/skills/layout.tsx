import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Database",
  description: "Search and learn about every skill in Ragnarok Zero.",
  keywords: "ragnarok zero skills, skill tree, skill descriptions".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
