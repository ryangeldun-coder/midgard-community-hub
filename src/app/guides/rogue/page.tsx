"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Fingerprint, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Skull, Coins } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  gank: {
    title: "Gank / Steal Farmer",
    subtitle: "The Zeny King of Zero",
    icon: Coins,
    color: "#9333ea",
    overview: "This is the most popular Rogue build in TWROZ. By maximizing Gank (自動偷竊), you double your loot drops from every monster. It's the highest 'Zeny per Hour' build for solo players farming crafting materials or rare drops.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximizes ASPD and Flee. More hits per second = more chances to Gank." },
      { attr: "DEX", val: "60-80", desc: "Increases your Steal success rate and base damage." },
      { attr: "STR", val: "50-70", desc: "Base damage for your rapid dagger strikes." },
      { attr: "LUK", val: "Remaining", desc: "Slightly boosts loot quality and critical chance." },
    ],
    skills: [
      { name: "Gank (Lv. 10)", desc: "Passive chance to Steal while attacking. Essential for farming.", icon: Coins },
      { name: "Snatch (Lv. 5)", desc: "Teleports you and the target to a random spot to avoid competition.", icon: Zap },
    ],
    gear: {
      left: {
        title: "The Looting Kit",
        items: [
          "Eden Dagger III: Great for early Gank leveling.",
          "Gladius [3]: Carded with size-scaling cards for specific maps.",
          "Shadow Rogue Armor: Significantly boosts Gank success rate."
        ]
      },
      right: {
        title: "Survival & Speed",
        items: [
          "Whisper Card Cloak: Maximize Flee to survive being mobbed.",
          "Pantie/Shirt Combo: Cheap AGI/Flee synergy for early game.",
          "Agi Brooch [1]: With Kukre cards for maximum ASPD."
        ]
      }
    },
    tip: "In TWROZ, 'Snatch' is often used to steal 'Elite' mobs away from crowds. Use it to farm rare materials in peace."
  },
  plagiarism: {
    title: "Copy / Plagiarism Hybrid",
    subtitle: "Versatile Combat Master",
    icon: Swords,
    color: "#a855f7",
    overview: "Utilizes Plagiarism (抄襲) to copy skills like Bowling Bash or Triple Attack. In Zero, this build is incredibly versatile, allowing you to adapt your damage type to the map you are farming.",
    stats: [
      { attr: "STR", val: "80-90", desc: "Primary damage for copied physical skills." },
      { attr: "AGI", val: "70-80", desc: "Reduces animation delay and provides Flee." },
      { attr: "DEX", val: "60-70", desc: "Reduces cast time for copied skills and ensures hits." },
      { attr: "VIT", val: "Remaining", desc: "Survivability to avoid being 1-shot before copying." },
    ],
    skills: [
      { name: "Plagiarism (Lv. 10)", desc: "Allows you to use the last skill that hit you. Permanent if you have Preserve.", icon: Swords },
      { name: "Preserve (Lv. 1)", desc: "Crucial. Prevents your copied skill from being overwritten.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Combat Arsenal",
        items: [
          "Damascus [2]: Indestructible dagger for high-end mobs.",
          "Shadow Rogue Weapon: Boosts the damage of copied skills.",
          "Eden Dagger III: Solid base for most copied physical skills."
        ]
      },
      right: {
        title: "Meta Support",
        items: [
          "Raydric Card Cloak: 20% Neutral reduction for safer tanking.",
          "Matyr Card Shoes: HP/AGI balance for hybrid combat.",
          "Ring [1] with Mantis Card: Extra STR for burst damage."
        ]
      }
    },
    tip: "Bowling Bash (copied from Knight) is the most popular choice for leveling. Raging Trifecta Blow is best for pure single-target DPS."
  },
  bow: {
    title: "Bow Rogue",
    subtitle: "Safe Ranged Specialist",
    icon: Target,
    color: "#3b82f6",
    overview: "Trades melee power for safety. By using a Bow, you can kite high-damage mobs and Gank from a distance. A preferred build for dangerous dungeons like Glast Heim Chivalry.",
    stats: [
      { attr: "DEX", val: "90-99", desc: "Primary damage and hit rate for Bow attacks." },
      { attr: "AGI", val: "80-90", desc: "Maximizes ASPD for faster ranged shots." },
      { attr: "STR", val: "30-50", desc: "Increases carry capacity for arrows and pots." },
      { attr: "VIT", val: "Remaining", desc: "Extra HP for when mobs close the gap." },
    ],
    skills: [
      { name: "Vulture's Eye (Lv. 10)", desc: "Increases range and hit rate with bows.", icon: Target },
      { name: "Double Strafe (Lv. 10)", desc: "Your primary burst tool for ranged combat.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Ranged Kit",
        items: [
          "Gakkung [2]: Classic bow for high-DEX builds.",
          "Eden Bow III: Excellent Zero starter weapon.",
          "Shadow Rogue Glove: Reduces SP cost of Double Strafe."
        ]
      },
      right: {
        title: "Distance Support",
        items: [
          "Apple o' Archer: The iconic +3 DEX headgear.",
          "Gloves [1] with Zerom Cards: To hit the DEX ceiling.",
          "Dragon Vest/Manteau: For the AGI/Flee synergy."
        ]
      }
    },
    tip: "You can Gank with a Bow! Every auto-attack has a chance to steal, making Bow Rogue a very safe way to farm expensive materials."
  }
};

export default function RogueGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("gank");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Rogue Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(147, 51, 234, 0.1)", color: "#9333ea", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <Fingerprint size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Rogue Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Master of Stealth, Theft, and Mimicry</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "20px", color: "#5b21b6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> THE ZENY-MAX STRATEGY
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Rogue Meta & Gamer.com.tw Zeny Farming Guides <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
