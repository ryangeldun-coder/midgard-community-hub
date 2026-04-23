"use client";

import { motion } from "framer-motion";
import { Cross, Target, Zap, ChevronRight, Info, AlertTriangle, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";

export default function PriestGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: "16px" }}>
            <Heart size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Priest: The Divine Engine</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering Support & Holy Soloing in Ragnarok Zero</p>
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
            In Ragnarok Zero, the Priest is far more than just a "buff bot." With the Zero-exclusive <strong>Magnificat</strong> buffs and <strong>Holy Light</strong> scaling, Priests are highly efficient solo levelers against Undead and Demon targets. This guide focuses on the <strong>FS (Full Support)</strong> build that maintains 100% SP uptime for the entire party.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "INT", val: "90-99", desc: "Maximized heal amount and SP pool. High INT is non-negotiable." },
              { attr: "DEX", val: "60-80", desc: "Reduces cast time for critical buffs like Kyrie Eleison and Lex Aeterna." },
              { attr: "VIT", val: "40-60", desc: "Essential for surviving in high-level Memorial Dungeons and MVP encounters." },
              { attr: "AGI", val: "Remaining", desc: "Subtle flee increase and faster skill animation speeds." },
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
              <div style={{ padding: "8px", background: "#dbeafe", color: "#3b82f6", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Magnificat (Lv. 5)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>The signature skill of the Priest. Doubles SP recovery rate for the whole party. Mandatory at all times.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#dbeafe", color: "#3b82f6", borderRadius: "8px" }}><Heart size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Sanctuary (Lv. 7-10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Critical for AOE healing during MVP fights and large mob pulls in dungeons.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Gear (Paradise Meta)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Entry-Level Gear</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Eden Staff III (樂園團長杖 III)</strong>: Great starting M.ATK and cast time reduction.</li>
                <li><strong>Paradise Uniform Set</strong>: Provides a balanced boost to MHP/MSP and reduction from Neutral damage.</li>
                <li><strong>Spiritual Ring</strong>: A classic accessory that pairs with Clip for improved SP efficiency.</li>
              </ul>
            </div>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "#3b82f6", marginBottom: "1rem" }}>End-Game Shadow Set</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Shadow Priest Armor</strong>: Specifically boosts Heal effectiveness by 5-15% based on refine.</li>
                <li><strong>Shadow Priest Shoes</strong>: Reduces the SP cost of all buffs by a flat percentage.</li>
                <li><strong>Holy Stick [1]</strong>: The ultimate weapon for Holy Light damage and Heal output.</li>
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
            In Ragnarok Zero, <strong>Kyrie Eleison</strong> is often more valuable than Assumptio for certain tanks. It blocks a set number of hits regardless of damage, making it perfect for bosses with slow but heavy physical attacks.
          </p>
        </div>

        {/* References */}
        <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
            Strategy sourced from TWROZ Wiki & High-End Memorial Dungeon Parties <ExternalLink size={12} />
          </p>
        </footer>
      </section>
    </main>
  );
}
