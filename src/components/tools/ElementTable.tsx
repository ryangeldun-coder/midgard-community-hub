"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ELEMENT_DATA, ELEMENTS, type Element } from "@/data/elements";
import { Info, Sword, Shield, ChevronRight } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

const ELEMENT_COLORS: Record<Element, string> = {
  Neutral: "#94a3b8",
  Water: "#3b82f6",
  Earth: "#8b5cf6",
  Fire: "#ef4444",
  Wind: "#f59e0b",
  Poison: "#10b981",
  Holy: "#fbbf24",
  Shadow: "#6366f1",
  Ghost: "#ec4899",
  Undead: "#a855f7",
};

export default function ElementTable() {
  const [level, setLevel] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  const getCellColor = (value: number) => {
    if (value > 100) return "rgba(34, 197, 94, 0.15)"; // Weakness (Green)
    if (value < 100 && value > 0) return "rgba(239, 68, 68, 0.15)"; // Resistance (Red)
    if (value <= 0) return "rgba(139, 92, 246, 0.25)"; // Absorb/Negate (Purple)
    return "transparent";
  };

  const getTextColor = (value: number) => {
    if (value > 100) return "#22c55e";
    if (value < 100 && value > 0) return "#ef4444";
    if (value <= 0) return "#8b5cf6";
    return "#64748b";
  };

  return (
    <ROWindow title="Elemental Weakness Table" icon={<Sword size={16} />} width="100%">
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Defender Level:</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4].map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: level === lv ? "var(--ro-red)" : "white",
                  color: level === lv ? "white" : "#475569",
                  border: `1px solid ${level === lv ? "var(--ro-red)" : "#e2e8f0"}`,
                  boxShadow: level === lv ? "0 4px 12px rgba(220, 38, 38, 0.2)" : "none",
                }}
              >
                LV {lv}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", overflowX: "auto", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ 
                  padding: "1rem", 
                  textAlign: "left", 
                  borderBottom: "2px solid #e2e8f0", 
                  position: "sticky", 
                  left: 0, 
                  background: "#f8fafc", 
                  zIndex: 20 
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.65rem", color: "#94a3b8", fontWeight: 800 }}>
                    <Sword size={12} /> ATTACK \ DEFEND <Shield size={12} />
                  </div>
                </th>
                {ELEMENTS.map((el) => (
                  <th
                    key={el}
                    onMouseEnter={() => setHoveredCol(el)}
                    onMouseLeave={() => setHoveredCol(null)}
                    style={{ 
                      padding: "0.75rem", 
                      fontSize: "0.7rem", 
                      fontWeight: 800, 
                      color: "white", 
                      textAlign: "center",
                      borderBottom: "2px solid #e2e8f0",
                      background: ELEMENT_COLORS[el],
                      transition: "opacity 0.2s",
                      opacity: hoveredCol === el || !hoveredCol ? 1 : 0.6,
                    }}
                  >
                    {el.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ELEMENTS.map((attacker) => (
                <tr 
                  key={attacker}
                  onMouseEnter={() => setHoveredRow(attacker)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ 
                    transition: "background 0.1s",
                    background: hoveredRow === attacker ? "#f1f5f9" : "transparent"
                  }}
                >
                  <td style={{ 
                    padding: "0.75rem 1rem", 
                    fontSize: "0.75rem", 
                    fontWeight: 800, 
                    color: "white",
                    background: ELEMENT_COLORS[attacker],
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    opacity: hoveredRow === attacker || !hoveredRow ? 1 : 0.6,
                    transition: "opacity 0.2s",
                  }}>
                    {attacker}
                  </td>
                  {ELEMENTS.map((defender) => {
                    const value = ELEMENT_DATA[level][attacker][defender];
                    const isActive = hoveredRow === attacker || hoveredCol === defender;
                    const isIntersection = hoveredRow === attacker && hoveredCol === defender;

                    return (
                      <td
                        key={defender}
                        onMouseEnter={() => setHoveredCol(defender)}
                        onMouseLeave={() => setHoveredCol(null)}
                        style={{
                          padding: "0.75rem",
                          textAlign: "center",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          borderBottom: "1px solid #f1f5f9",
                          borderRight: "1px solid #f1f5f9",
                          transition: "all 0.15s",
                          background: isIntersection ? "rgba(220, 38, 38, 0.05)" : getCellColor(value),
                          color: getTextColor(value),
                          transform: isIntersection ? "scale(1.1)" : "none",
                          zIndex: isIntersection ? 5 : 1,
                          position: "relative",
                          boxShadow: isIntersection ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                        }}
                      >
                        {value}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#22c55e", marginBottom: "0.5rem" }}>
            <div style={{ width: 12, height: 12, borderRadius: "2px", background: "rgba(34, 197, 94, 0.2)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>WEAKNESS</span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: 1.5 }}>
            Attack deals more than 100% damage. Aim for these combinations to maximize DPS.
          </p>
        </div>
        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444", marginBottom: "0.5rem" }}>
            <div style={{ width: 12, height: 12, borderRadius: "2px", background: "rgba(239, 68, 68, 0.2)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>RESISTANCE</span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: 1.5 }}>
            Attack deals less than 100% damage. Switch elements to avoid damage penalties.
          </p>
        </div>
        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#8b5cf6", marginBottom: "0.5rem" }}>
            <div style={{ width: 12, height: 12, borderRadius: "2px", background: "rgba(139, 92, 246, 0.3)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>IMMUNE / ABSORB</span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: 1.5 }}>
            Attack deals 0% damage or even heals the target. High-level elements (3-4) are often immune to their own element.
          </p>
        </div>
      </div>
    </ROWindow>
  );
}
