export interface Drop {
  name: string;
  rate?: string;
  isFeverGear?: boolean;
}

export interface FeverMonster {
  id?: number;
  name: string;
  type: "Normal" | "Champion" | "Boss";
  level?: number;
  hp?: number;
  element?: string;
  race?: string;
  size?: "Small" | "Medium" | "Large";
  drops: Drop[];
}

export interface FeverMap {
  id: string;
  name: string;
  mapCode: string;
  levelRange: string;
  description: string;
  bgGradient: string;
  monsters: FeverMonster[];
}

export const FEVER_MAPS: FeverMap[] = [
  {
    id: "einbech-mines",
    name: "Einbech Mines Fever",
    mapCode: "ein_dun01",
    levelRange: "Lv. 70 - 85",
    description: "The toxic gases of Einbech Mines have corrupted the local wildlife. Defeating normal monsters here will eventually summon lethal Champion variants. If enough Champions fall, the ultimate Boss will spawn.",
    bgGradient: "linear-gradient(135deg, #422006 0%, #78350f 100%)",
    monsters: [
      {
        name: "Pitman",
        type: "Normal",
        level: 72,
        element: "Earth 1",
        race: "Formless",
        size: "Medium",
        drops: [{ name: "Coal" }, { name: "Steel" }]
      },
      {
        name: "Toxic Pitman",
        type: "Champion",
        level: 75,
        hp: 120000,
        element: "Poison 2",
        race: "Formless",
        size: "Medium",
        drops: [
          { name: "Mithril Ore", rate: "1.00%" },
          { name: "Einbech Miner Helmet [1]", rate: "0.10%", isFeverGear: true }
        ]
      },
      {
        name: "RSX-0806 (Fever)",
        type: "Boss",
        level: 80,
        hp: 3500000,
        element: "Neutral 3",
        race: "Formless",
        size: "Large",
        drops: [
          { name: "Enriched Elunium", rate: "15.00%" },
          { name: "Enriched Oridecon", rate: "15.00%" },
          { name: "RSX Armor [1]", rate: "5.00%", isFeverGear: true }
        ]
      }
    ]
  },
  {
    id: "abyss-lake",
    name: "Abyss Lake Fever",
    mapCode: "abyss_03",
    levelRange: "Lv. 90 - 99",
    description: "The deepest level of the Dragon's lair. Dragons here possess incredible stats. Coordinate with a party to trigger the Champion dragons and survive the final encounter.",
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    monsters: [
      {
        name: "Acidus",
        type: "Normal",
        level: 95,
        element: "Holy 2",
        race: "Dragon",
        size: "Medium",
        drops: [{ name: "Dragon Scale" }, { name: "Elunium" }]
      },
      {
        name: "Frenzied Acidus",
        type: "Champion",
        level: 98,
        hp: 250000,
        element: "Holy 3",
        race: "Dragon",
        size: "Large",
        drops: [
          { name: "Mithril Ore", rate: "2.50%" },
          { name: "Abyssal Lance [1]", rate: "0.05%", isFeverGear: true }
        ]
      },
      {
        name: "Detale (Fever)",
        type: "Boss",
        level: 99,
        hp: 8000000,
        element: "Shadow 3",
        race: "Dragon",
        size: "Large",
        drops: [
          { name: "Enriched Elunium", rate: "25.00%" },
          { name: "Abyssal Ring [1]", rate: "2.00%", isFeverGear: true },
          { name: "Mithril Ore", rate: "50.00%" }
        ]
      }
    ]
  }
];
