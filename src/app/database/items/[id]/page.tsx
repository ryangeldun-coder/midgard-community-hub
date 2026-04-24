import { getItem } from "@/lib/database";
import ItemDetails from "@/components/database/ItemDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(parseInt(id));
  
  if (!item) return { title: "Item Not Found" };

  const title = `${item.name_en} Stats & Database | Ragnarok Zero Global`;
  const description = `${item.name_en} (${item.category}): ${item.description.slice(0, 150)}... Find drop sources and stats for ${item.name_en} on Ragnarok Zero Global Database.`;
  const canonical = `https://midgardhub.com/database/items/${id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: item.icon_url, width: 100, height: 100 }],
      type: 'article'
    },
  };
}

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(parseInt(id));

  if (!item) notFound();

  const baseUrl = 'https://midgardhub.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": item.name_en,
    "image": item.icon_url,
    "description": item.description,
    "brand": {
      "@type": "Brand",
      "name": "Ragnarok Zero Global"
    },
    "category": item.category,
    "sku": item.id,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "Zeny"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Weight", "value": item.weight },
      { "@type": "PropertyValue", "name": "Slots", "value": item.slots },
      { "@type": "PropertyValue", "name": "Required Level", "value": item.required_level },
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
          { label: "Database", href: "/database/items" },
          { label: "Items", href: "/database/items" },
          { label: item.name_en }
        ]} 
      />
      
      <ItemDetails item={item} />

      {/* Footer SEO context */}
      <div style={{ marginTop: "3rem", padding: "2rem", background: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
          Detailed item information for <strong>{item.name_en}</strong>. Part of the comprehensive <strong>Ragnarok Zero Global</strong> item database on Midgardhub.com. 
          Check drop rates, monster sources, and equipment stats translated directly from TWRo Zero.
        </p>
      </div>
    </main>
  );
}
