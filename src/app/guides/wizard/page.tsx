"use client";

import { motion } from "framer-motion";
import { Zap, Target, Flame, ChevronRight, Info, AlertTriangle, ExternalLink, CloudRain } from "lucide-react";
import Link from "next/link";

export default function WizardGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: "16px" }}>
            <Zap size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Wizard: The Elemental Master</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering AoE Leveling & Infinite SP Storm Gust in Ragnarok Zero</p>
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
            Wizards in Ragnarok Zero are the fastest levelers in the game if played correctly. The "Zero Meta" focuses on <strong>Storm Gust (暴風雪)</strong> for crowd control and <strong>Heaven's Drive (地裂術)</strong> for massive earth damage. Just like the Knight, a Wizard's efficiency is tied to SP management, but with a focus on <strong>Soul Drain (靈魂抽取)</strong> thresholds.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "INT", val: "90-99", desc: "Pure damage and SP pool. Mandatory for Soul Drain efficiency." },
              { attr: "DEX", val: "80-99", desc: "Cast time reduction. In Zero, you need to cast faster than mobs can reach you." },
              { attr: "VIT", val: "20-40", desc: "Essential for surviving accidental mob pulls in high-level dungeons." },
              { attr: "LUK", val: "Optional", desc: "Minor MATK boost, but usually not prioritized over VIT." },
            ].map(s => (
              <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "16px" }}>
                <div style={{ fontWeight: 900, color: "#3b82f6", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
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
              <div style={{ padding: "8px", background: "#dbeafe", color: "#3b82f6", borderRadius: "8px" }}><CloudRain size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Storm Gust (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Your primary farming and CC tool. In Zero, the freeze rate is essential for safety.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#dbeafe", color: "#3b82f6", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Lord of Vermilion (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>The best skill for clearing Water-element maps (like Izlude Dungeon 4).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Gear (The Zero Meta)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Staves & Shields</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Survivor's Rod [1]</strong>: The best all-rounder. Pair with Survivor's Manteau for bonus HP.</li>
                <li><strong>Wizardry Staff</strong>: Massive MATK boost for High Wizards.</li>
                <li><strong>Guard [1]</strong>: With <strong>Thara Frog Card</strong> (Demi-human resistance) for PvP/War of Emperium.</li>
              </ul>
            </div>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Armor & INT Boosts</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Mage Coat [1]</strong>: High MDEF and INT boost.</li>
                <li><strong>Shoes [1]</strong>: With <strong>Sohee Card</strong> for max SP and SP recovery.</li>
                <li><strong>2x Earring [1]</strong>: Essential for hitting your MATK thresholds.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div style={{ padding: "1.5rem", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "16px", color: "#1e40af" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900 }}>
            <AlertTriangle size={20} /> THE "ONE-SHOT" THRESHOLD
          </div>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            For maximum efficiency, calculate your MATK so that your <strong>Heaven's Drive</strong> one-shots Wolfs or Orc Warriors. This drastically speeds up your early Zeny farming by allowing you to clear entire screens in seconds.
          </p>
        </div>

        {/* References */}
        <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
            Strategy sourced from Bahamut (Gamer.com.tw) TWROZ Veteran Community <ExternalLink size={12} />
          </p>
        </footer>
      </section>
    </main>
  );
}
