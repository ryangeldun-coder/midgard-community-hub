"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Monster } from "@/lib/database";

const ELEMENTS = ["Fire", "Water", "Wind", "Earth", "Holy", "Dark", "Ghost", "Undead", "Poison", "Neutral"];
const RACES = ["Insect", "Animal", "Plant", "Demon", "Undead", "Fish", "Demi-Human", "Angel", "Dragon", "Formless"];
const SIZES = ["Small", "Medium", "Large"];

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#ef4444", Water: "#3b82f6", Wind: "#22c55e", Earth: "#a16207",
  Holy: "#fbbf24", Dark: "#7c3aed", Ghost: "#6b7280", Undead: "#1f2937",
  Poison: "#84cc16", Neutral: "#94a3b8",
};

const ELEMENT_EMOJIS: Record<string, string> = {
  Fire: "🔥", Water: "💧", Wind: "🌪️", Earth: "🪨",
  Holy: "✨", Dark: "🌑", Ghost: "👻", Undead: "💀",
  Poison: "☠️", Neutral: "⚪",
};

function MonsterCard({ monster }: { monster: Monster }) {
  const elementColor = ELEMENT_COLORS[monster.element] || "#94a3b8";
  return (
    <Link href={`/database/monsters/${monster.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, boxShadow: `0 8px 24px ${elementColor}33` }}
        style={{
          background: "white",
          border: `1px solid ${elementColor}44`,
          borderRadius: "12px",
          padding: "1rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          height: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 60, height: 60, background: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${elementColor}33`, flexShrink: 0, overflow: "hidden" }}>
            <img src={monster.image_url} alt={monster.name_en} style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{monster.name_en}</h3>
            <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: "2px 0 0 0" }}>{monster.name_zh}</p>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: elementColor, background: `${elementColor}18`, padding: "1px 6px", borderRadius: "4px", display: "inline-block", marginTop: "2px" }}>{ELEMENT_EMOJIS[monster.element]} {monster.element} Lv.{monster.element_level}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", borderTop: "1px solid #f1f5f9", paddingTop: "0.5rem", marginTop: "auto" }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600 }}>LV</div><div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e293b" }}>{monster.level}</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600 }}>HP</div><div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ef4444" }}>{monster.hp.toLocaleString()}</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600 }}>EXP</div><div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#22c55e" }}>{monster.base_exp.toLocaleString()}</div></div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function MonstersClient({ initialMonsters, initialTotal, initialPages }: { initialMonsters: Monster[], initialTotal: number, initialPages: number }) {
  const [monsters, setMonsters] = useState<Monster[]>(initialMonsters);
  const [total, setTotal] = useState(initialTotal);
  const [pages, setPages] = useState(initialPages);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");
  const [race, setRace] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchMonsters = useCallback(async () => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "48" });
      if (search) params.set("search", search);
      if (element) params.set("element", element);
      if (race) params.set("race", race);
      if (size) params.set("size", size);
      const res = await fetch(`/api/monsters?${params}`);
      const data = await res.json();
      setMonsters(data.monsters || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, search, element, race, size, isFirstRender]);

  useEffect(() => { fetchMonsters(); }, [fetchMonsters]);
  useEffect(() => { setPage(1); }, [search, element, race, size]);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 14px", flex: "1 1 250px" }}>
          <Search size={16} color="#94a3b8" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search monsters..." style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "#1e293b", width: "100%", background: "transparent" }} />
        </div>
        <select value={element} onChange={(e) => setElement(e.target.value)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#475569", background: "white" }}>
          <option value="">All Elements</option>
          {ELEMENTS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <select value={race} onChange={(e) => setRace(e.target.value)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#475569", background: "white" }}>
          <option value="">All Races</option>
          {RACES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={size} onChange={(e) => setSize(e.target.value)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#475569", background: "white" }}>
          <option value="">All Sizes</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>⚔️ Loading...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {monsters.map((m) => <MonsterCard key={m.id} monster={m} />)}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", opacity: page === 1 ? 0.4 : 1, cursor: "pointer" }}><ChevronLeft size={16} /></button>
          <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Page {page} of {pages}</span>
          <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", opacity: page === pages ? 0.4 : 1, cursor: "pointer" }}><ChevronRight size={16} /></button>
        </div>
      )}
    </div>
  );
}
