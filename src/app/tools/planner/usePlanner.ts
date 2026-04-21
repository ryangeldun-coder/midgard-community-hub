"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  BaseStats, 
  DerivedStats, 
  calculateDerivedStats, 
  getStatIncreaseCost, 
  calculateTotalPointsForStat,
  parseItemBonuses
} from "@/lib/planner-engine";
import { Item } from "@/lib/database";

export interface PlannerState {
  level: number;
  job: string;
  stats: BaseStats;
  equipment: Record<string, Item | null>;
}

const DEFAULT_STATS: BaseStats = { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 };

export function usePlanner() {
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState<BaseStats>(DEFAULT_STATS);
  const [equipment, setEquipment] = useState<Record<string, Item | null>>({
    headTop: null,
    headMid: null,
    headLow: null,
    armor: null,
    weapon: null,
    shield: null,
    garment: null,
    shoes: null,
    accessoryL: null,
    accessoryR: null,
  });

  // Calculate total stat points available
  // RO Zero: 100 base + sum(Level * growth)?
  // Actually, standard RO: Level 99 has ~1200 points.
  const availablePoints = useMemo(() => {
    let total = 0;
    for (let l = 2; l <= level; l++) {
      total += Math.floor(l / 5) + 3;
    }
    return total + 48; // Starting points
  }, [level]);

  const spentPoints = useMemo(() => {
    return Object.values(stats).reduce((acc, val) => acc + calculateTotalPointsForStat(val), 0);
  }, [stats]);

  const remainingPoints = availablePoints - spentPoints;

  // Aggregate bonuses from all equipment
  const totalBonuses = useMemo(() => {
    const combined: Record<string, number> = {};
    Object.values(equipment).forEach(item => {
      if (!item) return;
      
      // Basic attributes
      if (item.attack) combined.ATK = (combined.ATK || 0) + item.attack;
      if (item.defense) combined.DEF = (combined.DEF || 0) + item.defense;

      // Parsed bonuses
      const parsed = parseItemBonuses(item.description);
      Object.entries(parsed).forEach(([key, val]) => {
        combined[key] = (combined[key] || 0) + val;
      });
    });
    return combined;
  }, [equipment]);

  const derivedStats = useMemo(() => {
    return calculateDerivedStats(level, stats, totalBonuses);
  }, [level, stats, totalBonuses]);

  const updateStat = (name: keyof BaseStats, delta: number) => {
    const current = stats[name];
    if (delta > 0) {
      if (current >= 99) return;
      const cost = getStatIncreaseCost(current);
      if (remainingPoints >= cost) {
        setStats(prev => ({ ...prev, [name]: prev[name] + 1 }));
      }
    } else {
      if (current <= 1) return;
      setStats(prev => ({ ...prev, [name]: prev[name] - 1 }));
    }
  };

  const equipItem = (slot: string, item: Item | null) => {
    setEquipment(prev => ({ ...prev, [slot]: item }));
  };

  // URL Sync
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        if (decoded.l) setLevel(decoded.l);
        if (decoded.s) setStats(decoded.s);
        // Note: Equipment needs a way to fetch item by ID if we only store ID in hash
        // For now, we'll just store the full state or IDs and let the component handle it.
      } catch (e) {
        console.error("Failed to parse share link", e);
      }
    }
  }, []);

  const generateShareLink = () => {
    const state = {
      l: level,
      s: stats,
      e: Object.fromEntries(Object.entries(equipment).map(([k, v]) => [k, v?.id]))
    };
    const hash = btoa(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url);
    return url;
  };

  return {
    level, setLevel,
    stats, updateStat,
    equipment, equipItem,
    derivedStats,
    remainingPoints,
    totalBonuses,
    spentPoints,
    availablePoints,
    generateShareLink
  };
}
