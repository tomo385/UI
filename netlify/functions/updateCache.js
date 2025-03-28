const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

exports.handler = async function () {
  try {
    const response = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

    const filePath = path.join(__dirname, 'listingsCache.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cache updated successfully.' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
