const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const response = await fetch("https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings");
    const listings = await response.json();

    const filtered = listings.filter(listing => 
      listing.satributes && listing.satributes.includes("palindrome")
    );

    const filePath = path.resolve(__dirname, "cachedListings.json");
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Cache updated with palindrome listings." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
