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
  // Base Stats
  const [baseDex, setBaseDex] = useState(99);
  const [baseLuk, setBaseLuk] = useState(99);
  const [baseInt, setBaseInt] = useState(99);
  
  // Equipment/Job Bonuses
  const [dexEquip, setDexEquip] = useState(0);
  const [lukEquip, setLukEquip] = useState(0);
  const [intEquip, setIntEquip] = useState(0);
  
  // Buffs
  const [gloria, setGloria] = useState(false);
  const [blessing, setBlessing] = useState(false);
  const [dexFood, setDexFood] = useState(0);
  const [lukFood, setLukFood] = useState(0);

  const [jobLv, setJobLv] = useState(70);
  const [prepLv, setPrepLv] = useState(10);
  const [researchLv, setResearchLv] = useState(10);
  const [sets, setSets] = useState(100);
  const [potionType, setPotionType] = useState(POTION_TYPES[2]); // Condensed White

  const [successRate, setSuccessRate] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState(0);

  // Calculated Totals
  const totalDex = baseDex + dexEquip + dexFood + (blessing ? 10 : 0);
  const totalLuk = baseLuk + lukEquip + lukFood + (gloria ? 30 : 0);
  const totalInt = baseInt + intEquip + (blessing ? 10 : 0); // Blessing also adds 10 INT

  useEffect(() => {
    // RO Zero TW Formula: 
    // Success Rate (%) = [(Prepare Potion Lv × 3) + (Potion Research Lv) + (Job Lv × 0.2) + (DEX × 0.1) + (LUK × 0.1) + (INT × 0.05) + Potion_Rate]%
    const rate = (prepLv * 3) + researchLv + (jobLv * 0.2) + (totalDex * 0.1) + (totalLuk * 0.1) + (totalInt * 0.05) + potionType.rate;
    const finalRate = Math.max(0, Math.min(100, rate));
    setSuccessRate(finalRate);
    setExpectedOutput(Math.floor(sets * (finalRate / 100)));
  }, [totalDex, totalLuk, totalInt, jobLv, prepLv, researchLv, sets, potionType]);

  return (
    <ROWindow title="Alchemist Brewing Calculator" icon={<FlaskConical size={16} />} width="100%">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Stats Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ro-red)', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>BASE CHARACTER STATS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>BASE DEX</label>
              <input type="number" value={baseDex} onChange={(e) => setBaseDex(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>BASE LUK</label>
              <input type="number" value={baseLuk} onChange={(e) => setBaseLuk(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>BASE INT</label>
              <input type="number" value={baseInt} onChange={(e) => setBaseInt(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>JOB LEVEL</label>
              <input type="number" value={jobLv} onChange={(e) => setJobLv(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ro-red)', borderBottom: '1px solid #eee', paddingBottom: '4px', marginTop: '1rem' }}>EQUIPMENT & CARD BONUSES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>DEX +</label>
              <input type="number" value={dexEquip} onChange={(e) => setDexEquip(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>LUK +</label>
              <input type="number" value={lukEquip} onChange={(e) => setLukEquip(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>INT +</label>
              <input type="number" value={intEquip} onChange={(e) => setIntEquip(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ro-red)', borderBottom: '1px solid #eee', paddingBottom: '4px', marginTop: '1rem' }}>BUFFS & CONSUMABLES</h3>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={gloria} onChange={(e) => setGloria(e.target.checked)} />
                Gloria (+30 LUK)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                <input type="checkbox" checked={blessing} onChange={(e) => setBlessing(e.target.checked)} />
                Blessing (+10 DEX/INT)
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>DEX FOOD +</label>
                <input type="number" value={dexFood} onChange={(e) => setDexFood(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.6 }}>LUK FOOD +</label>
                <input type="number" value={lukFood} onChange={(e) => setLukFood(Number(e.target.value))} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
              </div>
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
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>DEX:{totalDex} LUK:{totalLuk} INT:{totalInt}</span>
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

      {/* Stat Breakdown Table */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--ro-red)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Formula Breakdown
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 700, color: '#64748b', fontSize: '0.7rem' }}>FACTOR</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', fontWeight: 700, color: '#64748b', fontSize: '0.7rem' }}>VALUE</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', fontWeight: 700, color: '#64748b', fontSize: '0.7rem' }}>MULTIPLIER</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', fontWeight: 700, color: '#64748b', fontSize: '0.7rem' }}>CONTRIBUTION</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: 'Prepare Potion Skill', value: `Lv ${prepLv}`, multiplier: '×3', contribution: prepLv * 3 },
                { factor: 'Potion Research Skill', value: `Lv ${researchLv}`, multiplier: '×1', contribution: researchLv },
                { factor: 'Job Level', value: jobLv, multiplier: '×0.2', contribution: jobLv * 0.2 },
                { factor: 'DEX (Total)', value: totalDex, multiplier: '×0.1', contribution: totalDex * 0.1 },
                { factor: 'LUK (Total)', value: totalLuk, multiplier: '×0.1', contribution: totalLuk * 0.1 },
                { factor: 'INT (Total)', value: totalInt, multiplier: '×0.05', contribution: totalInt * 0.05 },
                { factor: 'Potion Type Modifier', value: potionType.name.split('/')[0].trim(), multiplier: '—', contribution: potionType.rate },
              ].map((row, i) => {
                const isNegative = row.contribution < 0;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '8px 12px', color: '#374151', fontWeight: 500 }}>{row.factor}</td>
                    <td style={{ padding: '8px 12px', color: '#64748b', textAlign: 'center' }}>{row.value}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8', textAlign: 'center', fontSize: '0.7rem' }}>{row.multiplier}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, color: isNegative ? '#ef4444' : '#22c55e' }}>
                      {isNegative ? '' : '+'}{row.contribution.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
              <tr style={{ background: '#1e293b', borderTop: '2px solid #334155' }}>
                <td colSpan={3} style={{ padding: '10px 12px', color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>TOTAL SUCCESS RATE</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: '#fbbf24' }}>
                  {successRate.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.75rem', textAlign: 'center' }}>
          Formula: (PrepLv×3) + ResearchLv + (JobLv×0.2) + (DEX×0.1) + (LUK×0.1) + (INT×0.05) + PotionModifier · Capped at 0%–100%
        </p>
      </div>
    </ROWindow>
  );
}
