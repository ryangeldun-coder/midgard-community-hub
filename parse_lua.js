const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'scratch', 'twroz-system', 'iteminfo_new.lua.bak');
const outputPath = path.join(__dirname, 'src', 'data', 'items_db.json');

const luaContent = fs.readFileSync(inputPath, 'utf8');

// Regex to capture the block for each item
const itemBlockRegex = /\[(\d+)\]\s*=\s*\{([\s\S]*?)\}(?=\s*,?\s*\[\d+\]\s*=|\s*$)/g;
const itemsDb = {};

let match;
let count = 0;

while ((match = itemBlockRegex.exec(luaContent)) !== null) {
  const itemId = match[1];
  const blockData = match[2];

  // Extract name
  const nameMatch = blockData.match(/identifiedDisplayName\s*=\s*\[=\[(.*?)\]=\]/);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown Item';

  // Extract slots
  const slotMatch = blockData.match(/slotCount\s*=\s*(\d+)/);
  const slots = slotMatch ? parseInt(slotMatch[1], 10) : 0;

  // Extract ClassNum (useful for weapons/armor types sometimes, but generic)
  const classMatch = blockData.match(/ClassNum\s*=\s*(\d+)/);
  const classNum = classMatch ? parseInt(classMatch[1], 10) : 0;

  // Extract description block
  const descBlockMatch = blockData.match(/identifiedDescriptionName\s*=\s*\{([\s\S]*?)\}/);
  let description = "";
  let category = "Misc";

  if (descBlockMatch) {
    const descBlock = descBlockMatch[1];
    const descLines = [];
    const lineRegex = /\[=\[(.*?)\]=\]/g;
    let lineMatch;
    
    while ((lineMatch = lineRegex.exec(descBlock)) !== null) {
      let cleanLine = lineMatch[1];
      // Clean up color codes like ^777777 or ^000000
      cleanLine = cleanLine.replace(/\^[0-9a-fA-F]{6}/g, '');
      descLines.push(cleanLine);

      // Try to determine category from the text
      if (cleanLine.includes('系列 :')) {
        const catMatch = cleanLine.match(/系列 :\s*([^\s]+)/);
        if (catMatch) category = catMatch[1];
      }
    }
    description = descLines.join('\n').trim();
  }

  // Formatting for our frontend
  itemsDb[itemId] = {
    id: parseInt(itemId, 10),
    name_zh: name,
    name_en: name, // We don't have English right now, translation will happen later
    category: category,
    description: description,
    slots: slots,
    equip_level: 0, // We'd have to parse "要求等級" from description for level
  };
  
  // Try to parse equip level from description
  const levelMatch = description.match(/要求等級 :\s*(\d+)/);
  if (levelMatch) {
    itemsDb[itemId].equip_level = parseInt(levelMatch[1], 10);
  }

  count++;
}

fs.writeFileSync(outputPath, JSON.stringify(itemsDb, null, 2), 'utf8');
console.log(`Successfully parsed ${count} items from TWRoZ Client and saved to items_db.json!`);
