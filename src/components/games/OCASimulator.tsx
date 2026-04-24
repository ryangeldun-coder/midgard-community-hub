"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, History, RotateCcw, Info } from "lucide-react";
import { getRandomCard } from "@/app/games/oca-simulator/actions";
import type { Item } from "@/lib/database";
import Link from "next/link";

export default function OCASimulator() {
  const [currentCard, setCurrentCard] = useState<Item | null>(null);
  const [history, setHistory] = useState<Item[]>([]);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = async () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // Simulate a bit of suspense
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const card = await getRandomCard();
    if (card) {
      setCurrentCard(card);
      setHistory(prev => [card, ...prev].slice(0, 10));
    }
    
    setIsOpening(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Main Album Display */}
      <div style={{ marginBottom: "3rem", position: "relative", minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          {!currentCard && !isOpening ? (
            <motion.div
              key="album"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              <img 
                src="https://assets.twroz.wiki/item/616.png" 
                alt="Old Card Album" 
                style={{ width: "120px", height: "120px", imageRendering: "pixelated", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }} 
              />
              <p style={{ marginTop: "1rem", fontWeight: 800, color: "var(--ro-red)", fontSize: "1.1rem" }}>Click to Open Album</p>
            </motion.div>
          ) : isOpening ? (
            <motion.div
              key="opening"
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <img 
                src="https://assets.twroz.wiki/item/616.png" 
                alt="Opening..." 
                style={{ width: "120px", height: "120px", imageRendering: "pixelated" }} 
              />
            </motion.div>
          ) : currentCard ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 50, rotateY: 180 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ type: "spring", damping: 12 }}
              style={{ perspective: "1000px" }}
            >
              <div style={{ background: "white", padding: "2rem", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", width: "280px" }}>
                <img src={currentCard.icon_url} alt={currentCard.name_en} style={{ width: "80px", height: "80px", imageRendering: "pixelated", marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e293b", margin: "0 0 0.5rem 0" }}>{currentCard.name_en}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{currentCard.name_zh}</p>
                <Link href={`/database/items/${currentCard.id}`} style={{ color: "var(--ro-red)", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Info size={14} /> View Stats
                </Link>
                <button onClick={handleOpen} style={{ marginTop: "1.5rem", width: "100%", padding: "12px", background: "var(--ro-red)", color: "white", border: "none", borderRadius: "10px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <Sparkles size={16} /> Open Another
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div style={{ marginTop: "4rem", borderTop: "1px solid #f1f5f9", paddingTop: "2rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#64748b", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <History size={18} /> RECENT PULLS
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {history.map((item, idx) => (
              <motion.div
                key={`${item.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: "48px", height: "48px", background: "#f8fafc", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0" }}
                title={item.name_en}
              >
                <img src={item.icon_url} alt={item.name_en} style={{ width: "32px", height: "32px", imageRendering: "pixelated" }} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
