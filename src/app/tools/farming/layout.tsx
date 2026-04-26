import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farming Optimizer",
  description: "Find the best zeny farming spots in Ragnarok Zero.",
  keywords: "ragnarok zero farming, best zeny spots, zeny guide".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
