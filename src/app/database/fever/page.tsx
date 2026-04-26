"use client";

import { motion } from "framer-motion";
import { Flame, MapPin, Skull, Gem, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { FEVER_MAPS } from "@/data/fever-maps";

export default function FeverMapsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "8px 24px", background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", borderRadius: "100px", marginBottom: "1.5rem" }}>
          <Flame size={20} color="#ef4444" />
          <span style={{ fontWeight: 800, color: "#ef4444", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem" }}>TWRoZ Special Areas</span>
        </div>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 900, color: "#1e293b", margin: "0 0 1rem", letterSpacing: "-1px", lineHeight: 1.1 }}>
          The <span style={{ color: "var(--ro-red)" }}>Fever</span> Fields
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
          Explore the treacherous Fever Fields of Midgard. Defeat enough regular monsters to awaken powerful <strong style={{color:"#1e293b"}}>Champion variants</strong> and Field Bosses that drop exclusive <strong style={{color:"#1e293b"}}>Fever Gear</strong> and valuable <strong style={{color:"#1e293b"}}>Mithril Ore</strong>.
        </p>

        {/* Mechanics Banner */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px 24px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ background: "#fee2e2", padding: "8px", borderRadius: "50%" }}><Skull size={20} color="#ef4444" /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Mechanic</div>
              <div style={{ fontWeight: 700, color: "#1e293b" }}>Kill normal mobs to spawn Champions</div>
            </div>
          </div>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px 24px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ background: "#ede9fe", padding: "8px", borderRadius: "50%" }}><Gem size={20} color="#8b5cf6" /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Rewards</div>
              <div style={{ fontWeight: 700, color: "#1e293b" }}>Exclusive Fever Gear & Ores</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Grid */}
      <motion.div variants={container} initial="hidden" animate="show" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2.5rem" }}>
        {FEVER_MAPS.map((map) => (
          <motion.div key={map.id} variants={item} className="fever-card" style={{ 
            background: "white", 
            borderRadius: "32px", 
            overflow: "hidden", 
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            {/* Card Header (Gradient Background) */}
            <div style={{ background: map.bgGradient, padding: "2.5rem 2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.1, transform: "rotate(15deg)" }}>
                <Flame size={180} color="white" />
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ color: "white", fontSize: "1.75rem", fontWeight: 900, margin: "0 0 0.5rem", textShadow: "0 2px 10px rgba(0,0,0,0.3)", letterSpacing: "-0.5px" }}>
                    {map.name}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", fontWeight: 600, background: "rgba(0,0,0,0.2)", padding: "4px 12px", borderRadius: "100px", width: "fit-content" }}>
                    <MapPin size={14} /> {map.mapCode}
                  </div>
                </div>
                {map.levelRange === "End Game" && (
                  <div style={{ background: "#ef4444", padding: "8px", borderRadius: "50%", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)" }} title="Extreme Danger">
                    <AlertTriangle size={20} color="white" />
                  </div>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {map.description}
              </p>

              {/* Monsters */}
              <div>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Skull size={16} /> Native Monsters
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {map.monsters.map((mob, idx) => (
                    <div key={idx} style={{ 
                      padding: "6px 14px", 
                      background: mob.isFever ? "#fee2e2" : "#f8fafc", 
                      color: mob.isFever ? "#ef4444" : "#475569", 
                      borderRadius: "12px", 
                      fontSize: "0.85rem", 
                      fontWeight: mob.isFever ? 800 : 600,
                      border: `1px solid ${mob.isFever ? "#fca5a5" : "#e2e8f0"}`
                    }}>
                      {mob.isFever && <Flame size={12} style={{ display: "inline", marginRight: "4px" }} />}
                      {mob.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable Loot */}
              <div>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Gem size={16} /> Notable Loot
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {map.loot.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "10px 16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.type === "ore" ? "#8b5cf6" : item.type === "weapon" ? "#ef4444" : "#3b82f6", boxShadow: `0 0 10px ${item.type === "ore" ? "#8b5cf6" : item.type === "weapon" ? "#ef4444" : "#3b82f6"}` }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b" }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer Action */}
            <div style={{ padding: "1.5rem 2rem", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
              <Link href={`/database/maps`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--ro-red)", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none" }}>
                <span>Search in Map Database</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style jsx global>{`
        .fever-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
        }
        .fever-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px -15px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  );
}
