import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wizard & High Wizard Guide | Ragnarok Zero Global Academy",
  description: "Master the Wizard class in Ragnarok Zero. Expert AoE strategies, Bolt sniping meta, and Soul Drain sustainability for TWROZ.",
  keywords: ["Ragnarok Zero", "Wizard Guide", "High Wizard Build", "Storm Gust", "Meteor Storm", "TWROZ Wizard"],
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
