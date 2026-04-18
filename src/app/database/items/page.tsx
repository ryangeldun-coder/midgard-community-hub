"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight, Package } from "lucide-react";
import type { Item } from "@/lib/database";

// Category groupings for filter
const CATEGORY_GROUPS: Record<string, string> = {
  "消耗/恢復": "Consumable",
  "消耗/輔助": "Consumable",
  "消耗/攻擊": "Consumable",
  "消耗/特殊": "Special",
  "武器/短劍": "Weapon",
  "武器/單手劍": "Weapon",
  "武器/雙手劍": "Weapon",
  "武器/長矛": "Weapon",
  "武器/斧頭": "Weapon",
  "武器/法杖": "Weapon",
  "武器/弓": "Weapon",
  "武器/棍棒": "Weapon",
  "武器/樂器": "Weapon",
  "武器/鞭子": "Weapon",
  "武器/書": "Weapon",
  "武器/爪": "Weapon",
  "武器/手砲": "Weapon",
  "防具/鎧甲": "Armor",
  "防具/盾牌": "Armor",
  "防具/頭盔": "Armor",
  "防具/鞋子": "Armor",
  "防具/披風": "Armor",
  "防具/配件": "Armor",
  "卡片": "Card",
  "材料": "Material",
  "服飾/頭飾": "Costume",
  "服飾/盔甲": "Costume",
  "服飾/披風": "Costume",
  "服飾/配件": "Costume",
  "箭矢": "Ammo",
};

function getCategoryEN(zh: string): string {
  return CATEGORY_GROUPS[zh] || zh;
}

const FILTER_TYPES = ["All", "Consumable", "Weapon", "Armor", "Card", "Material", "Costume", "Ammo", "Special"];

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  const catEN = getCategoryEN(item.category);
  const isCard = catEN === "Card";
  const isWeapon = catEN === "Weapon";
  const accentColor = isCard ? "#fbbf24" : isWeapon ? "#ef4444" : catEN === "Armor" ? "#3b82f6" : "var(--ro-red)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, boxShadow: `0 6px 20px ${accentColor}22` }}
      onClick={onClick}
      style={{
        background: "white",
        border: `1px solid ${accentColor}33`,
        borderRadius: "10px",
        padding: "0.75rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ width: 48, height: 48, background: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${accentColor}22` }}>
        <img src={item.icon_url} alt={item.name_zh} style={{ width: 36, height: 36, imageRendering: "pixelated" }} onError={(e) => { (e.target as HTMLImageElement).src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; }} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.name_en || item.name_zh}
        </p>
        {item.name_en && item.name_en !== item.name_zh && (
          <p style={{ fontSize: "0.65rem", color: "#94a3b8", margin: "1px 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name_zh}</p>
        )}
        <div style={{ display: "flex", gap: "4px", marginTop: "3px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", background: `${accentColor}18`, color: accentColor, padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>{catEN}</span>
          {item.slots > 0 && <span style={{ fontSize: "0.6rem", background: "#f1f5f9", color: "#64748b", padding: "1px 6px", borderRadius: "4px", fontWeight: 600 }}>{item.slots}S</span>}
          {item.weapon_level > 0 && <span style={{ fontSize: "0.6rem", background: "#fef9c3", color: "#92400e", padding: "1px 6px", borderRadius: "4px", fontWeight: 600 }}>Lv.{item.weapon_level}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function ItemModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const catEN = getCategoryEN(item.category);
  const accentColor = catEN === "Card" ? "#fbbf24" : catEN === "Weapon" ? "#ef4444" : catEN === "Armor" ? "#3b82f6" : "var(--ro-red)";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: "white", borderRadius: "16px", padding: "2rem", maxWidth: "600px", width: "100%", maxHeight: "85vh", overflowY: "auto", border: `2px solid ${accentColor}44`, boxShadow: `0 20px 60px ${accentColor}22` }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ width: 72, height: 72, background: "#f8fafc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${accentColor}33` }}>
              <img src={item.icon_url} alt={item.name_zh} style={{ width: 54, height: 54, imageRendering: "pixelated" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{item.name_en || item.name_zh}</h2>
              <p style={{ color: "#94a3b8", margin: "2px 0", fontSize: "0.8rem" }}>
                {item.name_en !== item.name_zh ? item.name_zh + " · " : ""}ID: {item.id} · {item.category}
              </p>
              <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: accentColor, background: `${accentColor}18`, padding: "2px 8px", borderRadius: "6px" }}>{catEN}</span>
                {item.slots > 0 && <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px" }}>{item.slots} Slot{item.slots > 1 ? "s" : ""}</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color="#94a3b8" /></button>
        </div>

        {item.description && (
          <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          {[
            ["Weight", item.weight], ["Buy Price", item.buy_price > 0 ? `${item.buy_price.toLocaleString()} z` : "N/A"],
            ["Sell Price", item.sell_price > 0 ? `${item.sell_price.toLocaleString()} z` : "N/A"],
            ["Required Lv", item.required_level || "-"],
            ...(item.attack > 0 ? [["ATK", item.attack]] : []),
            ...(item.defense > 0 ? [["DEF", item.defense]] : []),
            ...(item.weapon_level > 0 ? [["Weapon Lv", item.weapon_level]] : []),
          ].map(([label, val]) => (
            <div key={label as string} style={{ background: "#f8fafc", borderRadius: "8px", padding: "0.6rem 0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>{label}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#1e293b" }}>{val}</span>
            </div>
          ))}
        </div>

        {item.dropped_by.length > 0 && (
          <div>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748b", margin: "0 0 0.75rem 0" }}>DROPPED BY ({item.dropped_by.length})</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "6px" }}>
              {item.dropped_by.slice(0, 20).map((drop) => (
                <div key={drop.monster_id} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", borderRadius: "8px", padding: "6px 8px" }}>
                  <img src={drop.image_url} alt={drop.monster_name} style={{ width: 28, height: 28, imageRendering: "pixelated", flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{drop.monster_name}</p>
                    <p style={{ fontSize: "0.6rem", color: "#22c55e", fontWeight: 700, margin: 0 }}>{drop.rate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Item | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "60" });
      if (search) params.set("search", search);
      if (typeFilter !== "All") params.set("group", typeFilter);
      const res = await fetch(`/api/items?${params}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, search, typeFilter]);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  useEffect(() => { setPage(1); }, [search, typeFilter]);

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>Item Database</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Complete TWRoZ item compendium — {total.toLocaleString()} items indexed</p>
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 14px", flex: "1 1 250px" }}>
          <Search size={16} color="#94a3b8" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "#1e293b", width: "100%", background: "transparent" }} />
        </div>
      </div>

      {/* Type filter pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {FILTER_TYPES.map((type) => (
          <button key={type} onClick={() => setTypeFilter(type)} style={{ fontSize: "0.75rem", padding: "6px 14px", borderRadius: "20px", border: "1px solid", borderColor: typeFilter === type ? "var(--ro-red)" : "#e2e8f0", background: typeFilter === type ? "var(--ro-red)" : "white", color: typeFilter === type ? "white" : "#64748b", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}>
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📦</div>
          Loading item data from TWRoZ wiki...
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>No items found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
          {items.map((item) => <ItemCard key={item.id} item={item} onClick={() => setSelected(item)} />)}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-primary" style={{ padding: "8px 16px", opacity: page === 1 ? 0.4 : 1 }}><ChevronLeft size={16} /></button>
          <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Page {page} of {pages}</span>
          <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} className="btn-primary" style={{ padding: "8px 16px", opacity: page === pages ? 0.4 : 1 }}><ChevronRight size={16} /></button>
        </div>
      )}

      <AnimatePresence>
        {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* SEO Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Our <strong>Ragnarok Zero Item Database</strong> indexes over 4,500 items found in the Ragnarok Zero Global universe (data based on TWRo Zero). Every item name and description has been translated into English to provide clarity on equipment stats, consumable effects, and crafting requirements. Browse through weapons, armor, and rare materials with ease. Use our search tool to find where items drop or which monsters carry the gear you need for your build. From basic potions to legendary artifacts, the Midgard Community Hub is the most complete item resource for Ragnarok Zero players.
        </p>
      </section>
    </main>
  );
}
