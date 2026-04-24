import { getMonster } from "@/lib/database";
import MonsterDetails from "@/components/database/MonsterDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const monster = await getMonster(parseInt(id));
  
  if (!monster) return { title: "Monster Not Found" };

  const title = `${monster.name_en} Stats, Drops & Locations | Ragnarok Zero Global`;
  const description = `Detailed stats for ${monster.name_en} (Lv.${monster.level}) in Ragnarok Zero Global. Check HP, Element, Race and full drop table for ${monster.name_en}.`;
  const canonical = `https://midgardhub.com/database/monsters/${id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: monster.image_url, width: 200, height: 200 }],
      type: 'article'
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
      <Breadcrumbs 
        items={[
          { label: "Database", href: "/database/monsters" },
          { label: "Monsters", href: "/database/monsters" },
          { label: monster.name_en }
        ]} 
      />
      
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
