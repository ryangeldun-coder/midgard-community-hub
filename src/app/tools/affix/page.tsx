import AffixSimulator from "@/components/tools/AffixSimulator";

export const metadata = {
  title: "Zero Gear Affix Simulator | Midgard Community Hub",
  description: "Explore all possible random options and affixes for gear in Ragnarok Zero. Monster drops, MVP drops, forging, and activation system pools.",
};

export default function AffixPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <AffixSimulator />
      
      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Affix Simulator</strong> (Random Options Database) is the most comprehensive tool for exploring gear enchantments in <strong>Ragnarok Zero Global</strong>. Based on <strong>TWRo Zero</strong> data, our simulator covers all possible random options from <strong>Monster Drops</strong>, <strong>MVP Drops</strong>, <strong>Blacksmith Forging</strong>, and the <strong>Activation System</strong>. Learn which random affixes can roll on your melee weapons, ranged gear, magic staves, or armors. Each slot is clearly detailed with its respective stat ranges (like ATK, ASPD, and Boss damage bonuses), helping you plan your ultimate gear build. Master the random affix system and dominate the leaderboards with Midgard Community Hub.
        </p>
      </section>
    </div>
  );
}
