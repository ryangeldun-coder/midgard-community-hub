"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hand, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Flame, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  asura: {
    title: "Asura Strike BOSS Hunter",
    subtitle: "The Ultimate MVP Finisher",
    icon: Flame,
    color: "#60a5fa",
    overview: "This is the definitive TWROZ Monk build for MVP contests. By maximizing STR and SP, you deal a single catastrophic hit that can bypass most BOSS-tier defenses. In Zero, this is your primary role in high-end guilds.",
    stats: [
      { attr: "STR", val: "99", desc: "Pure physical power. Every point counts for the Asura multiplier." },
      { attr: "INT", val: "70-80", desc: "Increases your SP pool. Asura damage scales directly with current SP." },
      { attr: "DEX", val: "50-60", desc: "Reduces the cast time of Spirit Sphere calls and Asura itself." },
      { attr: "VIT", val: "Remaining", desc: "Survivability to withstand MVP AoE attacks." },
    ],
    skills: [
      { name: "Asura Strike (Lv. 10)", desc: "Consumes all SP and Spirit Spheres for a massive single strike.", icon: Flame },
      { name: "Mental Sensing (Lv. 5)", desc: "Crucial for survival. Sets DEF/MDEF to 90 at the cost of movement.", icon: Shield },
    ],
    gear: {
      left: {
        title: "The Burst Kit",
        items: [
          "Eden Mace III: Great base damage for early Asura.",
          "Stunner [2]: Carded with Abysmal Knight for Boss damage.",
          "Shadow Monk Glove: Reduces SP consumption of Spirit skills."
        ]
      },
      right: {
        title: "SP Maximization",
        items: [
          "Spiritual Ring: The BiS accessory for SP-based Monks.",
          "Sohee Card Shoes: 15% Max SP boost is mandatory.",
          "Morpheus Set: For the massive flat SP and INT bonuses."
        ]
      }
    },
    tip: "Always use 'Dangerous Soul Collect' (Quest Skill) to summon all 5 spheres instantly. Never manually summon spheres in a boss fight."
  },
  combo: {
    title: "Combo Leveling Specialist",
    subtitle: "Sustained Melee DPS",
    icon: Swords,
    color: "#a855f7",
    overview: "The Combo Monk is a leveling machine in TWROZ. By chaining Triple Attack, Chain Combo, and Finish Combo, you can down high-HP mobs with minimal SP consumption. Perfect for farming Orc Lady or Magma Dungeon.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximized ASPD to trigger Triple Attack more frequently." },
      { attr: "STR", val: "70-80", desc: "Base damage for your combo strikes." },
      { attr: "DEX", val: "40-50", desc: "Ensures you never miss your target during a chain." },
      { attr: "LUK", val: "Remaining", desc: "Increases critical rate and small ATK bonus." },
    ],
    skills: [
      { name: "Triple Attack (Lv. 10)", desc: "Passive chance to deal a 3-hit strike and start a combo.", icon: Swords },
      { name: "Finish Combo (Lv. 5)", desc: "The final heavy strike in your combo chain.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Speed Gear",
        items: [
          "Waghnak [4]: For stacking ASPD or elemental cards.",
          "Eden Knuckle III: Balanced damage and speed for Zero leveling.",
          "Shadow AGI Set: To hit the 185+ ASPD ceiling."
        ]
      },
      right: {
        title: "Proccing Tools",
        items: [
          "Pantie/Shirt Combo: Cheap Flee and AGI for early game.",
          "Whisper Card: Essential for Flee-based survival.",
          "Agi Brooch [1]: With Kukre Card."
        ]
      }
    },
    tip: "In TWROZ, specific Shadow Gear can auto-cast 'Call Spirits'. This is a game-changer for Combo monks—get it as early as possible."
  },
  spirit: {
    title: "Spirit Sphere Sniper",
    subtitle: "Ranged Tactical Combat",
    icon: Target,
    color: "#3b82f6",
    overview: "A niche but powerful TWROZ meta. By using Spirit Sphere Absorption and Finger Offensive, you become a ranged physical caster. Excellent for sniping high-DEF targets from safety.",
    stats: [
      { attr: "STR", val: "90-99", desc: "Primary damage for Finger Offensive." },
      { attr: "DEX", val: "80-90", desc: "Critical for reducing Finger Offensive cast time." },
      { attr: "INT", val: "40-50", desc: "Increases your SP pool for constant skill spam." },
      { attr: "VIT", val: "Remaining", desc: "Survivability for dungeon crawling." },
    ],
    skills: [
      { name: "Finger Offensive (Lv. 5)", desc: "Launches spirit spheres at a distance. Damage scales with spheres.", icon: Target },
      { name: "Spirit Sphere Absorption (Lv. 1)", desc: "Recover SP by absorbing spheres from yourself or enemies.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Ranged Arsenal",
        items: [
          "Iron Fist: Boosts the damage of sphere-based attacks.",
          "Eden Mace III: Solid base for Finger Offensive damage.",
          "Shadow Monk Armor: Reduces cast delay for Finger Offensive."
        ]
      },
      right: {
        title: "Cast Time Gear",
        items: [
          "Gloves [1] with Zerom Cards: To maximize DEX.",
          "Apple o' Archer: For the +3 DEX headgear slot.",
          "Phen Card: Essential so your Finger Offensive isn't interrupted."
        ]
      }
    },
    tip: "Use 'Spirit Sphere Absorption' on monsters that summon spheres (like other Monks) to steal their SP in PVP or specific dungeons."
  }
};

import { Shield } from "lucide-react"; // Cross-check

export default function MonkGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("asura");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Monk Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(96, 165, 250, 0.1)", color: "#60a5fa", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <Hand size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Monk Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>The Fist of Light and the Spirit Sphere</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "20px", color: "#1e40af" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> TWROZ-SPECIFIC TIP
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Monk Meta & Gamer.com.tw Veteran Threads <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
