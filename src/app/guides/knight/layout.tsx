import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knight & Lord Knight Guide | Ragnarok Zero Global Academy",
  description: "Master the Knight class in Ragnarok Zero. Expert builds for Pierce farming, Bowling Bash AGI, and VIT Tanking. Optimized for the TWROZ meta.",
  keywords: ["Ragnarok Zero", "Knight Guide", "Lord Knight Build", "Pierce Knight", "Bowling Bash Zero", "TWROZ Knight"],
};

export default function KnightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
