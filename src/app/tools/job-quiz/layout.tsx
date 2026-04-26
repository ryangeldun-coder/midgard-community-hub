import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Picker Quiz",
  description: "Don't know what class to play in Ragnarok Zero? Take our personality quiz to find your perfect job.",
  keywords: "ragnarok zero classes, what class to play, ro class picker".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
