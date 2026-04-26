"use client";

import { motion } from "framer-motion";
import { Flame, MapPin, Skull, Gem, ChevronRight, Activity, Zap, Tags } from "lucide-react";
import Link from "next/link";
import { FEVER_MAPS } from "@/data/fever-maps";
import { useState } from "react";

export default function FeverMapsPage() {
  const [expandedMonster, setExpandedMonster] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const toggleMonster = (monsterName: string) => {
    if (expandedMonster === monsterName) {
      setExpandedMonster(null);
    } else {
      setExpandedMonster(monsterName);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "8px 24px", background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", borderRadius: "100px", marginBottom: "1.5rem" }}>
          <Flame size={20} color="#ef4444" />
          <span style={{ fontWeight: 800, color: "#ef4444", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem" }}>Zero Database Analytics</span>
        </div>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 900, color: "#1e293b", margin: "0 0 1rem", letterSpacing: "-1px", lineHeight: 1.1 }}>
          <span style={{ color: "var(--ro-red)" }}>Fever</span> Fields
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
          Comprehensive drop tables and exact monster stats for the exclusive Fever Maps. Data sourced accurately for the TWROZ environment.
        </p>
      </motion.div>

      {/* Map Grid */}
      <motion.div variants={container} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {FEVER_MAPS.map((map) => (
          <motion.div key={map.id} variants={item} className="fever-card" style={{ 
            background: "white", 
            borderRadius: "32px", 
            overflow: "hidden", 
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Card Header */}
            <div style={{ background: map.bgGradient, padding: "2.5rem 2rem", position: "relative", overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ position: "absolute", top: "-50%", right: "-5%", opacity: 0.1 }}>
                <Skull size={300} color="white" />
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ color: "white", fontSize: "2.2rem", fontWeight: 900, margin: "0 0 0.5rem", letterSpacing: "-0.5px" }}>
                  {map.name}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontSize: "0.9rem", fontWeight: 700, background: "rgba(0,0,0,0.2)", padding: "4px 12px", borderRadius: "100px" }}>
                    <MapPin size={14} /> {map.mapCode}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontSize: "0.9rem", fontWeight: 700, background: "rgba(0,0,0,0.2)", padding: "4px 12px", borderRadius: "100px" }}>
                    <Activity size={14} /> {map.levelRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Monster List Data */}
            <div style={{ padding: "2rem" }}>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                {map.description}
              </p>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                Ecosystem & Drop Tables
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {map.monsters.map((mob, idx) => {
                  const isExpanded = expandedMonster === `${map.id}-${mob.name}`;
                  const isBoss = mob.type === "Boss";
                  const isChamp = mob.type === "Champion";
                  
                  let typeColor = "#64748b";
                  let typeBg = "#f8fafc";
                  if (isBoss) { typeColor = "#ef4444"; typeBg = "#fee2e2"; }
                  else if (isChamp) { typeColor = "#d97706"; typeBg = "#fef3c7"; }

                  return (
                    <div key={idx} style={{ border: `1px solid ${isBoss ? "#fca5a5" : "#e2e8f0"}`, borderRadius: "16px", overflow: "hidden" }}>
                      
                      {/* Monster Row Header */}
                      <div onClick={() => toggleMonster(`${map.id}-${mob.name}`)} style={{ padding: "1rem 1.5rem", background: isExpanded ? "#f8fafc" : "white", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{ padding: "4px 10px", background: typeBg, color: typeColor, borderRadius: "8px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
                            {mob.type}
                          </span>
                          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b" }}>{mob.name}</span>
                          {mob.level && <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>Lv. {mob.level}</span>}
                        </div>
                        <ChevronRight size={20} color="#94a3b8" style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </div>

                      {/* Monster Details (Expanded) */}
                      {isExpanded && (
                        <div style={{ padding: "1.5rem", background: "white", borderTop: "1px solid #f1f5f9" }}>
                          {/* Stats Grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>HP</div>
                              <div style={{ fontWeight: 800, color: "#1e293b" }}>{mob.hp ? mob.hp.toLocaleString() : "?"}</div>
                            </div>
                            <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>Element</div>
                              <div style={{ fontWeight: 800, color: "#1e293b" }}>{mob.element || "?"}</div>
                            </div>
                            <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>Race</div>
                              <div style={{ fontWeight: 800, color: "#1e293b" }}>{mob.race || "?"}</div>
                            </div>
                            <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>Size</div>
                              <div style={{ fontWeight: 800, color: "#1e293b" }}>{mob.size || "?"}</div>
                            </div>
                          </div>

                          {/* Drops List */}
                          <div>
                            <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                              <Gem size={16} /> Notable Drops
                            </h4>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }}>
                              {mob.drops.map((drop, dIdx) => (
                                <div key={dIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: drop.isFeverGear ? "#fef2f2" : "#f1f5f9", borderRadius: "12px", border: `1px solid ${drop.isFeverGear ? "#fecaca" : "#e2e8f0"}` }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    {drop.isFeverGear && <Flame size={16} color="#ef4444" />}
                                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: drop.isFeverGear ? "#b91c1c" : "#1e293b" }}>{drop.name}</span>
                                    {drop.isFeverGear && <span style={{ fontSize: "0.7rem", padding: "2px 8px", background: "#ef4444", color: "white", borderRadius: "100px", fontWeight: 800 }}>Fever Option</span>}
                                  </div>
                                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#64748b" }}>
                                    {drop.rate ? drop.rate : "??%"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
