export interface DungeonItem {
  name: string;
  id: string;
  image: string;
  description: string;
  stats: string[];
}

export interface DungeonMode {
  difficulty: "Normal" | "Hard";
  level: string;
  hp: string;
  rewards: string[];
}

export interface Dungeon {
  id: string;
  name: string;
  location: string;
  cooldown: string;
  boss: {
    name: string;
    element: string;
    race: string;
    size: string;
    image: string;
  };
  modes: DungeonMode[];
  mechanics: string[];
  proTips: string[];
  equipment: DungeonItem[];
}

export const DUNGEONS: Dungeon[] = [
  {
    id: "culvert",
    name: "Prontera Culvert (Memorial)",
    location: "Prontera Culvert Entrance",
    cooldown: "23 hours",
    boss: {
      name: "Golden Thief Bug",
      element: "Fire 1",
      race: "Insect",
      size: "Large",
      image: "https://assets.twroz.wiki/render/monster/1086.png",
    },
    modes: [
      { difficulty: "Normal", level: "60+", hp: "850,000", rewards: ["Subjugation Box", "Jello Fragment"] },
      { difficulty: "Hard", level: "80+", hp: "1,200,000", rewards: ["Expedition Box", "Pure Jello Stone"] }
    ],
    mechanics: [
      "Clear insect eggs across rooms to prevent overwhelming swarms.",
      "Boss uses a powerful 'Magnum Break' (怒爆) when too many players are in melee range.",
      "Reflect Shield is active—ranged physical or magic damage is recommended."
    ],
    proTips: [
      "Maintain distance! Melee players should be limited to the tank to avoid triggering the boss AoE wipe.",
      "Bring a party of 7+ players to trigger the TWRoZ Memorial Reward bonus.",
      "Use 'Storm Gust' or 'Lord of Vermilion' to manage the massive influx of thief bug minions."
    ],
    equipment: [
      {
        name: "Subjugation Armor [1]",
        id: "15302",
        image: "https://assets.twroz.wiki/render/item/15302.png",
        description: "The base tier for the 乐园 (Paradise) equipment system.",
        stats: ["MaxHP +500, MaxSP +30", "MDEF +5, DEF +30", "Upgradable to Expedition Tier"]
      }
    ]
  },
  {
    id: "orc",
    name: "Orc's Memory",
    location: "Geffen Field (Orc Village)",
    cooldown: "23 hours",
    boss: {
      name: "Orc Hero",
      element: "Earth 2",
      race: "Demi-Human",
      size: "Large",
      image: "https://assets.twroz.wiki/render/monster/1087.png",
    },
    modes: [
      { difficulty: "Normal", level: "60+", hp: "1,200,000", rewards: ["Expedition Box", "Orcish Spirit"] },
      { difficulty: "Hard", level: "90+", hp: "5,000,000", rewards: ["Dispatching Box", "Hero's Token"] }
    ],
    mechanics: [
      "Escort and protect the Shaman NPC from aggressive Orc waves.",
      "Orc Hero uses 'Earthquake'—party members must stack to split the damage.",
      "Minion Orc Archers provide consistent backline pressure."
    ],
    proTips: [
      "7+ players are required for maximum loot drops per TWRoZ mechanics.",
      "Target Orc Archers immediately; they are the primary cause of Shaman death.",
      "Use Earth element resistance (Sandman Card or Earth Armor) to survive Earthquake."
    ],
    equipment: [
      {
        name: "Expedition Armor [1]",
        id: "15303",
        image: "https://assets.twroz.wiki/render/item/15303.png",
        description: "Grade III Paradise gear. Requires Subjugation base + Shimmering Crystals.",
        stats: ["MaxHP +800, MaxSP +50", "MDEF +10, DEF +45", "Set: +20 ATK with Expedition Set"]
      }
    ]
  },
  {
    id: "ant",
    name: "Ant Hell 1F (Memorial)",
    location: "Ant Hell Entrance",
    cooldown: "23 hours",
    boss: {
      name: "Variant Maya",
      element: "Earth 4",
      race: "Insect",
      size: "Large",
      image: "https://assets.twroz.wiki/render/monster/1147.png",
    },
    modes: [
      { difficulty: "Normal", level: "70+", hp: "2,500,000", rewards: ["Dispatching Box", "Queen's Shard"] },
      { difficulty: "Hard", level: "100+", hp: "10,000,000", rewards: ["Conqueror Box", "Pure Jello Stone"] }
    ],
    mechanics: [
      "Block the Geysers (間歇泉) emitting toxic steam to prevent constant HP drain.",
      "Defend drilling machines while mining for crystals.",
      "Boss uses 'Earth Drive' to strip armor and break weapons."
    ],
    proTips: [
      "Bring 'Panacea' (萬能藥水) to remove Silence and 'Full Chemical Protection' to prevent gear strip.",
      "Use Fire property weapons (200% damage) to break through Maya's high defense.",
      "Equipment repair skills are highly recommended due to high durability loss in this dungeon."
    ],
    equipment: [
      {
        name: "Dispatching Plate [1]",
        id: "15304",
        image: "https://assets.twroz.wiki/render/item/15304.png",
        description: "Grade II Paradise gear. High defense for front-line dispatch units.",
        stats: ["MaxHP +1200, MaxSP +80", "MDEF +12, DEF +60", "Physical Damage +5%"]
      }
    ]
  },
  {
    id: "izlude",
    name: "Izlude Dungeon 2F (Memorial)",
    location: "Byalan Island (Underwater)",
    cooldown: "23 hours",
    boss: {
      name: "Kraken",
      element: "Water 4",
      race: "Fish",
      size: "Large",
      image: "https://assets.twroz.wiki/render/monster/2202.png",
    },
    modes: [
      { difficulty: "Normal", level: "80+", hp: "4,800,000", rewards: ["Conqueror Box", "Sea God Shard"] },
      { difficulty: "Hard", level: "110+", hp: "15,000,000", rewards: ["Abyssal Treasure", "Kraken Tentacle"] }
    ],
    mechanics: [
      "Avoid rising bubbles to prevent the 'Drowning' status effect.",
      "Kraken periodically pulls the entire party into melee range.",
      "Requires high HIT to land attacks on Kraken's tentacles."
    ],
    proTips: [
      "Equip Wind-property weapons/arrows and Water-resistance armor (Mars Card).",
      "Assign one player to exclusively pop bubbles while the others focus the boss.",
      "High MDEF makes physical DPS the superior choice for this encounter."
    ],
    equipment: [
      {
        name: "Conqueror Robe [1]",
        id: "15305",
        image: "https://assets.twroz.wiki/render/item/15305.png",
        description: "Grade I Paradise gear. The peak of memorial dungeon crafting.",
        stats: ["MaxHP +2000, MaxSP +150", "MATK +7%", "Variable Cast Time -10%"]
      }
    ]
  },
  {
    id: "infinite",
    name: "Infinite Space",
    location: "Morroc (Dimensional Rift)",
    cooldown: "3 days",
    boss: {
      name: "Infinite Phreeoni",
      element: "Neutral 3",
      race: "Brute",
      size: "Large",
      image: "https://assets.twroz.wiki/render/monster/1159.png",
    },
    modes: [
      { difficulty: "Normal", level: "100+", hp: "12,000,000", rewards: ["Rift Armor", "Broken Magic Stones"] },
      { difficulty: "Hard", level: "120+", hp: "45,000,000", rewards: ["Infinite Weapon Box", "Pure Rift Crystal"] }
    ],
    mechanics: [
      "Timed climb through 50 floors of varying monster spawns.",
      "Boss Phreeoni shifts elements every 25% HP threshold.",
      "Geffen Tournament style scaling is applied to all monsters."
    ],
    proTips: [
      "Elemental arrows and converters are a must to manage Phreeoni's element shifting.",
      "Bring 'Reflect Damage Cap' equipment to survive high-intensity reflect spikes.",
      "Focus on HIT stats; monsters gain significant FLEE in the final 10 floors."
    ],
    equipment: [
      {
        name: "Rift Ancient Armor [1]",
        id: "15306",
        image: "https://assets.twroz.wiki/render/item/15306.png",
        description: "Exclusive Infinite Space gear. High HP scaling.",
        stats: ["MaxHP +1500, MaxSP -100", "Uninterruptible Cast (with Accessory)", "Healing +10%"]
      }
    ]
  }
];
