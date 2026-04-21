"use client";

import { motion } from "framer-motion";
import { Shield, Target, Zap, ChevronRight, Info, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function KnightGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "16px" }}>
            <Shield size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Knight: The Eternal Machine</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>The Ultimate SP-Sustainable Farming Build for Ragnarok Zero</p>
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
            In Ragnarok Zero, the Knight class is the king of sustainable farming. Unlike the classic version where you rely heavily on potions, the Zero "Meta" focuses on the <strong>Eternal Machine</strong> concept: stacking SP recovery and INT to use <strong>Pierce (连刺攻击)</strong> indefinitely. This allows for 24/7 farming in high-yield maps like Sea 4 or Centipedes.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "STR", val: "80-90", desc: "Main damage source. Aim for the 2-shot threshold on Centipedes." },
              { attr: "INT", val: "40-60", desc: "The core of the build. Necessary for SP recovery thresholds." },
              { attr: "DEX", val: "40-50", desc: "Enough to ensure 100% hit rate on target monsters." },
              { attr: "AGI", val: "Remaining", desc: "Increased flee and faster animation for Pierce." },
            ].map(s => (
              <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "16px" }}>
                <div style={{ fontWeight: 900, color: "var(--ro-red)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
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
              <div style={{ padding: "8px", background: "#fee2e2", color: "#ef4444", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Pierce (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Your primary farming tool. Massive damage against Large monsters like Minorous or Centipedes.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#fee2e2", color: "#ef4444", borderRadius: "8px" }}><Shield size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Two-Hand Quicken (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Essential for ASPD. Even if using a Spear, Spear Quicken is a Lord Knight skill, so use 2H for early leveling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Gear (TWROZ Paradise Meta)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "var(--ro-red)", marginBottom: "1rem" }}>Paradise Upgrade Path</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Eden Spear III (樂園團長矛 III)</strong>: The core weapon for beginners. Upgrade with <strong>Physical ATK</strong> or <strong>Large Monster</strong> stones.</li>
                <li><strong>Shadow Knight Armor (影子騎士鎧甲)</strong>: Part of the Zero Shadow Set. Directly increases Pierce damage and reduces SP cost.</li>
                <li><strong>Shadow Knight Shoes (影子騎士戰靴)</strong>: Provides MHP and works with the Armor for a massive SP recovery boost.</li>
              </ul>
            </div>
            <div className="glass" style={{ padding: "1.5rem", background: "white" }}>
              <h4 style={{ color: "var(--ro-red)", marginBottom: "1rem" }}>Memorial Dungeon Sets</h4>
              <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                <li><strong>Champion's Plate (征伐鎧甲)</strong>: From high-level Challenge dungeons. Offers top-tier DEF and STR.</li>
                <li><strong>Conquest Manteau (征伐披肩)</strong>: Combines with the Plate for a set bonus that grants 10% resistance to all elements.</li>
                <li><strong>Ring of Resonance [1]</strong>: For the auto-spell procs that help with leveling speed.</li>
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
            The "Zero" version of the <strong>Beetle Card (巨象甲蟲卡)</strong> is non-negotiable for this build. It provides SP recovery upon defeating monsters. Pair this with <strong>SP Recovery Headgears</strong> to eliminate the need for potions entirely.
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
