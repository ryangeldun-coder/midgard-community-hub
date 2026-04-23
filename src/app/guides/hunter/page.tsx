"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Target, Zap, Info, AlertTriangle, ExternalLink, Wind, Bird, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  sniper: {
    title: "Double Strafe Sniper",
    subtitle: "The Pure Physical Powerhouse",
    icon: Target,
    color: "#22c55e",
    overview: "The most straightforward and powerful physical build for Hunters. By maximizing DEX and AGI, you turn Double Strafe into a machine-gun skill, dealing massive single-target damage from safety.",
    stats: [
      { attr: "DEX", val: "99", desc: "Your primary damage stat. Every point increases your ATK and Hit." },
      { attr: "AGI", val: "90-99", desc: "Maximized ASPD reduces the animation lock of Double Strafe." },
      { attr: "INT", val: "20-30", desc: "Needed for SP pool and recovery to sustain DS spam." },
      { attr: "VIT", val: "Remaining", desc: "A small amount of health for general survival." },
    ],
    skills: [
      { name: "Double Strafe (Lv. 10)", desc: "Your main damage tool. Extremely fast in the Zero engine.", icon: Zap },
      { name: "Owl's Eye (Lv. 10)", desc: "Passive +10 DEX boost. Non-negotiable for damage.", icon: Target },
    ],
    gear: {
      left: {
        title: "DEX Mastery",
        items: [
          "Eden Bow III: Base weapon. Look for Critical Damage stones.",
          "Shadow Hunter Armor: Part of the Zero Set. Increases DS damage.",
          "Tights [1]: Standard DEX armor with Rock Picker Card."
        ]
      },
      right: {
        title: "Arrow Efficiency",
        items: [
          "Hunter Bow: Pairs with Hunting Arrows for a huge multiplier.",
          "Glove [1] with Zerom Card: +3 DEX per accessory.",
          "Apple o' Archer: The classic +3 DEX headgear."
        ]
      }
    },
    tip: "Always carry 'Fire Arrows' and 'Silver Arrows'. They cover the weaknesses of 80% of the game's leveling mobs."
  },
  falconer: {
    title: "Auto-Blitz Falconer",
    subtitle: "The Relaxed Auto-Battle King",
    icon: Bird,
    color: "#3b82f6",
    overview: "In Ragnarok Zero, the Falconer is the ultimate 'lazy' build. By stacking LUK and AGI, your Falcon will automatically trigger Blitz Beat with every attack, ignoring the target's defense.",
    stats: [
      { attr: "AGI", val: "99", desc: "Maximized ASPD and Flee. More attacks = more blitz chances." },
      { attr: "LUK", val: "60-80", desc: "Every 3 points increases your Auto-Blitz chance by 1%." },
      { attr: "INT", val: "30-50", desc: "Increases the raw damage of every Falcon strike." },
      { attr: "DEX", val: "Remaining", desc: "Base damage for when the Falcon doesn't proc." },
    ],
    skills: [
      { name: "Blitz Beat (Lv. 5)", desc: "Allows your Falcon to strike multiple targets with defense-ignoring damage.", icon: Bird },
      { name: "Steel Crow (Lv. 10)", desc: "Passively increases the damage of every Falcon attack.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Blitz Speed",
        items: [
          "Gakkung [2]: High ASPD bow with card slots for speed.",
          "Shadow AGI Set: To hit the 185+ ASPD ceiling.",
          "Whisper Card Cloak: Essential for Flee-based survival."
        ]
      },
      right: {
        title: "Luck Stacking",
        items: [
          "Rosary [1] with Zerom: For that extra LUK and DEX mix.",
          "Matyr Card Shoes: For the AGI and HP boost.",
          "Biretta [1] with LUK Stone: Maximizing the blitz rate."
        ]
      }
    },
    tip: "Falcon damage is purely based on INT, DEX, and Steel Crow level. It COMPLETELY ignores the monster's defense."
  },
  trapper: {
    title: "Trapper Hunter",
    subtitle: "The Memorial Dungeon Specialist",
    icon: Shield,
    color: "#ef4444",
    overview: "Trappers are the MVPs of high-end dungeons. Using Land Mine and Blast Mine, they deal massive elemental AoE damage that scales with INT and DEX, while providing essential crowd control.",
    stats: [
      { attr: "DEX", val: "90-99", desc: "Main scaling stat for trap damage and casting speed." },
      { attr: "INT", val: "80-90", desc: "Significant damage boost for elemental traps and SP pool." },
      { attr: "VIT", val: "40-60", desc: "Necessary for surviving in high-pressure dungeons." },
      { attr: "AGI", val: "Remaining", desc: "Flee for repositioning safely." },
    ],
    skills: [
      { name: "Land Mine (Lv. 5)", desc: "Massive Earth damage. Perfect for Wind targets in Glast Heim.", icon: Wind },
      { name: "Blast Mine (Lv. 5)", desc: "Essential Fire AoE for clearing Undead and Earth maps.", icon: Flame },
    ],
    gear: {
      left: {
        title: "Trap Damage",
        items: [
          "Eden Bow III: With INT or Cast Time reduction stones.",
          "Shadow Hunter Shield: Increases elemental trap damage.",
          "Mage Coat [1]: For the extra INT scaling."
        ]
      },
      right: {
        title: "Survival & Casting",
        items: [
          "Raydric Card Cloak: 20% Neutral reduction is mandatory.",
          "Phen Card Accessory: Ensures your traps aren't interrupted by hits.",
          "Spiritual Ring: For massive SP regeneration during dungeon runs."
        ]
      }
    },
    tip: "Positioning is everything. Place a 'Sandman' trap first to put the mob to sleep, then stack your elemental traps underneath."
  }
};

export default function HunterGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("sniper");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Hunter Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", borderRadius: "16px" }}>
            <Target size={40} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Hunter Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering the Bow, the Falcon, and the Trap</p>
          </div>
        </div>

        {/* Build Switcher */}
        <div style={{ display: "flex", gap: "10px", padding: "6px", background: "#f1f5f9", borderRadius: "16px", width: "fit-content" }}>
          {Object.entries(BUILDS).map(([id, b]) => (
            <button
              key={id}
              onClick={() => setActiveBuild(id as any)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
                transition: "all 0.2s",
                background: activeBuild === id ? "white" : "transparent",
                color: activeBuild === id ? b.color : "#64748b",
                boxShadow: activeBuild === id ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
              }}
            >
              <b.icon size={18} />
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
          <div style={{ padding: "1.5rem 2rem", background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: "20px", color: "#166534" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> PRO VETERAN TIP
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from Bahamut (Gamer.com.tw) TWROZ Veteran Community <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
