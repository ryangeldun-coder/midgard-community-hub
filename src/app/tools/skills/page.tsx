"use client";

import React, { useState } from "react";
import { JOBS, SKILLS, Skill, Job } from "@/data/skills";
import { Layers, Trash2, Plus, Minus, ShieldAlert, Info, CheckCircle2 } from "lucide-react";

const PREREQUISITES: Record<string, { skillId: string; level: number }> = {
  magnum_break: { skillId: "bash", level: 5 },
  two_hand_quicken: { skillId: "two_hand_sword_mastery", level: 1 },
  bowling_bash: { skillId: "two_hand_quicken", level: 1 },
  cavalry_mastery: { skillId: "peco_riding", level: 1 },
  brandish_spear: { skillId: "spear_mastery", level: 5 },
  pierce: { skillId: "spear_mastery", level: 1 },
  spear_boomerang: { skillId: "pierce", level: 3 },
  holy_cross: { skillId: "heal", level: 3 },
  grand_cross: { skillId: "holy_cross", level: 6 },
  shield_boomerang: { skillId: "guard", level: 3 },
  devotion: { skillId: "guard", level: 5 },
  fire_wall: { skillId: "fire_bolt", level: 4 },
  meteor_storm: { skillId: "fire_wall", level: 5 },
  storm_gust: { skillId: "cold_bolt", level: 5 },
  lord_of_vermilion: { skillId: "lightning_bolt", level: 5 },
  heavens_drive: { skillId: "earth_spike", level: 3 },
  quagmire: { skillId: "heavens_drive", level: 1 },
  water_ball: { skillId: "cold_bolt", level: 4 },
  napalm_vulcan: { skillId: "soul_strike", level: 5 },
  free_cast: { skillId: "study", level: 3 },
  hindsight: { skillId: "free_cast", level: 4 },
  land_protector: { skillId: "earth_spike", level: 2 },
  ankle_snare: { skillId: "land_mine", level: 1 },
  shockwave_trap: { skillId: "ankle_snare", level: 1 },
  claymore_trap: { skillId: "shockwave_trap", level: 1 },
  steel_crow: { skillId: "falcon_mastery", level: 1 },
  blitz_beat: { skillId: "falcon_mastery", level: 1 },
  pneuma: { skillId: "ruwach", level: 1 },
  warp_portal: { skillId: "teleport", level: 2 },
  magnificat: { skillId: "increase_agi", level: 3 },
  sanctuary: { skillId: "heal", level: 5 },
  magnus_exorcismus: { skillId: "sanctuary", level: 7 },
  chain_combo: { skillId: "triple_attack", level: 5 },
  combo_finish: { skillId: "chain_combo", level: 3 },
  asura_strike: { skillId: "combo_finish", level: 3 },
  weapon_perfection: { skillId: "weapon_research", level: 2 },
  overthrust: { skillId: "weapon_perfection", level: 3 },
  bomb: { skillId: "prepare_potion", level: 3 },
  acid_terror: { skillId: "prepare_potion", level: 5 },
  katar_mastery: { skillId: "double_attack", level: 5 },
  sonic_blow: { skillId: "katar_mastery", level: 4 },
  grimtooth: { skillId: "sonic_blow", level: 5 },
  snatcher: { skillId: "steal", level: 5 },
  backstab: { skillId: "snatcher", level: 4 },
  raid: { skillId: "hide", level: 3 },
  strip_shield: { skillId: "strip_helm", level: 5 },
  strip_armor: { skillId: "strip_shield", level: 5 },
  strip_weapon: { skillId: "strip_armor", level: 5 },
  full_strip: { skillId: "strip_weapon", level: 5 },
  preserve: { skillId: "plagiarism", level: 5 },
  advanced_katar_mastery: { skillId: "katar_mastery", level: 5 },
  enchant_deadly_poison: { skillId: "enchant_poison", level: 5 },
  assumptio: { skillId: "sanctuary", level: 3 },
};

export default function SkillSimulatorPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);
  const [allocatedPoints, setAllocatedPoints] = useState<Record<string, number>>({});
  const [inspectedSkill, setInspectedSkill] = useState<Skill | null>(null);
  
  const MAX_JOB1 = 49;
  const MAX_JOB2 = 69;

  const skillsForJob = SKILLS[selectedJob.id] || [];
  const job1Skills = skillsForJob.filter(s => s.jobTier === 1);
  const job2Skills = skillsForJob.filter(s => s.jobTier === 2);

  const pointsSpent1 = job1Skills.reduce((sum, s) => sum + (allocatedPoints[s.id] || 0), 0);
  const pointsSpent2 = job2Skills.reduce((sum, s) => sum + (allocatedPoints[s.id] || 0), 0);

  const handleSkillChange = (skillId: string, delta: number, maxLevel: number) => {
    const targetSkill = skillsForJob.find(s => s.id === skillId);
    if (!targetSkill) return;

    if (delta > 0) {
      const updates: Record<string, number> = {};

      const resolvePrereqs = (sId: string) => {
        const req = PREREQUISITES[sId];
        if (!req) return;
        
        const currentLv = allocatedPoints[req.skillId] || 0;
        const neededLv = req.level;
        if (currentLv < neededLv) {
          updates[req.skillId] = neededLv;
        }
        resolvePrereqs(req.skillId);
      };

      resolvePrereqs(skillId);

      setAllocatedPoints((prev) => {
        const nextState = { ...prev };
        let newPointsSpent1 = pointsSpent1;
        let newPointsSpent2 = pointsSpent2;

        // Allocate prerequisites
        for (const [uSkillId, uLevel] of Object.entries(updates)) {
          const uSkill = skillsForJob.find(s => s.id === uSkillId);
          if (uSkill) {
            const existing = prev[uSkillId] || 0;
            if (existing < uLevel) {
              const ptsDelta = uLevel - existing;
              if (uSkill.jobTier === 1) newPointsSpent1 += ptsDelta;
              if (uSkill.jobTier === 2) newPointsSpent2 += ptsDelta;
              nextState[uSkillId] = uLevel;
            }
          }
        }

        // Allocate target
        const current = prev[skillId] || 0;
        if (current < maxLevel) {
          if (targetSkill.jobTier === 1 && newPointsSpent1 < MAX_JOB1) {
            nextState[skillId] = current + 1;
          } else if (targetSkill.jobTier === 2 && newPointsSpent2 < MAX_JOB2) {
            nextState[skillId] = current + 1;
          }
        }

        return nextState;
      });
    } else {
      setAllocatedPoints((prev) => {
        const current = prev[skillId] || 0;
        const next = Math.max(0, Math.min(maxLevel, current + delta));
        return { ...prev, [skillId]: next };
      });
    }
  };

  const handleReset = () => {
    setAllocatedPoints({});
    setInspectedSkill(null);
  };

  const renderSkillList = (skills: Skill[], currentSpent: number, maxBudget: number, title: string) => (
    <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px -2px rgba(15, 23, 42, 0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{title}</h2>
        <span style={{ fontSize: "0.9rem", fontWeight: 800, color: currentSpent >= maxBudget ? "var(--ro-red)" : "#64748b" }}>
          {currentSpent} / {maxBudget} pts
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {skills.map((skill) => {
          const currentLevel = allocatedPoints[skill.id] || 0;
          const req = PREREQUISITES[skill.id];
          const isReqMet = !req || (allocatedPoints[req.skillId] || 0) >= req.level;
          const isInspected = inspectedSkill?.id === skill.id;

          return (
            <div 
              key={skill.id}
              onClick={() => setInspectedSkill(skill)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "12px",
                background: isInspected ? "#fff1f2" : (currentLevel > 0 ? "#f8fafc" : "white"),
                border: "1px solid",
                borderColor: isInspected ? "var(--ro-red)" : (currentLevel > 0 ? "#cbd5e1" : "#e2e8f0"),
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1e293b" }}>{skill.name}</div>
                  {req && (
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: isReqMet ? "#10b981" : "#ef4444" }}>
                      Req: {req.skillId.replace(/_/g, ' ')} ({req.level})
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f1f5f9", padding: "4px 8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSkillChange(skill.id, -1, skill.maxLevel); }}
                    disabled={currentLevel <= 0}
                    style={{ cursor: "pointer", border: "none", background: "none", color: "#475569", padding: "2px" }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontWeight: 900, fontSize: "0.9rem", color: "var(--ro-red)", minWidth: "20px", textAlign: "center" }}>
                    {currentLevel}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSkillChange(skill.id, 1, skill.maxLevel); }}
                    disabled={currentLevel >= skill.maxLevel || currentSpent >= maxBudget}
                    style={{ cursor: "pointer", border: "none", background: "none", color: "#475569", padding: "2px" }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const currentInspectedLevel = inspectedSkill ? (allocatedPoints[inspectedSkill.id] || 0) : 0;
  const levelData = inspectedSkill && currentInspectedLevel > 0 ? inspectedSkill.levels[currentInspectedLevel - 1] : inspectedSkill?.levels[0];

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
            <Layers size={24} />
            <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>SIMULATOR</span>
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Interactive Skill Trees</h1>
        </div>
        <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff1f2", color: "var(--ro-red)", border: "1px solid #ffe4e6", padding: "12px 20px", borderRadius: "12px", cursor: "pointer", fontWeight: 800 }}>
          <Trash2 size={18} /> Reset Build
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 1fr 340px", gap: "1.5rem", alignItems: "start" }}>
        
        {/* Classes Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {JOBS.map((j) => {
            const isActive = selectedJob.id === j.id;
            return (
              <button
                key={j.id}
                onClick={() => { setSelectedJob(j); setAllocatedPoints({}); setInspectedSkill(null); }}
                style={{
                  textAlign: "left",
                  padding: "0.85rem 1.25rem",
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

        {/* Job 1 Skills */}
        {renderSkillList(job1Skills, pointsSpent1, MAX_JOB1, "1st Job Skills")}

        {/* Job 2 Skills */}
        {renderSkillList(job2Skills, pointsSpent2, MAX_JOB2, "2nd Job Skills")}

        {/* Inspector Panel */}
        <div style={{ background: "#0f172a", color: "#f8fafc", borderRadius: "20px", padding: "1.5rem", border: "1px solid #1e293b", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)", minHeight: "400px", display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: "100px" }}>
          {inspectedSkill ? (
            <>
              <div style={{ borderBottom: "1px solid #1e293b", paddingBottom: "0.75rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--ro-red)", fontWeight: 800, letterSpacing: "0.05em" }}>
                  {inspectedSkill.type.toUpperCase()} {inspectedSkill.element ? `• ${inspectedSkill.element.toUpperCase()}` : ""}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: "4px 0 0 0", color: "white" }}>{inspectedSkill.name}</h3>
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, marginBottom: "4px" }}>DESCRIPTION</div>
                <p style={{ fontSize: "0.85rem", color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>{inspectedSkill.description}</p>
              </div>

              {levelData && (
                <div style={{ background: "#1e293b", padding: "12px", borderRadius: "12px", border: "1px solid #334155", marginTop: "auto" }}>
                  <div style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 800, marginBottom: "6px" }}>
                    CURRENT EFFECT (LV {currentInspectedLevel || 1})
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#f8fafc", lineHeight: 1.4 }}>{levelData.effect}</div>
                  {levelData.sp !== undefined && (
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "6px", fontWeight: 600 }}>
                      SP Cost: {levelData.sp}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, color: "#64748b", textAlign: "center" }}>
              <Info size={32} style={{ marginBottom: "12px", color: "#334155" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Select a skill to inspect specifications</span>
            </div>
          )}
        </div>

      </div>
      
    </main>
  );
}
