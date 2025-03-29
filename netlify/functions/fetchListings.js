// netlify/functions/fetchListings.js
const fetch = require("node-fetch");

exports.handler = async function () {
  try {
    const response = await fetch("https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings");
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `HTTP error! status: ${response.status}` }),
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
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formatted),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
