"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Search, Map as MapIcon } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

const FARMING_DATA = [
  { map: "Payon Fever (Asterisk)", target: "Big Eggring*", loot: "Eggring Card, Random Option Ore", zeny: "High", difficulty: "Medium", level: "70-90", element: "Fire", earnings: "500k-800k" },
  { map: "Culvert Fever (Asterisk)", target: "Male Thief Bug*", loot: "Golden Bug Card (Low Rate), Fever Ore", zeny: "Extreme", difficulty: "Hard", level: "90-99", element: "Wind/Fire", earnings: "1.2M+" },
  { map: "Ant Hell Fever", target: "Vitata*", loot: "Vitata Card, Royal Jelly", zeny: "High", difficulty: "Medium", level: "60-80", element: "Fire", earnings: "600k-900k" },
  { map: "Glast Heim Memorial", target: "Khalitzburg", loot: "Cursed Ruby, White Herb", zeny: "Very High", difficulty: "Very Hard", level: "95+", element: "Holy/Fire", earnings: "2M+" },
  { map: "Orc Village Fever", target: "Orc Warrior*", loot: "Iron Ore, Rough Elunium", zeny: "Stable", difficulty: "Easy", level: "40-60", element: "Fire", earnings: "300k-500k" },
];

export default function FarmingOptimizer() {
  const [filter, setFilter] = useState("");

  const filteredData = FARMING_DATA.filter(item => 
    item.map.toLowerCase().includes(filter.toLowerCase()) || 
    item.loot.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ROWindow title="Farming Optimizer" icon={<Coins size={16} color="#fbbf24" />} width="100%">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>Target high-value Asterisk monsters and Fever drops.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0.75rem', gap: '8px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
          <Search size={14} opacity={0.5} />
          <input 
            type="text" 
            placeholder="Search loot..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#333', outline: 'none', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredData.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ 
              padding: '1rem', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '0.75rem',
              background: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '2px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, display: 'block' }}>MAP</span>
              <span style={{ fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapIcon size={12} /> {item.map}
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, display: 'block' }}>TARGET / ELEM</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.target}</span>
                <span style={{ fontSize: '0.65rem', color: '#ff4b2b', fontWeight: 800 }}>({item.element})</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, display: 'block' }}>LOOT</span>
              <span style={{ fontSize: '0.75rem' }}>{item.loot}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, display: 'block' }}>EST. EARNINGS</span>
              <span style={{ color: '#2a6bbd', fontWeight: 800, fontSize: '0.85rem' }}>{item.earnings} Z/h</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ROWindow>
  );
}
