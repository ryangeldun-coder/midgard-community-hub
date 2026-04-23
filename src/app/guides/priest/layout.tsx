import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Priest & High Priest Guide | Ragnarok Zero Global Academy",
  description: "Master the Priest class in Ragnarok Zero. Expert support builds, Holy Light exorcism meta, and Battle Priest ASPD strategies.",
  keywords: ["Ragnarok Zero", "Priest Guide", "High Priest Build", "Holy Light", "Full Support", "TWROZ Priest"],
};

export default function PriestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
