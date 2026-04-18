"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Search, ChevronDown, ChevronUp } from "lucide-react";
import { SKILLS, JOBS, type Skill } from "@/data/skills";

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Active:  { bg: "#dbeafe", text: "#1d4ed8" },
  Passive: { bg: "#dcfce7", text: "#15803d" },
  Toggle:  { bg: "#f3e8ff", text: "#7e22ce" },
};

function SkillCard({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(skill.maxLevel);
  const lvData = skill.levels[level - 1];
  const colors = TYPE_COLORS[skill.type] ?? { bg: "#f1f5f9", text: "#475569" };

  return (
    <motion.div
      layout
      style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", marginBottom: "0.75rem" }}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 1rem", cursor: "pointer" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1e293b" }}>{skill.name}</span>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", background: colors.bg, color: colors.text }}>{skill.type}</span>
            {skill.element && <span style={{ fontSize: "0.6rem", background: "#fef9c3", color: "#92400e", padding: "2px 7px", borderRadius: "4px", fontWeight: 600 }}>{skill.element}</span>}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#64748b", margin: "3px 0 0", lineHeight: 1.4 }}>{skill.description}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8" }}>Max Lv.{skill.maxLevel}</span>
          {open ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden", borderTop: "1px solid #f1f5f9" }}
          >
            <div style={{ padding: "1rem" }}>
              {/* Level selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b" }}>LEVEL:</span>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {skill.levels.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLevel(i + 1)}
                      style={{
                        width: 28, height: 28, border: "1px solid", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer",
                        background: level === i + 1 ? "var(--ro-red)" : "white",
                        color: level === i + 1 ? "white" : "#475569",
                        borderColor: level === i + 1 ? "var(--ro-red)" : "#e2e8f0",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "8px", marginBottom: "1rem" }}>
                {lvData.sp !== undefined && (
                  <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px" }}>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>SP COST</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#3b82f6" }}>{lvData.sp}</div>
                  </div>
                )}
                {lvData.cast !== undefined && (
                  <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px" }}>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>CAST TIME</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#8b5cf6" }}>{lvData.cast}s</div>
                  </div>
                )}
                {lvData.cooldown !== undefined && lvData.cooldown > 0 && (
                  <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px" }}>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>COOLDOWN</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f59e0b" }}>{lvData.cooldown}s</div>
                  </div>
                )}
                {lvData.range !== undefined && (
                  <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "8px 12px" }}>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>RANGE</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#22c55e" }}>{lvData.range} cells</div>
                  </div>
                )}
              </div>

              {/* Effect */}
              <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "0.75rem 1rem", borderLeft: "3px solid var(--ro-red)" }}>
                <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0, lineHeight: 1.6 }}>{lvData.effect}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [selectedJob, setSelectedJob] = useState(JOBS[0].id);
  const [search, setSearch] = useState("");

  const job = JOBS.find((j) => j.id === selectedJob)!;
  const skills = SKILLS[selectedJob] ?? [];
  const filtered = skills.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem" }}>Skill Database</h1>
        <p style={{ color: "#64748b", margin: 0 }}>2nd job skill trees for all TWRoZ classes — SP costs, cast times, and level-by-level effects</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", alignItems: "start" }}>
        {/* Job sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {JOBS.map((j) => (
            <button
              key={j.id}
              onClick={() => { setSelectedJob(j.id); setSearch(""); }}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "1px solid",
                borderRadius: "10px", cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
                background: selectedJob === j.id ? "var(--ro-red)" : "white",
                color: selectedJob === j.id ? "white" : "#374151",
                borderColor: selectedJob === j.id ? "var(--ro-red)" : "#e2e8f0",
                fontWeight: 600, fontSize: "0.85rem",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{j.icon}</span>
              <div>
                <div>{j.name}</div>
                <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>{(SKILLS[j.id] ?? []).length} skills</div>
              </div>
            </button>
          ))}
        </div>

        {/* Skills panel */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 14px", flex: 1 }}>
              <Search size={16} color="#94a3b8" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${job.name} skills...`}
                style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "#1e293b", width: "100%", background: "transparent" }}
              />
            </div>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, flexShrink: 0 }}>{filtered.length} skills</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>No skills found.</div>
          ) : (
            filtered.map((skill) => <SkillCard key={skill.id} skill={skill} />)
          )}
        </div>
      </div>

      {/* SEO Section */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid #f1f5f9", marginTop: "4rem" }}>
        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.8", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          The <strong>TWRoZ Skill Database</strong> covers all 2nd job skill trees for Ragnarok Zero Global. Browse SP costs, cast times, cooldowns, and level-by-level effects for every class — from <strong>Knight</strong> and <strong>Wizard</strong> to <strong>Assassin</strong>, <strong>Priest</strong>, and <strong>Alchemist</strong>. All data is based on TWRo Zero, for use with Ragnarok Zero Global and Zero-exclusive balance changes.
        </p>
      </section>
    </main>
  );
}
