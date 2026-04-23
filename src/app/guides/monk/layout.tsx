import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monk & Champion Guide | Ragnarok Zero Global Academy",
  description: "Master the Monk class in Ragnarok Zero. Expert Asura Strike BOSS hunting, Combo leveling, and Spirit Sphere farming meta.",
  keywords: ["Ragnarok Zero", "Monk Guide", "Champion Build", "Asura Strike", "Finger Offensive", "TWROZ Monk"],
};

export default function MonkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
