import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ragnarok Online geoguesser - Midgard Scout",
  description: "Test your knowledge of Midgard in the ultimate Ragnarok Online geoguesser challenge. Identify over 100 classic locations and become a Legendary Scout.",
  keywords: ["Ragnarok Online geoguesser", "RO geoguesser", "Midgard Scout", "Ragnarok Online game", "Ragnarok quiz"],
};

export default function GeoguesserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
