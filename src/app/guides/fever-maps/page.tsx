"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Skull, Compass, Star, Shield, Zap, Heart, Eye } from "lucide-react";

const ASSETS_BASE = "https://assets.twroz.wiki";

const FEVER_LOCATIONS = [
  {
    id: "payon",
    name: "Payon Fever (Forest)",
    description: "Spiritual woods holding tier-1 zero drop tables.",
    themeColor: "#10b981",
    maps: [
      {
        id: "pay_fild06",
        name: "Payon Field 06",
        level: "Lv 45-55",
        requirement: "Slay 10 standard variants to call the Champion.",
        monsters: [
          { 
            id: 1306, 
            name_zh: "狂暴大腳熊", 
            name_en: "Frenzy Big Foot", 
            level: 52, 
            element: "Earth", 
            race: "Brute", 
            hp: "286,950", 
            drops: [
              { id: 518, name: "Honey" },
              { id: 948, name: "Bear's Paw" },
              { id: 4134, name: "Big Foot Card" }
            ]
          },
          { 
            id: 1266, 
            name_zh: "狂暴野豬", 
            name_en: "Frenzy Savage", 
            level: 55, 
            element: "Earth", 
            race: "Brute", 
            hp: "195,400", 
            drops: [
              { id: 522, name: "Monster's Feed" },
              { id: 4119, name: "Savage Card" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "geffen",
    name: "Geffen Fever",
    description: "Damp, poison-infested dungeons yielding massive experience.",
    themeColor: "#8b5cf6",
    maps: [
      {
        id: "gef_fild06",
        name: "Geffen Field 06",
        level: "Lv 60-70",
        requirement: "Hunt Champion variants for local equipment upgrades.",
        monsters: [
          { 
            id: 1260, 
            name_zh: "狂暴克瑞米", 
            name_en: "Frenzy Creamy", 
            level: 68, 
            element: "Wind", 
            race: "Insect", 
            hp: "112,500", 
            drops: [
              { id: 905, name: "Butterfly Wing" },
              { id: 4046, name: "Creamy Card" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "desert",
    name: "Desert Fever",
    description: "Blistering heat harboring deep zero-refinement minerals.",
    themeColor: "#f59e0b",
    maps: [
      {
        id: "moc_fild13",
        name: "Sograt Desert 13",
        level: "Lv 75-85",
        requirement: "Chain kills continuously to unleash core affixes.",
        monsters: [
          { 
            id: 1310, 
            name_zh: "狂暴米洛斯", 
            name_en: "Frenzy Minorous", 
            level: 82, 
            element: "Fire", 
            race: "Brute", 
            hp: "398,000", 
            drops: [
              { id: 932, name: "Minorous Horn" },
              { id: 4098, name: "Minorous Card" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "glast",
    name: "Glast Heim Fever",
    description: "The ultimate test of stamina for Ragnarok Zero veterans.",
    themeColor: "#ef4444",
    maps: [
      {
        id: "glast_01",
        name: "GH Chivalry 01",
        level: "Lv 90+",
        requirement: "Form full endgame parties. Single targeting disabled.",
        monsters: [
          { 
            id: 1292, 
            name_zh: "狂暴惡靈", 
            name_en: "Frenzy Wraith", 
            level: 95, 
            element: "Undead", 
            race: "Undead", 
            hp: "452,000", 
            drops: [
              { id: 728, name: "Fabric" },
              { id: 4111, name: "Wraith Card" }
            ]
          }
        ]
      }
    ]
  }
];

export default function FeverMapsPage() {
  const [selectedLoc, setSelectedLoc] = useState(FEVER_LOCATIONS[0]);
  const [selectedMap, setSelectedMap] = useState(FEVER_LOCATIONS[0].maps[0]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 py-28 px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Superior Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-3xl mb-6 shadow-2xl shadow-rose-500/5 animate-pulse"
          >
            <Swords size={42} />
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Fever Fields Overview
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Locate elite champion variants, hunt random stat enhancements, and dominate tactical field farming routes.
          </p>
        </header>

        {/* Location Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {FEVER_LOCATIONS.map((loc) => {
            const isActive = selectedLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => { setSelectedLoc(loc); setSelectedMap(loc.maps[0]); }}
                className={`group p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? "bg-slate-800/80 border-rose-500/50 text-white shadow-xl shadow-rose-500/10 ring-1 ring-rose-500/20" 
                    : "bg-slate-800/30 border-slate-800/60 hover:border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div 
                  className="absolute bottom-0 left-0 w-full h-1.5 transition-all duration-300" 
                  style={{ backgroundColor: loc.themeColor }}
                />
                <h3 className="text-xl font-black mb-2 group-hover:translate-x-1 transition-transform">{loc.name}</h3>
                <p className="text-xs text-slate-400/90 leading-snug line-clamp-2">{loc.description}</p>
              </button>
            );
          })}
        </div>

        {/* Map Selector panel & Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Sector Meta */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 text-rose-400">
                <Compass size={22} />
                <h2 className="text-xl font-extrabold text-slate-100">Zone Sector</h2>
              </div>
              <div className="flex flex-col gap-2.5">
                {selectedLoc.maps.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMap(m)}
                    className={`p-4 rounded-2xl font-bold text-sm text-left transition-all duration-200 ${
                      selectedMap.id === m.id 
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25" 
                        : "bg-slate-900/60 border border-slate-800/50 hover:bg-slate-800/50 text-slate-300"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fever Mechanics Reminder */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 flex-grow flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-3 mb-4 text-amber-400">
                  <Star size={22} />
                  <h2 className="text-xl font-extrabold text-slate-100">Map Mechanics</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedMap.requirement}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Level Requirement</span>
                <span className="text-lg font-black text-rose-400 bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20">{selectedMap.level}</span>
              </div>
            </div>
          </div>

          {/* Right: Live Monster Table with Sprites */}
          <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-col">
            <div className="flex items-center gap-3 mb-8 text-rose-400 border-b border-slate-800/60 pb-4">
              <Skull size={24} />
              <h2 className="text-2xl font-black text-slate-100">Spawn Roster</h2>
            </div>

            <div className="flex flex-col gap-6 flex-grow">
              {selectedMap.monsters.map((mob, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/60 border border-slate-800/40 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-rose-500/20 transition-all duration-300 group shadow-inner"
                >
                  {/* True Animated Monster Sprite */}
                  <div className="w-28 h-28 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center relative flex-shrink-0 overflow-hidden shadow-2xl group-hover:border-rose-500/40 transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
                    <img 
                      src={`${ASSETS_BASE}/images/monsters/${mob.id}.gif`} 
                      alt={mob.name_en} 
                      className="max-w-[80px] max-h-[80px] object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => { (e.target as HTMLImageElement).src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; }}
                    />
                  </div>

                  {/* Monster Info */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-black text-slate-100 group-hover:text-rose-400 transition-colors">
                          {mob.name_en}
                        </h3>
                        <span className="text-xs text-slate-500">{mob.name_zh}</span>
                      </div>
                      <span className="text-sm font-extrabold bg-slate-800 border border-slate-700/60 px-3 py-1 rounded-xl text-rose-400">
                        Lv. {mob.level}
                      </span>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex flex-wrap gap-2.5 mb-5 text-xs font-bold">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 rounded-xl border border-slate-800 text-slate-300">
                        <Heart size={12} className="text-rose-400" /> {mob.hp} HP
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 rounded-xl border border-slate-800 text-teal-400">
                        <Zap size={12} /> {mob.element}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 rounded-xl border border-slate-800 text-amber-400">
                        <Eye size={12} /> {mob.race}
                      </span>
                    </div>

                    {/* Drops with True Item Sprites */}
                    <div className="bg-slate-950/20 border border-slate-800/40 p-4 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block mb-3">Exclusive Monster Drops</span>
                      <div className="flex flex-wrap gap-3">
                        {mob.drops.map((drop, dIdx) => (
                          <div 
                            key={dIdx}
                            className="flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/60 pl-1.5 pr-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:border-amber-500/40 hover:bg-slate-950/80 transition-all duration-200 cursor-pointer"
                          >
                            <div className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                              <img 
                                src={`${ASSETS_BASE}/images/items/${drop.id}.gif`} 
                                alt={drop.name} 
                                className="w-5 h-5 object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; }}
                              />
                            </div>
                            <span>{drop.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
