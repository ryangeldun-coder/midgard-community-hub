"use client";

import { useState } from "react";
import { usePlanner } from "./usePlanner";
import StatControl from "@/components/planner/StatControl";
import EquipmentSlot from "@/components/planner/EquipmentSlot";
import ItemSearchModal from "@/components/planner/ItemSearchModal";
import { getStatIncreaseCost } from "@/lib/planner-engine";
import { Zap, Shield, Target, Wind, Swords, Flame, Sparkles } from "lucide-react";

export default function PlannerPage() {
  const planner = usePlanner();
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const statsList = [
    { key: "str" as const, label: "Strength (STR)" },
    { key: "agi" as const, label: "Agility (AGI)" },
    { key: "vit" as const, label: "Vitality (VIT)" },
    { key: "int" as const, label: "Intelligence (INT)" },
    { key: "dex" as const, label: "Dexterity (DEX)" },
    { key: "luk" as const, label: "Luck (LUK)" },
  ];

  const derivedDisplay = [
    { label: "Attack", val: planner.derivedStats.atk, icon: <Swords size={16} color="#ef4444" /> },
    { label: "M.Attack", val: planner.derivedStats.matkMin, icon: <Sparkles size={16} color="#3b82f6" /> },
    { label: "Hit", val: planner.derivedStats.hit, icon: <Target size={16} color="#22c55e" /> },
    { label: "Flee", val: planner.derivedStats.flee, icon: <Wind size={16} color="#6366f1" /> },
    { label: "Crit", val: planner.derivedStats.crit, icon: <Flame size={16} color="#f59e0b" /> },
    { label: "DEF", val: planner.derivedStats.def, icon: <Shield size={16} color="#64748b" /> },
  ];

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>Ultimate Build Planner</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Plan your stats and equipment for Ragnarok Zero Global.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem" }}>
        
        {/* LEFT COLUMN: STATS */}
        <div style={{ gridColumn: "span 4" }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>BASE STATS</h2>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 800, display: "block" }}>POINTS REMAINING</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: planner.remainingPoints < 0 ? "#ef4444" : "#22c55e" }}>{planner.remainingPoints}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {statsList.map((s) => (
                <StatControl 
                  key={s.key}
                  label={s.label}
                  value={planner.stats[s.key]}
                  cost={getStatIncreaseCost(planner.stats[s.key])}
                  onIncrease={() => planner.updateStat(s.key, 1)}
                  onDecrease={() => planner.updateStat(s.key, -1)}
                />
              ))}
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Base Level</span>
                <input 
                  type="number" 
                  value={planner.level} 
                  onChange={(e) => planner.setLevel(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
                  style={{ width: 60, border: "1px solid #e2e8f0", borderRadius: "6px", textAlign: "center", fontWeight: 700 }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Total Spent</span>
                <span style={{ fontSize: "0.8rem", color: "#1e293b", fontWeight: 700 }}>{planner.spentPoints} / {planner.availablePoints}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: EQUIPMENT */}
        <div style={{ gridColumn: "span 4" }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1.5rem 0" }}>EQUIPMENT</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <EquipmentSlot label="Head (Top)" item={planner.equipment.headTop} onClick={() => setActiveSlot("headTop")} onClear={() => planner.equipItem("headTop", null)} />
              <EquipmentSlot label="Head (Mid)" item={planner.equipment.headMid} onClick={() => setActiveSlot("headMid")} onClear={() => planner.equipItem("headMid", null)} />
              <EquipmentSlot label="Head (Low)" item={planner.equipment.headLow} onClick={() => setActiveSlot("headLow")} onClear={() => planner.equipItem("headLow", null)} />
              <EquipmentSlot label="Armor" item={planner.equipment.armor} onClick={() => setActiveSlot("armor")} onClear={() => planner.equipItem("armor", null)} />
              <EquipmentSlot label="Weapon" item={planner.equipment.weapon} onClick={() => setActiveSlot("weapon")} onClear={() => planner.equipItem("weapon", null)} />
              <EquipmentSlot label="Shield" item={planner.equipment.shield} onClick={() => setActiveSlot("shield")} onClear={() => planner.equipItem("shield", null)} />
              <EquipmentSlot label="Garment" item={planner.equipment.garment} onClick={() => setActiveSlot("garment")} onClear={() => planner.equipItem("garment", null)} />
              <EquipmentSlot label="Shoes" item={planner.equipment.shoes} onClick={() => setActiveSlot("shoes")} onClear={() => planner.equipItem("shoes", null)} />
              <EquipmentSlot label="Accessory (L)" item={planner.equipment.accessoryL} onClick={() => setActiveSlot("accessoryL")} onClear={() => planner.equipItem("accessoryL", null)} />
              <EquipmentSlot label="Accessory (R)" item={planner.equipment.accessoryR} onClick={() => setActiveSlot("accessoryR")} onClear={() => planner.equipItem("accessoryR", null)} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DERIVED STATS */}
        <div style={{ gridColumn: "span 4" }}>
          <div style={{ position: "sticky", top: "6rem" }}>
            <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 20px 50px rgba(239, 68, 68, 0.08)" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1.5rem 0" }}>CHARACTER PREVIEW</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "1.5rem" }}>
                {derivedDisplay.map(d => (
                  <div key={d.label} style={{ background: "#f8fafc", padding: "12px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      {d.icon}
                      <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{d.label}</span>
                    </div>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e293b" }}>{d.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b" }}>Max HP</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#ef4444" }}>{planner.derivedStats.hp.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b" }}>Max SP</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#3b82f6" }}>{planner.derivedStats.sp.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b" }}>ASPD</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b" }}>{planner.derivedStats.aspd.toFixed(1)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b" }}>Cast Reduction</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#8b5cf6" }}>{planner.derivedStats.castTime.toFixed(1)}%</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  planner.generateShareLink();
                  alert("Build link copied to clipboard! You can now share this exact setup with others.");
                }}
                style={{ width: "100%", marginTop: "2rem", padding: "14px", borderRadius: "12px", background: "var(--ro-red)", color: "white", border: "none", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
              >
                <Zap size={18} /> SHARE BUILD
              </button>
            </div>
          </div>
        </div>

      </div>

      <ItemSearchModal 
        isOpen={!!activeSlot} 
        onClose={() => setActiveSlot(null)} 
        slot={activeSlot || ""} 
        onSelect={(item) => {
          if (activeSlot) planner.equipItem(activeSlot, item);
          setActiveSlot(null);
        }}
      />
    </main>
  );
}
