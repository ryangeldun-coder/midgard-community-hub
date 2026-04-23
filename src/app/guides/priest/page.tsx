"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heart, Target, Zap, Info, AlertTriangle, ExternalLink, Cross, Swords, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  support: {
    title: "Full Support",
    subtitle: "The Divine Engine of the Party",
    icon: Heart,
    color: "#3b82f6",
    overview: "The FS (Full Support) Priest is the backbone of any dungeon party. This build focuses on 100% buff uptime, massive heals, and SP sustainability using the Zero-exclusive Magnificat mechanics.",
    stats: [
      { attr: "INT", val: "90-99", desc: "Maximized heal amount and SP pool. High INT is non-negotiable." },
      { attr: "DEX", val: "60-80", desc: "Reduces cast time for critical buffs like Kyrie Eleison." },
      { attr: "VIT", val: "40-60", desc: "Essential for surviving high-level Memorial Dungeons." },
      { attr: "AGI", val: "Remaining", desc: "Slightly improves skill animation speeds." },
    ],
    skills: [
      { name: "Magnificat (Lv. 5)", desc: "Doubles SP recovery rate for the party. Mandatory.", icon: Zap },
      { name: "Sanctuary (Lv. 10)", desc: "Critical for AOE healing during MVP fights.", icon: Heart },
    ],
    gear: {
      left: {
        title: "Paradise Path",
        items: [
          "Eden Staff III: High M.ATK and cast time reduction.",
          "Paradise Uniform Set: Balanced MHP/MSP boost.",
          "Spiritual Ring: Classic accessory for SP efficiency."
        ]
      },
      right: {
        title: "Shadow Mastery",
        items: [
          "Shadow Priest Armor: Specifically boosts Heal effectiveness.",
          "Shadow Priest Shoes: Reduces SP cost of all buffs.",
          "Holy Stick [1]: The ultimate weapon for Heal output."
        ]
      }
    },
    tip: "In Zero, Kyrie Eleison is often more valuable than Assumptio for certain tanks. It blocks hits regardless of damage."
  },
  exorcist: {
    title: "Holy Light Exorcist",
    subtitle: "The Undead Machine Gun Meta",
    icon: Zap,
    color: "#f59e0b",
    overview: "In Ragnarok Zero, Holy Light is a primary damage skill. This build focuses on MATK and Holy Damage % to solo level at high speed against Undead and Demon targets.",
    stats: [
      { attr: "INT", val: "99", desc: "Pure damage. You need every bit of MATK to 1-shot targets." },
      { attr: "DEX", val: "70-90", desc: "Aim for Instant Cast Holy Light for the 'Machine Gun' effect." },
      { attr: "VIT", val: "20-30", desc: "A small amount of health for survivability while mobbing." },
      { attr: "LUK", val: "Remaining", desc: "Minor MATK boost and status resistance." },
    ],
    skills: [
      { name: "Holy Light (Lv. 1)", desc: "Spam this. Fast cast and holy scaling make it your main DPS.", icon: Zap },
      { name: "Lex Aeterna (Lv. 1)", desc: "Doubles your next Holy Light damage. Use on tough elites.", icon: Target },
    ],
    gear: {
      left: {
        title: "Holy Arsenal",
        items: [
          "Holy Stick [1]: Massive Holy Light damage boost.",
          "Exorcism Bible: Pairs with Holy Stick for % damage increase.",
          "Holy Damage Affixes: Look for +10% Holy DMG on accessories."
        ]
      },
      right: {
        title: "Casting Speed",
        items: [
          "Isilla Card Headgear: Chance to reduce cast time and gain INT.",
          "Orleans Glove [1]: Top tier DEX and MATK boost.",
          "Caster Shadow Set: For reaching the Instant Cast threshold."
        ]
      }
    },
    tip: "Target Glast Heim Churchyard (Wraiths/Evil Druids) for the fastest leveling path. Use Magnificat to never stop spamming."
  },
  battle: {
    title: "Battle Priest",
    subtitle: "The Mace-Wielding Adrenaline Monk",
    icon: Swords,
    color: "#ef4444",
    overview: "This niche but fun build uses high AGI and Mace Mastery to deal physical damage. With Zero's Adrenaline Rush scrolls or party buffs, Battle Priests can reach extremely high ASPD.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximized ASPD and Flee. You are a dodge-tank DPS." },
      { attr: "STR", val: "60-80", desc: "Base damage for your mace strikes." },
      { attr: "DEX", val: "40-50", desc: "Enough to hit target monsters without missing." },
      { attr: "LUK", val: "30-40", desc: "Critical hit rate and extra physical ATK." },
    ],
    skills: [
      { name: "Mace Mastery (Lv. 10)", desc: "Flat damage boost when using Maces. Mandatory.", icon: Swords },
      { name: "Demon Bane (Lv. 10)", desc: "Significantly boosts damage against Undead/Demons.", icon: Shield },
    ],
    gear: {
      left: {
        title: "Combat Mace",
        items: [
          "Slash [1]: High ASPD and critical hit bonuses.",
          "Stunner [0/2]: High base ATK and chance to stun targets.",
          "Agi Shadow Set: To hit the 185+ ASPD ceiling."
        ]
      },
      right: {
        title: "Physical Support",
        items: [
          "Whisper Card: Essential for Flee-based survival.",
          "Vanilmirth Card: For the extra AGI and status resistance.",
          "Spike [1]: If focusing purely on the Crit playstyle."
        ]
      }
    },
    tip: "While soloing, use 'Aspersio' to enchant your mace with Holy element. This makes you a monster in dungeons like Pyramids."
  }
};

export default function PriestGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("support");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Priest Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <Heart size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Priest Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Mastering Support, Holy Arts, and Combat</p>
          </div>
        </div>

        {/* Build Switcher - Mobile Optimized */}
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          padding: "4px", 
          background: "#f1f5f9", 
          borderRadius: "14px", 
          width: "100%", 
          maxWidth: "fit-content",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}>
          {Object.entries(BUILDS).map(([id, b]) => (
            <button
              key={id}
              onClick={() => setActiveBuild(id as any)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.85rem",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                background: activeBuild === id ? "white" : "transparent",
                color: activeBuild === id ? b.color : "#64748b",
                boxShadow: activeBuild === id ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
              }}
            >
              <b.icon size={16} />
              {b.title}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.section
          key={activeBuild}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          {/* Build Intro */}
          <div style={{ borderLeft: `4px solid ${build.color}`, padding: "0.5rem 0 0.5rem 2rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#1e293b", marginBottom: "0.5rem" }}>{build.title}</h2>
            <p style={{ color: build.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.85rem", marginBottom: "1rem" }}>{build.subtitle}</p>
            <p style={{ color: "#475569", lineHeight: "1.8", maxWidth: "800px" }}>{build.overview}</p>
          </div>

          {/* Stats */}
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", color: "#1e293b" }}>Optimal Stat Spread</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {build.stats.map(s => (
                <div key={s.attr} style={{ border: "1px solid #e2e8f0", padding: "1.5rem", borderRadius: "20px", background: "white" }}>
                  <div style={{ fontWeight: 900, color: build.color, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{s.attr}: {s.val}</div>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0, lineHeight: "1.5" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", color: "#1e293b" }}>Priority Skills</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {build.skills.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "20px" }}>
                  <div style={{ padding: "8px", background: `${build.color}15`, color: build.color, borderRadius: "10px" }}><s.icon size={20} /></div>
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontWeight: 800 }}>{s.name}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: "1.5" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gear */}
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem", color: "#1e293b" }}>Gear Strategy</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              <div style={{ padding: "2rem", background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ color: build.color, marginBottom: "1.2rem", fontWeight: 800 }}>{build.gear.left.title}</h4>
                <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "2", paddingLeft: "1.2rem", margin: 0 }}>
                  {build.gear.left.items.map((item, i) => (
                    <li key={i}><strong>{item.split(":")[0]}</strong>: {item.split(":")[1]}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: "2rem", background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ color: build.color, marginBottom: "1.2rem", fontWeight: 800 }}>{build.gear.right.title}</h4>
                <ul style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "2", paddingLeft: "1.2rem", margin: 0 }}>
                  {build.gear.right.items.map((item, i) => (
                    <li key={i}><strong>{item.split(":")[0]}</strong>: {item.split(":")[1]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div style={{ padding: "1.5rem 2rem", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "20px", color: "#9a3412" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> PRO VETERAN TIP
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWROZ Wiki & High-End Memorial Dungeon Parties <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
