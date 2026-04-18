"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, MapPin, Clock, Sword, Shield, Gem, ChevronRight, Info, ExternalLink, Hammer, Zap, Star, Users, ArrowUpRight } from "lucide-react";
import { DUNGEONS, type Dungeon, type DungeonItem, type DungeonMode } from "@/data/dungeons";

function EquipmentCard({ item }: { item: DungeonItem }) {
  return (
    <div style={{ 
      background: "white", 
      border: "1px solid #e2e8f0", 
      borderRadius: "12px", 
      padding: "1rem", 
      display: "flex", 
      gap: "1rem",
      alignItems: "flex-start",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default"
    }}
    className="equipment-card-hover"
    >
      <div style={{ 
        width: "64px", 
        height: "64px", 
        background: "#f8fafc", 
        borderRadius: "8px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid #f1f5f9"
      }}>
        <img src={item.image} alt={item.name} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>{item.name}</h4>
        <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>{item.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {item.stats.map((stat, i) => (
            <div key={i} style={{ 
              fontSize: "0.65rem", 
              fontWeight: 700, 
              color: "var(--ro-red)", 
              background: "#fff1f2", 
              padding: "2px 8px", 
              borderRadius: "4px",
              width: "fit-content"
            }}>
              {stat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DungeonsPage() {
  const [selectedId, setSelectedId] = useState(DUNGEONS[0].id);
  const dungeon = DUNGEONS.find(d => d.id === selectedId)!;

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
          <Layers size={24} />
          <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>DATABASE</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Memorial Dungeons</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Complete guide to all TWRoZ instanced dungeons — verified statistics, rewards, and crafting progression.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Sidebar List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {DUNGEONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              style={{
                textAlign: "left",
                padding: "1.25rem",
                borderRadius: "16px",
                border: "1px solid",
                borderColor: selectedId === d.id ? "var(--ro-red)" : "#e2e8f0",
                background: selectedId === d.id ? "linear-gradient(135deg, #fff, #fff1f2)" : "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: selectedId === d.id ? "0 10px 25px -5px rgba(225, 29, 72, 0.1)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ 
                  fontSize: "0.65rem", 
                  fontWeight: 800, 
                  background: selectedId === d.id ? "var(--ro-red)" : "#f1f5f9",
                  color: selectedId === d.id ? "white" : "#64748b",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase"
                }}>
                  Lv {d.modes[0].level}
                </span>
                <Clock size={14} color="#94a3b8" />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1e293b" }}>{d.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={12} /> {d.location}
              </div>
            </button>
          ))}

          {/* Special TWRoZ Tip Box */}
          <div style={{ 
            marginTop: "1rem", 
            background: "linear-gradient(135deg, #0f172a, #1e293b)", 
            padding: "1.5rem", 
            borderRadius: "16px", 
            color: "white" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <Users size={18} color="var(--ro-red)" />
              <span style={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.05em" }}>TWROZ PARTY BONUS</span>
            </div>
            <p style={{ fontSize: "0.8rem", opacity: 0.8, lineHeight: 1.5, margin: 0 }}>
              Entering with a party of <strong>7+ players</strong> triggers the official TWRoZ Memorial Reward bonus, significantly increasing the drop rate of Crystals and gear boxes.
            </p>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ 
              background: "white", 
              borderRadius: "24px", 
              border: "1px solid #e2e8f0", 
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
            }}
          >
            {/* Boss Banner */}
            <div style={{ 
              background: "linear-gradient(135deg, #1e293b, #0f172a)", 
              padding: "2rem", 
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
                  <Shield size={16} color="var(--ro-red)" />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.8, letterSpacing: "0.1em" }}>TWRoZ BOSS DATA</span>
                </div>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 900, margin: 0 }}>{dungeon.boss.name}</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>Element:</span> <strong>{dungeon.boss.element}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>Race:</span> <strong>{dungeon.boss.race}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>Size:</span> <strong>{dungeon.boss.size}</strong>
                  </div>
                </div>
              </div>
              <img 
                src={dungeon.boss.image} 
                alt={dungeon.boss.name} 
                style={{ height: "130px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.5))" }}
              />
            </div>

            <div style={{ padding: "2rem" }}>
              {/* Difficulty Modes Table */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Star size={18} color="#fbbf24" fill="#fbbf24" />
                  Difficulty Modes
                </h3>
                <div style={{ border: "1px solid #f1f5f9", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                        <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748b" }}>MODE</th>
                        <th style={{ textAlign: "center", padding: "12px 16px", color: "#64748b" }}>REQ. LEVEL</th>
                        <th style={{ textAlign: "center", padding: "12px 16px", color: "#64748b" }}>BOSS HP</th>
                        <th style={{ textAlign: "right", padding: "12px 16px", color: "#64748b" }}>PRIMARY REWARDS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dungeon.modes.map((mode, i) => (
                        <tr key={i} style={{ borderBottom: i === dungeon.modes.length - 1 ? "none" : "1px solid #f1f5f9" }}>
                          <td style={{ padding: "12px 16px", fontWeight: 700, color: mode.difficulty === "Hard" ? "var(--ro-red)" : "#3b82f6" }}>
                            {mode.difficulty.toUpperCase()}
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "center", color: "#334155", fontWeight: 600 }}>{mode.level}</td>
                          <td style={{ padding: "12px 16px", textAlign: "center", color: "#334155", fontWeight: 600 }}>{mode.hp}</td>
                          <td style={{ padding: "12px 16px", textAlign: "right", color: "#64748b" }}>{mode.rewards.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                {/* Mechanics */}
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Sword size={18} color="var(--ro-red)" />
                    Dungeon Mechanics
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {dungeon.mechanics.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6 }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f1f5f9", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tips */}
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Zap size={18} color="#fbbf24" fill="#fbbf24" />
                    Pro Tips
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {dungeon.proTips.map((tip, i) => (
                      <div key={i} style={{ 
                        background: "#fffbeb", 
                        border: "1px solid #fef3c7", 
                        padding: "1rem", 
                        borderRadius: "12px", 
                        fontSize: "0.85rem", 
                        color: "#92400e",
                        lineHeight: 1.5,
                        display: "flex",
                        gap: "10px"
                      }}>
                        <Info size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crafting System Explanation */}
              <div style={{ marginTop: "3rem", background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Hammer size={18} color="var(--ro-red)" />
                  TWRoZ Equipment Progression
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  {["Subjugation", "Expedition", "Dispatch", "Conqueror"].map((tier, i) => (
                    <div key={tier} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                      <div style={{ 
                        background: i === 0 ? "var(--ro-red)" : "white", 
                        color: i === 0 ? "white" : "#1e293b",
                        border: "1px solid #e2e8f0",
                        padding: "10px",
                        borderRadius: "10px",
                        fontSize: "0.75rem",
                        fontWeight: 800
                      }}>
                        {tier}
                      </div>
                      {i < 3 && <ArrowUpRight size={14} style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "1rem", margin: "1rem 0 0" }}>
                  Upgrade gear at the <strong>Enchant Association Employee (附魔協會職員)</strong> using Jello Stones and Crystals. Note: Refining levels are reset upon tier upgrades.
                </p>
              </div>

              {/* Equipment / Crafting Section */}
              <div style={{ marginTop: "3.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Shield size={20} color="var(--ro-red)" />
                    Dungeon Exclusive Gear
                  </h3>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>{dungeon.equipment.length} Items Indexed</div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  {dungeon.equipment.map((item, i) => (
                    <EquipmentCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .equipment-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          border-color: var(--ro-red) !important;
        }
      `}</style>
    </main>
  );
}
