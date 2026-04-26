import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fever Fields",
  description: "Fever Maps mechanics, drops, and champion monster stats in Ragnarok Zero.",
  keywords: "ragnarok zero fever fields, fever maps, fever gear".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
