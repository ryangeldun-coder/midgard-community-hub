import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alchemist Brewing Calculator",
  description: "Calculate exact brewing success rates for Alchemist and Creator in Ragnarok Zero.",
  keywords: "alchemist brewing calculator, ragnarok zero potion creation, creator brewing".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
