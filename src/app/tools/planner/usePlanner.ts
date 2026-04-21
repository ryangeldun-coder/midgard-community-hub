"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  BaseStats, 
  DerivedStats, 
  Enchantment,
  calculateDerivedStats, 
  getStatIncreaseCost, 
  calculateTotalPointsForStat,
  parseItemBonuses,
  parseEnchantmentValue
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
  const [jobId, setJobId] = useState("Novice");
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
  const [weaponEnchants, setWeaponEnchants] = useState<(Enchantment | null)[]>([null, null]);

  // Calculate total stat points available
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

  // Aggregate bonuses from all equipment + enchants
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

    // Add weapon enchants
    weaponEnchants.forEach(e => {
      if (!e) return;
      const val = parseEnchantmentValue(e.value);
      // Map affix names to internal keys
      const keyMap: Record<string, string> = {
        "ATK": "ATK", "MATK": "MATK", "HIT": "HIT", "FLEE": "FLEE", "CRI": "CRIT",
        "STR": "STR", "AGI": "AGI", "VIT": "VIT", "INT": "INT", "DEX": "DEX", "LUK": "LUK",
        "ASPD increase (%)": "ASPD_P", "ASPD": "ASPD_FLAT"
      };
      const key = keyMap[e.name] || e.name;
      combined[key] = (combined[key] || 0) + val;
    });

    return combined;
  }, [equipment, weaponEnchants]);

  const derivedStats = useMemo(() => {
    // Extract weapon ClassNum
    const weapon = equipment.weapon as any;
    const weaponClassNum = weapon?.ClassNum || 0;
    
    return calculateDerivedStats(level, stats, totalBonuses, jobId, weaponClassNum, weaponEnchants);
  }, [level, stats, totalBonuses, jobId, equipment.weapon, weaponEnchants]);

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
    // Reset enchants if weapon is removed
    if (slot === "weapon" && !item) {
      setWeaponEnchants([null, null]);
    }
  };

  const setEnchant = (index: number, enchant: Enchantment | null) => {
    setWeaponEnchants(prev => {
      const next = [...prev];
      next[index] = enchant;
      return next;
    });
  };

  // URL Sync
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        if (decoded.l) setLevel(decoded.l);
        if (decoded.j) setJobId(decoded.j);
        if (decoded.s) setStats(decoded.s);
        if (decoded.we) setWeaponEnchants(decoded.we);
      } catch (e) {
        console.error("Failed to parse share link", e);
      }
    }
  }, []);

  const generateShareLink = () => {
    const state = {
      l: level,
      j: jobId,
      s: stats,
      we: weaponEnchants,
      e: Object.fromEntries(Object.entries(equipment).map(([k, v]) => [k, v?.id]))
    };
    const hash = btoa(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url);
    return url;
  };

  return {
    level, setLevel,
    jobId, setJobId,
    stats, updateStat,
    equipment, equipItem,
    weaponEnchants, setEnchant,
    derivedStats,
    remainingPoints,
    totalBonuses,
    spentPoints,
    availablePoints,
    generateShareLink
  };
}
