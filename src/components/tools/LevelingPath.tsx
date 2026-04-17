"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Play, Map as MapIcon, ChevronRight } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

const LEVELING_GUIDE = [
  { range: [1, 15], map: "Training Ground / Rockers", mobs: "Rocker, Willow", tip: "Follow the main story quest until Job 10.", mode: "Solo", quests: "Main Quest Line" },
  { range: [16, 30], map: "Culvert Bounty", mobs: "Thief Bug, Tarou", tip: "Pick up the Bounty Board mission in Prontera.", mode: "Solo/Duo", quests: "Bounty Board (Prontera)" },
  { range: [31, 50], map: "Orc Village Bounty", mobs: "Orc Warrior, Orc Baby", tip: "The bounty rewards are better than the mob EXP.", mode: "Party", quests: "Bounty Board (Orc Village)" },
  { range: [51, 70], map: "Payon Fever", mobs: "Asterisk Mobs", tip: "Fever maps give Random Option gear. Check my guide for details!", mode: "Full Party", quests: "Fever Daily (Payon)" },
  { range: [71, 90], map: "Glast Heim Memorial", mobs: "Wraith, Evil Druid", tip: "Start doing Daily Missions for Memorial Coins.", mode: "Full Party", quests: "Memorial Instance Daily" },
  { range: [91, 99], map: "Magma Dungeon Fever", mobs: "Asterisk Nightmare", tip: "High risk, but the best Random Options in the game.", mode: "Full Party", quests: "Fever Daily (Magma)" },
];

export default function LevelingPath() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const activeGuide = LEVELING_GUIDE.find(g => currentLevel >= g.range[0] && currentLevel <= g.range[1]) || LEVELING_GUIDE[LEVELING_GUIDE.length - 1];

  return (
    <ROWindow title="Leveling Path Navigator" icon={<TrendingUp size={16} color="var(--ro-red)" />} width="100%">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>
          <span>Current Level: {currentLevel}</span>
          <span style={{ color: 'var(--ro-red)' }}>Range: {activeGuide.range[0]}-{activeGuide.range[1]}</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="99" 
          value={currentLevel} 
          onChange={(e) => setCurrentLevel(parseInt(e.target.value))}
          style={{ 
            width: '100%', 
            height: '10px', 
            borderRadius: '4px', 
            appearance: 'none', 
            background: '#dcdcdc',
            border: '1px solid #7b7b7b',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
      </div>

      <motion.div 
        key={activeGuide.map}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '1.25rem', background: '#fdfdfd', border: '1px solid #ddd' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <div style={{ padding: '8px', background: 'var(--ro-red)', borderRadius: '4px', color: 'white' }}>
            <MapIcon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#333' }}>{activeGuide.map}</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#eee', borderRadius: '4px', fontWeight: 700 }}>{activeGuide.mode}</span>
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Mobs: {activeGuide.mobs}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', background: '#f8f8f8', border: '1px solid #eee' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--ro-red)', display: 'block', marginBottom: '4px' }}>DAILY QUESTS</span>
            <p style={{ fontSize: '0.8rem' }}>{activeGuide.quests}</p>
          </div>
          <div style={{ padding: '0.75rem', background: '#fff9e6', border: '1px solid #ffe4b3' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#c28c04', display: 'block', marginBottom: '4px' }}>PRO TIP</span>
            <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>{activeGuide.tip}</p>
          </div>
        </div>

        <a 
          href="https://www.youtube.com/channel/UCjFHiVC_IzVBPpXJ4Ao3_gA" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <Play size={14} fill="#333" />
          Watch Video Guide
          <ChevronRight size={14} />
        </a>
      </motion.div>
    </ROWindow>
  );
}
