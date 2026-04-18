import ForgeSimulator from "@/components/tools/ForgeSimulator";

export const metadata = {
  title: "Blacksmith Forge Simulator | Midgard Community Hub",
  description: "TWRoZ Blacksmith and Whitesmith forging success rate calculator. Find optimal DEX/LUK stats, expected output, and quality breakdown.",
};

export default function ForgePage() {
  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>
          Blacksmith Forge
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Calculate weapon forging success rates, expected output, and item quality for TWRoZ.
        </p>
      </div>
      <ForgeSimulator />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Master the art of weapon crafting with our <strong>Ragnarok Zero Forge Simulator</strong>. Designed for Blacksmiths and Whitesmiths, this calculator determines your success rates based on your character's DEX and LUK stats, job level, and the materials used. Whether you're forging level 1 weapons or high-tier elemental blades, our tool helps you understand the probability of success before you commit your precious materials. Optimize your crafting build and become the most legendary smith in Midgard.
        </p>
      </section>
    </main>
  );
}
