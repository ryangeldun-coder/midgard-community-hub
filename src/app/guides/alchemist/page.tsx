"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FlaskConical, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Skull, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  homunculus: {
    title: "Homunculus Master",
    subtitle: "High-Efficiency AI Farmer",
    icon: Heart,
    color: "#fbbf24",
    overview: "This is the core TWROZ Alchemist experience. By utilizing your Homunculus (生命體), you can farm for hours with minimal active input. In Zero, the Lif and Amistr types are particularly strong for survivability and healing.",
    stats: [
      { attr: "STR", val: "70-80", desc: "Base damage for your physical strikes while your Homunculus tanks." },
      { attr: "AGI", val: "80-90", desc: "Maximizes ASPD and Flee to stay safe while farming." },
      { attr: "VIT", val: "50-60", desc: "Increases your HP pool to survive accidental mob aggro." },
      { attr: "DEX", val: "Remaining", desc: "Ensures your attacks connect and reduces skill cast time." },
    ],
    skills: [
      { name: "Call Homunculus (Lv. 1)", desc: "Summons your loyal AI companion to fight by your side.", icon: Heart },
      { name: "Learning Potion (Lv. 10)", desc: "Increases the effectiveness of potions and success rate of brewing.", icon: FlaskConical },
    ],
    gear: {
      left: {
        title: "The Alchemist's Tools",
        items: [
          "Eden Mace III: Solid base damage for melee alchemists.",
          "Sabbath [2]: High ATK axe for heavy mobbing.",
          "Shadow Alchemist Armor: Boosts Homunculus stats and growth."
        ]
      },
      right: {
        title: "Survival Support",
        items: [
          "Pantie/Shirt Combo: Classic AGI/Flee synergy.",
          "Whisper Card Cloak: For the much-needed Flee boost.",
          "High VIT Accessories: To ensure you don't die before your pet."
        ]
      }
    },
    tip: "Keep your Homunculus 'Loyal'. In TWROZ, a Loyal Homunculus unlocks its final evolutionary skill, which is a game-changer for high-end farming."
  },
  bomber: {
    title: "Acid Terror Specialist",
    subtitle: "High-Burst Tactical Support",
    icon: Skull,
    color: "#ef4444",
    overview: "Focuses on Acid Terror (強酸攻擊) and Potion Pitcher (投擲藥水). This build is a nightmare in PVP and a critical support role in high-end Memorial Dungeons for breaking armor and healing the tank.",
    stats: [
      { attr: "STR", val: "90-99", desc: "Primary damage for Acid Terror and Bomb strikes." },
      { attr: "INT", val: "60-70", desc: "Increases the healing amount of your Potion Pitcher." },
      { attr: "DEX", val: "60-70", desc: "Reduces cast time for your explosive skills." },
      { attr: "VIT", val: "Remaining", desc: "Essential for surviving in the heat of battle." },
    ],
    skills: [
      { name: "Acid Terror (Lv. 5)", desc: "Long-range armor-breaking strike that deals significant damage.", icon: Skull },
      { name: "Aid Potion (Lv. 5)", desc: "The 'Golden Heal'. Instantly heals a target using a potion.", icon: Heart },
    ],
    gear: {
      left: {
        title: "Explosive Gear",
        items: [
          "Hurricane Axe: High ATK for maximizing Acid Terror damage.",
          "Shadow Alchemist Weapon: Boosts the damage of bomb skills.",
          "Eden Mace III: Reliable starter for support roles."
        ]
      },
      right: {
        title: "Healing Boosters",
        items: [
          "Spiritual Ring: Increases INT and healing effectiveness.",
          "High DEX Accessories: To reach near-instant cast for Aid Potion.",
          "Marc Card Armor: Immunity to Frozen for safe support."
        ]
      }
    },
    tip: "Aid Potion (Lv. 5) can heal much faster than a Priest's 'Heal' if you have high-rank potions. Use it to save your tank in emergencies."
  },
  brewer: {
    title: "Grand Brewer",
    subtitle: "The Master of Potion Economics",
    icon: FlaskConical,
    color: "#3b82f6",
    overview: "Purely non-combat. You focus on DEX and LUK to reach the highest success rate for brewing Slim White Potions and Elemental Resistance potions for the server.",
    stats: [
      { attr: "DEX", val: "99", desc: "The primary stat for brewing success. Max it first." },
      { attr: "LUK", val: "99", desc: "The secondary stat for brewing success." },
      { attr: "INT", val: "Remaining", desc: "Slightly improves success rate (minimal impact)." },
      { attr: "STR", val: "1", desc: "You have no combat power. Level via Homunculus or leeching." },
    ],
    skills: [
      { name: "Prepare Potion (Lv. 10)", desc: "Mandatory. The core skill for all brewing recipes.", icon: FlaskConical },
      { name: "Pharmacy (Lv. 10)", desc: "Increases the success rate and unlocks advanced potions.", icon: FlaskConical },
    ],
    gear: {
      left: {
        title: "Brewing Kit",
        items: [
          "Excalibur: The massive DEX/LUK/INT boost makes this BiS.",
          "Fortune Sword: For the extra LUK points.",
          "Shadow Alchemist Glove: Boosts brewing success rate significantly."
        ]
      },
      right: {
        title: "Success Meta",
        items: [
          "Gloves [1] with Zerom Cards: +3 DEX each.",
          "Crystal Pumps: +5 LUK for female characters.",
          "Apple o' Archer: For the iconic +3 DEX headgear slot."
        ]
      }
    },
    tip: "In TWROZ, being a 'Top 10 Ranked Brewer' grants a massive 50% HP recovery bonus to all potions you make. It's a high-competition but high-reward goal."
  }
};

import { Shield } from "lucide-react"; // Cross-check

export default function AlchemistGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("homunculus");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Alchemist Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <FlaskConical size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Alchemist Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Master of Creation, AI, and Economics</p>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
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
          <div style={{ padding: "1.5rem 2rem", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "20px", color: "#92400e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> THE ECONOMY META
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Alchemist Meta & Gamer.com.tw Brewing Communities <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
