"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShieldPlus, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Flame, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  gc: {
    title: "Grand Cross Exorcist",
    subtitle: "High-Efficiency AoE Mobber",
    icon: Flame,
    color: "#f87171",
    overview: "Grand Cross (十字軍審判) is the Crusader's signature move. In Zero, this build excels at clearing Undead and Demon-filled maps like Glast Heim or Pyramid. It requires careful HP/SP management but offers top-tier leveling speed.",
    stats: [
      { attr: "INT", val: "90-99", desc: "Maximizes Grand Cross damage and SP pool for sustained casting." },
      { attr: "STR", val: "40-60", desc: "Grand Cross damage scales with both ATK and MATK." },
      { attr: "VIT", val: "50-70", desc: "Essential to survive the self-recoil damage of Grand Cross." },
      { attr: "DEX", val: "Remaining", desc: "Reduces cast time for faster rotations." },
    ],
    skills: [
      { name: "Grand Cross (Lv. 10)", desc: "Your primary AoE tool. Deals Holy damage in a 3x3 area around you.", icon: Flame },
      { name: "Faith (Lv. 10)", desc: "Mandatory. Increases HP and Holy resistance to mitigate self-damage.", icon: Heart },
    ],
    gear: {
      left: {
        title: "The Holy Arsenal",
        items: [
          "Eden Spear III: High base ATK/MATK balance.",
          "Excalibur: The dream weapon for INT-based damage.",
          "Shadow Crusader Shield: Significantly reduces GC HP consumption."
        ]
      },
      right: {
        title: "Recoil Mitigation",
        items: [
          "Pupa Card Armor: Flat HP boost to survive your own skills.",
          "Angeling Card: The ultimate (but expensive) armor to nullify GC self-damage.",
          "Spiritual Ring: For the much-needed SP recovery."
        ]
      }
    },
    tip: "Grand Cross hits 3 times. If a monster dies on the 1st hit, the remaining hits are wasted. Time your pulls for maximum efficiency."
  },
  shield: {
    title: "Shield Reflect Tank",
    subtitle: "The Unmovable Wall",
    icon: ShieldPlus,
    color: "#ef4444",
    overview: "This build focuses on pure defense and the Reflect Shield (反射盾) skill. By mobbing large groups and letting them 'kill themselves' on your shield, you become a low-effort, high-efficiency farmer.",
    stats: [
      { attr: "VIT", val: "99", desc: "Maximizes your HP pool and defensive scaling." },
      { attr: "AGI", val: "70-80", desc: "High Flee is good, but you WANT to be hit sometimes to reflect damage." },
      { attr: "STR", val: "40-60", desc: "For carrying heavy pots and decent Shield Boomerang damage." },
      { attr: "DEX", val: "Remaining", desc: "Ensures your Shield skills actually connect." },
    ],
    skills: [
      { name: "Reflect Shield (Lv. 10)", desc: "Reflects a portion of physical damage back at the attacker.", icon: ShieldPlus },
      { name: "Shield Boomerang (Lv. 5)", desc: "Long-range pulling tool. Damage scales with shield weight.", icon: Target },
    ],
    gear: {
      left: {
        title: "Defensive Core",
        items: [
          "Mirror Shield [1]: High defense and perfect for reflecting.",
          "Cross Shield [1]: Specifically boosts Shield skill damage.",
          "Shadow Tank Set: For maximized HP and damage reduction."
        ]
      },
      right: {
        title: "Sustainability",
        items: [
          "Raydric Card Cloak: 20% Neutral reduction is mandatory.",
          "High VIT Accessories: Necklace [1] with Spore cards.",
          "Paradise Shield: Great early-game defensive option."
        ]
      }
    },
    tip: "Shield damage is calculated by the WEIGHT of the shield, not your weapon ATK. Use the heaviest shield possible."
  },
  holy: {
    title: "Holy Cross Duelist",
    subtitle: "Single-Target Burst Hunter",
    icon: Swords,
    color: "#3b82f6",
    overview: "Focuses on Holy Cross (聖十字攻擊). This build is the king of 1v1 combat, especially against Shadow/Undead targets. It has much lower HP cost than Grand Cross and is safer for solo leveling.",
    stats: [
      { attr: "STR", val: "90-99", desc: "Primary damage stat for Holy Cross." },
      { attr: "DEX", val: "50-60", desc: "Essential for hit rate and reducing cast time." },
      { attr: "AGI", val: "50-70", desc: "Increases ASPD to spam Holy Cross faster." },
      { attr: "INT", val: "Remaining", desc: "Improves the MATK portion of Holy Cross damage." },
    ],
    skills: [
      { name: "Holy Cross (Lv. 10)", desc: "High damage Holy strike with a chance to Blind the target.", icon: Swords },
      { name: "Spear Quicken (Lv. 10)", desc: "Massive ASPD boost when using a Spear. Mandatory for spamming.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Spear Mastery",
        items: [
          "Zephyrus: Wind-element spear for specialized farming.",
          "Lance [4]: Carded with 4x Santa Poring for maximum Holy damage.",
          "Eden Spear III: Solid all-rounder."
        ]
      },
      right: {
        title: "Burst Support",
        items: [
          "Shadow Paladin Gloves: Boosts Holy Cross damage significantly.",
          "Agi Brooch [1]: For reaching higher ASPD tiers.",
          "Matyr Card Shoes: For the HP/AGI balance."
        ]
      }
    },
    tip: "Holy Cross damage is doubled when using a Two-Handed Spear. Always use a 2H Spear unless you absolutely need a shield."
  }
};

export default function CrusaderGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("gc");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Crusader Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(248, 113, 113, 0.1)", color: "#f87171", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <ShieldPlus size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Crusader Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>The Holy Shield and the Divine Spear</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "20px", color: "#991b1b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> ZERO-META STRATEGY
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Knight-Crusader Forums & Game735 <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
