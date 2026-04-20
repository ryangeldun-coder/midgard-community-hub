import ElementTable from "@/components/tools/ElementTable";

export const metadata = {
  title: "Elemental Weakness Table | Midgard Community Hub",
  description: "Advanced Ragnarok Zero element damage multipliers for all levels 1-4. Optimize your DPS against any monster.",
};

export default function ElementsPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ro-red)', marginBottom: '0.5rem' }}>
          Elemental Weakness Table
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
          Master the physics of Midgard. Damage multipliers for all 10 elements across 4 levels.
        </p>
      </header>

      <ElementTable />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Elemental Weakness Table</strong> is an essential tool for high-level PvM and PvP. Understanding how <strong>Holy</strong>, <strong>Shadow</strong>, and <strong>Ghost</strong> elements interact at different levels can mean the difference between a successful raid and a total party wipe. Our table covers Level 1 to Level 4 elemental strengths, reflecting the latest <strong>TWRo Zero</strong> mechanics. Whether you're a Wizard choosing the right bolt or a Blacksmith selecting the perfect forged weapon, our interactive chart provides instant clarity on elemental damage multipliers.
        </p>
      </section>
    </main>
  );
}
