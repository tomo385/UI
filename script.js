document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const listingsContainer = document.getElementById("results-list");

  if (searchBtn) {
    searchBtn.addEventListener("click", fetchListings);
  } else {
    // fallback to auto-fetch
    fetchListings();
  }

  async function fetchListings() {
    listingsContainer.innerHTML = "<li>Loading...</li>";

    try {
      const response = await fetch("/.netlify/functions/fetchListings");
      if (!response.ok) throw new Error("Fetch failed");

      const listings = await response.json();

      const filtered = listings.filter(item => {
        const tags = item.satributes || [];
        return tags.includes("black_uncommon");
      });

      if (filtered.length === 0) {
        listingsContainer.innerHTML = "<li>No listings found for black_uncommon.</li>";
        return;
      }

      listingsContainer.innerHTML = "";
      filtered.forEach(item => {
        const tags = item.satributes?.join(", ") || "None";
        const sat = item.sat_ranges?.[0]?.start || "N/A";
        const block = item.block || "N/A";
        const price = item.price || "N/A";
        const link = item.link || `https://magiceden.io/ordinals/item-details/${item.tokenMint}`;

        const li = document.createElement("li");
        li.innerHTML = `
          <strong>Magic Eden</strong> | Sat: ${sat} | Block: ${block} | Price: ${price} BTC | 
          Tags: ${tags} | <a href="${link}" target="_blank">Buy</a>
        `;
        listingsContainer.appendChild(li);
      });
    } catch (err) {
      listingsContainer.innerHTML = "<li>Error fetching listings.</li>";
      console.error(err);
    }
  }
});

