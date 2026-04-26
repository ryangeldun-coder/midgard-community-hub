import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refine Simulator",
  description: "Test your luck with authentic Ragnarok Zero refine rates. Support for Elunium, Oridecon, Zelunium, Shadowdecon and BSB.",
  keywords: "ragnarok zero refine, twroz refine rate, bsb simulator, zelunium, shadowdecon".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
