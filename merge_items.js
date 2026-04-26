const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const currentDbPath = path.join(__dirname, 'src', 'data', 'items_db.json');

// 1. Read old items from Git commit 15d2427
console.log('Fetching original wiki items from Git...');
const oldJsonStr = execSync('git show 15d2427:src/data/items_db.json', { maxBuffer: 1024 * 1024 * 50 }).toString();
const oldDb = JSON.parse(oldJsonStr);

// 2. Read new parsed items from client override
console.log('Loading client override items...');
const currentDb = JSON.parse(fs.readFileSync(currentDbPath, 'utf8'));

// 3. Merge items (Client overrides wiki)
const mergedDb = { ...oldDb };
let overrideCount = 0;
let newCount = 0;

for (const id in currentDb) {
  if (mergedDb[id]) {
    // Merge properties, using client data as authoritative
    mergedDb[id] = {
      ...mergedDb[id],
      ...currentDb[id],
      // Keep name structure
      name: {
        ...mergedDb[id].name,
        ...currentDb[id].name
      },
      // Keep description
      description: {
        ...mergedDb[id].description,
        ...currentDb[id].description
      }
    };
    overrideCount++;
  } else {
    mergedDb[id] = currentDb[id];
    newCount++;
  }
}

console.log(`Total items in final DB: ${Object.keys(mergedDb).length}`);
console.log(`Wiki items retained: ${Object.keys(oldDb).length}`);
console.log(`Client items mapped/overridden: ${overrideCount}`);
console.log(`Brand new items added: ${newCount}`);

// 4. Save merged result
fs.writeFileSync(currentDbPath, JSON.stringify(mergedDb, null, 2), 'utf8');
console.log('Successfully merged items databases!');
