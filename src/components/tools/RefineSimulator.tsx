"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, RotateCcw, ShieldCheck, Flame, TrendingUp, Zap, Calendar } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

// TWRoZ Official Refine Rates (Standard ores: Elunium/Oridecon)
// Updated: +1 to +4 have a 90% success rate (no safe limit)
const STANDARD_RATES = [0.90, 0.90, 0.90, 0.90, 0.60, 0.40, 0.40, 0.20, 0.20, 0.10, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.008, 0.006, 0.005];

// Enriched Ores (Enriched Elunium/Oridecon) — Higher rates, +1 to +4 is safe (100%)
const ENRICHED_RATES = [1.00, 1.00, 1.00, 1.00, 0.90, 0.70, 0.70, 0.40, 0.40, 0.20, 0.15, 0.12, 0.10, 0.08, 0.06, 0.04, 0.02, 0.015, 0.01, 0.008];

// HD Ores (HD Elunium/Oridecon) — Same as standard but prevents breakage (level drops by 1)
const HD_ORE_RATES  = [0.90, 0.90, 0.90, 0.90, 0.60, 0.40, 0.40, 0.20, 0.20, 0.10, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.008, 0.006, 0.005];

const ORES = [
  { id: "standard_armor",  label: "Elunium",            type: "standard" },
  { id: "standard_weapon", label: "Oridecon",           type: "standard" },
  { id: "enriched_armor",  label: "Enriched Elunium",   type: "enriched" },
  { id: "enriched_weapon", label: "Enriched Oridecon",  type: "enriched" },
  { id: "hd_armor",        label: "HD Elunium",         type: "hd"       },
  { id: "hd_weapon",       label: "HD Oridecon",        type: "hd"       },
];

// Zeny cost per refine level (approximate TWRoZ rates)
const COST_PER_REFINE = [
  10000, 20000, 30000, 40000, 100000, 200000, 400000, 800000, 1500000, 3000000,
  5000000, 8000000, 12000000, 18000000, 25000000, 35000000, 50000000, 70000000, 100000000, 150000000
];

const MAX_REFINE = 20;

function RefineProgressBar({ level }: { level: number }) {
  const sections = [
    { max: 4,  color: "#22c55e", label: "90% Zone" },
    { max: 7,  color: "#fbbf24", label: "Risk" },
    { max: 10, color: "#f97316", label: "Danger" },
    { max: 20, color: "#ef4444", label: "Extreme" },
  ];
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", gap: "2px", marginBottom: "4px" }}>
        {sections.map((s, i) => {
          const prevMax = sections[i - 1]?.max ?? 0;
          const filled = Math.min(level, s.max) - prevMax;
          const total = s.max - prevMax;
          return (
            <div key={i} style={{ flex: total, display: "flex", gap: "1px" }}>
              {Array.from({ length: total }).map((_, j) => (
                <div key={j} style={{ flex: 1, background: j < filled ? s.color : "#e2e8f0", borderRadius: "2px" }} />
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600 }}>
        {sections.map((s) => <span key={s.label}>{s.label} (+{s.max})</span>)}
      </div>
    </div>
  );
}

export default function RefineSimulator() {
  const [level, setLevel] = useState(0);
  const [ore, setOre] = useState(ORES[0]); // Default: Elunium
  const [isEvent, setIsEvent] = useState(false);
  const [status, setStatus] = useState<"idle" | "refining" | "success" | "fail">("idle");
  const [history, setHistory] = useState<string[]>([]);
  const [totalZeny, setTotalZeny] = useState(0);
  const [orePrice, setOrePrice] = useState(50000);
  const [bsbPrice, setBsbPrice] = useState(500000);
  const [itemPrice, setItemPrice] = useState(2000000);
  const [useBsb, setUseBsb] = useState(false);
  const [pityCount, setPityCount] = useState(0);
  const [goalLevel, setGoalLevel] = useState(7);
  const [goalStats, setGoalStats] = useState<{ cost: number; items: number } | null>(null);

  const getBaseRate = (lv: number) => {
    if (ore.type === "enriched") return ENRICHED_RATES[lv] ?? 0.001;
    if (ore.type === "hd") return HD_ORE_RATES[lv] ?? 0.001;
    return STANDARD_RATES[lv] ?? 0.001;
  };

  const calculateSuccessRate = useCallback((lv: number, pity: number = 0): number => {
    if (useBsb && pity >= 10) return 1; // Pity system kicks in at 10 fails
    let rate = getBaseRate(lv);
    if (isEvent) rate = Math.min(rate + 0.05, 1);
    return rate;
  }, [ore, isEvent, useBsb]);

  const handleRefine = () => {
    if (status === "refining" || level >= MAX_REFINE) return;
    setStatus("refining");
    const cost = COST_PER_REFINE[level] + orePrice + (useBsb && level >= 7 ? bsbPrice : 0);
    setTotalZeny((prev) => prev + cost);

    setTimeout(() => {
      const success = Math.random() < calculateSuccessRate(level, pityCount);
      if (success) {
        const next = level + 1;
        setLevel(next);
        setPityCount(0);
        setStatus("success");
        setHistory((h) => [`✅ +${next} reached!`, ...h.slice(0, 6)]);
      } else {
        if (useBsb && level >= 7) {
          // BSB prevents break, pity counts up
          setPityCount((p) => p + 1);
          setStatus("fail");
          setHistory((h) => [`⚠️ +${level} failed (pity: ${pityCount + 1}/10)`, ...h.slice(0, 6)]);
        } else if (ore.type === "hd" && level >= 7) {
          // HD prevents break, level drops by 1
          const nextLevel = Math.max(0, level - 1);
          setLevel(nextLevel);
          setStatus("fail");
          setHistory((h) => [`📉 +${level}→+${nextLevel} (HD Protection)`, ...h.slice(0, 6)]);
        } else {
          // Item breaks — reset
          setLevel(0);
          setPityCount(0);
          setStatus("fail");
          setTotalZeny((prev) => prev + itemPrice);
          setHistory((h) => [`💥 +${level}→0 broken!`, ...h.slice(0, 6)]);
        }
      }
    }, 700);
  };

  const reset = () => {
    setLevel(0);
    setStatus("idle");
    setTotalZeny(0);
    setPityCount(0);
    setHistory([]);
  };

  // Monte Carlo simulation for goal stats
  useEffect(() => {
    const SIM_RUNS = 3000;
    let totalCost = 0;
    let totalItems = 0;

    for (let i = 0; i < SIM_RUNS; i++) {
      let lv = 0, pity = 0, itemsUsed = 0;
      while (lv < goalLevel) {
        const cost = COST_PER_REFINE[lv] + orePrice + (useBsb && lv >= 7 ? bsbPrice : 0);
        totalCost += cost;
        if (Math.random() < calculateSuccessRate(lv, pity)) {
          lv++;
          pity = 0;
        } else if (ore.type === "hd" && lv >= 7) {
          lv = Math.max(0, lv - 1);
        } else {
          lv = 0;
          pity = 0;
          itemsUsed++;
          totalCost += itemPrice;
        }
      }
      totalItems += itemsUsed;
    }

    setGoalStats({
      cost: Math.floor(totalCost / SIM_RUNS),
      items: parseFloat((totalItems / SIM_RUNS).toFixed(2)),
    });
  }, [goalLevel, isEvent, useBsb, itemPrice, orePrice, bsbPrice, ore, calculateSuccessRate]);

  const successRate = calculateSuccessRate(level, pityCount);
  const levelColor = level >= 15 ? "#ef4444" : level >= 10 ? "#f97316" : level >= 7 ? "#fbbf24" : "#22c55e";

  return (
    <ROWindow title="Refine Simulator — TWRoZ Edition" icon={<Hammer size={16} />} width="100%">
      <div>
        {/* Price inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem", background: "#fdf8f8", border: "1px solid #fca5a5", borderRadius: "10px", padding: "1rem" }}>
          {[["ITEM PRICE", itemPrice, setItemPrice], ["ORE PRICE", orePrice, setOrePrice], ["BSB PRICE", bsbPrice, setBsbPrice]].map(([label, val, set]) => (
            <div key={label as string}>
              <label style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--ro-red)", display: "block", marginBottom: "4px" }}>{label as string}</label>
              <input type="number" value={val as number} onChange={(e) => (set as Function)(Number(e.target.value))} style={{ width: "100%", padding: "6px 8px", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.8rem" }} />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn-primary" onClick={() => setUseBsb(!useBsb)}
              style={{ width: "100%", padding: "6px", background: useBsb ? "var(--ro-red)" : "white", color: useBsb ? "white" : "var(--ro-red)", border: "1px solid var(--ro-red)", fontSize: "0.7rem", fontWeight: 800 }}>
              BSB {useBsb ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Ore selector */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {ORES.map((o) => (
            <button key={o.id} onClick={() => setOre(o)} style={{ fontSize: "0.7rem", padding: "6px 14px", borderRadius: "8px", border: "1px solid", borderColor: ore.id === o.id ? "var(--ro-red)" : "#e2e8f0", background: ore.id === o.id ? "var(--ro-red)" : "white", color: ore.id === o.id ? "white" : "#64748b", fontWeight: 700, cursor: "pointer" }}>
              {o.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
            <button onClick={() => setIsEvent(!isEvent)} style={{ fontSize: "0.7rem", padding: "6px 14px", borderRadius: "8px", border: "1px solid", borderColor: isEvent ? "#fbbf24" : "#e2e8f0", background: isEvent ? "#fbbf24" : "white", color: isEvent ? "white" : "#64748b", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={12} /> Event
            </button>
          </div>
        </div>

        <RefineProgressBar level={level} />

        {/* Item display */}
        <div style={{ height: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #e2e8f0", marginBottom: "1.5rem", position: "relative" }}>
          <AnimatePresence mode="wait">
            {status === "fail" && level === 0 ? (
              <motion.div key="broken" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ textAlign: "center" }}>
                <Flame size={56} color="#ef4444" />
                <p style={{ fontWeight: 800, color: "#ef4444", fontSize: "1.1rem", margin: "4px 0 0" }}>ITEM BROKEN</p>
              </motion.div>
            ) : (
              <motion.div key="item" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 90, height: 90, borderRadius: "14px", background: "white", border: `3px solid ${levelColor}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${levelColor}44` }}>
                    <ShieldCheck size={52} color={levelColor} />
                  </div>
                  <div style={{ position: "absolute", top: -12, right: -12, background: levelColor, color: "white", padding: "4px 10px", borderRadius: "8px", fontWeight: 800, fontSize: "1.1rem", boxShadow: `0 2px 8px ${levelColor}66` }}>
                    +{level}
                  </div>
                </div>
                {level >= 0 && (
                  <div style={{ width: "200px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontWeight: 700, color: "#64748b", marginBottom: "3px" }}>
                      <span>Success Rate</span>
                      <span style={{ color: levelColor }}>{(successRate * 100).toFixed(1)}%</span>
                    </div>
                    <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                      <motion.div animate={{ width: `${successRate * 100}%` }} style={{ height: "100%", background: levelColor, transition: "width 0.4s ease" }} />
                    </div>
                    {useBsb && level >= 7 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontWeight: 700, color: "#64748b", marginTop: "4px" }}>
                        <span>BSB Pity</span>
                        <span style={{ color: "#6366f1" }}>{pityCount}/10</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
          <button className="btn-primary" onClick={handleRefine} disabled={status === "refining" || level === MAX_REFINE} style={{ padding: "12px 40px", fontSize: "1rem", fontWeight: 800, opacity: level === MAX_REFINE ? 0.5 : 1 }}>
            {status === "refining" ? "..." : level === MAX_REFINE ? "MAX!" : "REFINE"}
          </button>
          <button onClick={reset} disabled={status === "refining"} style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "white", cursor: "pointer", color: "#64748b" }}>
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Cost tracker */}
        {totalZeny > 0 && (
          <div style={{ background: "#fdf2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>TOTAL ZENY SPENT</span>
            <span style={{ fontWeight: 800, color: "var(--ro-red)", fontSize: "1.1rem" }}>{(totalZeny / 1_000_000).toFixed(2)}M z</span>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            {history.map((h, i) => (
              <div key={i} style={{ fontSize: "0.75rem", color: "#64748b", padding: "3px 0", borderBottom: i < history.length - 1 ? "1px solid #f1f5f9" : "none" }}>{h}</div>
            ))}
          </div>
        )}

        {/* Goal analysis */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--ro-red)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingUp size={16} /> GOAL ANALYSIS
            </h3>
            <select value={goalLevel} onChange={(e) => setGoalLevel(Number(e.target.value))} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontWeight: 700, color: "#475569", fontSize: "0.8rem" }}>
              {Array.from({ length: 17 }, (_, i) => i + 4).map((v) => <option key={v} value={v}>Reach +{v}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "linear-gradient(135deg, var(--ro-red), var(--ro-accent))", borderRadius: "12px", padding: "1.25rem", color: "white" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, opacity: 0.7, marginBottom: "4px" }}>EST. TOTAL COST</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{goalStats ? `${(goalStats.cost / 1_000_000).toFixed(1)}M z` : "..."}</div>
              <div style={{ fontSize: "0.6rem", opacity: 0.5, marginTop: "2px" }}>avg. from 3,000 simulations</div>
            </div>
            <div style={{ background: "white", border: "1px solid var(--ro-red)", borderRadius: "12px", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", marginBottom: "4px" }}>AVG. ITEMS BROKEN</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--ro-red)" }}>{goalStats ? goalStats.items : "..."}</div>
              <div style={{ fontSize: "0.6rem", color: "#94a3b8", marginTop: "2px" }}>items destroyed on average</div>
            </div>
          </div>
        </div>
      </div>
    </ROWindow>
  );
}
