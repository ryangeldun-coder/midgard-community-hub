import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bard & Dancer Guide | Ragnarok Zero Global Academy",
  description: "Master the Bard & Dancer classes in Ragnarok Zero. Expert Poem of Bragi support, Arrow Vulcan burst, and Gypsy Kiss meta.",
  keywords: ["Ragnarok Zero", "Bard Guide", "Dancer Guide", "Poem of Bragi", "Arrow Vulcan", "TWROZ Bard"],
};

export default function BardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
