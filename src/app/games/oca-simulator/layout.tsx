import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OCA Simulator",
  description: "Simulate opening Old Card Albums and test your luck for MVP cards.",
  keywords: "ragnarok oca simulator, old card album rates, mvp cards".split(", ")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
