import { getItem } from "@/lib/database";
import ItemDetails from "@/components/database/ItemDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(parseInt(id));
  
  if (!item) return { title: "Item Not Found" };

  const title = `${item.name_en} Database & Sources | Ragnarok Zero Global`;
  const description = `${item.name_en} (${item.category}): ${item.description.slice(0, 120)}... weight: ${item.weight}, slots: ${item.slots}. Found in Ragnarok Zero Global Database.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [item.icon_url],
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
      <Link href="/database/items" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", marginBottom: "1.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
        <ChevronLeft size={16} /> Back to Items
      </Link>
      
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
