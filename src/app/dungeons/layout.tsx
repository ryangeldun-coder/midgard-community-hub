import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memorial Dungeons",
  description: "Complete guides to Memorial Dungeons in Ragnarok Zero.",
  keywords: "ragnarok zero dungeons, memorial dungeons, instances".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
