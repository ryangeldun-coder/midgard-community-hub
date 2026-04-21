import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alchemist Brewing Calculator",
  description: "Advanced success rate calculator for Alchemist and Creator potion brewing in Ragnarok Zero. Optimize your pharmacy builds.",
};

export default function BrewingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
