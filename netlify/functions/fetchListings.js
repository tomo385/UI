const fs = require('fs');
const path = require('path');

exports.handler = async function () {
  try {
    const filePath = path.join(__dirname, 'listingsCache.json');
    const listings = fs.readFileSync(filePath, 'utf-8');

    return {
      statusCode: 200,
      body: listings
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load cached listings.' })
    };
  }
};
