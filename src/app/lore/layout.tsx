import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lore Archives",
  description: "Explore the deep history and legends of Midgard. Our Ragnarok Zero lore archives cover the origins of gods, monsters, and kingdoms.",
};

export default function LoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
