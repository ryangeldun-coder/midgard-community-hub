"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles, Plus, Minus, Trash2, Info, Shield, Swords, ArrowDown } from "lucide-react";
import { JOBS, SKILLS, type Skill, type Job } from "@/data/skills";

// Explicit prerequisite rules mapped out explicitly
const PREREQUISITES: Record<string, { skillId: string; level: number }> = {
  magnum_break: { skillId: "bash", level: 5 },
  bowling_bash: { skillId: "two_hand_quicken", level: 1 },
  cavalry_mastery: { skillId: "peco_riding", level: 1 },
  brandish_spear: { skillId: "peco_riding", level: 1 },
  grand_cross: { skillId: "holy_cross", level: 6 },
  devotion: { skillId: "guard", level: 5 },
  storm_gust: { skillId: "jupitel_thunder", level: 3 },
  lord_of_vermilion: { skillId: "jupitel_thunder", level: 5 },
  steel_crow: { skillId: "falcon_mastery", level: 1 },
  blitz_beat: { skillId: "falcon_mastery", level: 1 },
  combo_finish: { skillId: "triple_attack", level: 5 },
  asura_strike: { skillId: "combo_finish", level: 3 },
  overthrust: { skillId: "power_thrust", level: 3 },
  strip_armor: { skillId: "strip_weapon", level: 3 }
};

export default function SkillSimulatorPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);
  const [allocatedPoints, setAllocatedPoints] = useState<Record<string, number>>({});
  
  const MAX_POINTS = 50;
  const skillsForJob = SKILLS[selectedJob.id] || [];
  const currentPointsSpent = Object.values(allocatedPoints).reduce((a, b) => a + b, 0);

  const handleSkillChange = (skillId: string, delta: number, maxLevel: number) => {
    if (delta > 0) {
      const preReq = PREREQUISITES[skillId];
      if (preReq) {
        const currentPreReqLv = allocatedPoints[preReq.skillId] || 0;
        if (currentPreReqLv < preReq.level) {
          alert(`Prerequisite Failure: Level ${preReq.level} in ${preReq.skillId.replace(/_/g, ' ')} needed.`);
          return;
        }
      }
    }

    setAllocatedPoints((prev) => {
      const current = prev[skillId] || 0;
      const next = Math.max(0, Math.min(maxLevel, current + delta));
      if (delta > 0 && currentPointsSpent >= MAX_POINTS) return prev;
      return { ...prev, [skillId]: next };
    });
  };

  const handleReset = () => {
    setAllocatedPoints({});
  };

  // Graph Depth Calculator for branching trees
  const getDepth = (skillId: string): number => {
    const req = PREREQUISITES[skillId];
    if (!req) return 0;
    return 1 + getDepth(req.skillId);
  };

  const depthBins: Record<number, Skill[]> = {};
  skillsForJob.forEach(s => {
    const d = getDepth(s.id);
    if (!depthBins[d]) depthBins[d] = [];
    depthBins[d].push(s);
  });

  const sortedDepths = Object.keys(depthBins).map(Number).sort((a, b) => a - b);

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
          <Layers size={24} />
          <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>UTILITIES</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Interactive Skill Trees</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Browse structural prerequisites matching server baseline constants.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2.5rem", alignItems: "start" }}>
        
        {/* Classes Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {JOBS.map((j) => {
            const isActive = selectedJob.id === j.id;
            return (
              <button
                key={j.id}
                onClick={() => { setSelectedJob(j); setAllocatedPoints({}); }}
                style={{
                  textAlign: "left",
                  padding: "1rem 1.25rem",
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: isActive ? "var(--ro-red)" : "#e2e8f0",
                  background: isActive ? "linear-gradient(135deg, #fff, #fff1f2)" : "white",
                  cursor: "pointer",
                  fontWeight: 800,
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>{j.icon}</span>
                <span>{j.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tree Flow Builder */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "2rem", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem", marginBottom: "2.5rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>BUDGET POINTS</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>
                {currentPointsSpent} / <span style={{ color: "#cbd5e1" }}>{MAX_POINTS} pts</span>
              </div>
            </div>
            <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff1f2", color: "var(--ro-red)", border: "1px solid #ffe4e6", padding: "10px 16px", borderRadius: "12px", cursor: "pointer", fontWeight: 800, fontSize: "0.85rem" }}>
              <Trash2 size={16} /> Reset Build
            </button>
          </div>

          {/* Interactive Tree Flow (Tiers Layout) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", position: "relative" }}>
            {sortedDepths.map((depthIndex) => (
              <div key={depthIndex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                
                {depthIndex > 0 && (
                  <div style={{ color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                    <ArrowDown size={20} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.05em" }}>UNLOCKS TIER {depthIndex}</span>
                  </div>
                )}

                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
                  {depthBins[depthIndex].map((skill) => {
                    const currentLevel = allocatedPoints[skill.id] || 0;
                    const levelData = skill.levels[currentLevel - 1] || null;
                    const req = PREREQUISITES[skill.id];

                    return (
                      <div 
                        key={skill.id} 
                        style={{ 
                          background: currentLevel > 0 ? "#fffbeb" : "#f8fafc",
                          borderColor: currentLevel > 0 ? "#fef3c7" : "#e2e8f0",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "16px", 
                          padding: "1.25rem", 
                          width: "300px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          boxShadow: currentLevel > 0 ? "0 4px 15px -3px rgba(217, 119, 6, 0.1)" : "none"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>{skill.name}</div>
                            <span style={{ fontSize: "0.7rem", background: "#cbd5e1", color: "#475569", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                              {skill.type}
                            </span>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "white", padding: "4px 8px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                            <button 
                              onClick={() => handleSkillChange(skill.id, -1, skill.maxLevel)} 
                              disabled={currentLevel <= 0}
                              style={{ cursor: "pointer", border: "none", background: "none", padding: "2px", opacity: currentLevel <= 0 ? 0.3 : 1 }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontWeight: 900, fontSize: "0.95rem", color: "var(--ro-red)", minWidth: "16px", textAlign: "center" }}>
                              {currentLevel}/{skill.maxLevel}
                            </span>
                            <button 
                              onClick={() => handleSkillChange(skill.id, 1, skill.maxLevel)} 
                              disabled={currentLevel >= skill.maxLevel || currentPointsSpent >= MAX_POINTS}
                              style={{ cursor: "pointer", border: "none", background: "none", padding: "2px", opacity: currentLevel >= skill.maxLevel ? 0.3 : 1 }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {req && (
                          <div style={{ fontSize: "0.7rem", background: "#fff1f2", color: "var(--ro-red)", padding: "4px 8px", borderRadius: "6px", fontWeight: 700 }}>
                            Req: {req.skillId.replace(/_/g, ' ')} Lv {req.level}
                          </div>
                        )}

                        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>{skill.description}</p>

                        {levelData && (
                          <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "8px", fontSize: "0.75rem", color: "#b45309", fontWeight: 600 }}>
                            {levelData.effect}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </main>
  );
}
