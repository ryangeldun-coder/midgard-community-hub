const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '/Users/tomaszksel/Desktop/RO Geoguesser';
const outputDir = path.join(process.cwd(), 'public/images/scout');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith('.png')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

            sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath)
                .then(() => {
                    console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
                })
                .catch(err => {
                    console.error(`Error converting ${file}:`, err);
                });
        }
    });
});
