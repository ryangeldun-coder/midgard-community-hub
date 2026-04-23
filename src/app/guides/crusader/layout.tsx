import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crusader & Paladin Guide | Ragnarok Zero Global Academy",
  description: "Master the Crusader class in Ragnarok Zero. Expert builds for Grand Cross Exorcism, Shield Reflect Tanking, and Holy Cross DPS.",
  keywords: ["Ragnarok Zero", "Crusader Guide", "Paladin Build", "Grand Cross", "Shield Reflect", "TWROZ Crusader"],
};

export default function CrusaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
