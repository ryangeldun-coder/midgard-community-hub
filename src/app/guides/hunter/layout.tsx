import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hunter Swift Sentinel Build Guide",
  description: "The ultimate low-cost farming guide for Hunter in Ragnarok Zero. Master ASPD, Double Strafe, and elemental arrow strategies for maximum Zeny gains.",
};

export default function HunterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
