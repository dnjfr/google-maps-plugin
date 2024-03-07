// Create "Maps" button
const createMapsLink = (query) => {
  const mapsLink = document.createElement("a");
  mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
  mapsLink.className = "LatpMc nPDzT T3FoJb";

  const linkText = document.createElement("div");
  linkText.className = "GKS7s";
  linkText.setAttribute("jsname", "bVqjv");

  const spanText = document.createElement("span");
  spanText.className = "FMKtTb UqcIvb";
  spanText.setAttribute("jsname", "pIvPIe");
  spanText.textContent = "Maps";

  linkText.appendChild(spanText);
  mapsLink.appendChild(linkText);

  return mapsLink;
};

// Add "Maps" button to search tabs
const addMapsButtonIfNotPresent = () => {
  const searchTabs = document.querySelector(".IUOThf");
  if (searchTabs && !isSpanWithTextExist(searchTabs, "Maps")) {
    const searchQuery = document.querySelector('input[name="q"]').value;
    if (searchQuery) {
      const mapsLink = createMapsLink(searchQuery);
      searchTabs.appendChild(mapsLink);
    }
  }
};

// Verify if "Maps" button already exists
const isSpanWithTextExist = (container, text) => {
  return Array.from(container.querySelectorAll("span")).some(
    (span) => span.textContent === text
  );
};

// Make minimap thumbnail clickable
const makeMapThumbnailClickable = () => {
  const mapThumbnailContainer = document.querySelector(".Ggdpnf");
  if (mapThumbnailContainer && mapThumbnailContainer instanceof HTMLElement) {
    const query = document.querySelector('input[name="q"]').value;
    if (query) {
      mapThumbnailContainer.addEventListener("click", () => {
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          query
        )}`;
      });
      mapThumbnailContainer.style.cursor = "pointer";
    }
  }
};

// Recreates the bidirectional arrow in the minimap
const addNewDivAfterImage = () => {
  const imageElement = document.querySelector("#lu_map");

  if (imageElement) {
    const container = document.createElement("div");
    container.style.position = "relative";

    // Move the image to the container
    imageElement.parentNode.insertBefore(container, imageElement);
    container.appendChild(imageElement);
    const newDiv = document.createElement("div");
    newDiv.setAttribute("jscontroller", "hnlzI");
    newDiv.className = "sEtYzd duf-h TUOsUe BSRXQc sxd9Pc";
    newDiv.setAttribute("jsaction", "KQB0gd;rcuQ6b:npT2md");
    newDiv.setAttribute(
      "data-ved",
      "2ahUKEwjy8uzlr-KEAxXeKFkFHZAaAv8QkNEBegQIFxAJ"
    );
    newDiv.style.boxShadow = "0px 1px 2px rgba(0,0,0,0.2)";
    newDiv.style.backgroundColor = "rgba(255,255,255,0.87)";
    newDiv.style.height = "32px";
    newDiv.style.width = "32px";
    newDiv.style.display = "block";
    newDiv.style.outline = "0";
    newDiv.style.position = "absolute";
    newDiv.style.marginTop = "4px";
    newDiv.style.marginRight = "4px";
    newDiv.style.top = "0";
    newDiv.style.right = "0";
    newDiv.style.verticalAlign = "middle";
    newDiv.style.zIndex = "1000";

    // Image creation into the missing div
    const newImage = document.createElement("img");
    newImage.className = "kf0xcf oYQBg FIfWIe Tbiej u60jwe";
    newImage.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAmElEQVR4Ae3a1xHDIBQAQfpvglLxr+M5572Z18AqC4YkSZIkSdF60DwzQIAAaQK6HWfBAXQVzmwgOKOA4AQQnAaC00BwGghOA8FpIDgNBKeB4ADaw9GEc74JR5Kkr39sy4ufT4e1N7fjAPo/nAaC00BwGghOA8FpIDgNBKeB4DQQnAKC00BwdoPTwfnlDd2AAAGSJEmSJGkDhfC3AD4fHSUAAAAASUVORK5CYII=";
    newImage.alt = "";
    newImage.style.height = "24px";
    newImage.style.width = "24px";

    newDiv.appendChild(newImage);
    container.appendChild(newDiv);
  }
};

addMapsButtonIfNotPresent();
makeMapThumbnailClickable();
addNewDivAfterImage();
