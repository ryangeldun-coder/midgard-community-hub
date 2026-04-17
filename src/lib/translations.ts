// Translation mappings from Traditional Chinese (TWRoZ) to English

export const ELEMENT_MAP: Record<string, string> = {
  "火": "Fire",
  "水": "Water",
  "風": "Wind",
  "地": "Earth",
  "聖": "Holy",
  "暗": "Dark",
  "念": "Ghost",
  "不死": "Undead",
  "毒": "Poison",
  "無": "Neutral",
};

export const RACE_MAP: Record<string, string> = {
  "昆蟲": "Insect",
  "動物": "Animal",
  "植物": "Plant",
  "惡魔": "Demon",
  "不死": "Undead",
  "魚貝": "Fish",
  "人形": "Demi-Human",
  "天使": "Angel",
  "龍族": "Dragon",
  "無形": "Formless",
};

export const SIZE_MAP: Record<string, string> = {
  "小": "Small",
  "中": "Medium",
  "大": "Large",
};

export const SPECIAL_STATUS_MAP: Record<string, string> = {
  "偵測隱匿": "Detects Hidden",
  "可物理攻擊": "Physically Attackable",
  "可移動": "Can Move",
  "會撿道具": "Loots Items",
  "不可攻擊": "Cannot Attack",
  "Boss": "Boss",
  "Mini": "Mini",
  "MVP": "MVP",
};

export const ITEM_TYPE_MAP: Record<string, string> = {
  "武器": "Weapon",
  "鎧甲": "Armor",
  "盾牌": "Shield",
  "頭盔": "Headgear",
  "配件": "Accessory",
  "消耗品": "Consumable",
  "材料": "Material",
  "卡片": "Card",
  "箭矢": "Ammo",
  "服飾": "Costume",
  "道具": "Item",
};

export const EQUIP_SLOT_MAP: Record<string, string> = {
  "武器": "Weapon",
  "鎧甲": "Armor",
  "盾牌": "Shield",
  "頭上": "Upper Head",
  "頭中": "Mid Head",
  "頭下": "Lower Head",
  "鞋子": "Shoes",
  "披風": "Garment",
  "配件左": "Accessory Left",
  "配件右": "Accessory Right",
  "捕捉": "Capture",
  "-": "-",
  "": "",
  "短劍": "Dagger",
  "單手劍": "One-Handed Sword",
  "雙手劍": "Two-Handed Sword",
  "長矛": "Spear",
  "斧頭": "Axe",
  "法杖": "Staff",
  "弓": "Bow",
  "棍棒": "Club",
  "短弓": "Short Bow",
  "樂器": "Musical Instrument",
  "鞭子": "Whip",
  "書": "Book",
  "爪": "Katar",
  "手砲": "Hand Cannon",
  "影子武器": "Shadow Weapon",
  "影子盔甲": "Shadow Armor",
  "影子盾牌": "Shadow Shield",
  "影子鞋子": "Shadow Shoes",
  "影子披風": "Shadow Garment",
  "影子配件左": "Shadow Accessory Left",
  "影子配件右": "Shadow Accessory Right",
};

export function translateElement(zhElement: string): string {
  return ELEMENT_MAP[zhElement] ?? zhElement;
}

export function translateRace(zhRace: string): string {
  return RACE_MAP[zhRace] ?? zhRace;
}

export function translateSize(zhSize: string): string {
  return SIZE_MAP[zhSize] ?? zhSize;
}

export function translateSpecialStatus(statuses: string[]): string[] {
  return statuses.map((s) => SPECIAL_STATUS_MAP[s] ?? s);
}

export function translateEquipSlot(slot: string): string {
  return EQUIP_SLOT_MAP[slot] ?? slot;
}

// Major zone/location translations
export const ZONE_MAP: Record<string, string> = {
  // Cities
  "普隆德拉":       "Prontera",
  "吉芬":          "Geffen",
  "斐揚":          "Payon",
  "艾爾":          "Alberta",
  "摩洛哥":         "Morocc",
  "艾爾德拉":       "Aldebaran",
  "朱諾":          "Juno",
  "盧恩":          "Lunatica",
  "路卡":          "Louyang",
  "夢幻地":         "Dreamland",
  // Fields
  "普隆德拉區域":    "Prontera Field",
  "吉芬區域":       "Geffen Field",
  "斐揚森林":       "Payon Forest",
  "蘇克拉特沙漠":   "Sograt Desert",
  "妙勒尼山脈":     "Mt. Mjolnir",
  "妙勒尼山脈南邊山麓": "Mt. Mjolnir (South)",
  "北斐揚森林":     "North Payon Forest",
  "南斐揚森林":     "South Payon Forest",
  "艾爾達巴達":     "Aldebaran",
  "高原地帶":       "Highland",
  // Dungeons
  "迷宮森林1樓":    "Labyrinth Forest F1",
  "迷宮森林2樓":    "Labyrinth Forest F2",
  "迷宮森林3樓":    "Labyrinth Forest F3",
  "迷宮森林":       "Labyrinth Forest",
  "玩具工廠倉庫":   "Toy Factory",
  "玩具工廠倉庫1樓": "Toy Factory F1",
  "玩具工廠倉庫2樓": "Toy Factory F2",
  "地下下水道":     "Sewer",
  "地下下水道1樓":  "Sewer F1",
  "地下下水道2樓":  "Sewer F2",
  "地下下水道3樓":  "Sewer F3",
  "斐揚地下城1樓":  "Payon Dungeon F1",
  "斐揚地下城2樓":  "Payon Dungeon F2",
  "斐揚地下城3樓":  "Payon Dungeon F3",
  "斐揚地下城4樓":  "Payon Dungeon F4",
  "斐揚地下城5樓":  "Payon Dungeon F5",
  "吉芬地下城1樓":  "Geffen Dungeon F1",
  "吉芬地下城2樓":  "Geffen Dungeon F2",
  "吉芬地下城3樓":  "Geffen Dungeon F3",
  "魔法實驗室1樓":  "Mage Lab F1",
  "魔法實驗室2樓":  "Mage Lab F2",
  "魔法實驗室3樓":  "Mage Lab F3",
  "普隆德拉地下城1樓": "Prontera Dungeon F1",
  "普隆德拉地下城2樓": "Prontera Dungeon F2",
  "普隆德拉地下城3樓": "Prontera Dungeon F3",
  "普隆德拉地下城4樓": "Prontera Dungeon F4",
  "蚊蟲地穴1樓":   "Ant Hell F1",
  "蚊蟲地穴2樓":   "Ant Hell F2",
  "沙漠地下城1樓": "Desert Cave F1",
  "沙漠地下城2樓": "Desert Cave F2",
  "地下大墓地":    "Underground Crypt",
  "古代城堡": "Ancient Castle",
  // MVP / Special
  "MVP":          "MVP",
  "Mini":         "Mini",
  "特殊地圖":      "Special Map",
};

export function translateZone(zhZone: string): string {
  if (!zhZone) return "";
  // Try exact match first
  if (ZONE_MAP[zhZone]) return ZONE_MAP[zhZone];
  // Try partial match on any key
  for (const [zh, en] of Object.entries(ZONE_MAP)) {
    if (zhZone.includes(zh)) return zhZone.replace(zh, en);
  }
  return zhZone; // Return as-is if no match found
}

// Common item name translations (used for drop display in monster cards)
export const ITEM_NAME_MAP: Record<string, string> = {
  // Potions
  "紅色藥水": "Red Potion", "藍色藥水": "Blue Potion", "白色藥水": "White Potion",
  "黃色藥水": "Yellow Potion", "赤色藥水": "Scarlet Potion", "綠色藥水": "Green Potion",
  // Herbs
  "紅色藥草": "Red Herb", "黃色藥草": "Yellow Herb", "白色藥草": "White Herb",
  "藍色藥草": "Blue Herb", "綠色藥草": "Green Herb", "黑色藥草": "Black Herb",
  // Common Materials
  "傑勒比結晶": "Jellopy", "粘稠液體": "Sticky Mucus", "蜂針": "Bee Sting",
  "蒼蠅翅膀": "Fly Wing", "惡靈翅膀": "Butterfly Wing", "蠍子尾巴": "Scorpion Tail",
  "蜘蛛蜘蛛網": "Spider Web", "蜘蛛腿": "Spider Leg", "狗牙": "Dog Tooth",
  "兔子尾巴": "Rabbit Tail", "尾巴": "Tail", "羽毛": "Feather",
  "骨頭": "Bone", "獸牙": "Beast Tooth", "獸毛": "Beast Fur",
  "獸角": "Beast Horn", "爪子": "Claw", "尖爪": "Sharp Claw",
  "細長爪子": "Slender Claw", "硬殼": "Hard Shell", "堅硬外皮": "Tough Skin",
  "石頭": "Stone", "石塊": "Pebble", "木棍": "Wooden Stick",
  // Ores & Crafting
  "鐵礦": "Iron Ore", "鋁原石": "Aluminium Ore", "鐵": "Iron",
  "鋼": "Steel", "精鍊鐵": "Refined Iron",
  "奧利鐵礦": "Oridecon Ore", "奧利鐵": "Oridecon", "伊倫礦石": "Elunium Ore",
  "伊倫": "Elunium", "阿達曼礦石": "Adamantite Ore",
  "火靈礦石": "Red Gemstone", "水靈礦石": "Blue Gemstone",
  "風靈礦石": "Green Gemstone", "地靈礦石": "Yellow Gemstone",
  // Cards
  "波利卡片": "Poring Card", "蠍子卡片": "Scorpion Card", "蜂兵卡片": "Hornet Card",
  // Food & Misc
  "蘋果": "Apple", "青澀蘋果": "Tart Apple", "青蘋果": "Green Apple",
  "蜂蜜": "Honey", "短劍": "Dagger", "鏽鐵": "Rusty Iron",
};

export function translateItemName(zhName: string): string {
  if (!zhName) return "";
  // Exact match
  if (ITEM_NAME_MAP[zhName]) return ITEM_NAME_MAP[zhName];
  // Card pattern: X卡片 → X Card
  if (zhName.endsWith("卡片")) {
    const base = zhName.replace("卡片", "");
    const baseEN = ITEM_NAME_MAP[base] || base;
    return `${baseEN} Card`;
  }
  // Costume pattern: (服飾)...(歸屬) → [Costume] ...
  if (zhName.startsWith("(服飾)")) {
    return "[Costume] " + zhName.replace("(服飾)", "").replace("(歸屬)", "").trim();
  }
  return zhName;
}

export function translateItemType(type: string): string {
  return ITEM_TYPE_MAP[type] ?? type;
}
