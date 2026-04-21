import { getMonster } from "@/lib/database";
import MonsterDetails from "@/components/database/MonsterDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const monster = await getMonster(parseInt(id));
  
  if (!monster) return { title: "Monster Not Found" };

  const title = `${monster.name_en} Stats & Drops | Ragnarok Zero Global Database`;
  const description = `${monster.name_en} (${monster.name_zh}) Stats: Lv.${monster.level}, HP: ${monster.hp.toLocaleString()}, Element: ${monster.element}. Drops: ${monster.drops.slice(0, 5).map(d => d.name).join(", ")}. Part of the Midgard Community Hub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [monster.image_url],
    },
  };
}

export default async function MonsterPage({ params }: Props) {
  const { id } = await params;
  const monster = await getMonster(parseInt(id));

  if (!monster) notFound();

  const baseUrl = 'https://midgardhub.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GameContent",
    "name": monster.name_en,
    "alternateName": monster.name_zh,
    "description": `Detailed statistics and drop table for ${monster.name_en} in Ragnarok Zero Global.`,
    "url": `${baseUrl}/database/monsters/${id}`,
    "image": monster.image_url,
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "HP", "value": monster.hp },
      { "@type": "PropertyValue", "name": "Level", "value": monster.level },
      { "@type": "PropertyValue", "name": "Element", "value": `${monster.element} (Level ${monster.element_level})` },
      { "@type": "PropertyValue", "name": "Race", "value": monster.race },
      { "@type": "PropertyValue", "name": "Size", "value": monster.size },
    ]
  };

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/database/monsters" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", marginBottom: "1.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
        <ChevronLeft size={16} /> Back to Monsters
      </Link>
      
      <MonsterDetails monster={monster} />
      
      {/* Footer SEO context */}
      <div style={{ marginTop: "3rem", padding: "2rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
          You are viewing the detailed entry for <strong>{monster.name_en}</strong> in the Midgard Community Hub. 
          This data is synchronized with the latest <strong>Ragnarok Zero Global</strong> and <strong>TWRo Zero</strong> patches. 
          Use this information to plan your leveling routes, farm specific materials, or optimize your damage against {monster.element} type monsters.
        </p>
      </div>
    </main>
  );
}
