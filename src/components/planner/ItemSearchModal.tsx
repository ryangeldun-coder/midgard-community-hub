"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Item } from "@/lib/database";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: Item) => void;
  slot: string;
}

export default function ItemSearchModal({ isOpen, onClose, onSelect, slot }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const search = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/items?search=${query}&limit=20`);
        const data = await res.json();
        setResults(data.items || []);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "500px", maxHeight: "80vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Select Item for {slot}</h3>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color="#94a3b8" /></button>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items..."
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.95rem" }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>Searching...</div>
          ) : results.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {results.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onSelect(item)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "10px", cursor: "pointer", transition: "background 0.2s" }}
                  className="hover-bg-slate"
                >
                  <img src={item.icon_url} alt="" style={{ width: 32, height: 32, imageRendering: "pixelated" }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>{item.name_en}</p>
                    <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: 0 }}>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>No items found</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
