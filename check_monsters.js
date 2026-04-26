const fs = require('fs');
const path = require('path');

const monstersPath = path.join(__dirname, 'src', 'data', 'monsters_db.json');
const raw = JSON.parse(fs.readFileSync(monstersPath, 'utf8'));

let total = Object.keys(raw).length;
let loaded = 0;

for (const [id, data] of Object.entries(raw)) {
  const released = data.released ?? true;
  const is_valid = data.is_valid ?? true;
  const level = data.basic_info?.level ?? 0;
  const name_en = data.name?.en || "";
  
  if (released || is_valid || (name_en && level > 0)) {
    loaded++;
  }
}

console.log(`Total in monsters_db.json: ${total}`);
console.log(`Loaded in cache: ${loaded}`);
