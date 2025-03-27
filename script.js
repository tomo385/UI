document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeBtn = document.getElementById('toggle-theme');

  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Mock listing data
  const listings = [
    {
      source: 'Magic Eden',
      sat: '578027606720875',
      block: 78,
      price: '0.001 BTC',
      tags: ['palindrome', 'hal'],
      link: 'https://magiceden.io/ordinals/item-details/mock1'
    },
    {
      source: 'Magisat',
      sat: '9999',
      block: 9999,
      price: '0.01 BTC',
      tags: ['sub10k'],
      link: 'https://magisat.io/item-details/mock2'
    }
  ];

  const listingsContainer = document.getElementById('listings');

  listings.forEach(listing => {
    const tags = listing.tags.join(', ');
    listingsContainer.innerHTML += `
      <div>
        <strong>${listing.source}</strong> |
        Sat ${listing.sat} |
        Block #${listing.block} |
        ${listing.price} |
        Tags: ${tags} |
        <a href="${listing.link}" target="_blank" style="color:#7db1ff">Buy</a>
      </div>
    `;
  });
});
