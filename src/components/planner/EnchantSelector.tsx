"use client";

import { useState, useMemo } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import enchantmentsData from "@/data/enchantments-en.json";
import { Enchantment } from "@/lib/planner-engine";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (enchant: Enchantment) => void;
  index: number;
}

export default function EnchantSelector({ isOpen, onClose, onSelect, index }: Props) {
  const [query, setQuery] = useState("");

  // Use monsterDrop pool by default
  const enchants = useMemo(() => {
    return (enchantmentsData as any).monsterDrop || [];
  }, []);

  const filtered = useMemo(() => {
    return enchants.filter((e: any) => 
      e.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [enchants, query]);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "450px", maxHeight: "80vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--ro-red)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} /> Select Affix {index + 1}
            </h3>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color="#94a3b8" /></button>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stats (e.g. ATK, HIT)..."
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.95rem" }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
          {filtered.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filtered.map((e: any, i: number) => (
                <div 
                  key={i} 
                  onClick={() => onSelect(e)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer", borderRadius: "10px", transition: "background 0.2s" }}
                  className="hover-bg-slate"
                >
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{e.name}</p>
                    <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: 0 }}>{e.type} · {e.tier}</p>
                  </div>
                  <div style={{ background: "#fff1f2", color: "var(--ro-red)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 800 }}>
                    {e.value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>No affixes found</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
