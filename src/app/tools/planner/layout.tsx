import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Stat & Skill Planner",
  description: "Plan your ultimate Ragnarok Zero build. Simulate stats and skills with our character planner before investing your points in-game.",
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
