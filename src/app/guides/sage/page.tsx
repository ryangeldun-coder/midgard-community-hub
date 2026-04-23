"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookText, Target, Zap, Info, AlertTriangle, ExternalLink, Swords, Users, Globe, Snowflake, Flame } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const BUILDS = {
  autospell: {
    title: "Auto-Spell Battle Mage",
    subtitle: "High-Speed Melee Caster",
    icon: Zap,
    color: "#60a5fa",
    overview: "The 'Hindsight' build is a TWROZ fan favorite. By maximizing AGI and using Auto-Spell (自動念咒), you trigger high-level Bolts while physically attacking. In Zero, this is one of the fastest solo leveling paths for Sages.",
    stats: [
      { attr: "AGI", val: "90-99", desc: "Maximizes ASPD for more Bolt triggers per second." },
      { attr: "INT", val: "70-80", desc: "Primary damage stat for your auto-casted Bolts." },
      { attr: "DEX", val: "40-50", desc: "Ensures your physical attacks hit, which is required to trigger spells." },
      { attr: "VIT", val: "Remaining", desc: "Survivability for close-quarters combat." },
    ],
    skills: [
      { name: "Auto-Spell (Lv. 10)", desc: "Triggers a selected spell when physically attacking.", icon: Zap },
      { name: "Free Cast (Lv. 10)", desc: "Mandatory. Allows you to move and attack while casting or proccing.", icon: Swords },
    ],
    gear: {
      left: {
        title: "The Battle Tome",
        items: [
          "Eden Book III: Great base MATK and ASPD for starters.",
          "Sage's Diary [2]: The BiS weapon for ASPD-based casters.",
          "Shadow Sage Shield: Significantly increases Auto-Spell damage."
        ]
      },
      right: {
        title: "Speed & Damage",
        items: [
          "Siroma Card Accessories: Essential if using Cold Bolt as your primary spell.",
          "Imp Card Accessories: Essential if using Fire Bolt.",
          "Agi Brooch [1]: With Kukre cards for speed."
        ]
      }
    },
    tip: "Always match your Endow to your Auto-Spell. If you're proccing Fire Bolts, use Flame Gland to imbue your book with Fire for double efficiency."
  },
  support: {
    title: "Elemental Endow Master",
    subtitle: "The Party's Secret Weapon",
    icon: Flame,
    color: "#f87171",
    overview: "This build is the backbone of TWROZ dungeon parties. By providing elemental Endows and using Deluge/Volcano/Whirlwind, you amplify the entire party's damage by up to 50%.",
    stats: [
      { attr: "INT", val: "90-99", desc: "Maximizes your SP pool for constant buffing and SP Transfer." },
      { attr: "DEX", val: "80-90", desc: "Reduces the cast time of long-duration field spells." },
      { attr: "VIT", val: "60-70", desc: "Essential for surviving high-end dungeons while supporting." },
      { attr: "STR", val: "Remaining", desc: "Increases carry capacity for elemental stones (Glands/Ores)." },
    ],
    skills: [
      { name: "Flame/Frost/Lightning Endow (Lv. 5)", desc: "Imbues a party member's weapon with an element.", icon: Flame },
      { name: "Deluge/Volcano/Whirlwind (Lv. 5)", desc: "Field spells that boost elemental damage and enable specific skills.", icon: Snowflake },
    ],
    gear: {
      left: {
        title: "Support Kit",
        items: [
          "Survival Rod [1]: High INT and HP boost for survivability.",
          "Shadow Sage Armor: Reduces the cost of elemental stones.",
          "Bible [2]: For stacking defensive cards like Andre Egg."
        ]
      },
      right: {
        title: "Sustainability",
        items: [
          "Spiritual Ring: Mandatory for SP recovery and INT.",
          "Raydric Card Cloak: Standard defensive requirement.",
          "Phen Card: Ensures your field spells aren't interrupted."
        ]
      }
    },
    tip: "You can sell Endows in town! In TWROZ, Sages often set up shop near dungeon entrances to buff players for a fee."
  },
  pvp: {
    title: "Spell Breaker Control",
    subtitle: "The Anti-Magic Specialist",
    icon: Users,
    color: "#3b82f6",
    overview: "The most feared Sage build in WoE and PVP. You focus on shutting down enemy Wizards and Priests using Spell Breaker, Dispell, and Land Protector.",
    stats: [
      { attr: "VIT", val: "90-99", desc: "Survivability is your only priority. You can't control if you're dead." },
      { attr: "DEX", val: "90-99", desc: "Reduces cast time of Dispell and Land Protector to near-instant." },
      { attr: "INT", val: "40-60", desc: "SP pool for sustained spell breaking." },
      { attr: "AGI", val: "Remaining", desc: "Increases Flee to avoid physical attackers." },
    ],
    skills: [
      { name: "Dispell (Lv. 5)", desc: "Removes all buffs from the target. The ultimate control tool.", icon: Users },
      { name: "Land Protector (Lv. 5)", desc: "Creates a zone where no ground-targeted magic can be cast.", icon: Shield },
    ],
    gear: {
      left: {
        title: "Control Gear",
        items: [
          "Combat Knife: 10% reduction from Demi-humans (BiS for PVP).",
          "Shadow Sage Glove: Increases the success rate of Dispell.",
          "Valkyrian Shield [1]: With Thara Frog card."
        ]
      },
      right: {
        title: "Defensive Meta",
        items: [
          "Marc Card Armor: Immunity to Frozen status is mandatory.",
          "Feather Beret: 10% Demi-human reduction.",
          "High VIT Accessories: To resist Stun and other status effects."
        ]
      }
    },
    tip: "Use 'Spell Breaker' on enemy casters with long cast times (like Wizards). It not only stops them but drains their SP."
  }
};

import { Shield } from "lucide-react"; // Double check

export default function SageGuide() {
  const [activeBuild, setActiveBuild] = useState<keyof typeof BUILDS>("autospell");
  const build = BUILDS[activeBuild];

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Sage Academy" }
      ]} />

      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ padding: "12px", background: "rgba(96, 165, 250, 0.1)", color: "#60a5fa", borderRadius: "16px", display: "flex", flexShrink: 0 }}>
            <BookText size={32} />
          </div>
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 900, color: "#1e293b", margin: 0 }}>Sage Academy</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> RAGNAROK ZERO GLOBAL
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Master of Elements and Magic Control</p>
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
              <AlertTriangle size={18} /> THE ELEMENTAL EDGE
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>{build.tip}</p>
          </div>

          {/* References */}
          <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              Strategy synthesized from TWRoZ Sage Meta & Gamer.com.tw Elemental Guides <ExternalLink size={12} />
            </p>
          </footer>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
