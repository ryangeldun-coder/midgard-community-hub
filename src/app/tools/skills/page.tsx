"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, Plus, Minus, Trash2, Info, Zap, Shield, Swords } from "lucide-react";
import { JOBS, SKILLS, type Skill, type Job } from "@/data/skills";

export default function SkillSimulatorPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);
  const [allocatedPoints, setAllocatedPoints] = useState<Record<string, number>>({});
  
  // Max allowed job points
  const MAX_POINTS = 50;

  const skillsForJob = SKILLS[selectedJob.id] || [];

  const currentPointsSpent = Object.values(allocatedPoints).reduce((a, b) => a + b, 0);

  const handleSkillChange = (skillId: string, delta: number, maxLevel: number) => {
    setAllocatedPoints((prev) => {
      const current = prev[skillId] || 0;
      const next = Math.max(0, Math.min(maxLevel, current + delta));

      // Validate against total budget limit
      if (delta > 0 && currentPointsSpent >= MAX_POINTS) return prev;

      return { ...prev, [skillId]: next };
    });
  };

  const handleReset = () => {
    setAllocatedPoints({});
  };

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      
      {/* Header mimicking standard design system */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
          <Layers size={24} />
          <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>UTILITIES</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Skill Tree Simulator</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Map out your character builds, evaluate scaling constants, and review skill point requirements.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2rem", alignItems: "start" }}>
        
        {/* Left Sidebar: Job Classes Selector */}
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

        {/* Right: Live Builder Workspace */}
        <div style={{ background: "white", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "2rem", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          
          {/* Control Board */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700 }}>BUDGET ALLOCATION</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "2px" }}>
                {currentPointsSpent} / <span style={{ color: "#94a3b8" }}>{MAX_POINTS} pts</span>
              </div>
            </div>
            <button 
              onClick={handleReset}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                background: "#fff1f2", 
                color: "var(--ro-red)", 
                border: "1px solid #ffe4e6", 
                padding: "10px 16px", 
                borderRadius: "12px", 
                fontSize: "0.85rem", 
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#ffe4e6"}
              onMouseOut={(e) => e.currentTarget.style.background = "#fff1f2"}
            >
              <Trash2 size={16} /> Reset Tree
            </button>
          </div>

          {/* Skill Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
            {skillsForJob.map((skill) => {
              const currentLevel = allocatedPoints[skill.id] || 0;
              const levelData = skill.levels[currentLevel - 1] || null;

              return (
                <div 
                  key={skill.id} 
                  style={{ 
                    background: "#f8fafc", 
                    border: "1px solid #e2e8f0", 
                    borderRadius: "16px", 
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    transition: "border-color 0.2s"
                  }}
                >
                  {/* Left: Stepper Controls */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => handleSkillChange(skill.id, 1, skill.maxLevel)}
                      disabled={currentLevel >= skill.maxLevel || currentPointsSpent >= MAX_POINTS}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        opacity: (currentLevel >= skill.maxLevel || currentPointsSpent >= MAX_POINTS) ? 0.4 : 1,
                        color: "#0f172a"
                      }}
                    >
                      <Plus size={16} />
                    </button>
                    <div style={{ fontSize: "1.25rem", fontWeight: 900, color: currentLevel > 0 ? "var(--ro-red)" : "#94a3b8" }}>
                      {currentLevel}
                    </div>
                    <button
                      onClick={() => handleSkillChange(skill.id, -1, skill.maxLevel)}
                      disabled={currentLevel <= 0}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        opacity: currentLevel <= 0 ? 0.4 : 1,
                        color: "#0f172a"
                      }}
                    >
                      <Minus size={16} />
                    </button>
                  </div>

                  {/* Right: Content details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{skill.name}</h3>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>
                        Max Lv {skill.maxLevel} • {skill.type}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 12px", lineHeight: 1.5 }}>{skill.description}</p>

                    {/* Real-time calculated effects or Level 1 fallback preview */}
                    {levelData ? (
                      <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "10px", padding: "1rem", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#b45309", display: "flex", alignItems: "center", gap: "6px" }}>
                          <Sparkles size={14} /> CURRENT LEVEL {currentLevel} EFFECT
                        </span>
                        <p style={{ fontSize: "0.85rem", color: "#92400e", margin: "4px 0 0", fontWeight: 600 }}>{levelData.effect}</p>
                        <div style={{ display: "flex", gap: "12px", marginTop: "6px", flexWrap: "wrap" }}>
                          {levelData.sp && <span style={{ fontSize: "0.75rem", color: "#d97706" }}>SP Cost: <strong>{levelData.sp}</strong></span>}
                          {levelData.cast !== undefined && <span style={{ fontSize: "0.75rem", color: "#d97706" }}>Cast: <strong>{levelData.cast}s</strong></span>}
                          {levelData.cooldown && <span style={{ fontSize: "0.75rem", color: "#d97706" }}>CD: <strong>{levelData.cooldown}s</strong></span>}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Info size={14} /> Allocate points above to preview scaling characteristics.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </main>
  );
}
