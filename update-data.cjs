const fs = require('fs');
const path = require('path');
const scrapeData = require('./scrape-data.cjs');

async function main() {
  console.log('Fetching leader data from civfanatics.com...');

  try {
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const leaders = await scrapeData();
    fs.writeFileSync(path.join(publicDir, 'leaders.json'), JSON.stringify(leaders, null, 2));
    console.log(`Successfully wrote ${leaders.length} leaders to public/leaders.json`);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    process.exit(1);
  }
}

main();
