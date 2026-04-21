"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map as MapIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MapData } from "@/lib/database";

import Link from "next/link";

function MapCard({ map }: { map: MapData }) {
  return (
    <Link href={`/database/maps/${map.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", border: "1px solid #3b82f644" }}
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          height: "100%",
          transition: "all 0.2s"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 48, height: 48, background: "#f1f5f9", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MapIcon size={24} color="#64748b" />
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {map.name_en}
            </h3>
            <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: "2px 0 0 0" }}>{map.id}</p>
          </div>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "0.5rem", marginTop: "auto" }}>
          {map.monsters.length} Monsters
        </div>
      </motion.div>
    </Link>
  );
}

export default function MapsPage() {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMaps = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "48" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/maps?${params}`);
      const data = await res.json();
      setMaps(data.maps || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchMaps(); }, [fetchMaps]);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "5.5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem 0" }}>Map Database</h1>
        <p style={{ color: "#64748b", margin: 0 }}>Ragnarok Zero Global Map Index — {total.toLocaleString()} maps indexed</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "8px 14px", marginBottom: "2rem", maxWidth: "400px" }}>
        <Search size={16} color="#94a3b8" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search maps by name or ID..."
          style={{ border: "none", outline: "none", fontSize: "0.9rem", color: "#1e293b", width: "100%", background: "transparent" }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>Loading map data...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {maps.map((m) => (
            <MapCard key={m.id} map={m} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-primary" style={{ padding: "8px 16px", opacity: page === 1 ? 0.4 : 1 }}>
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Page {page} of {pages}</span>
          <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} className="btn-primary" style={{ padding: "8px 16px", opacity: page === pages ? 0.4 : 1 }}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <section style={{ padding: '4rem 0', borderTop: '1px solid #f1f5f9', marginTop: '4rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          Explore the world of Midgard with our <strong>Ragnarok Zero Map Database</strong>. We've indexed every field, dungeon, and city available in Ragnarok Zero Global (TWRo Zero data). Each map entry includes the English name, original Chinese name, and a list of all monsters spawning in the area. This tool is perfect for planning your farming routes or finding specific monsters for quests. Combined with our monster and item databases, the Midgard Community Hub provides everything you need to navigate the world of RO Zero.
        </p>
      </section>
    </main>
  );
}
