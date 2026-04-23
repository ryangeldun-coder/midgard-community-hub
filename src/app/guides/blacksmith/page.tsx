"use client";

import { motion } from "framer-motion";
import { Hammer, Target, Zap, ChevronRight, Info, AlertTriangle, ExternalLink, Coins } from "lucide-react";
import Link from "next/link";

export default function BlacksmithGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderRadius: "16px" }}>
            <Hammer size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Blacksmith: The Golden Anvil</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Economic Dominance & High-Burst Combat in Ragnarok Zero</p>
          </div>
        </div>
      </header>

      <section className="guide-content" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Overview */}
        <div style={{ background: "#f8fafc", padding: "2rem", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Info size={20} color="#f59e0b" /> Build Overview
          </h2>
          <p style={{ color: "#475569", lineHeight: "1.8" }}>
            In Ragnarok Zero, the Blacksmith is the backbone of the economy. This build focuses on the <strong>Battle-Greed Hybrid</strong>, allowing you to maximize Zeny income through the <strong>Greed (贪婪)</strong> skill while maintaining enough burst damage to solo high-yield maps like Magma Dungeon or Glast Heim.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "STR", val: "90-99", desc: "Your primary stat for both weight capacity and massive damage with Mammonite." },
              { attr: "AGI", val: "70-80", desc: "High ASPD is crucial for proccing Adrenaline Rush and maintaining high DPS." },
              { attr: "DEX", val: "40-50", desc: "Necessary for hit rate and slightly improves forging success if you dabble in crafting." },
              { attr: "VIT", val: "30-50", desc: "Survival stat for large mob pulls. Increased healing from potions." },
            ].map(s => (
              <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "16px" }}>
                <div style={{ fontWeight: 900, color: "#f59e0b", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Core Skills</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#fef3c7", color: "#f59e0b", borderRadius: "8px" }}><Coins size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Greed (Lv. 1)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>The reason Blacksmiths are the richest class. Instantly picks up all items in a 2-cell radius.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#fef3c7", color: "#f59e0b", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Adrenaline Rush (Lv. 5)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Massive ASPD boost for the BS and all party members using Axe or Mace weapons.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Gear (Paradise Meta)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#f59e0b", marginBottom: "1rem" }}>The Farmer's Toolkit</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Eden Axe III (樂園團斧頭 III)</strong>: High base ATK and works perfectly with Adrenaline Rush.</li>
                <li><strong>Fire/Water/Earth/Wind Elemental Axes</strong>: Forged by players; essential for elemental coverage in dungeons.</li>
                <li><strong>Greed Clip</strong>: If you haven't unlocked the skill via quest, this is your most important accessory.</li>
              </ul>
            </div>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#f59e0b", marginBottom: "1rem" }}>Zero Shadow Integration</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Shadow Merchant Armor</strong>: Increases Zeny gain from selling items to NPCs.</li>
                <li><strong>Shadow Merchant Weapon</strong>: Boosts the damage of Mammonite by a significant percentage.</li>
                <li><strong>Light Epsilon</strong>: A holy-element axe that is incredible for leveling in Glast Heim.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div style={{ padding: "1.5rem", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "16px", color: "#9a3412" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900 }}>
            <AlertTriangle size={20} /> PRO VETERAN TIP
          </div>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            Always carry a <strong>Pushcart</strong>. Even if you aren't vending, the extra 8000 weight capacity allows you to farm for hours without returning to town, maximizing your "Zeny per Hour" efficiency.
          </p>
        </div>

        {/* References */}
        <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
            Strategy sourced from RO Zero Economy Guide & Top 10 Wealthiest Players <ExternalLink size={12} />
          </p>
        </footer>
      </section>
    </main>
  );
}
