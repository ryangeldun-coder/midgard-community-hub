"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hammer, Target, Zap, Info, AlertTriangle, ExternalLink, Coins, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  hybrid: {
    title: "Battle-Greed Hybrid",
    subtitle: "The Master of Solo Zeny Farming",
    icon: Coins,
    color: "#f59e0b",
    overview: "This is the most popular build for Ragnarok Zero. It balances enough STR and AGI to kill efficiently, while using the Greed skill to instantly vacuum up loot. It's the ultimate 'Zeny per Hour' build.",
    stats: [
      { attr: "STR", val: "90-99", desc: "For raw power and maximum cart weight capacity." },
      { attr: "AGI", val: "70-80", desc: "High ASPD is necessary for proccing Adrenaline Rush." },
      { attr: "DEX", val: "40-50", desc: "Enough to ensure you never miss your target." },
      { attr: "VIT", val: "30-50", desc: "Survivability for mobbing in Magma or Glast Heim." },
    ],
    skills: [
      { name: "Greed (Lv. 1)", desc: "Your bread and butter. Picks up all loot in a 2-cell radius.", icon: Coins },
      { name: "Adrenaline Rush (Lv. 5)", desc: "Massive ASPD boost for Axe/Mace users.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Farmer's Arsenal",
        items: [
          "Eden Axe III: High base ATK and easy to acquire.",
          "Light Epsilon: Holy axe for fast GH leveling.",
          "Greed Clip: Essential if you haven't done the skill quest."
        ]
      },
      right: {
        title: "Shadow Economy",
        items: [
          "Shadow Merchant Armor: Boosts NPC sell prices (Overcharge effect).",
          "Shadow Merchant Weapon: Significant boost to Mammonite damage.",
          "Raydric Cloak: For surviving the mobs you're Greeding."
        ]
      }
    },
    tip: "Always use a Pushcart. The extra 8,000 weight allows for long farming sessions without town trips."
  },
  combat: {
    title: "Mammonite Combat",
    subtitle: "High-Burst Melee DPS",
    icon: Target,
    color: "#ef4444",
    overview: "This build trades economic utility for pure destruction. By spending Zeny on each strike via Mammonite, you deal some of the highest single-target burst damage in the game.",
    stats: [
      { attr: "STR", val: "99", desc: "Pure physical power to scale Mammonite's multiplier." },
      { attr: "AGI", val: "80-90", desc: "To reach the maximum 188+ ASPD threshold with buffs." },
      { attr: "VIT", val: "40-50", desc: "Necessary for surviving in high-end Memorial Dungeons." },
      { attr: "DEX", val: "Remaining", desc: "Extra accuracy for high-flee targets." },
    ],
    skills: [
      { name: "Mammonite (Lv. 10)", desc: "600% damage at the cost of 1,000 Zeny per hit. High burst.", icon: Target },
      { name: "Power-Thrust (Lv. 5)", desc: "Increases party ATK by 25%. Core buff for DPS.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Destruction Path",
        items: [
          "Hurricane Fury [1]: One of the highest ATK axes in the game.",
          "Orcish Axe [4]: For card stacking (4x Abysmal Knight for MVPs).",
          "Evil Wing: Headgear that provides flat STR and ATK boosts."
        ]
      },
      right: {
        title: "DPS Boosters",
        items: [
          "The Sign: 5% flat damage boost from the long quest.",
          "Vesper Core 02: High ATK and STR accessory.",
          "Fire/Water Shadow Set: For bypassing elemental resistances."
        ]
      }
    },
    tip: "Use 'Maximum Power-Thrust' only during boss fights or MVPs. It breaks your weapon but the damage boost is unmatched."
  },
  forger: {
    title: "Pure Forger",
    subtitle: "The Backbone of the Server Economy",
    icon: Hammer,
    color: "#3b82f6",
    overview: "The Pure Forger build is entirely non-combat. You focus on DEX and LUK to reach the highest possible success rate for crafting Elemental and Very Strong weapons.",
    stats: [
      { attr: "DEX", val: "99", desc: "The primary stat for forging success. Don't compromise." },
      { attr: "LUK", val: "99", desc: "The secondary stat for forging success." },
      { attr: "INT", val: "Remaining", desc: "Slightly improves your success rate (minimal)." },
      { attr: "STR", val: "1", desc: "You have zero combat capability. Level via leeching." },
    ],
    skills: [
      { name: "Smith Axe/Sword (Lv. 3)", desc: "Max your specialization for the weapons you intend to sell.", icon: Hammer },
      { name: "Find Ore (Lv. 1)", desc: "Passive chance to find extra crafting materials.", icon: Coins },
    ],
    gear: {
      left: {
        title: "Success Gear",
        items: [
          "Excalibur: Massive INT/LUK/DEX boost for forging.",
          "Fortune Sword: For the extra LUK points.",
          "Lord's Clothes [1]: With a DEX-boosting card (Baby Leopard)."
        ]
      },
      right: {
        title: "Buff Stacking",
        items: [
          "Gloves [1] with Zerom Card: +3 DEX per accessory.",
          "Crystal Pumps: +5 LUK (female characters only).",
          "Apple o' Archer: Classic +3 DEX headgear."
        ]
      }
    },
    tip: "Always forge while standing inside a Priest's 'Gloria' (+30 LUK) and a 'Blessing' (+10 DEX/INT) buff."
  }
};

export default function BlacksmithGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("hybrid");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Blacksmith Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderRadius: "16px" }}>
            <Hammer size={40} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Blacksmith Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> TWROZ OPTIMIZED
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering the Forge and the Field</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "20px", color: "#9a3412" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> PRO VETERAN TIP
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy sourced from RO Zero Economy Guide & Top 10 Wealthiest Players <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
