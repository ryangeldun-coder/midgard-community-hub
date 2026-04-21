import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Item Database",
  description: "Comprehensive Ragnarok Zero item database. Search for equipment, cards, and consumables with full English translations and drop data.",
};

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
