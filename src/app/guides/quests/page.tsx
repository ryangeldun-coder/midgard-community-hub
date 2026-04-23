"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Scroll, Flag, Map, Zap, CheckCircle2, AlertTriangle, ExternalLink, Globe, Star, Clock } from "lucide-react";
import { useState } from "react";

const QUEST_STAGES = [
  {
    level: "1-10",
    title: "The Awakening",
    location: "Training Ground",
    summary: "Standard novice training. Focus on the 'Zero' specific NPC who gives you your first set of Paradise Group gear.",
    rewards: ["Paradise Dagger", "Novice Potions", "Lv. 10 Job Change"]
  },
  {
    level: "10-30",
    title: "Regional Milestone: Payon",
    location: "Payon / Archer Village",
    summary: "Start the 'Payon Regional Quest'. This introduces you to the concept of Regional Coins, which are essential for early Zero gear upgrades.",
    rewards: ["Payon Coins", "Paradise Armor Set", "Zelunium Ore"]
  },
  {
    level: "30-50",
    title: "Magic & Mystery: Geffen",
    location: "Geffen / Orc Village",
    summary: "The Geffen main quest line takes you through the Orc Dungeon intro. This is where you begin farming your first Shadowdecon pieces.",
    rewards: ["Geffen Coins", "Shadowdecon Ore", "Exp Boosts"]
  },
  {
    level: "50-70",
    title: "Desert Winds: Morroc",
    location: "Morroc / Pyramid",
    summary: "The Morroc Epic Quest is high-difficulty. You will face Elite monsters in the Pyramid. Ensure you have your Paradise III weapon ready.",
    rewards: ["Morroc Coins", "Elite Gear Tokens", "Major EXP"]
  },
  {
    level: "70-90",
    title: "Northern Frontier: Juno",
    location: "Juno / Magma Dungeon",
    summary: "The transition to the 'Advanced Zero' meta. Focus on the Juno Regional quests to unlock the first tier of Memorial Dungeon entry keys.",
    rewards: ["Juno Coins", "Memorial Keys", "Zelunium Refine Kits"]
  },
  {
    level: "90-99",
    title: "The End-Game: Glast Heim",
    location: "Glast Heim / Memorial Dungeons",
    summary: "The final push. Complete the Glast Heim Epic Quest to unlock the 'Himmelmez' Memorial Dungeon, the ultimate source of end-game gear in TWROZ.",
    rewards: ["Cursed Ruby", "Ancient Shadow Gear", "Transcendent EXP"]
  }
];

const DAILY_TASKS = [
  { name: "Paradise Group Boards", freq: "Daily", desc: "Lv. 11-99 boards in the Eden Building. The most consistent EXP source." },
  { name: "Regional Coin Dailies", freq: "Daily", desc: "Repeatable kill quests in major cities for weapon upgrade materials." },
  { name: "Memorial Dungeon Run", freq: "Daily", desc: "Orc Memory or Ant Hell. Essential for Shadow Gear fragments." },
  { name: "The 'Zero' Roulette", freq: "Daily", desc: "Speak to the Event NPC in Prontera for your daily free buff/item." }
];

export default function QuestGuide() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <Breadcrumbs items={[
        { label: "Academy", href: "/guides" },
        { label: "Epic Quest Guide" }
      ]} />

      <header style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem" }}>
          <div style={{ padding: "12px", background: "rgba(225, 29, 72, 0.1)", color: "var(--ro-red)", borderRadius: "16px" }}>
            <Scroll size={32} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>Midgard Epic Path</h1>
              <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 10px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", border: "1px solid #e2e8f0" }}>
                <Globe size={10} /> TWROZ OPTIMIZED
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>The Definitive Ragnarok Zero Main Quest Timeline</p>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "24px", color: "#475569", display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Zap size={24} style={{ color: "#f59e0b", flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            In <strong>Ragnarok Zero</strong>, quests are no longer optional. The Main Quest (Epic Path) provides the <strong>Regional Coins</strong> and <strong>Zelunium</strong> required to refine your gear past +4. Follow this timeline for the most efficient path to Lv. 99.
          </p>
        </div>
      </header>

      {/* Timeline Section */}
      <section style={{ marginBottom: "5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <Flag size={20} /> The Leveling Timeline
        </h2>
        <div style={{ position: "relative", paddingLeft: "2rem", borderLeft: "2px solid #e2e8f0" }}>
          {QUEST_STAGES.map((stage, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: "3rem", position: "relative" }}
            >
              <div style={{ 
                position: "absolute", 
                left: "-2.65rem", 
                top: "0.2rem",
                width: "20px", 
                height: "20px", 
                background: "white", 
                border: `4px solid ${i === 0 ? "var(--ro-red)" : "#94a3b8"}`, 
                borderRadius: "50%",
                zIndex: 1
              }} />
              <div style={{ background: "white", border: "1px solid #e2e8f0", padding: "2rem", borderRadius: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <span style={{ color: "var(--ro-red)", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "1px" }}>LV. {stage.level}</span>
                    <h3 style={{ margin: "4px 0 0 0", fontSize: "1.3rem", fontWeight: 800 }}>{stage.title}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>
                    <Map size={14} /> {stage.location}
                  </div>
                </div>
                <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>{stage.summary}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {stage.rewards.map((r, ri) => (
                    <span key={ri} style={{ padding: "4px 12px", background: "#f1f5f9", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#475569", border: "1px solid #e2e8f0" }}>
                      + {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Daily Meta */}
      <section style={{ marginBottom: "5rem" }}>
        <div style={{ padding: "3rem", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "32px", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
            <Clock size={24} style={{ color: "var(--ro-red)" }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>The Daily Meta</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {DAILY_TASKS.map((task, i) => (
              <div key={i} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 900, color: "var(--ro-red)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{task.freq}</div>
                <h4 style={{ margin: "0 0 8px 0", fontWeight: 800 }}>{task.name}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: "1.5" }}>{task.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tip */}
      <div style={{ padding: "1.5rem 2rem", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "20px", color: "#92400e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
          <AlertTriangle size={18} /> THE PARADISE SECRET
        </div>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
          Do NOT refine your Paradise Group (Eden) gear with normal Oridecon/Elunium. TWROZ provides specific <strong>Eden Refine Stones</strong> through the Main Quest that have a 100% success rate up to +9 for these specific items. Save your Zeny!
        </p>
      </div>

      <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "4rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
          Strategy synthesized from TWROZ Main Quest Logs & Bahamut Leveling Megathreads <ExternalLink size={12} />
        </p>
      </footer>
    </main>
  );
}
