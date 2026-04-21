"use client";

import { motion } from "framer-motion";
import { X, Zap, Shield, Flame } from "lucide-react";
import { Monster } from "@/lib/database";

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#ef4444", Water: "#3b82f6", Wind: "#22c55e", Earth: "#a16207",
  Holy: "#fbbf24", Dark: "#7c3aed", Ghost: "#6b7280", Undead: "#1f2937",
  Poison: "#84cc16", Neutral: "#94a3b8",
};

const ELEMENT_EMOJIS: Record<string, string> = {
  Fire: "🔥", Water: "💧", Wind: "🌪️", Earth: "🪨",
  Holy: "✨", Dark: "🌑", Ghost: "👻", Undead: "💀",
  Poison: "☠️", Neutral: "⚪",
};

export default function MonsterDetails({ monster }: { monster: Monster }) {
  const elementColor = ELEMENT_COLORS[monster.element] || "#94a3b8";
  
  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "2rem", width: "100%", border: `2px solid ${elementColor}44`, boxShadow: `0 20px 60px ${elementColor}15` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <img src={monster.image_url} alt={monster.name_en} style={{ width: 100, height: 100, imageRendering: "pixelated", background: "#f8fafc", borderRadius: "12px", border: `2px solid ${elementColor}44`, padding: "8px" }} />
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{monster.name_en}</h1>
            <p style={{ color: "#94a3b8", margin: "4px 0", fontSize: "1rem" }}>{monster.name_zh} · ID: {monster.id}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: elementColor, background: `${elementColor}18`, padding: "4px 12px", borderRadius: "8px" }}>
                {ELEMENT_EMOJIS[monster.element]} {monster.element} Lv.{monster.element_level}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b", background: "#f1f5f9", padding: "4px 12px", borderRadius: "8px" }}>
                {monster.race} · {monster.size}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Core Stats */}
        <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#64748b", margin: "0 0 1rem 0", letterSpacing: "1px" }}>CORE STATISTICS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              ["Level", monster.level], ["HP", monster.hp.toLocaleString()],
              ["DEF", monster.defense], ["MDEF", monster.magic_defense],
              ["Min ATK", monster.attack_min], ["Max ATK", monster.attack_max],
              ["Flee (95%)", monster.flee_95], ["Hit (100%)", monster.hit_100],
            ].map(([label, val]) => (
              <div key={label as string} style={{ display: "flex", flexDirection: "column", padding: "8px", background: "white", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{label}</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Classification & EXP */}
        <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#64748b", margin: "0 0 1rem 0", letterSpacing: "1px" }}>REWARDS</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", background: "white", padding: "12px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ fontWeight: 700, color: "#475569" }}>Base Experience</span>
              <span style={{ fontWeight: 800, color: "#22c55e" }}>{monster.base_exp.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", background: "white", padding: "12px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ fontWeight: 700, color: "#475569" }}>Job Experience</span>
              <span style={{ fontWeight: 800, color: "#3b82f6" }}>{monster.job_exp.toLocaleString()}</span>
            </div>
            {monster.special_status.length > 0 && (
              <div style={{ marginTop: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", display: "block", marginBottom: "8px" }}>SPECIAL ATTRIBUTES</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {monster.special_status.map((s) => (
                    <span key={s} style={{ fontSize: "0.7rem", background: "#fef9c3", color: "#92400e", padding: "4px 10px", borderRadius: "6px", fontWeight: 700, border: "1px solid #fde047" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drops */}
      {monster.drops.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={18} color="var(--ro-red)" /> DROP TABLE
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
            {monster.drops.map((drop) => (
              <div key={drop.item_id} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", transition: "transform 0.2s" }} className="hover-lift">
                <img src={drop.icon_url} alt={drop.name} style={{ width: 36, height: 36, imageRendering: "pixelated", flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{drop.name}</p>
                  <p style={{ fontSize: "0.75rem", color: drop.rate === "???" ? "#f59e0b" : "#22c55e", fontWeight: 800, margin: 0 }}>
                    {drop.rate === "???" ? "??%" : `${drop.rate}%`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spawns */}
      {monster.spawns.length > 0 && (
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "8px" }}>
            📍 SPAWN LOCATIONS
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {monster.spawns.map((spawn, i) => (
              <span key={i} style={{ fontSize: "0.8rem", background: "#f1f5f9", color: "#475569", padding: "8px 16px", borderRadius: "10px", fontWeight: 600, border: "1px solid #e2e8f0" }}>
                {spawn.description || spawn.map_name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
