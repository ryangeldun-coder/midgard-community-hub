import AlchemistCalculator from "@/components/tools/AlchemistCalculator";

export default function BrewingPage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <AlchemistCalculator />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Alchemist Brewing Calculator</strong> is the definitive tool for Creators and Alchemists. Accurately predict your success rates for brewing Red Slimes, White Potions, and advanced TWRoZ concoctions. By factoring in your base level, job level, and stat distribution (INT, DEX, LUK), you can find the perfect balance for maximum production efficiency. Perfect for commercial brewers looking to minimize waste and maximize their profit margins in the Midgard economy.
        </p>
      </section>
    </main>
  );
}
