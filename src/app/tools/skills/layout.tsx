import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Calculator & Simulator",
  description: "Allocate first and second job skill points, test level paths, and map job trees for Ragnarok Zero.",
  keywords: "ragnarok zero skills, skill planner, class skill trees, ragnarok pre-requisites".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
