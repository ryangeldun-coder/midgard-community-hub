import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monster Database",
  description: "Complete Ragnarok Zero monster compendium with stats, drops, and spawn locations. Translated to English from TWRo Zero data.",
};

export default function MonstersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
