document.getElementById('searchBtn').addEventListener('click', async () => {
  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = 'Loading listings...';

  try {
    const response = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings');
    const data = await response.json();

    // Filter only listings with 'black_uncommon'
    const filteredListings = data.filter(listing => {
      const tags = listing.satributes || [];
      return tags.includes('black_uncommon');
    });

    if (filteredListings.length === 0) {
      listingsContainer.innerHTML = 'No listings found.';
      return;
    }

    listingsContainer.innerHTML = '';
    filteredListings.forEach(listing => {
      const satRange = listing.sat_ranges?.[0];
      const satNum = satRange ? `${satRange.start} - ${satRange.end}` : 'N/A';
      const block = listing.block || 'N/A';
      const price = listing.price || 'N/A';
      const tags = listing.satributes?.join(', ') || 'None';
      const source = 'Magic Eden';
      const link = `https://magiceden.io/ordinals/item-details/${listing.tokenMint}`;

      const entry = document.createElement('div');
      entry.innerHTML = `
        <strong>${source}</strong> | 
        Sat Range: ${satNum} | 
        Block: #${block} | 
        Price: ${price} BTC | 
        Tags: ${tags} | 
        <a href="${link}" target="_blank">Buy</a>
      `;
      listingsContainer.appendChild(entry);
    });
  } catch (error) {
    listingsContainer.innerHTML = 'Failed to fetch listings.';
    console.error(error);
  }
});

