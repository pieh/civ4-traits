const fs = require('fs');
const path = require('path');
const scrapeData = require('./scrape-data');

async function main() {
  console.log('Fetching leader data from civfanatics.com...');

  try {
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    const leaders = await scrapeData();
    fs.writeFileSync(path.join(distDir, 'leaders.json'), JSON.stringify(leaders, null, 2));
    console.log(`Successfully wrote ${leaders.length} leaders to dist/leaders.json`);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    process.exit(1);
  }
}

main();
