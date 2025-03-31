const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  try {
    const response = await fetch("https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings");

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Magic Eden error: ${response.status}` }),
      };
    }

    const listings = await response.json();

    const formatted = listings.map(item => ({
      sat_ranges: item.sat_ranges,
      block: item.block,
      price: item.price,
      satributes: item.satributes,
      source: "Magic Eden",
      link: `https://magiceden.io/ordinals/item-details/${item.token_id}`,
      tokenMint: item.token_id
    }));

    const filePath = path.join(__dirname, "listingsCache.json");
    fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Cache updated successfully", count: formatted.length }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

