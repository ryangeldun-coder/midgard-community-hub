"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Music, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Snowflake, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  bragi: {
    title: "Poem of Bragi / Support",
    subtitle: "The Party's Heartbeat",
    icon: Zap,
    color: "#4ade80",
    overview: "This is the most important support role in TWROZ. By using A Poem of Bragi (布萊奇之詩), you dramatically reduce the cast time and after-cast delay of the entire party. A Wizard's damage output is doubled when standing in your song.",
    stats: [
      { attr: "INT", val: "90-99", desc: "Reduces after-cast delay. This is the most important stat for Bragi." },
      { attr: "DEX", val: "70-80", desc: "Reduces fixed cast time for the party. Essential for Wizards." },
      { attr: "VIT", val: "50-70", desc: "Essential for surviving in high-end dungeons while performing." },
      { attr: "AGI", val: "Remaining", desc: "Increases your own Flee and ASPD for faster skill transitions." },
    ],
    skills: [
      { name: "A Poem of Bragi (Lv. 10)", desc: "Reduces cast time and after-cast delay for all allies in range.", icon: Zap },
      { name: "Assassin Cross of Sunset (Lv. 10)", desc: "Massively increases party ASPD. Mandatory for Knight/Assassin parties.", icon: Swords },
    ],
    gear: {
      left: {
        title: "The Musician's Kit",
        items: [
          "Eden Violin III: Great base INT for early-game support.",
          "Harp [2]: High INT weapon for maximizing Bragi's efficiency.",
          "Shadow Bard/Dancer Shield: Increases the range of your songs."
        ]
      },
      right: {
        title: "Sustainability",
        items: [
          "Spiritual Ring: For the massive INT and SP recovery.",
          "Raydric Card Cloak: 20% Neutral reduction for safer performing.",
          "High INT Accessories: Earrings [1] with Elder Willow cards."
        ]
      }
    },
    tip: "Song effectiveness is calculated at the MOMENT you cast it. If you have an INT-boosting buff, wait for it to proc before starting your song."
  },
  vulcan: {
    title: "Arrow Vulcan Burst",
    subtitle: "High-Tier Ranged DPS",
    icon: Target,
    color: "#3b82f6",
    overview: "Arrow Vulcan (奧義箭亂舞) is the primary DPS tool for Bards/Dancers in Zero. It deals multi-hit ranged damage with a high multiplier. In TWROZ, this build is a popular alternative to Sniper for safe farming.",
    stats: [
      { attr: "DEX", val: "99", desc: "Primary damage stat for all Bow and Instrument-based strikes." },
      { attr: "AGI", val: "80-90", desc: "Reduces the animation delay of Arrow Vulcan, allowing for faster spam." },
      { attr: "INT", val: "40-60", desc: "Increases your SP pool for constant skill usage." },
      { attr: "VIT", val: "Remaining", desc: "Extra HP to survive when targets get too close." },
    ],
    skills: [
      { name: "Arrow Vulcan (Lv. 10)", desc: "Launches a flurry of arrows for massive single-target damage.", icon: Target },
      { name: "Musical Lesson (Lv. 10)", desc: "Passively increases damage when using instruments.", icon: Music },
    ],
    gear: {
      left: {
        title: "Ranged Arsenal",
        items: [
          "Eden Bow III: Excellent starter for Vulcan builds.",
          "Gakkung [2]: High-DEX bow for specialized carding.",
          "Shadow Bard/Dancer Weapon: Significantly boosts Arrow Vulcan damage."
        ]
      },
      right: {
        title: "Burst Support",
        items: [
          "Apple o' Archer: For the +3 DEX headgear slot.",
          "Gloves [1] with Zerom Cards: To hit the DEX ceiling.",
          "Phen Card: Essential so your Vulcan cast isn't interrupted."
        ]
      }
    },
    tip: "You can use Arrow Vulcan with a Bow OR an Instrument. While Bows deal more raw damage, Instruments allow you to switch to songs instantly."
  },
  control: {
    title: "PVP / Gypsy Kiss Control",
    subtitle: "The Anti-Magic & SP Battery",
    icon: Users,
    color: "#a855f7",
    overview: "Focuses on Service for You (Gypsy's Kiss) and Frost Joker. In TWROZ WoE, your role is to ensure your party never runs out of SP while freezing the entire enemy frontline.",
    stats: [
      { attr: "VIT", val: "90-99", desc: "Survivability to stay in the frontline and perform." },
      { attr: "INT", val: "80-90", desc: "Maximizes the SP recovery and reduction from Gypsy's Kiss." },
      { attr: "DEX", val: "60-70", desc: "Ensures your Frost Joker procs faster and more reliably." },
      { attr: "AGI", val: "Remaining", desc: "Increases Flee to dodge physical burst." },
    ],
    skills: [
      { name: "Service for You / Gypsy's Kiss (Lv. 10)", desc: "Massively increases Max SP and reduces SP consumption for the party.", icon: Heart },
      { name: "Frost Joker / Scream (Lv. 5)", desc: "Wide-area chance to Freeze or Stun all enemies in range.", icon: Snowflake },
    ],
    gear: {
      left: {
        title: "Defensive Perform",
        items: [
          "Valkyrian Shield [1]: Standard for WoE damage reduction.",
          "Shadow Bard/Dancer Armor: Reduces the chance of having your songs interrupted.",
          "Rope [4]: Carded with status-inflicting cards (Plankton/Marina)."
        ]
      },
      right: {
        title: "Status Resistance",
        items: [
          "Marc Card Armor: Immunity to Frozen is mandatory.",
          "Feather Beret: 10% Demi-human reduction.",
          "High VIT Accessories: To resist enemy Scream/Stun."
        ]
      }
    },
    tip: "Use 'Encore' to restart your last performance for half the SP cost. Essential for long WoE sieges."
  }
};

import { Shield } from "lucide-react"; // Cross-check

export default function BardGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("bragi");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Bard & Dancer Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(74, 222, 128, 0.1)", color: "#4ade80", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <Music size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Bard & Dancer Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Master of Rhythm, Support, and Ranged Burst</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: "20px", color: "#166534" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> THE PERFORMANCE META
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Performer Meta & Gamer.com.tw Song Guides <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
