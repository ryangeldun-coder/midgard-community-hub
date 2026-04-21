"use client";

import { motion } from "framer-motion";
import { Swords, Target, Zap, ChevronRight, Info, AlertTriangle, ExternalLink, Skull } from "lucide-react";
import Link from "next/link";

export default function AssassinGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(168, 85, 247, 0.1)", color: "#a855f7", borderRadius: "16px" }}>
            <Skull size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Assassin: The Shadow Striker</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering Sonic Blow & Elemental Poison in Ragnarok Zero</p>
          </div>
        </div>
      </header>

      <section className="guide-content" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Overview */}
        <div style={{ background: "#f8fafc", padding: "2rem", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Info size={20} color="#3b82f6" /> Build Overview
          </h2>
          <p style={{ color: "#475569", lineHeight: "1.8" }}>
            Assassins in Ragnarok Zero are elite single-target burst dealers. The meta revolves around maximizing <strong>Sonic Blow (音速投擲)</strong> for rapid monster clearing and using <strong>Enchant Poison (塗毒)</strong> strategically. Unlike classic RO, Zero's auto-battle system requires very specific skill placement to avoid "clunky" AI behavior.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "STR", val: "90-99", desc: "Highest priority. Sonic Blow damage scales heavily with raw STR." },
              { attr: "DEX", val: "50-60", desc: "Essential for Sonic Blow hit rate. Missing a burst is a huge loss of DPS." },
              { attr: "AGI", val: "40-60", desc: "Secondary priority for Flee and reducing animation lock." },
              { attr: "LUK", val: "Optional", desc: "Only if going for a pure Katar Critical build (less common in early Zero)." },
            ].map(s => (
              <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "16px" }}>
                <div style={{ fontWeight: 900, color: "#a855f7", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
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
              <div style={{ padding: "8px", background: "#f3e8ff", color: "#a855f7", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Sonic Blow (Lv. 1 to 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>For high-level farming, keeping this at Lv. 1 with a 2-3s CD in auto-battle is often more SP-efficient than spamming Lv. 10.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#f3e8ff", color: "#a855f7", borderRadius: "8px" }}><Skull size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Enchant Poison (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Essential for neutral monsters. In Ragnarok Zero, ensure this is placed in the <strong>BUFF</strong> skill slot, not the attack slot.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Gear (The Zero Meta)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#a855f7", marginBottom: "1rem" }}>Weapons</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Jur [3]</strong>: The standard choice. Slot it with <strong>Skeleton Worker</strong> or <strong>Desert Wolf</strong> cards.</li>
                <li><strong>Specialty Jur [4]</strong>: For high-end builds using size-specific cards.</li>
                <li><strong>Katar of Piercing [2]</strong>: Excellent for high-DEF monsters.</li>
              </ul>
            </div>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#a855f7", marginBottom: "1rem" }}>Armor & Set Pieces</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Pantie + Undershirt</strong>: The classic Agi-set. Hard to beat for early-to-mid game leveling.</li>
                <li><strong>Thief Clothes [1]</strong>: High DEF and Agi boost.</li>
                <li><strong>2x Brooch [1]</strong>: Insert <strong>Matyr</strong> or <strong>Whisper</strong> cards in your garment for max Flee.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div style={{ padding: "1.5rem", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "16px", color: "#5b21b6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900 }}>
            <AlertTriangle size={20} /> THE "CLUNKY AI" FIX
          </div>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            Many players complain that their Assassin "pauses" between attacks. This is usually because <strong>Enchant Poison</strong> or <strong>Venom Dust</strong> is in the active attack rotation. Move these to your <strong>Auto-Buff</strong> slots to ensure the AI only casts them when the timer expires.
          </p>
        </div>

        {/* References */}
        <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
            Strategy sourced from Gamer.com.tw & Game735 RO Zero Communities <ExternalLink size={12} />
          </p>
        </footer>
      </section>
    </main>
  );
}
