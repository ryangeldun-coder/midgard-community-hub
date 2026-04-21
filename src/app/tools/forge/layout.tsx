import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blacksmith Forge Calculator",
  description: "Calculate weapon forging success rates for Blacksmiths and Whitesmiths in Ragnarok Zero. Includes star crumb and elemental ore modifiers.",
};

export default function ForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
