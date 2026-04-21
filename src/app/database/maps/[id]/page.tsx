import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMaps } from "@/lib/database";
import MapDetails from "@/components/database/MapDetails";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const maps = await getMaps();
  const map = maps.find((m) => m.id === id);

  if (!map) return { title: "Map Not Found | Ragnarok Zero Global" };

  const monsterList = map.monsters.slice(0, 5).map(m => m.name).join(", ");
  const description = `Explore ${map.name_en} (${map.name_zh}) in Ragnarok Zero Global. Monsters: ${monsterList}. View spawn details and monster list.`;

  return {
    title: `${map.name_en} Map & Monster Spawns | Ragnarok Zero Global`,
    description,
    openGraph: {
      title: `${map.name_en} - Ragnarok Zero Map Database`,
      description,
      type: "website",
    },
  };
}

export default async function MapPage({ params }: Props) {
  const { id } = await params;
  const maps = await getMaps();
  const map = maps.find((m) => m.id === id);

  if (!map) notFound();

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link 
          href="/database/maps" 
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#64748b", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}
          className="hover-link"
        >
          <ChevronLeft size={18} /> Back to Map Database
        </Link>
      </div>

      <MapDetails map={map} />

      <section style={{ marginTop: "4rem", padding: "2rem", borderTop: "1px solid #f1f5f9" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem" }}>SEO Context: {map.name_en}</h2>
        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.8" }}>
          Welcome to the detailed map guide for <strong>{map.name_en}</strong> in the Ragnarok Zero Global database. 
          This map, known in original TWRo Zero as <em>{map.name_zh}</em>, is home to various creatures including {map.monsters.map(m => m.name).join(", ")}. 
          Finding the best spot to level or hunt for specific drops is crucial for progressing in RO Zero. 
          Use this interactive map index to verify all monster spawns and navigate the world of Midgard more efficiently. 
          The Midgard Community Hub aims to provide the most accurate and translated data for the Ragnarok Zero community.
        </p>
      </section>
    </main>
  );
}
