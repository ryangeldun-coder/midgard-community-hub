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

export interface Enchantment {
  type: string;
  name: string;
  value: string;
  tier: string;
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
  if (!description) return bonuses;

  // Clean description: replace newlines with spaces and remove complex tags
  const clean = description.replace(/\\n/g, " ").replace(/<[^>]*>/g, "");

  const statsMap: Record<string, string[]> = {
    STR: ["STR", "Strength"],
    AGI: ["AGI", "Agility"],
    VIT: ["VIT", "Vitality"],
    INT: ["INT", "Intelligence"],
    DEX: ["DEX", "Dexterity"],
    LUK: ["LUK", "Luck"],
    ATK: ["ATK", "Attack"],
    MATK: ["MATK", "Magic Attack"],
    DEF: ["DEF", "Defense"],
    MDEF: ["MDEF", "Magic Defense"],
    MAXHP: ["Max HP", "Maximum HP", "HP"],
    MAXSP: ["Max SP", "Maximum SP", "SP"],
    HIT: ["HIT"],
    FLEE: ["FLEE"],
    CRIT: ["CRIT", "CRI"],
    ASPD_P: ["ASPD increase (%)", "ASPD (%)"],
  };

  Object.entries(statsMap).forEach(([key, aliases]) => {
    aliases.forEach(alias => {
      // Look for "Alias +X" or "Alias: X" or "Alias X"
      // Using a regex that handles boundaries more flexibly than \b
      // which can fail on certain special characters.
      const regex = new RegExp(`(?:^|[^a-zA-Z])(${alias})\\s*[\\+:\\s]\\s*(\\d+)(?!%)`, "gi");
      let match;
      while ((match = regex.exec(clean)) !== null) {
        const val = parseInt(match[2]);
        if (!isNaN(val)) {
          bonuses[key] = (bonuses[key] || 0) + val;
        }
      }
    });
  });

  // Special handling for percentages (e.g. ASPD + 5%)
  const aspdPctMatch = clean.match(/ASPD\s*[+:\s]\s*(\d+)%/i);
  if (aspdPctMatch) bonuses.ASPD_P = (bonuses.ASPD_P || 0) + parseInt(aspdPctMatch[1]);

  return bonuses;
}

export const JOBS: Record<string, { name: string; hpFactor: number; spFactor: number; baseAspd: Record<number, number> }> = {
  "Novice": {
    name: "Novice",
    hpFactor: 0.7,
    spFactor: 0.5,
    baseAspd: { 0: 150, 1: 156, 2: 150 } // Empty, Dagger, 1H Sword
  },
  "Swordman": {
    name: "Swordman",
    hpFactor: 1.5,
    spFactor: 0.7,
    baseAspd: { 0: 156, 1: 156, 2: 156, 3: 146, 4: 151, 5: 141, 6: 151, 7: 141 } 
  },
  "Mage": {
    name: "Mage",
    hpFactor: 0.7,
    spFactor: 1.8,
    baseAspd: { 0: 151, 1: 151, 8: 151, 10: 151 }
  },
  "Archer": {
    name: "Archer",
    hpFactor: 0.9,
    spFactor: 1.0,
    baseAspd: { 0: 156, 1: 156, 11: 156 }
  },
  "Acolyte": {
    name: "Acolyte",
    hpFactor: 1.1,
    spFactor: 1.4,
    baseAspd: { 0: 151, 8: 156, 10: 151 }
  },
  "Merchant": {
    name: "Merchant",
    hpFactor: 1.2,
    spFactor: 0.8,
    baseAspd: { 0: 156, 1: 156, 2: 156, 6: 151, 7: 141 }
  },
  "Thief": {
    name: "Thief",
    hpFactor: 1.0,
    spFactor: 0.7,
    baseAspd: { 0: 160, 1: 160, 2: 155, 11: 155 }
  }
};

/** Parse an enchantment value like "5-30" or "5%" or "1" into a number */
export function parseEnchantmentValue(val: string): number {
  if (!val) return 0;
  // If it's a range like "5-30", take the max (30)
  const rangeMatch = val.match(/(\d+)-(\d+)/);
  if (rangeMatch) return parseInt(rangeMatch[2]);
  
  // If it's a percentage like "5%", take the number (5)
  const pctMatch = val.match(/(\d+)%/);
  if (pctMatch) return parseInt(pctMatch[1]);

  // Otherwise just try to parse it
  return parseInt(val) || 0;
}

/**
 * Calculate derived stats based on base stats and total bonuses.
 * Baseline formulas for Ragnarok Zero (Renewal foundation).
 */
export function calculateDerivedStats(
  level: number,
  base: BaseStats,
  bonuses: Record<string, number>,
  jobId = "Novice",
  weaponClassNum = 0, // 0 = Bare handed
  enchants: (Enchantment | null)[] = []
): DerivedStats {
  const job = JOBS[jobId] || JOBS.Novice;

  // Add enchants to bonuses
  const finalBonuses = { ...bonuses };
  enchants.forEach(e => {
    if (!e) return;
    const val = parseEnchantmentValue(e.value);
    
    // Map enchantment names to bonus keys
    if (e.name === "ATK") finalBonuses.ATK = (finalBonuses.ATK || 0) + val;
    if (e.name === "MATK") finalBonuses.MATK = (finalBonuses.MATK || 0) + val;
    if (e.name === "HIT") finalBonuses.HIT = (finalBonuses.HIT || 0) + val;
    if (e.name === "FLEE") finalBonuses.FLEE = (finalBonuses.FLEE || 0) + val;
    if (e.name === "CRI") finalBonuses.CRIT = (finalBonuses.CRIT || 0) + val;
    if (e.name === "ASPD increase (%)") finalBonuses.ASPD_P = (finalBonuses.ASPD_P || 0) + val;
    if (e.name === "ASPD") {
      // Flat ASPD is tricky, we'll just add it to final result for now
      finalBonuses.ASPD_FLAT = (finalBonuses.ASPD_FLAT || 0) + val;
    }
  });

  const total = {
    str: base.str + (finalBonuses.STR || 0),
    agi: base.agi + (finalBonuses.AGI || 0),
    vit: base.vit + (finalBonuses.VIT || 0),
    int: base.int + (finalBonuses.INT || 0),
    dex: base.dex + (finalBonuses.DEX || 0),
    luk: base.luk + (finalBonuses.LUK || 0),
  };

  const isRanged = [11, 12, 13, 18, 19, 20, 21, 22].includes(weaponClassNum);

  // Status ATK calculation
  // Melee: (Level / 4) + STR + (LUK / 3) + (DEX / 5)
  // Ranged: (Level / 4) + DEX + (LUK / 3) + (STR / 5)
  let statusAtk = 0;
  if (isRanged) {
    statusAtk = Math.floor(level / 4) + total.dex + Math.floor(total.luk / 3) + Math.floor(total.str / 5);
  } else {
    statusAtk = Math.floor(level / 4) + total.str + Math.floor(total.luk / 3) + Math.floor(total.dex / 5);
  }
  
  // Status MATK = (Level / 4) + INT + (INT / 2) + (DEX / 5) + (LUK / 3)
  const statusMatk = Math.floor(level / 4) + total.int + Math.floor(total.int / 2) + Math.floor(total.dex / 5) + Math.floor(total.luk / 3);

  // ASPD Calculation (Simplified Renewal)
  const baseAspd = job.baseAspd[weaponClassNum] || job.baseAspd[0] || 150;
  const statAspd = (Math.sqrt(total.agi * 10 + total.dex * 0.1) * 1.045);
  const equipAspd = finalBonuses.ASPD_P || 0;
  
  const finalAspd = baseAspd + (200 - baseAspd) * (statAspd / 250);
  const withEquip = finalAspd + (200 - finalAspd) * (equipAspd / 100);
  const totalAspd = withEquip + (finalBonuses.ASPD_FLAT || 0);

  return {
    atk: statusAtk + (finalBonuses.ATK || 0),
    matkMin: statusMatk + (finalBonuses.MATK || 0),
    matkMax: statusMatk + (finalBonuses.MATK || 0),
    hit: 175 + level + total.dex + Math.floor(total.luk / 3) + (finalBonuses.HIT || 0),
    flee: 100 + level + total.agi + Math.floor(total.luk / 5) + (finalBonuses.FLEE || 0),
    crit: 1 + Math.floor(total.luk / 3) + (finalBonuses.CRIT || 0),
    def: Math.floor(total.vit / 2) + (finalBonuses.DEF || 0),
    mdef: total.int + Math.floor(total.vit / 4) + (finalBonuses.MDEF || 0),
    hp: Math.floor((35 + level * 5 * job.hpFactor) * (1 + total.vit * 0.01)),
    sp: Math.floor((10 + level * 2 * job.spFactor) * (1 + total.int * 0.01)),
    aspd: Math.min(190, totalAspd),
    castTime: Math.min(100, ((total.dex * 2 + total.int) / 530) * 100),
  };
}
