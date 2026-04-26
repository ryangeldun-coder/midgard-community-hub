import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Element Table",
  description: "Ragnarok Zero elemental damage modifiers and property tables.",
  keywords: "ragnarok zero elements, element table, elemental damage modifiers".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
