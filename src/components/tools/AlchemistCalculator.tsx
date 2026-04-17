"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Beaker, Zap, Calculator, TrendingUp } from "lucide-react";
import ROWindow from "@/components/ui/ROWindow";

const POTION_TYPES = [
  { name: "Red/Yellow/White Potion", rate: 20 },
  { name: "Blue Potion", rate: -5 },
  { name: "Condensed White Potion", rate: -10 },
  { name: "Alcohol", rate: 10 },
  { name: "Acid/Fire Bottle", rate: -5 },
  { name: "Slim White Potion", rate: -15 },
  { name: "Glistening Coat", rate: -20 },
];

export default function AlchemistCalculator() {
  const [dex, setDex] = useState(99);
  const [luk, setLuk] = useState(99);
  const [int, setInt] = useState(99);
  const [jobLv, setJobLv] = useState(70);
  const [prepLv, setPrepLv] = useState(10);
  const [researchLv, setResearchLv] = useState(10);
  const [sets, setSets] = useState(100);
  const [potionType, setPotionType] = useState(POTION_TYPES[2]); // Condensed White

  const [successRate, setSuccessRate] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState(0);

  useEffect(() => {
    // RO Zero TW Formula: 
    // Success Rate (%) = [(Prepare Potion Lv × 3) + (Potion Research Lv) + (Job Lv × 0.2) + (DEX × 0.1) + (LUK × 0.1) + (INT × 0.05) + Potion_Rate]%
    const rate = (prepLv * 3) + researchLv + (jobLv * 0.2) + (dex * 0.1) + (luk * 0.1) + (int * 0.05) + potionType.rate;
    const finalRate = Math.max(0, Math.min(100, rate));
    setSuccessRate(finalRate);
    setExpectedOutput(Math.floor(sets * (finalRate / 100)));
  }, [dex, luk, int, jobLv, prepLv, researchLv, sets, potionType]);

  return (
    <ROWindow title="Alchemist Brewing Calculator" icon={<FlaskConical size={16} />} width="100%">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {/* Stats Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ro-red)', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>CHARACTER STATS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>DEX (TOTAL)</label>
              <input type="number" value={dex} onChange={(e) => setDex(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>LUK (TOTAL)</label>
              <input type="number" value={luk} onChange={(e) => setLuk(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>INT (TOTAL)</label>
              <input type="number" value={int} onChange={(e) => setInt(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>JOB LEVEL</label>
              <input type="number" value={jobLv} onChange={(e) => setJobLv(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ro-red)', borderBottom: '1px solid #eee', paddingBottom: '4px', marginTop: '1rem' }}>SKILL LEVELS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>PREP POTION</label>
              <select value={prepLv} onChange={(e) => setPrepLv(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                {[1,2,3,4,5,6,7,8,9,10].map(v => <option key={v} value={v}>Lv {v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>POTION RESEARCH</label>
              <select value={researchLv} onChange={(e) => setResearchLv(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                {[1,2,3,4,5,6,7,8,9,10].map(v => <option key={v} value={v}>Lv {v}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Brew Settings & Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '8px' }}>POTION TYPE</label>
              <select 
                value={potionType.name} 
                onChange={(e) => setPotionType(POTION_TYPES.find(p => p.name === e.target.value)!)}
                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 600 }}
              >
                {POTION_TYPES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '8px' }}>AMOUNT TO BREW (SETS)</label>
              <input 
                type="number" 
                value={sets} 
                onChange={(e) => setSets(Number(e.target.value))} 
                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 800 }}
              />
            </div>
          </div>

          <div className="modern-glass" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--ro-red), var(--ro-accent))', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>Success Rate</span>
                <p style={{ fontSize: '2rem', fontWeight: 800 }}>{successRate.toFixed(1)}%</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <TrendingUp size={32} opacity={0.3} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>ESTIMATED OUTPUT</span>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24' }}>{expectedOutput.toLocaleString()} Items</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '4px' }}>Expected casualties: {(sets - expectedOutput).toLocaleString()} sets failed.</p>
            </div>
          </div>
        </div>
      </div>
    </ROWindow>
  );
}
