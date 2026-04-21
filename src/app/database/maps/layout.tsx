import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map Database",
  description: "Navigate Midgard with our Ragnarok Zero map database. Find monster spawns, NPC locations, and field connections.",
};

export default function MapsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
