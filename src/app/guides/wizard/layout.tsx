import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wizard Elemental Master Build Guide",
  description: "Master AoE leveling and elemental supremacy for Wizard in Ragnarok Zero. Strategies for Storm Gust, Heaven's Drive, and infinite SP management.",
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
