"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Filter, ChevronRight, Info, Wrench } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";
import enchantmentsData from "@/data/enchantments-en.json";

type Enchantment = {
  type: string;
  pool?: number;
  tier: string;
  name: string;
  value: string;
  source: string;
};

const SOURCES = [
  { id: "monsterDrop", label: "Monster Drop", icon: "👾" },
  { id: "mvp", label: "MVP Drop", icon: "👑" },
  { id: "blacksmith", label: "Blacksmith Forging", icon: "⚒️" },
  { id: "activation", label: "Activation System", icon: "⚡" },
  { id: "glast", label: "Glast Heim", icon: "🏰" },
];

export default function AffixSimulator() {
  const [source, setSource] = useState(SOURCES[0].id);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentData = useMemo(() => {
    return (enchantmentsData as Record<string, Enchantment[]>)[source] || [];
  }, [source]);

  const availableTypes = useMemo(() => {
    const types = new Set(currentData.map((d) => d.type));
    return Array.from(types).sort();
  }, [currentData]);

  // Auto-select first type when source changes
  useMemo(() => {
    if (availableTypes.length > 0 && (!selectedType || !availableTypes.includes(selectedType))) {
      setSelectedType(availableTypes[0]);
    }
  }, [availableTypes, selectedType]);

  const filteredData = useMemo(() => {
    let data = currentData;
    if (selectedType) {
      data = data.filter((d) => d.type === selectedType);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((d) => d.name.toLowerCase().includes(q));
    }
    return data;
  }, [currentData, selectedType, searchQuery]);

  const slots = useMemo(() => {
    const s: Record<string, Enchantment[]> = {};
    filteredData.forEach((d) => {
      if (!s[d.tier]) s[d.tier] = [];
      s[d.tier].push(d);
    });
    return Object.entries(s).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredData]);

  return (
    <ROWindow title="Zero Gear Affix Simulator" icon={<Sparkles size={16} />} width="100%">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Header & Search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--ro-red)", margin: 0 }}>Random Options Database</h2>
            <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "4px 0 0" }}>Explore all possible random affixes for Ragnarok Zero gear.</p>
          </div>
          <div style={{ position: "relative", minWidth: "250px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input 
              type="text" 
              placeholder="Search stats (e.g. ATK, ASPD)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "0.85rem", outline: "none" }}
            />
          </div>
        </div>

        {/* Source Selector */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", background: "#f8fafc", padding: "8px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
          {SOURCES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSource(s.id)}
              style={{ 
                padding: "8px 16px", 
                borderRadius: "8px", 
                border: "none", 
                background: source === s.id ? "white" : "transparent",
                color: source === s.id ? "var(--ro-red)" : "#64748b",
                fontWeight: source === s.id ? 800 : 600,
                fontSize: "0.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: source === s.id ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s"
              }}
            >
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        {/* Type Selector */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {availableTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              style={{ 
                padding: "6px 14px", 
                borderRadius: "20px", 
                border: "1px solid", 
                borderColor: selectedType === t ? "var(--ro-red)" : "#e2e8f0",
                background: selectedType === t ? "var(--ro-red)" : "white",
                color: selectedType === t ? "white" : "#64748b",
                fontWeight: 700,
                fontSize: "0.7rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Slots Display */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          <AnimatePresence mode="popLayout">
            {slots.map(([tier, items]) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ 
                  background: "white", 
                  borderRadius: "16px", 
                  border: "1px solid #e2e8f0", 
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                }}
              >
                <div style={{ background: "linear-gradient(90deg, var(--ro-red), var(--ro-accent))", padding: "10px 16px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.5px" }}>{tier.toUpperCase()}</span>
                  <span style={{ fontSize: "0.65rem", opacity: 0.8, fontWeight: 700 }}>{items.length} OPTIONS</span>
                </div>
                <div style={{ padding: "0.5rem" }}>
                  <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }} className="custom-scrollbar">
                    {items.map((item, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: "10px 12px", 
                          borderBottom: idx === items.length - 1 ? "none" : "1px solid #f1f5f9",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fdf2f2"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <span style={{ fontSize: "0.8rem", color: "#334155", fontWeight: 600, lineHeight: 1.3 }}>{item.name}</span>
                        <div style={{ 
                          background: "#fff1f2", 
                          color: "var(--ro-red)", 
                          padding: "4px 8px", 
                          borderRadius: "6px", 
                          fontSize: "0.75rem", 
                          fontWeight: 800,
                          minWidth: "60px",
                          textAlign: "center",
                          border: "1px solid #fecaca"
                        }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "1rem", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <Info size={18} color="#3b82f6" style={{ marginTop: "2px" }} />
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "0.85rem", fontWeight: 800, color: "#1e40af" }}>About Random Options</h4>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#1e40af", opacity: 0.8, lineHeight: 1.4 }}>
              Random options (affixes) are automatically added to gear when dropped by monsters or created via specific systems. 
              The values shown are ranges; actual rolls will vary between these limits. Forging and Activation systems offer unique pools not found on monster drops.
            </p>
          </div>
        </div>
      </div>
    </ROWindow>
  );
}
