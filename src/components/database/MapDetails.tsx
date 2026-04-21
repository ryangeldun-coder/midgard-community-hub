"use client";

import { motion } from "framer-motion";
import { Map as MapIcon, Users, ChevronRight } from "lucide-react";
import { MapData } from "@/lib/database";
import Link from "next/link";

export default function MapDetails({ map }: { map: MapData }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "2rem", width: "100%", border: `2px solid #e2e8f0`, boxShadow: `0 20px 60px rgba(0,0,0,0.05)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <div style={{ width: 80, height: 80, background: "#f1f5f9", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #e2e8f0" }}>
            <MapIcon size={40} color="#64748b" />
          </div>
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{map.name_en}</h1>
            <p style={{ color: "#94a3b8", margin: "4px 0", fontSize: "1.1rem" }}>{map.name_zh} · ID: {map.id}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3b82f6", background: "#3b82f615", padding: "4px 12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Users size={14} /> {map.monsters.length} Monsters
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "2rem", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#475569", margin: "0 0 1.5rem 0", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "10px" }}>
          Monsters Inhabiting This Area
        </h3>
        
        {map.monsters.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {map.monsters.map((m) => (
              <Link key={m.id} href={`/database/monsters/${m.id}`} style={{ textDecoration: "none" }}>
                <motion.div 
                  whileHover={{ x: 4, background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  style={{ background: "rgba(255,255,255,0.5)", borderRadius: "12px", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #e2e8f0", transition: "all 0.2s" }}
                >
                  <img src={m.image_url} alt={m.name} style={{ width: 48, height: 48, objectFit: "contain", imageRendering: "pixelated", background: "#f1f5f9", borderRadius: "8px", padding: "4px" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{m.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>ID: {m.id}</p>
                  </div>
                  <ChevronRight size={18} color="#cbd5e1" />
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8", background: "white", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
            No monster data available for this map.
          </div>
        )}
      </div>

      <div style={{ marginTop: "3rem", padding: "2rem", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem" }}>About this location</h4>
        <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
          {map.name_en} ({map.name_zh}) is a key location in the Ragnarok Zero Global world. 
          Use this map guide to identify which monsters spawn here and plan your leveling or farming sessions. 
          For more details on each monster, including their specific drop rates and stats, click on the monster cards above.
        </p>
      </div>
    </div>
  );
}
