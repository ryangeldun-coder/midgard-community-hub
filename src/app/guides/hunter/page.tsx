"use client";

import { motion } from "framer-motion";
import { Target, Zap, ChevronRight, Info, AlertTriangle, ExternalLink, Wind } from "lucide-react";
import Link from "next/link";

export default function HunterGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Link href="/guides" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}>
        <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Academy
      </Link>

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "1rem" }}>
          <div style={{ padding: "12px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", borderRadius: "16px" }}>
            <Target size={40} />
          </div>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Hunter: The Swift Sentinel</h1>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering ASPD & Trap Leveling in Ragnarok Zero</p>
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
            Hunters in Ragnarok Zero are the ultimate low-cost farmers. By utilizing <strong>Double Strafe (二連矢)</strong> and <strong>Land Mine (地雷陷阱)</strong>, they can clear high-level maps with minimal gear investment. The Zero meta emphasizes <strong>ASPD (Attack Speed)</strong> and <strong>DEX</strong> over pure power to maximize the "stutter-step" farming efficiency.
          </p>
        </div>

        {/* Stats */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Recommended Stats (Level 99)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { attr: "AGI", val: "90-99", desc: "Highest priority. Maximizes ASPD and Flee for survival." },
              { attr: "DEX", val: "90-99", desc: "Main damage source and hit rate. Crucial for Double Strafe damage." },
              { attr: "INT", val: "20-40", desc: "Helps with SP pool and trap damage scaling in Zero." },
              { attr: "LUK", val: "Optional", desc: "Increases Falcon auto-blitz rate (fun but less efficient for pure farming)." },
            ].map(s => (
              <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "16px" }}>
                <div style={{ fontWeight: 900, color: "#22c55e", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
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
              <div style={{ padding: "8px", background: "#dcfce7", color: "#22c55e", borderRadius: "8px" }}><Zap size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Double Strafe (Lv. 10)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Your primary single-target damage. Very fast animation in Zero.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
              <div style={{ padding: "8px", background: "#dcfce7", color: "#22c55e", borderRadius: "8px" }}><Wind size={20} /></div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>Land Mine (Lv. 5)</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Essential for earth-element mobs. Massive damage for very low SP.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div style={{ padding: "1.5rem", background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: "16px", color: "#166534" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900 }}>
            <AlertTriangle size={20} /> THE "ELEMENTAL" TRICK
          </div>
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            In Ragnarok Zero, <strong>Elemental Arrows</strong> are much easier to craft. Always carry at least 2,000 Fire and Crystal arrows to maximize your damage against the most popular leveling mobs (Earth and Fire types).
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
