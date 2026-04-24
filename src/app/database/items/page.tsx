import { getItems } from "@/lib/database";
import ItemsClient from "@/components/database/ItemsClient";
import { Package } from "lucide-react";

export const metadata = {
  title: "Ragnarok Zero Item Database | Midgard Community Hub",
  description: "Browse over 5,000 items from Ragnarok Zero Global (TWRo Zero). Detailed stats, drop rates, and equipment descriptions translated into English.",
};

export default async function ItemsPage() {
  // Fetch initial data on the server
  const allItems = await getItems();
  const initialTotal = allItems.length;
  const initialItems = allItems.slice(0, 60);
  const initialPages = Math.ceil(initialTotal / 60);

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>Item Database</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Complete TWRoZ item compendium — {initialTotal.toLocaleString()} items indexed</p>
      </div>

      <ItemsClient 
        initialItems={initialItems} 
        initialTotal={initialTotal} 
        initialPages={initialPages} 
      />

      {/* SEO Section - Hidden for users but visible for bots */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Our <strong>Ragnarok Zero Item Database</strong> indexes over 5,000 items found in the Ragnarok Zero Global universe. 
          Every item name and description has been translated into English to provide clarity on equipment stats, 
          consumable effects, and crafting requirements. Use our search tool to find where items drop or which monsters 
          carry the gear you need for your build. 
        </p>
      </section>
    </main>
  );
}
