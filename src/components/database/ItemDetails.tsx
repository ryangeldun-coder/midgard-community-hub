"use client";

import { motion } from "framer-motion";
import { Info, Sword, Shield, Weight, DollarSign, Tag, Search } from "lucide-react";
import { Item } from "@/lib/database";

export default function ItemDetails({ item }: { item: Item }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "2rem", width: "100%", border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "2rem" }}>
        <div style={{ width: 120, height: 120, background: "#f8fafc", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", padding: "10px", flexShrink: 0 }}>
          <img src={item.icon_url} alt={item.name_en} style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated" }} />
        </div>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ background: "#f1f5f9", color: "#64748b", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 800 }}>ID: {item.id}</span>
            <span style={{ background: "var(--ro-red)", color: "white", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 800 }}>{item.category}</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1e293b", margin: "0 0 4px 0", letterSpacing: "-1px" }}>{item.name_en}</h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", margin: 0 }}>{item.name_zh}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Item Stats */}
        <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#94a3b8", margin: "0 0 1rem 0", letterSpacing: "1px" }}>ITEM PROPERTIES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Attack", value: item.attack, icon: <Sword size={14} />, show: item.attack > 0 },
              { label: "Defense", value: item.defense, icon: <Shield size={14} />, show: item.defense > 0 },
              { label: "Slots", value: item.slots, icon: <Tag size={14} />, show: true },
              { label: "Weight", value: item.weight, icon: <Weight size={14} />, show: true },
              { label: "Required Lv", value: item.required_level, icon: <Info size={14} />, show: item.required_level > 0 },
              { label: "Weapon Lv", value: item.weapon_level, icon: <Sword size={14} />, show: item.weapon_level > 0 },
            ].filter(s => s.show).map((stat) => (
              <div key={stat.label} style={{ background: "white", padding: "10px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94a3b8", fontSize: "0.6rem", fontWeight: 800, marginBottom: "2px" }}>
                  {stat.icon} {stat.label.toUpperCase()}
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade & Info */}
        <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#94a3b8", margin: "0 0 1rem 0", letterSpacing: "1px" }}>MARKET INFO</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "12px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Can Trade</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: item.can_trade ? "#22c55e" : "#ef4444" }}>{item.can_trade ? "YES" : "NO"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "12px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Equip Slot</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#1e293b" }}>{item.slot || "N/A"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "12px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Sell Price</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#eab308" }}>{item.sell_price.toLocaleString()} z</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "2.5rem", background: "#f1f5f9", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#475569", margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "8px" }}>
          <Info size={18} /> ITEM DESCRIPTION
        </h3>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#334155", margin: 0, whiteSpace: "pre-line" }}>
          {item.description || "No description available."}
        </p>
      </div>

      {/* Dropped By */}
      {item.dropped_by.length > 0 && (
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", margin: "0 0 1.25rem 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Search size={18} color="var(--ro-red)" /> OBTAINED FROM ({item.dropped_by.length})
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {item.dropped_by.map((monster) => (
              <div key={monster.monster_id} style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px" }}>
                <img src={monster.image_url} alt={monster.monster_name} style={{ width: 40, height: 40, imageRendering: "pixelated", flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{monster.monster_name}</p>
                  <p style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: 800, margin: 0 }}>{monster.rate}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
