"use client";

import React, { useState, useMemo } from "react";
import { Shirt, Search, RotateCcw, Sparkles, ChevronDown } from "lucide-react";

interface CostumeItem {
  id: string;
  name: string;
  file: string;
  w: number;
  h: number;
}

// We load catalogues at build time via JSON imports
import headgearData from "../../../../public/costumes/headgear_catalogue.json";
import robesData from "../../../../public/costumes/robes_catalogue_unique.json";

const headgears: CostumeItem[] = headgearData as CostumeItem[];
const robes: CostumeItem[] = robesData as CostumeItem[];

const JOBS = [
  { id: "knight", name: "Knight", icon: "⚔️" },
  { id: "crusader", name: "Crusader", icon: "🛡️" },
  { id: "wizard", name: "Wizard", icon: "🧙" },
  { id: "sage", name: "Sage", icon: "📖" },
  { id: "hunter", name: "Hunter", icon: "🏹" },
  { id: "priest", name: "Priest", icon: "✝️" },
  { id: "monk", name: "Monk", icon: "👊" },
  { id: "blacksmith", name: "Blacksmith", icon: "🔨" },
  { id: "assassin", name: "Assassin", icon: "🗡️" },
  { id: "rogue", name: "Rogue", icon: "🎭" },
];

type Tab = "headgear" | "robe";

export default function DressingRoomPage() {
  const [selectedHeadgear, setSelectedHeadgear] = useState<CostumeItem | null>(null);
  const [selectedRobe, setSelectedRobe] = useState<CostumeItem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("headgear");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(JOBS[0]);

  const filtered = useMemo(() => {
    const list = activeTab === "headgear" ? headgears : robes;
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(i => i.id.toLowerCase().includes(q) || i.name.toLowerCase().includes(q));
  }, [activeTab, search]);

  const reset = () => {
    setSelectedHeadgear(null);
    setSelectedRobe(null);
  };

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
            <Shirt size={24} />
            <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>TOOL</span>
          </div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0, lineHeight: 1 }}>
            Dressing Room
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.5rem", fontSize: "1rem" }}>
            Preview costumes & headgears from actual game files
          </p>
        </div>
        <button
          onClick={reset}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff1f2", color: "var(--ro-red)", border: "1px solid #ffe4e6", padding: "12px 20px", borderRadius: "12px", cursor: "pointer", fontWeight: 800 }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "1.5rem", alignItems: "start" }}>
        {/* Left: Item Browser */}
        <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 16px -4px rgba(15,23,42,0.08)" }}>
          {/* Tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #f1f5f9" }}>
            {(["headgear", "robe"] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearch(""); }}
                style={{
                  padding: "1rem",
                  border: "none",
                  background: activeTab === tab ? "#fff1f2" : "transparent",
                  color: activeTab === tab ? "var(--ro-red)" : "#64748b",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  borderBottom: activeTab === tab ? "2px solid var(--ro-red)" : "2px solid transparent",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                }}
              >
                {tab === "headgear" ? "🎩 Headgears" : "🪽 Robes"}{" "}
                <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                  ({tab === "headgear" ? headgears.length : robes.length})
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ padding: "1rem", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search costumes..."
                style={{
                  width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 38px",
                  border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.9rem",
                  outline: "none", fontFamily: "inherit", color: "#1e293b", background: "#f8fafc",
                }}
              />
            </div>
          </div>

          {/* Grid */}
          <div style={{ height: "520px", overflowY: "auto", padding: "0.75rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {filtered.slice(0, 200).map(item => {
              const isSelected = activeTab === "headgear"
                ? selectedHeadgear?.id === item.id
                : selectedRobe?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => activeTab === "headgear" ? setSelectedHeadgear(isSelected ? null : item) : setSelectedRobe(isSelected ? null : item)}
                  title={item.name}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "8px 4px", borderRadius: "10px", border: "2px solid",
                    borderColor: isSelected ? "var(--ro-red)" : "transparent",
                    background: isSelected ? "#fff1f2" : "#f8fafc",
                    cursor: "pointer", transition: "all 0.15s", gap: "4px",
                    minHeight: "64px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.file}
                    alt={item.name}
                    style={{ imageRendering: "pixelated", width: "auto", height: "auto", maxWidth: "48px", maxHeight: "40px", objectFit: "contain" }}
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span style={{ fontSize: "0.55rem", color: "#475569", textAlign: "center", lineHeight: 1.2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {item.name}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                No items found
              </div>
            )}
            {filtered.length > 200 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "1rem", color: "#94a3b8", fontSize: "0.8rem" }}>
                Showing 200 of {filtered.length} — search to filter
              </div>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Character Preview */}
          <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e1035 100%)", borderRadius: "24px", padding: "2.5rem", minHeight: "420px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            {/* Stars bg */}
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{ position: "absolute", borderRadius: "50%", background: "white", opacity: Math.random() * 0.4 + 0.1, width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
            ))}

            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
              {/* Headgear layer */}
              {selectedHeadgear ? (
                <div style={{ marginBottom: "-8px", zIndex: 2 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedHeadgear.file}
                    alt={selectedHeadgear.name}
                    style={{ imageRendering: "pixelated", width: "auto", height: "auto", maxWidth: "96px", maxHeight: "80px", filter: "drop-shadow(0 0 12px rgba(239,68,68,0.5))" }}
                  />
                </div>
              ) : (
                <div style={{ height: "48px", marginBottom: "-8px" }} />
              )}

              {/* Character silhouette */}
              <div style={{ fontSize: "7rem", filter: "grayscale(0.3)", lineHeight: 1, zIndex: 1 }}>
                {selectedJob.icon}
              </div>

              {/* Robe layer */}
              {selectedRobe ? (
                <div style={{ marginTop: "-16px", zIndex: 2 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedRobe.file}
                    alt={selectedRobe.name}
                    style={{ imageRendering: "pixelated", width: "auto", height: "auto", maxWidth: "96px", maxHeight: "80px", filter: "drop-shadow(0 0 12px rgba(139,92,246,0.5))" }}
                  />
                </div>
              ) : null}
            </div>

            {/* Labels */}
            {(selectedHeadgear || selectedRobe) ? (
              <div style={{ marginTop: "2rem", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                {selectedHeadgear && (
                  <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "8px", padding: "6px 12px", color: "#fca5a5", fontSize: "0.8rem", fontWeight: 700 }}>
                    🎩 {selectedHeadgear.name}
                  </div>
                )}
                {selectedRobe && (
                  <div style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: "8px", padding: "6px 12px", color: "#c4b5fd", fontSize: "0.8rem", fontWeight: 700 }}>
                    🪽 {selectedRobe.name}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: "2rem", color: "#64748b", fontSize: "0.9rem", textAlign: "center" }}>
                <Sparkles size={20} style={{ marginBottom: "8px", opacity: 0.5 }} />
                <div>Select items from the panel to preview</div>
              </div>
            )}
          </div>

          {/* Job selector */}
          <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "1.25rem", boxShadow: "0 4px 12px -2px rgba(15,23,42,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem", letterSpacing: "0.1em" }}>CHARACTER CLASS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {JOBS.map(j => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJob(j)}
                  style={{
                    padding: "8px 14px", borderRadius: "10px", border: "1px solid",
                    borderColor: selectedJob.id === j.id ? "var(--ro-red)" : "#e2e8f0",
                    background: selectedJob.id === j.id ? "#fff1f2" : "white",
                    color: selectedJob.id === j.id ? "var(--ro-red)" : "#475569",
                    fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {j.icon} {j.name}
                </button>
              ))}
            </div>
          </div>

          {/* Currently wearing */}
          <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "1.25rem", boxShadow: "0 4px 12px -2px rgba(15,23,42,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem", letterSpacing: "0.1em" }}>CURRENTLY WEARING</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Headgear", item: selectedHeadgear, color: "#ef4444", clear: () => setSelectedHeadgear(null) },
                { label: "Robe / Costume", item: selectedRobe, color: "#8b5cf6", clear: () => setSelectedRobe(null) },
              ].map(({ label, item, color, clear }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {item && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.file} alt={item.name} style={{ imageRendering: "pixelated", width: "auto", height: "32px", maxWidth: "32px", objectFit: "contain" }} />
                    )}
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: item ? "#1e293b" : "#cbd5e1" }}>
                        {item?.name || "— none —"}
                      </div>
                    </div>
                  </div>
                  {item && (
                    <button onClick={clear} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.2rem", padding: "4px" }}>×</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
