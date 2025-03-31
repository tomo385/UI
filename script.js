document.getElementById('searchBtn').addEventListener('click', async () => {
  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = 'Loading all listings...';

  try {
    const response = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings');
    const data = await response.json();

    if (!data || data.length === 0) {
      listingsContainer.innerHTML = 'No listings found.';
      return;
    }

    listingsContainer.innerHTML = ''; // Clear previous listings

    data.slice(0, 20).forEach(listing => {
      const satRange = listing.sat_ranges?.[0];
      const start = satRange?.start || 'N/A';
      const end = satRange?.end || 'N/A';
      const block = listing.block || 'N/A';
      const price = listing.price || 'N/A';
      const tags = listing.satributes?.join(', ') || 'None';
      const link = listing.source === "magisat"
        ? `https://magisat.io/sat/${start}`
        : `https://magiceden.io/ordinals/item-details/${listing.tokenMint}`;

      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${listing.source || 'Magic Eden'}</strong> | 
        Sat Range: ${start} - ${end} | 
        Block: #${block} | 
        Price: ${price} BTC | 
        Tags: ${tags} | 
        <a href="${link}" target="_blank">View</a>
        <hr />
      `;
      listingsContainer.appendChild(div);
    });
  } catch (error) {
    listingsContainer.innerHTML = 'Failed to fetch listings.';
    console.error(error);
  }
});
