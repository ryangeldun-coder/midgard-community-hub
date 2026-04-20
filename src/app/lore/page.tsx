import { getLatestVideos } from "@/lib/youtube";
import LoreList from "@/components/lore/LoreList";

export const metadata = {
  title: "Lore Archives | Midgard Community Hub",
  description: "Digital scrolls preserving the hidden history of Midgard Zero. Curated by Ryan Geldun.",
};

export default async function LorePage() {
  const videos = await getLatestVideos("UCjFHiVC_IzVBPpXJ4Ao3_gA", 10);

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ro-red)', marginBottom: '0.5rem' }}>
          Lore Archives
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
          Digital scrolls preserving the hidden history of Midgard Zero.
        </p>
      </header>

      <LoreList initialVideos={videos} />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Explore the rich history of the world with the <strong>Ragnarok Zero Lore Archives</strong>. Curated by <strong>Ryan Geldun</strong>, our collection of video deep-dives covers everything from the dark origins of the Bio Labs to the mythologies of Midgard's most iconic bosses. Understanding the story behind the game adds a new layer of depth to your journey through TWRoZ. Our archives are constantly updated with new research and storytelling, ensuring that the legacy of Ragnarok is preserved for all adventurers.
        </p>
      </section>
    </main>
  );
}
