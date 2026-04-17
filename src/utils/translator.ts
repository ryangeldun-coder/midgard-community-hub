export const TRANSLATIONS = {
  elements: {
    "火": "Fire",
    "水": "Water",
    "風": "Wind",
    "地": "Earth",
    "聖": "Holy",
    "暗": "Dark",
    "念": "Ghost",
    "不死": "Undead",
    "毒": "Poison",
    "無": "Neutral"
  },
  races: {
    "昆蟲": "Insect",
    "動物": "Animal",
    "植物": "Plant",
    "惡魔": "Demon",
    "不死": "Undead",
    "魚貝": "Fish",
    "人形": "Demi-Human",
    "天使": "Angel",
    "龍族": "Dragon",
    "無形": "Formless"
  },
  sizes: {
    "小": "Small",
    "中": "Medium",
    "大": "Large"
  }
};

export const translateMonster = (raw) => {
  return {
    ...raw,
    name_en: raw.name.en || raw.name.zh_tw, // Fallback to ZH if no EN
    basic_info: {
      ...raw.basic_info,
      element_type: TRANSLATIONS.elements[raw.basic_info.element.type] || raw.basic_info.element.type,
      race: TRANSLATIONS.races[raw.basic_info.race] || raw.basic_info.race,
      size: TRANSLATIONS.sizes[raw.basic_info.size] || raw.basic_info.size
    }
  };
};
