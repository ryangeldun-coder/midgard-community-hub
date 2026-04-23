"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Coins, Target, Map, Zap, AlertTriangle, ExternalLink, Globe, TrendingUp, Hammer, ShoppingCart, UserCheck } from "lucide-react";

const FARMING_SPOTS = [
  {
    rank: "S-TIER",
    name: "Ant Hell (PVP Version)",
    level: "30-50",
    summary: "The undisputed king of raw Zeny in TWROZ. Requires a 'PVP Key' to enter. 1.5x mob density and +10% drop rate.",
    loot: ["Zeny (Raw)", "Ant Cards", "Zelunium Ores"]
  },
  {
    rank: "A-TIER",
    name: "Orc Dungeon (Zenorc)",
    level: "60-80",
    summary: "Perfect for Blacksmiths with Greed. The Zenorc fangs sell for high prices to Alchemists, and the raw loot is extremely consistent.",
    loot: ["Zenorc Fangs", "Orc Skeleton Cards", "Elite Ores"]
  },
  {
    rank: "A-TIER",
    name: "Sunken Ship (Hydra/Whisper)",
    level: "40-60",
    summary: "High risk, high reward. Farming for Whisper Cards and Hydra Cards which are essential for PVP and MVP meta in Zero.",
    loot: ["Whisper Card", "Hydra Card", "Steel"]
  }
];

const PROFIT_STRATEGIES = [
  { 
    title: "Random Option Flipping", 
    icon: TrendingUp, 
    desc: "Check every gear drop! In Zero, items with 'Ignore DEF' or 'ASPD +10%' can sell for 10x-50x their base value on the player market." 
  },
  { 
    title: "The Greed Engine", 
    icon: Hammer, 
    desc: "Every serious farmer needs a Blacksmith alt. The 'Greed' skill saves hours of looting and ensures you never miss a drop in crowded Fever maps." 
  },
  { 
    title: "Memorial Fragments", 
    icon: ShoppingCart, 
    desc: "Memorial Dungeons drop fragments used for Shadow Gear. Even if you don't need them, these sell instantly to high-end players." 
  }
];

export default function FarmingGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Zeny Farming Masterclass" }
      ]} />

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(225, 29, 72, 0.1)", color: "var(--ro-red)", borderRadius: "16px" }}>
            <Coins size={32} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Midgard Merchant</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> TWROZ ECONOMY
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>The Ultimate Zeny Farming & Market Strategy</p>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2rem", background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)", border: "1px solid #fde68a", borderRadius: "24px", color: "#92400e", display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <TrendingUp size={24} style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            <strong>MARKET ALERT:</strong> In TWROZ, raw Zeny is only half the battle. Real wealth comes from identifying <strong>High-Value Random Options</strong> and dominating the <strong>PVP Map Fever</strong> cycle.
          </p>
        </div>
      </header>

      {/* Strategy Section */}
      <section style={{ marginBottom: "5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {PROFIT_STRATEGIES.map((strat, i) => (
          <div key={i} style={{ padding: "2rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "24px", boxShadow: "0 10px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem", color: "var(--ro-red)", fontWeight: 800 }}>
              <strat.icon size={20} /> {strat.title}
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b", lineHeight: "1.6" }}>{strat.desc}</p>
          </div>
        ))}
      </section>

      {/* Farming Spots Section */}
      <section style={{ marginBottom: "5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <Target size={20} /> Top Tier Farming Spots
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {FARMING_SPOTS.map((spot, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: "white", border: "1px solid #e2e8f0", padding: "2rem", borderRadius: "24px", display: "flex", gap: "2rem", flexWrap: "wrap" }}
            >
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <span style={{ padding: "4px 8px", background: spot.rank === "S-TIER" ? "#fef2f2" : "#f8fafc", color: spot.rank === "S-TIER" ? "var(--ro-red)" : "#64748b", borderRadius: "6px", fontSize: "0.65rem", fontWeight: 900 }}>{spot.rank}</span>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800 }}>{spot.name}</h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1rem" }}>{spot.summary}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 700 }}>
                  <Map size={14} /> RECOMMENDED LV: {spot.level}
                </div>
              </div>
              <div style={{ flex: "0 0 200px" }}>
                <h4 style={{ fontSize: "0.75rem", fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", marginBottom: "1rem" }}>Key Loot</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {spot.loot.map((l, li) => (
                    <div key={li} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#1e293b", fontWeight: 700, fontSize: "0.9rem" }}>
                      <div style={{ width: "6px", height: "6px", background: "var(--ro-red)", borderRadius: "50%" }} /> {l}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pro Tip */}
      <div style={{ padding: "2rem", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "24px", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem", fontWeight: 900, fontSize: "1rem", color: "var(--ro-red)" }}>
          <Zap size={20} /> THE "PLAYER MARKET" META
        </div>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.7", opacity: 0.9 }}>
          Never vend your gear drops to NPCs. In TWROZ, even low-level items can spawn with **Epic Random Options**. A level 1 dagger with 'Ignore Physical DEF +15%' is worth more than a +7 high-tier weapon to the right player. Always use a 'Market Search' item or check current vendors in Prontera before selling.
        </p>
      </div>

      <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "4rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
          Economics synthesized from TWROZ Market Analytics & Bahamut Merchant Threads <ExternalLink size={12} />
        </p>
      </footer>
    </main>
  );
}
