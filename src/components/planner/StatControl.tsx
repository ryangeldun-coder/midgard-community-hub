"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  cost: number;
}

export default function StatControl({ label, value, onIncrease, onDecrease, cost }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "12px", padding: "12px 16px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 800, textTransform: "uppercase", display: "block" }}>{label}</span>
        <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1e293b" }}>{value}</span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button 
          onClick={onDecrease}
          disabled={value <= 1}
          style={{ width: 32, height: 32, borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: value <= 1 ? 0.4 : 1 }}
        >
          <Minus size={14} color="#64748b" />
        </button>
        <div style={{ textAlign: "center", minWidth: 40 }}>
          <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 700 }}>COST</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ef4444", display: "block" }}>{cost}</span>
        </div>
        <button 
          onClick={onIncrease}
          disabled={value >= 99}
          style={{ width: 32, height: 32, borderRadius: "8px", border: "none", background: "var(--ro-red)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: value >= 99 ? 0.4 : 1 }}
        >
          <Plus size={14} color="white" />
        </button>
      </div>
    </div>
  );
}
