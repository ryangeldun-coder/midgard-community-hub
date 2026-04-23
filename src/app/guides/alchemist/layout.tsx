import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alchemist & Biochemist Guide | Ragnarok Zero Global Academy",
  description: "Master the Alchemist class in Ragnarok Zero. Expert Homunculus farming, Acid Bomber support, and Pure Brewer economics.",
  keywords: ["Ragnarok Zero", "Alchemist Guide", "Biochemist Build", "Homunculus", "Acid Terror", "TWROZ Alchemist"],
};

export default function AlchemistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
