import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refine Simulator",
  description: "Test your luck with the Ragnarok Zero refine simulator. Simulate Zelunium and Shadowdecon refine rates with accurate server mechanics.",
};

export default function RefineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
