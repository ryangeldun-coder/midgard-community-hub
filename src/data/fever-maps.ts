export interface FeverMap {
  id: string;
  name: string;
  mapCode: string;
  levelRange: string;
  description: string;
  monsters: { id?: number; name: string; isFever?: boolean }[];
  loot: { id?: number; name: string; type: "ore" | "weapon" | "armor" | "misc" }[];
  bgGradient: string;
}

export const FEVER_MAPS: FeverMap[] = [
  {
    id: "payon-fever",
    name: "Payon Fever",
    mapCode: "pay_fild08", // Placeholder for Payon Fever area
    levelRange: "Mid Level",
    description: "Deep within the dense forests of Payon, spiritual energy causes the local wildlife to mutate. Kill enough normal monsters to spawn dangerous Champion variants.",
    bgGradient: "linear-gradient(135deg, #14532d 0%, #166534 100%)",
    monsters: [
      { name: "Spore", isFever: false },
      { name: "Boa", isFever: false },
      { name: "Fever Spore", isFever: true },
      { name: "Payon Field Boss", isFever: true }
    ],
    loot: [
      { name: "Mithril Ore", type: "ore" },
      { name: "Fever Weapon", type: "weapon" },
      { name: "Fever Armor", type: "armor" }
    ]
  },
  {
    id: "geffen-fever",
    name: "Geffen Fever",
    mapCode: "gef_fild10", // Placeholder for Geffen Fever area
    levelRange: "Mid-High Level",
    description: "The magical contamination from Geffen Tower has seeped into the surrounding fields. Beware of the highly aggressive Champion monsters that roam here.",
    bgGradient: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)",
    monsters: [
      { name: "Orc Warrior", isFever: false },
      { name: "Orc Lady", isFever: false },
      { name: "Fever Orc", isFever: true },
      { name: "Geffen Field Boss", isFever: true }
    ],
    loot: [
      { name: "Mithril Ore", type: "ore" },
      { name: "Enriched Elunium", type: "ore" },
      { name: "Fever Weapon", type: "weapon" }
    ]
  },
  {
    id: "desert-fever",
    name: "Desert Fever",
    mapCode: "moc_fild12", // Placeholder for Desert Fever area
    levelRange: "Mid-High Level",
    description: "The scorching heat of the Sograt Desert isn't the only danger. Strange dimensional rifts cause local beasts to enter a frenzied, fever state.",
    bgGradient: "linear-gradient(135deg, #78350f 0%, #92400e 100%)",
    monsters: [
      { name: "Peco Peco", isFever: false },
      { name: "Muka", isFever: false },
      { name: "Fever Peco Peco", isFever: true },
      { name: "Desert Field Boss", isFever: true }
    ],
    loot: [
      { name: "Mithril Ore", type: "ore" },
      { name: "Enriched Oridecon", type: "ore" },
      { name: "Fever Boots", type: "armor" }
    ]
  },
  {
    id: "glast-heim-fever",
    name: "Glast Heim Fever",
    mapCode: "gl_dun01", // Placeholder for GH Fever area
    levelRange: "End Game",
    description: "The ultimate challenge. The corrupted halls of Glast Heim feature some of the deadliest Fever mechanics in Midgard. Slaying monsters here summons terrifying undead Champions.",
    bgGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    monsters: [
      { name: "Raydric", isFever: false },
      { name: "Khalitzburg", isFever: false },
      { name: "Fever Raydric", isFever: true },
      { name: "Glast Heim Boss", isFever: true }
    ],
    loot: [
      { name: "Mithril Ore", type: "ore" },
      { name: "Fever Royal Weapon", type: "weapon" },
      { name: "Fever Royal Armor", type: "armor" }
    ]
  }
];
