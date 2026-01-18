const fs = require('fs');
const scrapeData = require('./scrape-data');

async function main() {
  console.log('Fetching leader data from civfanatics.com...');

  try {
    const leaders = await scrapeData();
    fs.writeFileSync('./dist/leaders.json', JSON.stringify(leaders, null, 2));
    console.log(`Successfully wrote ${leaders.length} leaders to dist/leaders.json`);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    process.exit(1);
  }
}

main();
