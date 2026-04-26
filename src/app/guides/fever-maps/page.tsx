"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Skull, Compass, Star, Shield, Zap } from "lucide-react";

// Fever Map Static Configurations
const FEVER_LOCATIONS = [
  {
    id: "payon",
    name: "Payon Fever",
    description: "Ancient forest filled with restless spiritual champions.",
    themeColor: "#22c55e",
    maps: [
      {
        id: "pay_fild06",
        name: "Payon Forest (pay_fild06)",
        level: "Lv 40-55",
        requirement: "Defeat 10 normal mobs to spawn Frenzy variants.",
        monsters: [
          { name: "狂暴大腳熊 (Frenzy Big Foot)", level: 52, element: "Earth", race: "Brute", hp: "12,400", drops: ["Fever Bear Cap", "Rough Oridecon"] },
          { name: "狂暴將軍魔碑 (Frenzy Greatest General)", level: 55, element: "Fire", race: "Formless", hp: "18,000", drops: ["General's Sword", "Fire Stone"] }
        ]
      }
    ]
  },
  {
    id: "geffen",
    name: "Gffen Fever",
    description: "Haunted fields overflowing with poisonous arcane magic.",
    themeColor: "#a855f7",
    maps: [
      {
        id: "gef_fild06",
        name: "Geffen Field (gef_fild06)",
        level: "Lv 60-70",
        requirement: "Defeat Champion variants to awaken the Boss.",
        monsters: [
          { name: "狂暴毒蠍 (Frenzy Scorpion)", level: 65, element: "Fire", race: "Brute", hp: "24,000", drops: ["Fever Scorpion Card", "Scorpion Tail"] },
          { name: "狂暴噬人花 (Frenzy Flora)", level: 68, element: "Earth", race: "Plant", hp: "32,000", drops: ["Fever Flora Bow", "Stem"] }
        ]
      }
    ]
  },
  {
    id: "desert",
    name: "Desert Fever",
    description: "Burning sands populated by colossal quicksand beasts.",
    themeColor: "#eab308",
    maps: [
      {
        id: "moc_fild13",
        name: "Sograt Desert (moc_fild13)",
        level: "Lv 70-85",
        requirement: "Kill Champion Sandmen to lure out Boss Phreeoni.",
        monsters: [
          { name: "狂暴泥人 (Frenzy Clay Golem)", level: 78, element: "Earth", race: "Formless", hp: "48,000", drops: ["Fever Golem Armor", "Elunium"] },
          { name: "狂暴沙地之靈 (Frenzy Sandman)", level: 82, element: "Earth", race: "Formless", hp: "55,000", drops: ["Fever Sandman Card", "Fine Sand"] }
        ]
      }
    ]
  },
  {
    id: "glast",
    name: "Glast Heim Fever",
    description: "The ultimate endgame farming grounds. Heavy armor recommended.",
    themeColor: "#ef4444",
    maps: [
      {
        id: "glast_01",
        name: "GH Chivalry (glast_01)",
        level: "Lv 90+",
        requirement: "Kill abyssal knights to trigger the Frenzy event.",
        monsters: [
          { name: "狂暴深淵騎士 (Frenzy Khalitzburg)", level: 95, element: "Shadow", race: "Undead", hp: "125,000", drops: ["Fever GH Plate", "Corrupted Soul"] },
          { name: "狂暴幽靈劍士 (Frenzy Raydric)", level: 93, element: "Shadow", race: "Undead", hp: "95,000", drops: ["Raydric Card", "Fever Cape"] }
        ]
      }
    ]
  }
];

export default function FeverMapsPage() {
  const [selectedLoc, setSelectedLoc] = useState(FEVER_LOCATIONS[0]);
  const [selectedMap, setSelectedMap] = useState(FEVER_LOCATIONS[0].maps[0]);

  const handleLocChange = (loc: typeof FEVER_LOCATIONS[0]) => {
    setSelectedLoc(loc);
    setSelectedMap(loc.maps[0]);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 bg-rose-500/10 text-rose-400 rounded-2xl mb-6"
          >
            <Swords size={40} />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Fever Fields Master Directory
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Track down special Frenzy and Champion monsters. Farm endgame equipment with server-side dynamic random options.
          </p>
        </header>

        {/* Location Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {FEVER_LOCATIONS.map((loc) => {
            const isActive = selectedLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleLocChange(loc)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive 
                    ? "bg-slate-800 border-rose-500 text-white ring-2 ring-rose-500/20Shadow-lg" 
                    : "bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300" 
                  style={{ backgroundColor: loc.themeColor }}
                />
                <h3 className="text-xl font-extrabold mb-1">{loc.name}</h3>
                <p className="text-xs opacity-70 line-clamp-2">{loc.description}</p>
              </button>
            );
          })}
        </div>

        {/* Map Selection / Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Map List */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-slate-800/50 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6 text-rose-400">
                <Compass size={24} />
                <h2 className="text-xl font-extrabold text-white">Select Sector</h2>
              </div>
              <div className="flex flex-col gap-2">
                {selectedLoc.maps.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMap(m)}
                    className={`p-4 rounded-xl font-bold text-left transition-all ${
                      selectedMap.id === m.id 
                        ? "bg-rose-500 text-white" 
                        : "bg-slate-800 hover:bg-slate-700/50 text-slate-300"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 rounded-3xl p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-amber-400">
                  <Star size={24} />
                  <h2 className="text-xl font-extrabold text-white">Fever Mechanics</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {selectedMap.requirement} Normal monsters on these maps drop basic zero upgrades, while Frenzy monsters hold top-tier slot-enchanted variants.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700/40">
                <span className="text-xs text-slate-500 block">Target Level Range</span>
                <span className="text-lg font-extrabold text-rose-400">{selectedMap.level}</span>
              </div>
            </div>
          </div>

          {/* Right Monster List */}
          <div className="lg:col-span-2 bg-slate-800/50 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8 text-rose-400">
              <Skull size={24} />
              <h2 className="text-xl font-extrabold text-white">Frenzy Spawn Table</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedMap.monsters.map((mob, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 hover:border-rose-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {/* Sprite Placeholder */}
                    <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-600 group-hover:text-rose-400 transition-colors">
                      <Skull size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-rose-400 transition-colors">{mob.name}</h3>
                      <span className="text-xs px-2.5 py-0.5 bg-slate-800 rounded-md text-slate-400 border border-slate-700/50">
                        Lv. {mob.level}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-slate-800/40 p-2 rounded-lg flex items-center justify-between border border-slate-800">
                      <span className="text-slate-500">HP</span>
                      <span className="font-bold text-rose-400">{mob.hp}</span>
                    </div>
                    <div className="bg-slate-800/40 p-2 rounded-lg flex items-center justify-between border border-slate-800">
                      <span className="text-slate-500">Element</span>
                      <span className="font-bold text-teal-400">{mob.element}</span>
                    </div>
                  </div>

                  {/* Drops */}
                  <div className="border-t border-slate-800 pt-3 mt-2">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase mb-2 tracking-wide">Featured Drops</span>
                    <div className="flex flex-wrap gap-2">
                      {mob.drops.map((drop, dIdx) => (
                        <span 
                          key={dIdx}
                          className="text-xs font-medium bg-slate-800 text-slate-200 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {drop}
                        </span>
                      ))}
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
