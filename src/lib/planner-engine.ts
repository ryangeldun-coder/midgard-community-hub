/**
 * Ragnarok Zero Build Planner Engine
 * Handles stat formulas, point costs, and bonus parsing.
 */

export interface BaseStats {
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
}

export interface DerivedStats {
  atk: number;
  matkMin: number;
  matkMax: number;
  hit: number;
  flee: number;
  crit: number;
  def: number;
  mdef: number;
  hp: number;
  sp: number;
  aspd: number;
  castTime: number; // Percentage reduction
}

/** Calculate the total points required to reach a specific stat value from 1 */
export function calculateTotalPointsForStat(target: number): number {
  let total = 0;
  for (let s = 2; s <= target; s++) {
    total += Math.floor((s - 2) / 10) + 2;
  }
  return total;
}

/** Calculate the cost to increase a stat by 1 */
export function getStatIncreaseCost(current: number): number {
  if (current >= 99) return 0;
  return Math.floor((current - 1) / 10) + 2;
}

/** 
 * Simple Regex Parser for English item descriptions 
 * Returns a map of bonus keys to values
 */
export function parseItemBonuses(description: string): Record<string, number> {
  const bonuses: Record<string, number> = {};
  const stats = ["STR", "AGI", "VIT", "INT", "DEX", "LUK"];
  const derived = ["ATK", "MATK", "DEF", "MDEF", "HIT", "FLEE", "CRIT"];

  stats.forEach(s => {
    const regex = new RegExp(`\\b${s}\\s*[\\+:]\\s*(\\d+)`, "i");
    const match = description.match(regex);
    if (match) bonuses[s] = parseInt(match[1]);
  });

  derived.forEach(s => {
    const regex = new RegExp(`\\b${s}\\s*[\\+:]\\s*(\\d+)`, "i");
    const match = description.match(regex);
    if (match) bonuses[s] = parseInt(match[1]);
  });

  // Handle ASPD %
  const aspdMatch = description.match(/ASPD\s*[+:]\s*(\d+)%/i);
  if (aspdMatch) bonuses["ASPD_P"] = parseInt(aspdMatch[1]);

  return bonuses;
}

/**
 * Calculate derived stats based on base stats and total bonuses.
 * Baseline formulas for Ragnarok Zero (Renewal foundation).
 */
export function calculateDerivedStats(
  level: number,
  base: BaseStats,
  bonuses: Record<string, number>,
  jobClass = "Novice"
): DerivedStats {
  const total = {
    str: base.str + (bonuses.STR || 0),
    agi: base.agi + (bonuses.AGI || 0),
    vit: base.vit + (bonuses.VIT || 0),
    int: base.int + (bonuses.INT || 0),
    dex: base.dex + (bonuses.DEX || 0),
    luk: base.luk + (bonuses.LUK || 0),
  };

  // Status ATK = (Level / 4) + STR + (LUK / 3) + (DEX / 5)
  const statusAtk = Math.floor(level / 4) + total.str + Math.floor(total.luk / 3) + Math.floor(total.dex / 5);
  
  // Status MATK = (Level / 4) + INT + (INT / 2) + (DEX / 5) + (LUK / 3)
  const statusMatk = Math.floor(level / 4) + total.int + Math.floor(total.int / 2) + Math.floor(total.dex / 5) + Math.floor(total.luk / 3);

  return {
    atk: statusAtk + (bonuses.ATK || 0),
    matkMin: statusMatk + (bonuses.MATK || 0),
    matkMax: statusMatk + (bonuses.MATK || 0), // Simplified range for now
    hit: 175 + level + total.dex + Math.floor(total.luk / 3),
    flee: 100 + level + total.agi + Math.floor(total.luk / 5),
    crit: 1 + Math.floor(total.luk / 3),
    def: Math.floor(total.vit / 2) + (bonuses.DEF || 0), // Status DEF
    mdef: total.int + Math.floor(total.vit / 4) + (bonuses.MDEF || 0), // Status MDEF
    hp: 100 + (level * 50) + (total.vit * 10), // VERY basic HP formula
    sp: 20 + (level * 5) + (total.int * 2),   // VERY basic SP formula
    aspd: 150 + (total.agi * 0.5) + (total.dex * 0.1), // Placeholder for complex ASPD
    castTime: Math.min(100, ((total.dex * 2 + total.int) / 530) * 100), // Variable Cast Reduction %
  };
}
