const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  try {
    const filePath = path.join(__dirname, "listingsCache.json");

    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No cached listings available. Please run updateCache first." }),
      };
    }

    const data = fs.readFileSync(filePath, "utf8");
    const listings = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(listings),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
