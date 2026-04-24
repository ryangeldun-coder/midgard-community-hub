import { getMonsters } from "@/lib/database";
import MonstersClient from "@/components/database/MonstersClient";

export const metadata = {
  title: "Ragnarok Zero Monster Database | Midgard Community Hub",
  description: "Complete TWRoZ monster compendium for Ragnarok Zero Global. Check HP, EXP, elemental weaknesses, and detailed drop tables for over 300 monsters.",
};

export default async function MonstersPage() {
  const allMonsters = await getMonsters();
  const initialTotal = allMonsters.length;
  const initialMonsters = allMonsters.slice(0, 48);
  const initialPages = Math.ceil(initialTotal / 48);

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>
          Monster Database
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Complete TWRoZ monster compendium — {initialTotal.toLocaleString()} monsters indexed
        </p>
      </div>

      <MonstersClient 
        initialMonsters={initialMonsters} 
        initialTotal={initialTotal} 
        initialPages={initialPages} 
      />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Monster Database</strong> is your essential guide for hunting and leveling in Ragnarok Zero Global. 
          We provide comprehensive statistics for thousands of monsters, including health (HP), base and job experience, 
          elemental weaknesses, and race classifications. 
        </p>
      </section>
    </main>
  );
}
