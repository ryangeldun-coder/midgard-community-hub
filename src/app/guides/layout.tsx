import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Guides & Builds",
  description: "Complete guides for all classes in Ragnarok Zero. Leveling paths, skill builds, and equipment.",
  keywords: "ragnarok zero guides, class builds, leveling guides".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
