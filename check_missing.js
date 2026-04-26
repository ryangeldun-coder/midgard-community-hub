const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'src', 'data', 'items_db.json');
const transPath = path.join(__dirname, 'src', 'data', 'items-translated.json');

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let trans = {};
if (fs.existsSync(transPath)) {
  trans = JSON.parse(fs.readFileSync(transPath, 'utf8'));
}

let missing = 0;
const missingIds = [];

for (const id in db) {
  if (!trans[id] || !trans[id].name_en || !trans[id].description_en) {
    missing++;
    missingIds.push(id);
  }
}

console.log(`Total items in DB: ${Object.keys(db).length}`);
console.log(`Items already translated: ${Object.keys(trans).length}`);
console.log(`Items missing translation: ${missing}`);
