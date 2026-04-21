"use client";

import { Item } from "@/lib/database";
import { Plus } from "lucide-react";

interface Props {
  label: string;
  item: Item | null;
  onClick: () => void;
  onClear: () => void;
}

export default function EquipmentSlot({ label, item, onClick, onClear }: Props) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        background: item ? "white" : "#f8fafc", 
        border: item ? "2px solid #ef444433" : "1px dashed #cbd5e1", 
        borderRadius: "12px", 
        padding: "10px", 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center", 
        gap: "12px",
        transition: "all 0.2s",
        position: "relative"
      }}
      className="hover-lift"
    >
      <div style={{ width: 40, height: 40, background: item ? "#fef2f2" : "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: item ? "1px solid #fee2e2" : "1px solid #f1f5f9" }}>
        {item ? <img src={item.icon_url} alt="" style={{ width: 32, height: 32, imageRendering: "pixelated" }} /> : <Plus size={16} color="#94a3b8" />}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 800, textTransform: "uppercase" }}>{label}</span>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: item ? "#1e293b" : "#cbd5e1", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item ? item.name_en : "Empty"}
        </p>
      </div>
      {item && (
        <button 
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "1.2rem", cursor: "pointer", padding: "4px" }}
        >
          ×
        </button>
      )}
    </div>
  );
}
