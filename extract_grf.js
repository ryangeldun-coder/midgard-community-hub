const { GrfNode } = require('@chicowall/grf-loader');
const fs = require('fs');
const path = require('path');

async function run() {
  const grfPath = '/Users/tomaszksel/Desktop/RagnarokZero/data.grf';
  console.log('Opening GRF file at:', grfPath);
  
  const fd = fs.openSync(grfPath, 'r');
  const grf = new GrfNode(fd);
  
  console.log('Loading GRF index...');
  await grf.load();
  console.log(`GRF loaded successfully. Total files: ${grf.fileCount}`);

  const targetFiles = [
    'data/luafiles514/lua files/datainfo/npcidentity.lub',
    'data/luafiles514/lua files/datainfo/jobname.lub',
    'data/luafiles514/lua files/datainfo/monster_size_effect.lub',
    'data/luafiles514/lua files/datainfo/petinfo.lub',
    'data/luafiles514/lua files/datainfo/petevolutioncln.lub',
  ];

  const outputDir = path.join(__dirname, 'scratch', 'extracted-grf');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const filePath of targetFiles) {
    console.log(`Trying to extract: ${filePath}`);
    try {
      const { data, error } = await grf.getFile(filePath);
      if (error) {
        console.error(`Error extracting ${filePath}:`, error);
      } else if (data) {
        const outPath = path.join(outputDir, path.basename(filePath));
        fs.writeFileSync(outPath, data);
        console.log(`Successfully saved to ${outPath}`);
      } else {
        console.log(`File ${filePath} not found in GRF.`);
      }
    } catch (e) {
      console.error(`Exception while extracting ${filePath}:`, e.message);
    }
  }
  
  // Also, let's search the GRF for other likely monster-related files
  console.log('Searching for other monster/npc files in GRF...');
  const allFiles = grf.files;
  const matchedFiles = [];
  
  for (const file of allFiles) {
    const name = file.name.toLowerCase();
    if (name.includes('npcidentity') || name.includes('jobname') || (name.includes('monster') && name.endsWith('.lub'))) {
      matchedFiles.push(file.name);
    }
  }
  
  console.log(`Found ${matchedFiles.length} matching files in GRF:`);
  for (const file of matchedFiles) {
    console.log(`- ${file}`);
    // Let's extract these matched files too!
    try {
      const { data } = await grf.getFile(file);
      if (data) {
        const outPath = path.join(outputDir, path.basename(file));
        fs.writeFileSync(outPath, data);
        console.log(`Saved extra matched file to ${outPath}`);
      }
    } catch (e) {
      console.error(`Error extracting matched file ${file}:`, e.message);
    }
  }

  fs.closeSync(fd);
}

run().catch(console.error);
