import AffixSimulator from "@/components/tools/AffixSimulator";

export const metadata = {
  title: "Zero Gear Affix Simulator | Midgard Community Hub",
  description: "Explore all possible random options and affixes for gear in Ragnarok Zero. Monster drops, MVP drops, forging, and activation system pools.",
};

export default function AffixPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <AffixSimulator />
    </div>
  );
}
