"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Skull, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  sonic: {
    title: "Sonic Blow Burst",
    subtitle: "The Elite MVP & Elite Monster Hunter",
    icon: Zap,
    color: "#a855f7",
    overview: "Assassins in Ragnarok Zero are the undisputed kings of single-target burst. This build focuses on maximizing Sonic Blow (音速投擲) damage to 1-shot elite monsters and dominate MVP contests.",
    stats: [
      { attr: "STR", val: "90-99", desc: "Highest priority. Sonic Blow damage scales heavily with raw STR." },
      { attr: "DEX", val: "50-60", desc: "Essential for Sonic Blow hit rate. Missing a burst is a huge DPS loss." },
      { attr: "AGI", val: "40-60", desc: "Secondary priority for Flee and reducing animation lock." },
      { attr: "VIT", val: "Remaining", desc: "Survivability for MVP encounters." },
    ],
    skills: [
      { name: "Sonic Blow (Lv. 10)", desc: "Your primary burst tool. Massive multiplier against single targets.", icon: Zap },
      { name: "Enchant Poison (Lv. 10)", desc: "Essential for neutral monsters. Boosts poison-element damage.", icon: Skull },
    ],
    gear: {
      left: {
        title: "Paradise Burst",
        items: [
          "Eden Katar III: Base weapon for every Zero Assassin.",
          "Shadow Assassin Shield: Dramatically boosts Sonic Blow damage.",
          "Shadow Assassin Glove: Reduces the SP consumption of burst skills."
        ]
      },
      right: {
        title: "Elite Hunter",
        items: [
          "Infiltrator [1]: The top-tier Katar for Demi-human farming.",
          "Jur [3] with Cards: Triple Abysmal Knight for pure MVP hunting.",
          "Silent Shoes: Provides massive Flee and Agi."
        ]
      }
    },
    tip: "Use Sonic Acceleration (Quest Skill) to double your Sonic Blow hit rate and damage. It is mandatory for this build."
  },
  crit: {
    title: "Double Attack Crit",
    subtitle: "The Sustained DPS & 'Lazy' Farmer",
    icon: Swords,
    color: "#ef4444",
    overview: "This build trades burst for sustained, high-speed physical attacks. By using Daggers or Katars with high Crit/Double Attack, you can farm for hours with minimal SP consumption.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximized ASPD and Flee. You are a dodge-tank DPS." },
      { attr: "STR", val: "70-80", desc: "Base damage for your rapid strikes." },
      { attr: "LUK", val: "40-50", desc: "Increases Critical rate and status resistance." },
      { attr: "DEX", val: "Remaining", desc: "Just enough to hit targets that you don't crit." },
    ],
    skills: [
      { name: "Double Attack (Lv. 10)", desc: "Passive chance to deal double damage with Daggers.", icon: Swords },
      { name: "Katar Mastery (Lv. 10)", desc: "Crucial for Katar-based critical builds.", icon: Zap },
    ],
    gear: {
      left: {
        title: "ASPD Mastery",
        items: [
          "Eden Dagger III: Great for Double Attack leveling.",
          "Shadow AGI Set: To hit the 185+ ASPD ceiling.",
          "Agi Brooch [1]: With Kukre Card for speed."
        ]
      },
      right: {
        title: "The Crit Path",
        items: [
          "Specialty Jur [4]: For quad-critical card stacking.",
          "Pantie/Shirt Set: Early game AGI/Flee combo.",
          "Whisper Card: Essential for Flee-based survival."
        ]
      }
    },
    tip: "Double Attack takes priority over Crits. If you want a 100% Crit build, you must use a Katar and NOT use a Dagger."
  },
  grimtooth: {
    title: "Grimtooth Mobber",
    subtitle: "High-Efficiency Dungeon Clearing",
    icon: Users,
    color: "#3b82f6",
    overview: "Grimtooth (無影之牙) is the only AoE skill for Assassins. This build focuses on Hiding and clearing entire mobs from safety. Perfect for dungeons like Orc Lady or Magma.",
    stats: [
      { attr: "STR", val: "90-99", desc: "Raw damage to clear mobs in 2-3 hits of Grimtooth." },
      { attr: "DEX", val: "50-70", desc: "Reduces the 'cast' time and ensures hits connect." },
      { attr: "AGI", val: "40-60", desc: "Increases the speed of the Grimtooth animation." },
      { attr: "INT", val: "Remaining", desc: "Grimtooth is SP-intensive; some INT helps with recovery." },
    ],
    skills: [
      { name: "Grimtooth (Lv. 5)", desc: "Your AoE tool. Can only be used while in Hiding state.", icon: Swords },
      { name: "Cloaking (Lv. 10)", desc: "Move fast while hidden to position for the perfect Grimtooth.", icon: Skull },
    ],
    gear: {
      left: {
        title: "AoE Specialist",
        items: [
          "Eden Katar III: With physical ATK or Large-monster stones.",
          "Shadow Assassin Armor: Specifically boosts Grimtooth damage.",
          "Spiritual Ring: For the much-needed SP recovery."
        ]
      },
      right: {
        title: "Dungeon Survival",
        items: [
          "Raydric Card Cloak: For surviving the mobs before you Hide.",
          "Matyr Card Shoes: Extra HP to survive 'Sight' or 'Ruach'.",
          "Evil Wing: For the flat STR boost."
        ]
      }
    },
    tip: "Position yourself at the edge of a wall or obstacle. Monsters will bunch up, making it easier to hit everyone with Grimtooth."
  }
};

export default function AssassinGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("sonic");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Assassin Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(168, 85, 247, 0.1)", color: "#a855f7", borderRadius: "16px" }}>
            <Skull size={40} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Assassin Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering the Art of Shadow and Burst</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "20px", color: "#5b21b6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
              <AlertTriangle size={18} /> THE "CLUNKY AI" FIX
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
              Many players complain that their Assassin "pauses" between attacks. Move <strong>Enchant Poison</strong> to your <strong>Auto-Buff</strong> slots to ensure the AI only casts them when the timer expires.
            </p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from Gamer.com.tw & Game735 RO Zero Communities <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
