"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Swords, Shield, Zap, Sparkles, ChevronRight } from "lucide-react";

const CLASS_GUIDES = [
  {
    id: "knight",
    name: "Knight / Lord Knight",
    description: "The 'Eternal Machine' build. Mastering infinite SP Pierce farming for massive Zeny gains.",
    icon: Shield,
    color: "#ef4444",
    difficulty: "Easy",
    tags: ["Farming", "Tank", "Infinite SP"]
  },
  {
    id: "assassin",
    name: "Assassin / Assassin Cross",
    description: "High-burst Sonic Blow and Soul Breaker specializations for rapid MVP hunting.",
    icon: Swords,
    color: "#a855f7",
    difficulty: "Medium",
    tags: ["DPS", "Burst", "MVP"]
  },
  {
    id: "wizard",
    name: "Wizard / High Wizard",
    description: "Area of effect (AoE) mastery. Clearing entire maps with elemental supremacy.",
    icon: Zap,
    color: "#3b82f6",
    difficulty: "Hard",
    tags: ["AoE", "Elemental", "Leveling"]
  },
  {
    id: "hunter",
    name: "Hunter / Sniper",
    description: "The king of low-cost farming. Precise damage from a safe distance.",
    icon: Target,
    color: "#22c55e",
    difficulty: "Easy",
    tags: ["Farming", "Ranged", "Low Cost"]
  }
];

import { Target } from "lucide-react"; // Double check

export default function GuidesPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <header style={{ marginBottom: "4rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "inline-flex", padding: "10px", background: "rgba(225, 29, 72, 0.1)", color: "var(--ro-red)", borderRadius: "12px", marginBottom: "1.5rem" }}
        >
          <BookOpen size={32} />
        </motion.div>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem" }}>Midgard Academy</h1>
        <p style={{ color: "#64748b", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
          Expert class guides, leveling paths, and meta builds curated from the global Ragnarok Zero community.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {CLASS_GUIDES.map((guide, i) => (
          <Link 
            key={guide.id} 
            href={guide.comingSoon ? "#" : `/guides/${guide.id}`}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={guide.comingSoon ? {} : { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "24px",
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                opacity: guide.comingSoon ? 0.6 : 1,
                cursor: guide.comingSoon ? "default" : "pointer"
              }}
            >
              {guide.comingSoon && (
                <div style={{ position: "absolute", top: "1rem", right: "-2rem", background: "#f1f5f9", color: "#64748b", padding: "4px 40px", transform: "rotate(45deg)", fontSize: "0.7rem", fontWeight: 800 }}>
                  SOON
                </div>
              )}
              
              <div style={{ width: "50px", height: "50px", background: `${guide.color}15`, color: guide.color, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <guide.icon size={28} />
              </div>

              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", marginBottom: "0.75rem" }}>{guide.name}</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "2rem", flexGrow: 1 }}>{guide.description}</p>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {guide.tags.map(tag => (
                  <span key={tag} style={{ fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", background: "#f8fafc", color: "#64748b", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {!guide.comingSoon && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ro-red)", fontWeight: 800, fontSize: "0.9rem" }}>
                  View Academy Guide <ChevronRight size={16} />
                </div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* SEO Section */}
      <section style={{ marginTop: "6rem", borderTop: "1px solid #f1f5f9", paddingTop: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "1.5rem", justifyContent: "center" }}>
          <Sparkles size={20} />
          <h2 style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 900 }}>Global Community Wisdom</h2>
        </div>
        <p style={{ color: "#64748b", textAlign: "center", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", fontSize: "1rem" }}>
          The Midgard Academy builds its guides by synthesizing high-level strategies from the Taiwanese (TWRoZ) and Korean (KRoZ) veteran communities. We focus on the unique <strong>Ragnarok Zero mechanics</strong>—including the equipment refine system, zero-specific skill adjustments, and dynamic monster spawning—to ensure you have the most efficient path to Level 99/70.
        </p>
      </section>
    </main>
  );
}
