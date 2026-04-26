"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, Plus, Minus, Trash2, Info, Zap, Shield, Swords } from "lucide-react";
import { JOBS, SKILLS, type Skill, type Job } from "@/data/skills";

// Prerequisite thresholds for authentic simulator rules
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
    // Prerequisite validation
    if (delta > 0) {
      const preReq = PREREQUISITES[skillId];
      if (preReq) {
        const currentPreReqLv = allocatedPoints[preReq.skillId] || 0;
        if (currentPreReqLv < preReq.level) {
          alert(`Prerequisite failure: Needs level ${preReq.level} in ${preReq.skillId.replace(/_/g, ' ')}.`);
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

  // Group skills into branching buckets to mimic internal progression hierarchies
  const masteries = skillsForJob.filter(s => s.type === "Passive");
  const actives = skillsForJob.filter(s => s.type === "Active" || s.type === "Toggle");

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
          <Layers size={24} />
          <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>UTILITIES</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Skill Tree Simulator</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Draft official branch builds. Game progression maps strictly enforce requirements.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2rem", alignItems: "start" }}>
        
        {/* Left Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {JOBS.map((j) => {
            const isActive = selectedJob.id === j.id;
            return (
              <button
                key={j.id}
                onClick={() => { setSelectedJob(j); setAllocatedPoints({}); }}
                style={{
                  textAlign: "left",
                  padding: "1.1rem 1.25rem",
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: isActive ? "var(--ro-red)" : "#e2e8f0",
                  background: isActive ? "linear-gradient(135deg, #fff, #fff1f2)" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 10px 25px -5px rgba(225, 29, 72, 0.1)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{j.icon}</span>
                <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>{j.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main builder section */}
        <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "2rem", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem", marginBottom: "2.5rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>POINT ALLOCATION</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
                {currentPointsSpent} / <span style={{ color: "#94a3b8" }}>{MAX_POINTS} pts</span>
              </div>
            </div>
            <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff1f2", color: "var(--ro-red)", border: "1px solid #ffe4e6", padding: "10px 16px", borderRadius: "12px", cursor: "pointer", fontWeight: 800, fontSize: "0.85rem" }}>
              <Trash2 size={16} /> Reset Points
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            
            {/* Column 1: Passives & Masteries */}
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <Shield style={{ color: "#38bdf8" }} /> Passive Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {masteries.map((skill) => {
                  const currentLevel = allocatedPoints[skill.id] || 0;
                  const levelData = skill.levels[currentLevel - 1] || null;
                  const req = PREREQUISITES[skill.id];

                  return (
                    <div key={skill.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.25rem", display: "flex", gap: "1.25rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <button onClick={() => handleSkillChange(skill.id, 1, skill.maxLevel)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}><Plus size={14} /></button>
                        <span style={{ fontSize: "1.1rem", fontWeight: 900, color: currentLevel > 0 ? "var(--ro-red)" : "#94a3b8" }}>{currentLevel}</span>
                        <button onClick={() => handleSkillChange(skill.id, -1, skill.maxLevel)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}><Minus size={14} /></button>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: "1rem", color: "#334155" }}>{skill.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Max Lv: {skill.maxLevel}</div>
                        {req && <div style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700 }}>Needs: {req.skillId} (Lv {req.level})</div>}
                        {levelData && <p style={{ fontSize: "0.8rem", color: "#1e293b", margin: "8px 0 0", fontWeight: 600 }}>{levelData.effect}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Active Abilities */}
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <Swords style={{ color: "#f43f5e" }} /> Active & Combat Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {actives.map((skill) => {
                  const currentLevel = allocatedPoints[skill.id] || 0;
                  const levelData = skill.levels[currentLevel - 1] || null;
                  const req = PREREQUISITES[skill.id];

                  return (
                    <div key={skill.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.25rem", display: "flex", gap: "1.25rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <button onClick={() => handleSkillChange(skill.id, 1, skill.maxLevel)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}><Plus size={14} /></button>
                        <span style={{ fontSize: "1.1rem", fontWeight: 900, color: currentLevel > 0 ? "var(--ro-red)" : "#94a3b8" }}>{currentLevel}</span>
                        <button onClick={() => handleSkillChange(skill.id, -1, skill.maxLevel)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer" }}><Minus size={14} /></button>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: "1rem", color: "#334155" }}>{skill.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Max Lv: {skill.maxLevel}</div>
                        {req && <div style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700 }}>Needs: {req.skillId} (Lv {req.level})</div>}
                        {levelData && <p style={{ fontSize: "0.8rem", color: "#1e293b", margin: "8px 0 0", fontWeight: 600 }}>{levelData.effect}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
