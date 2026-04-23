"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Scroll, Flag, Map, Zap, CheckCircle2, AlertTriangle, ExternalLink, Globe, Star, Clock, Hammer, RefreshCw } from "lucide-react";
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
    level: "10-40",
    title: "The Free Growth Phase",
    location: "Major Cities",
    summary: "TWROZ EXCLUSIVE: You have unlimited stat/skill resets until Lv. 40. Use this to focus on AGI for fast auto-leveling, then reset to your main build at Lv. 39.",
    rewards: ["Unlimited Resets", "Paradise Uniform Set", "Zelunium Ore"]
  },
  {
    level: "40-60",
    title: "Regional Milestone: Payon & Geffen",
    location: "Orc Village / Payon Cave",
    summary: "The 'Z-Quest' meta starts. Complete these for untradeable refine stones. In TWROZ, these stones are critical for pushing your gear to +7 early.",
    rewards: ["Payon Coins", "Shadowdecon Ore", "Exp Boosts"]
  },
  {
    level: "60-85",
    title: "The Battle Doll Grind",
    location: "Prontera Central",
    summary: "Daily: Kill mobs to collect 'Battle Dolls'. Exchange them at NPC Rick (Prontera 260, 268) for refine materials. Do NOT skip this in the TW meta.",
    rewards: ["God Metal Ores", "Aluminum Ores", "Zeny"]
  },
  {
    level: "85-99",
    title: "The End-Game: Glast Heim",
    location: "Glast Heim / Memorial Dungeons",
    summary: "The final push. Complete the Glast Heim Epic Quest to unlock the 'Himmelmez' Memorial Dungeon, the ultimate source of end-game gear in TWROZ.",
    rewards: ["Cursed Ruby", "Ancient Shadow Gear", "Transcendent EXP"]
  }
];

const TW_SPECIFIC_META = [
  { 
    title: "Battle Doll System (戰鬥娃娃)", 
    icon: Star, 
    desc: "A daily system unique to TWROZ. Collect dolls from specific mobs (Poring, Zombie, etc.) and exchange them for refine materials every 24 hours." 
  },
  { 
    title: "Costume Stone Meta", 
    icon: Hammer, 
    desc: "The TWROZ main quest introduces the costume enchant system. Use 'Costume Stones' to add stats like ATK% or Cast Reduction to your headgear." 
  },
  { 
    title: "Unlimited Resets", 
    icon: RefreshCw, 
    desc: "Until Level 40, you can reset your build for free at any town center. Use this to experiment before committing to your end-game stats." 
  }
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
                <Globe size={10} /> TWROZ EXCLUSIVE DATA
              </span>
            </div>
            <p style={{ color: "#64748b", margin: 0, fontWeight: 600 }}>The Veteran-Verified Quest & Leveling Meta</p>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "24px", color: "#475569", display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <AlertTriangle size={24} style={{ color: "#f59e0b", flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
            <strong>CRITICAL:</strong> This guide is synchronized with <strong>Taiwanese Ragnarok Zero (TWROZ)</strong> mechanics. Unlike other servers, TWROZ features a unique Battle Doll system and specific quest breakpoints for Shadow Gear.
          </p>
        </div>
      </header>

      {/* TW Meta Blocks */}
      <section style={{ marginBottom: "5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {TW_SPECIFIC_META.map((meta, i) => (
          <div key={i} style={{ padding: "2rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem", color: "var(--ro-red)", fontWeight: 800 }}>
              <meta.icon size={18} /> {meta.title}
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: "1.6" }}>{meta.desc}</p>
          </div>
        ))}
      </section>

      {/* Timeline Section */}
      <section style={{ marginBottom: "5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <Flag size={20} /> The Quest Timeline
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

      {/* Pro Tip */}
      <div style={{ padding: "1.5rem 2rem", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "20px", color: "#92400e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem", fontWeight: 900, fontSize: "0.9rem" }}>
          <Star size={18} /> VETERAN STRATEGY
        </div>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
          In TWROZ, the **Automatic Battle** system is officially supported. You can buy 'Battle Doll' tickets or use the free daily ones to maintain a 100% uptime on your leveling while you are AFK. Combine this with the **Lv. 1-40 Resets** to find the most efficient AFK build for your class.
        </p>
      </div>

      <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "2rem", marginTop: "4rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
          This data is exclusive to <strong>TWROZ</strong> mechanics. Sourced from Gamer.com.tw Bahamut Veteran Logs <ExternalLink size={12} />
        </p>
      </footer>
    </main>
  );
}
