import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assassin & Assassin Cross Guide | Ragnarok Zero Global Academy",
  description: "Master the Assassin class in Ragnarok Zero. High-burst Sonic Blow, critical hits, and Grimtooth mobbing strategies optimized for TWROZ.",
  keywords: ["Ragnarok Zero", "Assassin Guide", "Assassin Cross Build", "Sonic Blow", "Grimtooth", "TWROZ Assassin"],
};

export default function AssassinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
