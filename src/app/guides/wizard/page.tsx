"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Zap, Target, Flame, Info, AlertTriangle, ExternalLink, CloudRain, Snowflake, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  aoe: {
    title: "AoE Destruction",
    subtitle: "The Master of Screen Clearing",
    icon: CloudRain,
    color: "#3b82f6",
    overview: "The classic Wizard playstyle. This build focuses on maximizing the damage of Storm Gust, Meteor Storm, and Lord of Vermilion to clear entire dungeons in seconds. Ideal for power-leveling and party mobbing.",
    stats: [
      { attr: "INT", val: "99", desc: "Maximized MATK and SP pool. Mandatory for high-level spell scaling." },
      { attr: "DEX", val: "80-99", desc: "Reduces long variable cast times for your big AoE spells." },
      { attr: "VIT", val: "30-50", desc: "Essential for surviving mob hits while you are casting." },
      { attr: "LUK", val: "Remaining", desc: "Minor MATK boost and status resistance." },
    ],
    skills: [
      { name: "Storm Gust (Lv. 10)", desc: "Your primary farming and CC tool. The freeze rate is essential for safety.", icon: Snowflake },
      { name: "Meteor Storm (Lv. 10)", desc: "Top tier AoE damage against Earth and Undead targets.", icon: Flame },
    ],
    gear: {
      left: {
        title: "AoE Arsenal",
        items: [
          "Eden Staff III: Base weapon. Look for Cast Time reduction stones.",
          "Shadow Wizard Armor: Increases Storm Gust and LoV damage.",
          "Shadow Wizard Shoes: Reduces the cast time of AoE spells."
        ]
      },
      right: {
        title: "MATK Stacking",
        items: [
          "Mage Coat [1]: Provides much needed INT and MDEF.",
          "Survivor's Rod [1]: Paired with Survivor's Manteau for tankiness.",
          "Isilla Card: Chance to reduce cast time significantly on hit."
        ]
      }
    },
    tip: "Use Heaven's Drive (Lv. 1-5) as a faster, cheaper AoE for lower-health mobs like Orcs or Wolfs."
  },
  sniper: {
    title: "Instant-Cast Bolt Sniper",
    subtitle: "The Zero Meta Farming Machine",
    icon: Target,
    color: "#ef4444",
    overview: "In Ragnarok Zero, Bolt skills (Cold/Fire/Lightning) are extremely efficient for single-target farming. This build focuses on reaching the 'Instant Cast' threshold to machine-gun down targets from range.",
    stats: [
      { attr: "INT", val: "99", desc: "Pure MATK. You want each bolt to 1-shot its target." },
      { attr: "DEX", val: "90-99", desc: "The core stat for reaching the Instant Cast threshold." },
      { attr: "AGI", val: "30-40", desc: "Reduces animation lock between bolts for faster spamming." },
      { attr: "VIT", val: "Remaining", desc: "A small amount of HP for general survival." },
    ],
    skills: [
      { name: "Bolt Skills (Lv. 10)", desc: "Cold, Fire, and Lightning Bolt. Max these based on your farm map.", icon: Zap },
      { name: "Soul Drain (Lv. 10)", desc: "Mandatory. Restores SP on every kill, allowing infinite farming.", icon: Snowflake },
    ],
    gear: {
      left: {
        title: "Bolt Efficiency",
        items: [
          "Sage Worm Card: Boosts bolt damage significantly.",
          "Caster Shadow Set: Crucial for reaching 100% Variable Cast reduction.",
          "Orleans Glove [1]: Top tier DEX and MATK accessory."
        ]
      },
      right: {
        title: "Element Mastery",
        items: [
          "Elemental Staff [1]: Switch based on the target's weakness.",
          "Siroma Card: Massive boost to Cold Bolt damage and cast speed.",
          "Imp Card: Massive boost to Fire Bolt damage and cast speed."
        ]
      }
    },
    tip: "Target targets like Stings (Fire Bolt) or Magmaring (Cold Bolt) for the highest Zeny per hour in this meta."
  },
  support: {
    title: "Dungeon Support",
    subtitle: "The High-End Memorial Specialist",
    icon: Zap,
    color: "#8b5cf6",
    overview: "In elite parties and Memorial Dungeons, the Wizard's role shifts to Crowd Control and Protection. This build focuses on Safety Wall, Quagmire, and status-inflicting spells.",
    stats: [
      { attr: "VIT", val: "80-99", desc: "High HP and status resistance is mandatory for MVPs." },
      { attr: "INT", val: "70-80", desc: "Enough MATK for status procs and Safety Wall duration." },
      { attr: "DEX", val: "70-80", desc: "Consistent casting speed for emergency Safety Walls." },
      { attr: "STR", val: "Remaining", desc: "Weight capacity for Blue Gemstones and Potions." },
    ],
    skills: [
      { name: "Safety Wall (Lv. 10)", desc: "Protects your tank from physical MVP hits. Mandatory.", icon: Zap },
      { name: "Quagmire (Lv. 5)", desc: "Slows mobs and reduces their AGI/DEX by 50%. Essential CC.", icon: CloudRain },
    ],
    gear: {
      left: {
        title: "Tanky Wizard",
        items: [
          "Survivor's Set: The gold standard for Wizard survivability.",
          "Marc Card Armor: To prevent being frozen by boss spells.",
          "Buckler [1] with Card: Racial reduction cards (Thara Frog, etc)."
        ]
      },
      right: {
        title: "Utility Gear",
        items: [
          "Vit Shadow Set: For maximized MHP pools.",
          "Phen Card: Ensures your Safety Wall cast isn't interrupted.",
          "Green Ferus Card: Extra VIT and MHP boost."
        ]
      }
    },
    tip: "Keep Quagmire active under the boss at all times. It reduces the boss's hit rate, making your tank's life much easier."
  }
};

export default function WizardGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("aoe");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Wizard Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: "16px" }}>
            <Zap size={40} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Wizard Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> TWROZ OPTIMIZED
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>Mastering the Elements and the Meta</p>
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
          <div style={{ padding: "1.5rem 2rem", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "20px", color: "#1e40af" }}>
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
