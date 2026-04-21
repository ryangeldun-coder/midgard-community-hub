import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memorial Dungeon Guides",
  description: "Strategy guides for Ragnarok Zero memorial dungeons and instances. Learn mechanics, monster spawns, and reward lists.",
};

export default function DungeonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
