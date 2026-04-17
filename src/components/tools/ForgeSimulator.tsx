"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Sword, TrendingUp, Info } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

// TWRoZ Blacksmith/Whitesmith Forging
// Formula: Success Rate = (Skill Lv × 10) + (DEX × 0.1) + (LUK × 0.1) + Item Modifier
// Source: RO Zero official + twroz.wiki calculator reference

const FORGEABLE_ITEMS = [
  // Weapons — Lv1 (easiest)
  { name: "Knife",          itemId: 1201, level: 1, modifier: 3,   ore: "Iron",          type: "weapon" },
  { name: "Main Gauche",    itemId: 1202, level: 1, modifier: 0,   ore: "Iron",          type: "weapon" },
  { name: "Sword",          itemId: 1101, level: 1, modifier: 2,   ore: "Iron",          type: "weapon" },
  { name: "Tsurugi",        itemId: 1110, level: 1, modifier: -5,  ore: "Iron",          type: "weapon" },
  { name: "Spear",          itemId: 1401, level: 1, modifier: 0,   ore: "Iron",          type: "weapon" },
  { name: "Hammer",         itemId: 1501, level: 1, modifier: 5,   ore: "Iron",          type: "weapon" },
  { name: "Club",           itemId: 1701, level: 1, modifier: 3,   ore: "Iron",          type: "weapon" },
  { name: "Short Bow",      itemId: 1801, level: 1, modifier: 3,   ore: "Iron",          type: "weapon" },
  // Lv2
  { name: "Dirk",           itemId: 1211, level: 2, modifier: 0,   ore: "Iron",          type: "weapon" },
  { name: "Bastard Sword",  itemId: 1107, level: 2, modifier: -2,  ore: "Iron",          type: "weapon" },
  { name: "Broad Sword",    itemId: 1108, level: 2, modifier: -5,  ore: "Steel",         type: "weapon" },
  { name: "Halberd",        itemId: 1411, level: 2, modifier: -3,  ore: "Steel",         type: "weapon" },
  { name: "Battle Axe",     itemId: 1551, level: 2, modifier: -2,  ore: "Steel",         type: "weapon" },
  { name: "Morning Star",   itemId: 1711, level: 2, modifier: -5,  ore: "Steel",         type: "weapon" },
  { name: "Gakkung Bow",    itemId: 1807, level: 2, modifier: -3,  ore: "Iron",          type: "weapon" },
  // Lv3
  { name: "Damascus",       itemId: 1220, level: 3, modifier: -10, ore: "Oridecon",      type: "weapon" },
  { name: "Great Sword",    itemId: 1115, level: 3, modifier: -15, ore: "Oridecon",      type: "weapon" },
  { name: "Voulge",         itemId: 1421, level: 3, modifier: -10, ore: "Oridecon",      type: "weapon" },
  { name: "BF Two Handed Axe", itemId: 1553, level: 3, modifier: -15, ore: "Oridecon",  type: "weapon" },
  { name: "Brocca",         itemId: 1427, level: 3, modifier: -10, ore: "Oridecon",      type: "weapon" },
  { name: "Arbalest",       itemId: 1812, level: 3, modifier: -10, ore: "Oridecon",      type: "weapon" },
  // Ammunition
  { name: "Arrows (150)",    itemId: 1750, level: 0, modifier: 50,  ore: "Feather",      type: "ammo" },
  { name: "Silver Arrows",   itemId: 1752, level: 0, modifier: 30,  ore: "Silver",       type: "ammo" },
  { name: "Fire Arrows",     itemId: 1754, level: 0, modifier: 20,  ore: "Flame",        type: "ammo" },
];

const JOBS = [
  { name: "Blacksmith",     skillBonus: 1.0 },
  { name: "Whitesmith",     skillBonus: 1.0 },
];

const SKILL_NAMES: Record<number, string> = {
  0: "Basic Forging",
  1: "Smith Sword Lv.1",
  2: "Smith Axe Lv.1",
  3: "Smith Spear Lv.1",
  4: "Smith Dagger Lv.1",
};

export default function ForgeSimulator() {
  const [dex, setDex] = useState(99);
  const [luk, setLuk] = useState(77);
  const [skillLv, setSkillLv] = useState(3);
  const [selectedItem, setSelectedItem] = useState(FORGEABLE_ITEMS[0]);
  const [qty, setQty] = useState(100);
  const [successRate, setSuccessRate] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState(0);
  const [qualityBreakdown, setQualityBreakdown] = useState({ normal: 0, ele: 0, star: 0, perfection: 0 });

  useEffect(() => {
    if (selectedItem.type === "ammo") {
      setSuccessRate(100);
      setExpectedOutput(qty);
      return;
    }
    // Formula: (Skill Lv × 10) + (DEX × 0.1) + (LUK × 0.1) + modifier
    const baseRate = (skillLv * 10) + (dex * 0.1) + (luk * 0.1) + selectedItem.modifier;
    const finalRate = Math.max(0, Math.min(100, baseRate));
    setSuccessRate(finalRate);
    setExpectedOutput(Math.floor(qty * (finalRate / 100)));

    // Quality breakdown (higher stats = better quality)
    const qualityScore = (dex * 0.3) + (luk * 0.2);
    const perfChance = Math.min(qualityScore / 300, 0.05);
    const starChance = Math.min(qualityScore / 200, 0.15);
    const eleChance = Math.min(qualityScore / 150, 0.20);
    const normChance = 1 - perfChance - starChance - eleChance;
    setQualityBreakdown({
      normal: Math.round(normChance * 100),
      ele: Math.round(eleChance * 100),
      star: Math.round(starChance * 100),
      perfection: Math.round(perfChance * 100),
    });
  }, [dex, luk, skillLv, selectedItem, qty]);

  const rateColor = successRate >= 70 ? "#22c55e" : successRate >= 40 ? "#fbbf24" : "#ef4444";
  const weaponItems = FORGEABLE_ITEMS.filter((i) => i.type === "weapon");
  const ammoItems = FORGEABLE_ITEMS.filter((i) => i.type === "ammo");

  return (
    <ROWindow title="Blacksmith Forge Simulator — TWRoZ Edition" icon={<Wrench size={16} />} width="100%">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {/* Left: Stats */}
        <div>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.75rem" }}>CHARACTER STATS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
            {[["DEX (Total)", dex, setDex], ["LUK (Total)", luk, setLuk]].map(([label, val, set]) => (
              <div key={label as string}>
                <label style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", display: "block", marginBottom: "4px" }}>{label as string}</label>
                <input type="number" value={val as number} onChange={(e) => (set as Function)(Number(e.target.value))} style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem" }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", display: "block", marginBottom: "4px" }}>SMITH SKILL LEVEL</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[1, 2, 3].map((lv) => (
                <button key={lv} onClick={() => setSkillLv(lv)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid", borderColor: skillLv === lv ? "var(--ro-red)" : "#e2e8f0", background: skillLv === lv ? "var(--ro-red)" : "white", color: skillLv === lv ? "white" : "#64748b", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer" }}>
                  Lv {lv}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", display: "block", marginBottom: "4px" }}>ITEM TO FORGE</label>
            <div style={{ marginBottom: "8px" }}>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#94a3b8", margin: "0 0 4px" }}>⚔️ WEAPONS</p>
              <select value={selectedItem.name} onChange={(e) => setSelectedItem(FORGEABLE_ITEMS.find((i) => i.name === e.target.value)!)} style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>
                {weaponItems.map((i) => <option key={i.name} value={i.name}>{i.name} (Lv.{i.level} · {i.ore})</option>)}
              </select>
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#94a3b8", margin: "0 0 4px" }}>🏹 AMMUNITION</p>
              <select onChange={(e) => setSelectedItem(FORGEABLE_ITEMS.find((i) => i.name === e.target.value)!)} style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>
                {ammoItems.map((i) => <option key={i.name} value={i.name}>{i.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", display: "block", marginBottom: "4px" }}>ATTEMPTS</label>
            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: "100%", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "8px", fontWeight: 700, fontSize: "1rem" }} />
          </div>
        </div>

        {/* Right: Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Success Rate Card */}
          <div style={{ background: "linear-gradient(135deg, var(--ro-red), var(--ro-accent))", borderRadius: "14px", padding: "1.5rem", color: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, opacity: 0.75, margin: "0 0 4px" }}>SUCCESS RATE</p>
                <p style={{ fontSize: "3rem", fontWeight: 800, margin: 0, lineHeight: 1 }}>{successRate.toFixed(1)}%</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.7, margin: "4px 0 0" }}>{selectedItem.name}</p>
              </div>
              <Wrench size={40} opacity={0.3} />
            </div>
            <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.15)", borderRadius: "6px", overflow: "hidden", height: "8px" }}>
              <motion.div animate={{ width: `${successRate}%` }} style={{ height: "100%", background: "white", transition: "width 0.5s ease" }} />
            </div>
          </div>

          {/* Output */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 800, color: "#64748b", margin: "0 0 0.75rem" }}>EXPECTED RESULTS ({qty} attempts)</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div style={{ textAlign: "center", background: "white", borderRadius: "10px", padding: "0.75rem", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--ro-red)", margin: 0 }}>{expectedOutput}</p>
                <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "2px 0 0", fontWeight: 600 }}>ITEMS FORGED</p>
              </div>
              <div style={{ textAlign: "center", background: "white", borderRadius: "10px", padding: "0.75rem", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ef4444", margin: 0 }}>{qty - expectedOutput}</p>
                <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "2px 0 0", fontWeight: 600 }}>FAILURES</p>
              </div>
            </div>
          </div>

          {/* Quality breakdown */}
          {selectedItem.type === "weapon" && (
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1.25rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 800, color: "#64748b", margin: "0 0 0.75rem" }}>QUALITY BREAKDOWN</p>
              {[
                { label: "Normal", value: qualityBreakdown.normal, color: "#64748b" },
                { label: "Elemental", value: qualityBreakdown.ele, color: "#3b82f6" },
                { label: "★ Star", value: qualityBreakdown.star, color: "#fbbf24" },
                { label: "◆ Perfection", value: qualityBreakdown.perfection, color: "#ef4444" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color, width: "80px", flexShrink: 0 }}>{label}</span>
                  <div style={{ flex: 1, height: "8px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "4px", transition: "width 0.4s ease" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color, width: "36px", textAlign: "right" }}>{value}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Info box */}
          <div style={{ display: "flex", gap: "8px", background: "#fef9c3", border: "1px solid #fbbf24", borderRadius: "10px", padding: "0.75rem", alignItems: "flex-start" }}>
            <Info size={14} color="#92400e" style={{ flexShrink: 0, marginTop: "1px" }} />
            <p style={{ fontSize: "0.7rem", color: "#92400e", margin: 0, lineHeight: 1.5 }}>
              <strong>Formula:</strong> (Skill Lv × 10) + (DEX × 0.1) + (LUK × 0.1) + Item Modifier. Higher DEX/LUK also improves item quality (Elemental, Star, Perfection).
            </p>
          </div>
        </div>
      </div>
    </ROWindow>
  );
}
