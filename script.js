// script.js
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const listingsContainer = document.getElementById("listings");
  const filters = document.querySelectorAll("input[type='checkbox']");

  searchBtn.addEventListener("click", async () => {
    const selectedFilters = Array.from(filters)
      .filter(f => f.checked)
      .map(f => f.value);

    listingsContainer.innerHTML = "Searching...";

    try {
      const response = await fetch("/.netlify/functions/fetchListings");
      if (!response.ok) throw new Error("Failed to fetch listings");
      const data = await response.json();

      const filteredListings = data.filter(listing => {
        const tags = listing.satributes || [];
        return selectedFilters.every(filter => tags.includes(filter));
      });

      if (filteredListings.length === 0) {
        listingsContainer.innerHTML = "No listings match your filters.";
        return;
      }

      listingsContainer.innerHTML = "";
      filteredListings.forEach(listing => {
        const sat = listing.sat_ranges?.[0]?.start || "N/A";
        const block = listing.block || "N/A";
        const price = listing.price || "N/A";
        const tags = listing.satributes?.join(", ") || "None";
        const link = listing.link || "#";
        const source = listing.source || "Magic Eden";

        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${source}</strong> | 
          Sat: ${sat} | 
          Block: #${block} | 
          Price: ${price} BTC | 
          Tags: ${tags} | 
          <a href="${link}" target="_blank">Buy</a>
        `;
        listingsContainer.appendChild(div);
      });
    } catch (err) {
      listingsContainer.innerHTML = "Failed to fetch listings.";
      console.error(err);
    }
  });
});
