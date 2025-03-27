document.getElementById('searchBtn').addEventListener('click', async () => {
  const selectedFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = 'Loading listings...';

  try {
    const response = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/raresats/listings');
    const data = await response.json();

    // Filter listings based on selected filters (basic example)
    const filteredListings = data.filter(listing => {
      const tags = listing.satributes || [];
      return selectedFilters.every(filter => tags.includes(filter));
    });

    if (filteredListings.length === 0) {
      listingsContainer.innerHTML = 'No listings found.';
      return;
    }

    listingsContainer.innerHTML = '';
    filteredListings.forEach(listing => {
      const satNum = listing.sat_ranges?.[0]?.start || 'N/A';
      const block = listing.block || 'N/A';
      const price = listing.price || 'N/A';
      const source = listing.source || 'Magic Eden';
      const tags = listing.satributes?.join(', ') || 'None';
      const link = source === 'Magic Eden'
        ? `https://magiceden.io/ordinals/item-details/${listing.token_id}`
        : listing.source_url || '#';

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
