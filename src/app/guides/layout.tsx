import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midgard Academy | Ragnarok Zero Class Guides",
  description: "Expert class guides and builds for Ragnarok Zero. Mastering Knight, Assassin, Wizard, and more with strategies from the global TWRO and KRO communities.",
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
