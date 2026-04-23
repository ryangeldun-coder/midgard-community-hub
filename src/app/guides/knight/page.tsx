"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Shield, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  pierce: {
    title: "Pierce Machine",
    subtitle: "The Ultimate SP-Sustainable Farming Build",
    icon: Zap,
    color: "#ef4444",
    overview: "In Ragnarok Zero, the Knight class is the king of sustainable farming. The 'Eternal Machine' concept focuses on stacking SP recovery and INT to use Pierce (连刺攻击) indefinitely. This is the gold standard for high-yield maps like Centipedes.",
    stats: [
      { attr: "STR", val: "80-90", desc: "Main damage source. Aim for the 2-shot threshold on Centipedes." },
      { attr: "INT", val: "40-60", desc: "The core of the build. Necessary for SP recovery thresholds." },
      { attr: "DEX", val: "40-50", desc: "Enough to ensure 100% hit rate on target monsters." },
      { attr: "AGI", val: "Remaining", desc: "Increased flee and faster animation for Pierce." },
    ],
    skills: [
      { name: "Pierce (Lv. 10)", desc: "Your primary farming tool. Massive damage against Large monsters.", icon: Zap },
      { name: "Two-Hand Quicken (Lv. 10)", desc: "Essential for ASPD. Even if using a Spear, Spear Quicken is a Lord Knight skill.", icon: Shield },
    ],
    gear: {
      left: {
        title: "Paradise Upgrade Path",
        items: [
          "Eden Spear III (樂園團長矛 III): Core beginner weapon.",
          "Shadow Knight Armor: Increases Pierce damage and reduces SP cost.",
          "Shadow Knight Shoes: Works with Armor for massive SP recovery boost."
        ]
      },
      right: {
        title: "Dungeon End-Game",
        items: [
          "Champion's Plate: Offers top-tier DEF and STR.",
          "Conquest Manteau: Resistance to all elements.",
          "Ring of Resonance [1]: For auto-spell leveling speed."
        ]
      }
    },
    tip: "The 'Zero' version of the Beetle Card is non-negotiable. It provides SP recovery upon defeating monsters."
  },
  bb: {
    title: "Bowling Bash AGI",
    subtitle: "Fast-Paced Mob Clearing & Leveling",
    icon: Swords,
    color: "#3b82f6",
    overview: "This build trades spear-specialization for 2-Handed Swords. It focuses on high ASPD and the Bowling Bash (保齡球擊) skill to clear entire packs of monsters at once. Ideal for maps with high monster density.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximized ASPD and Flee to survive mobbing." },
      { attr: "STR", val: "70-80", desc: "Solid base damage for each hit of the BB collision." },
      { attr: "DEX", val: "40-50", desc: "Critical for ensuring Bowling Bash doesn't miss mid-mob." },
      { attr: "VIT", val: "Remaining", desc: "A little extra cushion for when you get trapped by mobs." },
    ],
    skills: [
      { name: "Bowling Bash (Lv. 10)", desc: "The AoE king. Learn the 'Gutter Lines' to maximize collision damage.", icon: Swords },
      { name: "Two-Hand Quicken (Lv. 10)", desc: "Mandatory for high ASPD and faster BB cast animation.", icon: Zap },
    ],
    gear: {
      left: {
        title: "Swordmaster Path",
        items: [
          "Eden Two-Handed Sword III: High ATK and easy to refine.",
          "Executioner (Classic): If you can find one, the human-defense ignore is huge.",
          "Agi Shadow Set: Boosts Flee and ASPD thresholds."
        ]
      },
      right: {
        title: "Mobbing Utility",
        items: [
          "Whisper Card: Essential +20 Flee for AGI survival.",
          "Panty/Shirt Set: Early game AGI/Flee combo.",
          "Brooch [1] with Kukre: To hit the 185+ ASPD ceiling."
        ]
      }
    },
    tip: "Bowling Bash damage is doubled if the target is pushed into another monster. Position yourself so the mob 'collides' with itself."
  },
  tank: {
    title: "VIT Tank / WoE",
    subtitle: "The Unstoppable Frontline Guardian",
    icon: Users,
    color: "#22c55e",
    overview: "The pure VIT build is designed for group content and Guild Wars. You aren't there to kill; you are there to stay alive, soak damage, and lock down enemies with stun skills.",
    stats: [
      { attr: "VIT", val: "90-99", desc: "Maximized HP pool and stun immunity." },
      { attr: "STR", val: "50-60", desc: "Enough to carry thousands of potions for long sieges." },
      { attr: "DEX", val: "40-60", desc: "Reduces the cast time of your disruption skills." },
      { attr: "INT", val: "Remaining", desc: "Slightly improves your magic defense (MDEF)." },
    ],
    skills: [
      { name: "Provoke (Lv. 10)", desc: "Essential for peeling bosses and reducing enemy defense in PvP.", icon: AlertTriangle },
      { name: "Endure (Lv. 10)", desc: "Keeps you moving while being hit by 20+ enemies at once.", icon: Shield },
    ],
    gear: {
      left: {
        title: "The Wall Setup",
        items: [
          "Stone Buckle [1]: 5% resistance to Large/Medium monsters.",
          "Pecopeco Card Armor: +10% Maximum HP is mandatory.",
          "Raydric Card Cloak: -20% Neutral damage resistance."
        ]
      },
      right: {
        title: "Siege Specialist",
        items: [
          "Marc Card: To prevent being Frozen in WoE/Dungeons.",
          "Safety Ring: For the extra DEF/MDEF in static tanking.",
          "Matyr Card Shoes: MHP +10% and extra AGI for movement."
        ]
      }
    },
    tip: "As a tank, your job is 'Potting.' Keep your inventory full of White Potions and bind them to a key you can spam."
  }
};

export default function KnightGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("pierce");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Knight Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <Shield size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Knight Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Mastering the Spear, Sword, and Shield</p>
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
              Strategy synthesized from Bahamut (Gamer.com.tw) & Ragnarok Zero Veteran Community <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
