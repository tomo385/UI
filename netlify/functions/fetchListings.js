const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings");
    const data = await response.json();

    const filtered = data.filter(item => item.satributes && item.satributes.includes("palindrome"));

    return {
      statusCode: 200,
      body: JSON.stringify(filtered)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Magic Eden error: " + error.message })
    };
  }
};
