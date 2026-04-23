import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blacksmith & Mastersmith Guide | Ragnarok Zero Global Academy",
  description: "Master the Blacksmith class in Ragnarok Zero. Economic dominance with Greed, high-burst Mammonite combat, and Pure Forger meta.",
  keywords: ["Ragnarok Zero", "Blacksmith Guide", "Mastersmith Build", "Greed Farming", "Mammonite", "TWROZ Blacksmith"],
};

export default function BlacksmithLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
