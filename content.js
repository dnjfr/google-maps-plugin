// Add "Maps" button to search tabs
const searchTabs = document.querySelector(".IUOThf");
const spanExistsWithMaps = Array.from(searchTabs.querySelectorAll("span")).some(
  (span) => span.textContent === "Maps"
);

if (searchTabs && !spanExistsWithMaps) {
  const mapsLink = document.createElement("a");
  mapsLink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(document.querySelector('input[name="q"]').value);
  mapsLink.className = "LatpMc nPDzT T3FoJb";

  const linkText = document.createElement("div");
  linkText.setAttribute("jsname", "bVqjv");
  linkText.className = "GKS7s";

  const spanText = document.createElement("span");
  spanText.setAttribute("jsname", "pIvPIe");
  spanText.className = "FMKtTb UqcIvb";
  spanText.textContent = "Maps";

  linkText.appendChild(spanText);
  mapsLink.appendChild(linkText);
  searchTabs.appendChild(mapsLink);
}

// Clickable map thumbnail
const mapThumbnailContainer = document.querySelector(".Ggdpnf");

if (mapThumbnailContainer && mapThumbnailContainer instanceof HTMLElement) {
  const query = document.querySelector('input[name="q"]').value;
  if (query) {
    mapThumbnailContainer.addEventListener("click", () => {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          query
        )}`,
        "_blank"
      );
    });
    mapThumbnailContainer.style.cursor = "pointer";
  }
}
