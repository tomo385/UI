document.getElementById('searchBtn').addEventListener('click', async () => {
  const selectedFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = 'Loading listings...';

  try {
    const response = await fetch('/.netlify/functions/fetchListings');
    const data = await response.json();

    const filteredListings = data.filter(listing => {
      const tags = listing.satributes || [];
      return selectedFilters.every(filter => tags.includes(filter));
    });

    if (filteredListings.length === 0) {
      listingsContainer.innerHTML = 'No listings found.';
      return;
    }

    listingsContainer.innerHTML = '';
    
    for (const listing of filteredListings) {
      const satRange = listing.sat_ranges?.[0];
      const satStart = satRange?.start || 'N/A';
      const block = listing.block || 'N/A';
      const price = listing.price || 'N/A';
      const source = listing.source || 'Magic Eden';
      const tags = listing.satributes?.join(', ') || 'None';

      // Generate a link (you may want to update this depending on the marketplace)
      const link = source === 'Magic Eden'
        ? `https://magiceden.io/ordinals/item-details/${listing.token_id}`
        : `https://magisat.io/sat/${satStart}`;

      const entry = document.createElement('div');
      entry.innerHTML = `
        <strong>${source}</strong> |
        Sat Range: ${satStart} |
        Block: #${block} |
        Price: ${price} BTC |
        Tags: ${tags} |
        <a href="${link}" target="_blank">Buy</a>
      `;
      listingsContainer.appendChild(entry);
    }
  } catch (error) {
    listingsContainer.innerHTML = 'Failed to fetch listings.';
    console.error(error);
  }
});
