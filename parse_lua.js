const fs = require('fs');
const path = require('path');

const inputPath = '/Users/tomaszksel/Desktop/RagnarokZero/System/iteminfo_new.lua.bak';
const outputPath = path.join(__dirname, 'src', 'data', 'items_db.json');

const luaContent = fs.readFileSync(inputPath, 'utf8');

// Split file content into chunks based on top-level item declarations: e.g. [1234] =
const chunks = luaContent.split(/\n\s*\[(\d+)\]\s*=\s*\{/);
const itemsDb = {};
let count = 0;

// The first chunk is the table assignment (e.g., tbl = {)
for (let i = 1; i < chunks.length; i += 2) {
  const itemId = chunks[i];
  const blockData = chunks[i + 1];
  if (!blockData) continue;

  // Extract name
  const nameMatch = blockData.match(/identifiedDisplayName\s*=\s*\[=\[(.*?)\]=\]/);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown Item';

  // Extract slots
  const slotMatch = blockData.match(/slotCount\s*=\s*(\d+)/);
  const slots = slotMatch ? parseInt(slotMatch[1], 10) : 0;

  // Extract ClassNum
  const classMatch = blockData.match(/ClassNum\s*=\s*(\d+)/);
  const classNum = classMatch ? parseInt(classMatch[1], 10) : 0;

  // Extract costume
  const costumeMatch = blockData.match(/costume\s*=\s*(\w+)/);
  const costume = costumeMatch ? costumeMatch[1] === 'true' : false;

  // Extract identified description block
  const descBlockMatch = blockData.match(/identifiedDescriptionName\s*=\s*\{([\s\S]*?)\}\s*,?\s*(?:slotCount|ClassNum|costume|EffectID|\})/);
  let description = "";
  let rawCategory = "";

  if (descBlockMatch) {
    const descBlock = descBlockMatch[1];
    const descLines = [];
    const lineRegex = /\[=\[(.*?)\]=\]/g;
    let lineMatch;
    
    while ((lineMatch = lineRegex.exec(descBlock)) !== null) {
      let cleanLine = lineMatch[1];
      cleanLine = cleanLine.replace(/\^[0-9a-fA-F]{6}/g, '');
      descLines.push(cleanLine);

      if (cleanLine.includes('系列 :')) {
        const catMatch = cleanLine.match(/系列 :\s*([^\s]+)/);
        if (catMatch) rawCategory = catMatch[1];
      }
    }
    description = descLines.join('\n').trim();
  }

  // SMART CATEGORIZATION to match frontend GROUP_PREFIXES
  let category = "材料"; // Default fallback
  
  if (costume || description.includes("服飾裝備") || name.includes("(服飾)")) {
    category = "服飾";
  } else if (name.includes("卡片")) {
    category = "卡片";
  } else if (rawCategory.includes("箭矢") || rawCategory.includes("彈藥")) {
    category = "箭矢";
  } else if (
    rawCategory.includes("武器") || 
    rawCategory.includes("短劍") || 
    rawCategory.includes("單手劍") || 
    rawCategory.includes("雙手劍") || 
    rawCategory.includes("弓") || 
    rawCategory.includes("法杖") || 
    rawCategory.includes("長矛") || 
    rawCategory.includes("斧") || 
    rawCategory.includes("棍棒") || 
    rawCategory.includes("爪") || 
    rawCategory.includes("鞭") || 
    rawCategory.includes("書") || 
    rawCategory.includes("樂器")
  ) {
    category = "武器";
  } else if (
    rawCategory.includes("防具") || 
    rawCategory.includes("鎧甲") || 
    rawCategory.includes("盾牌") || 
    rawCategory.includes("頭盔") || 
    rawCategory.includes("鞋子") || 
    rawCategory.includes("披風") || 
    rawCategory.includes("配件") || 
    rawCategory.includes("頭飾")
  ) {
    category = "防具";
  } else if (
    rawCategory.includes("消耗") || 
    rawCategory.includes("恢復") || 
    rawCategory.includes("藥水") || 
    description.includes("恢復劑") || 
    description.includes("恢復") ||
    description.includes("認養寵物") ||
    description.includes("最喜愛的食物")
  ) {
    category = "消耗";
  } else if (description.includes("任務")) {
    category = "任務";
  }

  // Parse level, weight, etc.
  let weight = 0;
  const weightMatch = description.match(/重量 :\s*([\d.]+)/);
  if (weightMatch) weight = parseFloat(weightMatch[1]);

  let required_level = 0;
  const levelMatch = description.match(/要求等級 :\s*(\d+)/);
  if (levelMatch) required_level = parseInt(levelMatch[1], 10);

  let attack = 0;
  const atkMatch = description.match(/攻擊 :\s*(\d+)/);
  if (atkMatch) attack = parseInt(atkMatch[1], 10);

  let defense = 0;
  const defMatch = description.match(/防禦 :\s*(\d+)/);
  if (defMatch) defense = parseInt(defMatch[1], 10);

  itemsDb[itemId] = {
    id: parseInt(itemId, 10),
    name: {
      zh_tw: name
    },
    category: category,
    slotCount: slots,
    description: {
      official: description
    },
    attack: attack,
    defense: defense,
    required_level: required_level,
    attributes: {
      weight: weight,
      buy_price: 0,
      sell_price: 0
    },
    costume: costume,
    released: true,
    is_valid: true
  };
  
  count++;
}

fs.writeFileSync(outputPath, JSON.stringify(itemsDb, null, 2), 'utf8');
console.log(`Robust parser updated items_db.json for ${count} items!`);
