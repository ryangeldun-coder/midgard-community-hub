"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, MapPin, Clock, Sword, Shield, Gem, ChevronRight, Info, ExternalLink, Hammer, Zap, Star, Users, ArrowUpRight } from "lucide-react";

// Fever Locations & Drop items mapped out explicitly
const FEVER_FIELDS = [
  {
    id: "payon_fever",
    name: "Payon Forest Fever",
    map_id: "pay_fild03_f",
    location: "Payon Forest",
    level: "40-55",
    mechanics: [
      "Defeat 10 standard variants to forcefully trigger a Frenzy Champion.",
      "Defeating Champions slowly stacks the Boss Spawn progress bar.",
      "Party sizes of 4+ increase random option roll quality by 15%."
    ],
    proTips: [
      "Equip Earth-reduction shields since most Brutes hit with heavy physical earth spells.",
      "Farming in groups yields shared drop materials efficiently."
    ],
    boss: {
      name: "Frenzy Bigfoot",
      id: 1060,
      element: "Earth",
      race: "Brute",
      size: "Large",
      hp: "286,950",
      image: "https://assets.twroz.wiki/images/monsters/1060.gif"
    },
    equipment: [
      { id: 518, name: "Honey", description: "A premium healing snack.", stats: ["Restores HP/SP"] },
      { id: 948, name: "Bear's Paw", description: "Trophy from strong beasts.", stats: ["Crafting material"] },
      { id: 4134, name: "Big Foot Card", description: "Infuse onto defensive accessories.", stats: ["+20% dmg vs Insects"] }
    ]
  },
  {
    id: "geffen_fever",
    name: "Geffen Field Fever",
    map_id: "gef_fild14_f",
    location: "Geffen Outskirts",
    level: "60-70",
    mechanics: [
      "Specialized poison pools continuously drain physical HP pools.",
      "Magical skills inflict 30% bonus elemental damage."
    ],
    proTips: [
      "Carry Green Potions or rely on Priests for Quick Detox spells.",
      "Use Wind elemental attacks."
    ],
    boss: {
      name: "Frenzy Creamy",
      id: 1018,
      element: "Wind",
      race: "Insect",
      size: "Small",
      hp: "112,500",
      image: "https://assets.twroz.wiki/images/monsters/1018.gif"
    },
    equipment: [
      { id: 905, name: "Butterfly Wing", description: "Instantly travel to your home town.", stats: ["Teleportation utility"] },
      { id: 4046, name: "Creamy Card", description: "Grants continuous usage of Teleport Skill.", stats: ["Lv 1 Teleport"] }
    ]
  },
  {
    id: "desert_fever",
    name: "Desert Field Fever",
    map_id: "moc_fild11_f",
    location: "Sograt Desert",
    level: "75-85",
    mechanics: [
      "Massive movement speed penalties apply globally across these coordinates.",
      "Elite Sandmen cast stone-curse traps."
    ],
    proTips: [
      "Evil Druid Card protections mitigate direct petrification metrics completely.",
      "Keep physical distance."
    ],
    boss: {
      name: "Frenzy Minorous",
      id: 1149,
      element: "Fire",
      race: "Brute",
      size: "Large",
      hp: "398,000",
      image: "https://assets.twroz.wiki/images/monsters/1149.gif"
    },
    equipment: [
      { id: 932, name: "Minorous Horn", description: "A massive fiery bull shard.", stats: ["Elite Forge component"] },
      { id: 4098, name: "Minorous Card", description: "Boosts damage limits against bulky heavy targets.", stats: ["+15% vs Large"] }
    ]
  },
  {
    id: "glast_fever",
    name: "Glast Heim Fever",
    map_id: "glast_01_f",
    location: "GH Chivalry",
    level: "90+",
    mechanics: [
      "Severe stat scaling constraints. Bosses drop dual-enchanted equipment sets.",
      "Aggressive target acquisition algorithms."
    ],
    proTips: [
      "Full 7-man holy compositions act safely here.",
      "Stack Shadow reduction gear."
    ],
    boss: {
      name: "Frenzy Wraith",
      id: 1192,
      element: "Undead",
      race: "Undead",
      size: "Medium",
      hp: "452,000",
      image: "https://assets.twroz.wiki/images/monsters/1192.gif"
    },
    equipment: [
      { id: 728, name: "Fabric", description: "Lightweight material.", stats: ["Tailoring recipe core"] },
      { id: 4111, name: "Wraith Card", description: "Earn SP back on killing blows.", stats: ["+5 SP on Undead kills"] }
    ]
  }
];

function DropCard({ item }: { item: any }) {
  return (
    <div style={{ 
      background: "white", 
      border: "1px solid #e2e8f0", 
      borderRadius: "12px", 
      padding: "1rem", 
      display: "flex", 
      gap: "1rem",
      alignItems: "flex-start",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default"
    }}
    className="equipment-card-hover"
    >
      <div style={{ 
        width: "64px", 
        height: "64px", 
        background: "#f8fafc", 
        borderRadius: "8px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid #f1f5f9"
      }}>
        <img 
          src={`https://assets.twroz.wiki/images/items/${item.id}.gif`} 
          alt={item.name} 
          style={{ width: "32px", height: "32px", objectFit: "contain" }} 
          onError={(e) => { (e.target as HTMLImageElement).src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>{item.name}</h4>
        <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "0 0 8px", lineHeight: 1.4 }}>{item.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {item.stats.map((stat: string, i: number) => (
            <div key={i} style={{ 
              fontSize: "0.65rem", 
              fontWeight: 700, 
              color: "var(--ro-red)", 
              background: "#fff1f2", 
              padding: "2px 8px", 
              borderRadius: "4px",
              width: "fit-content"
            }}>
              {stat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeverMapsPage() {
  const [selectedId, setSelectedId] = useState(FEVER_FIELDS[0].id);
  const field = FEVER_FIELDS.find(f => f.id === selectedId)!;

  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "6.5rem 1.5rem 3rem" }}>
      {/* Header matching Dungeons layout */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--ro-red)", marginBottom: "0.5rem" }}>
          <Layers size={24} />
          <span style={{ fontWeight: 800, letterSpacing: "0.1em", fontSize: "0.9rem" }}>FRENZY SYSTEM</span>
        </div>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Fever Fields Tracker</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem" }}>
          Comprehensive reference index for TWRoZ Fever maps, unique drop limits, and level limits.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Sidebar List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FEVER_FIELDS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedId(f.id)}
              style={{
                textAlign: "left",
                padding: "1.25rem",
                borderRadius: "16px",
                border: "1px solid",
                borderColor: selectedId === f.id ? "var(--ro-red)" : "#e2e8f0",
                background: selectedId === f.id ? "linear-gradient(135deg, #fff, #fff1f2)" : "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: selectedId === f.id ? "0 10px 25px -5px rgba(225, 29, 72, 0.1)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ 
                  fontSize: "0.65rem", 
                  fontWeight: 800, 
                  background: selectedId === f.id ? "var(--ro-red)" : "#f1f5f9",
                  color: selectedId === f.id ? "white" : "#64748b",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase"
                }}>
                  Lv {f.level}
                </span>
                <Clock size={14} color="#94a3b8" />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1e293b" }}>{f.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={12} /> {f.location} ({f.map_id})
              </div>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ 
              background: "white", 
              borderRadius: "24px", 
              border: "1px solid #e2e8f0", 
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
            }}
          >
            {/* Boss Banner */}
            <div style={{ 
              background: "linear-gradient(135deg, #1e293b, #0f172a)", 
              padding: "2rem", 
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
                  <Shield size={16} color="var(--ro-red)" />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.8, letterSpacing: "0.1em" }}>FRENZY ELITE TARGET</span>
                </div>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 900, margin: 0 }}>{field.boss.name}</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>Element:</span> <strong>{field.boss.element}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>Race:</span> <strong>{field.boss.race}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.8rem" }}>
                    <span style={{ opacity: 0.6 }}>HP Pool:</span> <strong>{field.boss.hp}</strong>
                  </div>
                </div>
              </div>
              <img 
                src={field.boss.image} 
                alt={field.boss.name} 
                style={{ height: "110px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.5))" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; }}
              />
            </div>

            <div style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                {/* Mechanics */}
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Sword size={18} color="var(--ro-red)" />
                    Field Rules
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {field.mechanics.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6 }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f1f5f9", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tips */}
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Zap size={18} color="#fbbf24" fill="#fbbf24" />
                    Farming Tips
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {field.proTips.map((tip, i) => (
                      <div key={i} style={{ 
                        background: "#fffbeb", 
                        border: "1px solid #fef3c7", 
                        padding: "1rem", 
                        borderRadius: "12px", 
                        fontSize: "0.85rem", 
                        color: "#92400e",
                        lineHeight: 1.5,
                        display: "flex",
                        gap: "10px"
                      }}>
                        <Info size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Equipment / Drops Section */}
              <div style={{ marginTop: "3.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Shield size={20} color="var(--ro-red)" />
                    Fever Drop Roster
                  </h3>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>{field.equipment.length} Drops Logged</div>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  {field.equipment.map((item, i) => (
                    <DropCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .equipment-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          border-color: var(--ro-red) !important;
        }
      `}</style>
    </main>
  );
}
