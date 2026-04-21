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
  group?: string;
}

export default function ItemSearchModal({ isOpen, onClose, onSelect, slot, group = "All" }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const search = async (pageNum: number, isNewSearch: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/items?search=${query}&group=${group}&page=${pageNum}&limit=50`);
      const data = await res.json();
      const newItems = data.items || [];
      
      setResults(prev => isNewSearch ? newItems : [...prev, ...newItems]);
      setHasMore(newItems.length === 50);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    setPage(1);
    const timer = setTimeout(() => search(1, true), 300);
    return () => clearTimeout(timer);
  }, [query, isOpen, group]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    search(nextPage, false);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "500px", maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Select {group} for {slot}</h3>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color="#94a3b8" /></button>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${group.toLowerCase()}...`}
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.95rem" }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {results.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {results.map((item, i) => (
                <div 
                  key={`${item.id}-${i}`} 
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
              
              {hasMore && (
                <button 
                  onClick={loadMore}
                  disabled={loading}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontWeight: 700, cursor: "pointer", marginTop: "1rem" }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          ) : !loading && (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>No items found</div>
          )}
          {loading && results.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>Searching...</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
