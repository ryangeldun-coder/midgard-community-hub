"use client";

import { useState } from "react";
import { usePlanner } from "./usePlanner";
import StatControl from "@/components/planner/StatControl";
import EquipmentSlot from "@/components/planner/EquipmentSlot";
import ItemSearchModal from "@/components/planner/ItemSearchModal";
import EnchantSelector from "@/components/planner/EnchantSelector";
import { getStatIncreaseCost, JOBS } from "@/lib/planner-engine";
import { Zap, Shield, Target, Wind, Swords, Flame, Sparkles, User, Wand2 } from "lucide-react";

export default function PlannerPage() {
  const planner = usePlanner();
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [activeEnchantIndex, setActiveEnchantIndex] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"stats" | "gear" | "preview">("stats");

  const currentJob = JOBS[planner.jobId] || JOBS.Novice;

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
      <style jsx>{`
        .planner-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }
        .mobile-tabs {
          display: none;
          margin-bottom: 1.5rem;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
        }
        .mobile-tab-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          color: #64748b;
          cursor: pointer;
        }
        .mobile-tab-btn.active {
          background: white;
          color: var(--ro-red);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .planner-header {
          margin-bottom: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        @media (max-width: 1024px) {
          .planner-grid {
            display: block;
          }
          .column {
            display: none;
            grid-column: span 12 !important;
          }
          .column.active {
            display: block;
          }
          .mobile-tabs {
            display: flex;
          }
          .planner-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="planner-header">
        <div>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>Character Simulator</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>Plan your stats and equipment for Ragnarok Zero Global.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: "100%", maxWidth: "300px" }}>
          <div style={{ width: "100%" }}>
            <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 800, display: "block", textTransform: "uppercase" }}>JOB CLASS</span>
            <select 
              value={planner.jobId}
              onChange={(e) => planner.setJobId(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontWeight: 700, fontSize: "0.95rem", color: "#1e293b", outline: "none", background: "white" }}
            >
              {Object.keys(JOBS).map(id => <option key={id} value={id}>{JOBS[id].name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mobile-tabs">
        <button className={`mobile-tab-btn ${mobileTab === 'stats' ? 'active' : ''}`} onClick={() => setMobileTab('stats')}>STATS</button>
        <button className={`mobile-tab-btn ${mobileTab === 'gear' ? 'active' : ''}`} onClick={() => setMobileTab('gear')}>GEAR</button>
        <button className={`mobile-tab-btn ${mobileTab === 'preview' ? 'active' : ''}`} onClick={() => setMobileTab('preview')}>PREVIEW</button>
      </div>

      <div className="planner-grid">
        
        {/* LEFT COLUMN: STATS */}
        <div className={`column ${mobileTab === 'stats' ? 'active' : ''}`} style={{ gridColumn: "span 4" }}>
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
                  bonus={planner.totalBonuses[s.key.toUpperCase()]}
                  cost={getStatIncreaseCost(planner.stats[s.key])}
                  onIncrease={() => planner.updateStat(s.key, 1)}
                  onDecrease={() => planner.updateStat(s.key, -1)}
                />
              ))}
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Base Level</span>
                <input 
                  type="number" 
                  value={planner.level} 
                  onChange={(e) => planner.setLevel(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
                  style={{ width: 60, height: 32, border: "1px solid #e2e8f0", borderRadius: "6px", textAlign: "center", fontWeight: 700 }}
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
        <div className={`column ${mobileTab === 'gear' ? 'active' : ''}`} style={{ gridColumn: "span 4" }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1.5rem 0" }}>EQUIPMENT</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <EquipmentSlot label="Head (Top)" item={planner.equipment.headTop} onClick={() => setActiveSlot("headTop")} onClear={() => planner.equipItem("headTop", null)} />
              <EquipmentSlot label="Head (Mid)" item={planner.equipment.headMid} onClick={() => setActiveSlot("headMid")} onClear={() => planner.equipItem("headMid", null)} />
              <EquipmentSlot label="Head (Low)" item={planner.equipment.headLow} onClick={() => setActiveSlot("headLow")} onClear={() => planner.equipItem("headLow", null)} />
              <EquipmentSlot label="Armor" item={planner.equipment.armor} onClick={() => setActiveSlot("armor")} onClear={() => planner.equipItem("armor", null)} />
              
              <div style={{ border: "2px solid #ef444415", borderRadius: "16px", padding: "4px" }}>
                <EquipmentSlot label="Weapon" item={planner.equipment.weapon} onClick={() => setActiveSlot("weapon")} onClear={() => planner.equipItem("weapon", null)} />
                {planner.equipment.weapon && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginTop: "4px" }}>
                    {planner.weaponEnchants.map((enchant, i) => (
                      <div 
                        key={i}
                        onClick={() => setActiveEnchantIndex(i)}
                        style={{ 
                          background: enchant ? "#fff1f2" : "#f8fafc", 
                          padding: "8px", 
                          borderRadius: "10px", 
                          border: enchant ? "1px solid #fecaca" : "1px dashed #e2e8f0",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          minHeight: "44px"
                        }}
                      >
                        <span style={{ fontSize: "0.55rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>Affix {i+1}</span>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: enchant ? "var(--ro-red)" : "#cbd5e1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {enchant ? enchant.name : "None"}
                          </span>
                          {enchant && <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--ro-red)" }}>{enchant.value}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <EquipmentSlot label="Shield" item={planner.equipment.shield} onClick={() => setActiveSlot("shield")} onClear={() => planner.equipItem("shield", null)} />
              <EquipmentSlot label="Garment" item={planner.equipment.garment} onClick={() => setActiveSlot("garment")} onClear={() => planner.equipItem("garment", null)} />
              <EquipmentSlot label="Shoes" item={planner.equipment.shoes} onClick={() => setActiveSlot("shoes")} onClear={() => planner.equipItem("shoes", null)} />
              <EquipmentSlot label="Accessory (L)" item={planner.equipment.accessoryL} onClick={() => setActiveSlot("accessoryL")} onClear={() => planner.equipItem("accessoryL", null)} />
              <EquipmentSlot label="Accessory (R)" item={planner.equipment.accessoryR} onClick={() => setActiveSlot("accessoryR")} onClear={() => planner.equipItem("accessoryR", null)} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DERIVED STATS */}
        <div className={`column ${mobileTab === 'preview' ? 'active' : ''}`} style={{ gridColumn: "span 4" }}>
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
        group={activeSlot === "weapon" ? "Weapon" : "Armor"}
        onSelect={(item) => {
          if (activeSlot) planner.equipItem(activeSlot, item);
          setActiveSlot(null);
        }}
      />

      <EnchantSelector 
        isOpen={activeEnchantIndex !== null}
        index={activeEnchantIndex ?? 0}
        onClose={() => setActiveEnchantIndex(null)}
        onSelect={(enchant) => {
          if (activeEnchantIndex !== null) planner.setEnchant(activeEnchantIndex, enchant);
          setActiveEnchantIndex(null);
        }}
      />

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          The <strong>Ragnarok Zero Character Simulator</strong> is the most advanced character simulator designed specifically for the <strong>Ragnarok Zero Global</strong> and <strong>TWRoZ</strong> community. Our planner uses high-accuracy formulas to calculate your character's status ATK, MATK, ASPD, and cast time based on your base stats, job class, and equipped gear. Unlike generic calculators, our tool integrates the full <strong>Zero Random Option (Affix) system</strong>, allowing you to simulate best-in-slot monster drop enchants for melee weapons, bows, and magic staves. Whether you're optimizing an Archer for instant cast or a Thief for max ASPD, our <strong>shareable build URLs</strong> make it easy to collaborate with other players. Plan your path from Novice to Master with the definitive <strong>Ragnarok Zero stat and skill simulator</strong> at Midgard Community Hub.
        </p>
      </section>
    </main>
  );
}
