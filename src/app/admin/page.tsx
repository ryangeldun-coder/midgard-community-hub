"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Play, CheckCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react";

type Status = { items: boolean; monsters: boolean } | null;
type Phase = "idle" | "translating-items" | "translating-monsters" | "done" | "error";

export default function AdminPage() {
  const [status, setStatus] = useState<Status>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [target, setTarget] = useState<"both" | "items" | "monsters">("both");

  const addLog = (msg: string) => setLog((l) => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  useEffect(() => {
    fetch("/api/admin/build-db")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => {});
  }, []);

  const runBuild = async () => {
    setPhase(target === "monsters" ? "translating-monsters" : "translating-items");
    setLog([]);
    addLog(`Starting translation — target: ${target}`);
    addLog("Fetching raw data from assets.twroz.wiki…");
    addLog("Translating via Google Translate (batched, 20 items per request)…");
    addLog("This may take 5–15 minutes depending on dataset size. Please keep this tab open.");

    try {
      const res = await fetch("/api/admin/build-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      addLog("✅ Translation complete!");
      if (data.results?.items) addLog(`  Items: ${data.results.items.count} translated → items-translated.json`);
      if (data.results?.monsters) addLog(`  Monsters: ${data.results.monsters.count} translated → monsters-translated.json`);
      addLog("Reload the app to see translated content.");

      setStatus({ items: !!data.results?.items, monsters: !!data.results?.monsters });
      setPhase("done");
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`);
      setPhase("error");
    }
  };

  const isRunning = phase === "translating-items" || phase === "translating-monsters";

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--ro-red)", margin: "0 0 0.5rem" }}>
          🗄️ Database Translation Builder
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Fetches the raw TWRoZ JSON, batch-translates all Chinese text via Google Translate, and saves the English database to <code>src/data/</code> for fast serving.
        </p>
      </div>

      {/* Status */}
      {status && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Items Database", key: "items" as const, count: "4,523 items" },
            { label: "Monsters Database", key: "monsters" as const, count: "324 monsters" },
          ].map(({ label, key, count }) => (
            <div key={key} style={{ background: "white", border: `2px solid ${status[key] ? "#22c55e" : "#e2e8f0"}`, borderRadius: "12px", padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                {status[key] ? <CheckCircle size={18} color="#22c55e" /> : <Clock size={18} color="#94a3b8" />}
                <span style={{ fontWeight: 700, color: "#1e293b" }}>{label}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: status[key] ? "#22c55e" : "#94a3b8", margin: 0, fontWeight: 600 }}>
                {status[key] ? `✅ Translated (${count})` : "⏳ Not yet translated"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Config */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748b", margin: "0 0 0.75rem" }}>TRANSLATION TARGET</h3>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {(["both", "items", "monsters"] as const).map((t) => (
            <button key={t} onClick={() => setTarget(t)} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid", borderColor: target === t ? "var(--ro-red)" : "#e2e8f0", background: target === t ? "var(--ro-red)" : "white", color: target === t ? "white" : "#64748b", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#fef9c3", border: "1px solid #fbbf24", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.75rem", color: "#92400e", margin: 0, lineHeight: 1.5 }}>
            ⚠️ <strong>First-time build only.</strong> The translation pipeline sends ~500 requests to Google Translate in batches of 20.
            Estimated time: <strong>5–10 min for items</strong>, <strong>~2 min for monsters</strong>. Do not close this tab.
          </p>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={runBuild}
        disabled={isRunning}
        style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "12px", background: isRunning ? "#94a3b8" : "var(--ro-red)", color: "white", border: "none", cursor: isRunning ? "not-allowed" : "pointer", fontWeight: 800, fontSize: "1rem", marginBottom: "1.5rem" }}
      >
        {isRunning ? <RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Play size={18} />}
        {isRunning ? "Translating… please wait" : "Start Translation Build"}
      </button>

      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>

      {/* Log */}
      <AnimatePresence>
        {log.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "#0f172a", borderRadius: "12px", padding: "1rem", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.7 }}>
            {log.map((line, i) => (
              <div key={i} style={{ color: line.includes("✅") ? "#4ade80" : line.includes("❌") ? "#f87171" : "#94a3b8" }}>{line}</div>
            ))}
            {isRunning && <div style={{ color: "#fbbf24" }}>▶ Processing…</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: "1rem", padding: "1rem", background: "#f0fdf4", border: "2px solid #22c55e", borderRadius: "12px", textAlign: "center" }}>
          <CheckCircle size={32} color="#22c55e" style={{ margin: "0 auto 8px" }} />
          <p style={{ fontWeight: 800, color: "#15803d", margin: 0 }}>Translation complete! Reload any database page to see the results.</p>
        </motion.div>
      )}
    </main>
  );
}
