// Constants
const SELECTORS = {
  SEARCH_TABS: '.IUOThf, .CA0QAA, .crJ18e',
  SEARCH_INPUT: 'input[name="q"]',
  MAP_THUMBNAIL: ".ZqGZZ, .xP81Pd, .Ggdpnf, .kno-mrg-m, .lu_map_section",
  MAP_IMAGE: "#lu_map, a[style*='height:80px']"
};

const CLASSES = {
  SPAN_TEXT: "FMKtTb UqcIvb"
};



// Utility functions
const createElementWithAttributes = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    switch(key) {
      case 'className':
        element.className = value;
        break;
      case 'textContent':
        element.textContent = value;
        break;
      case 'style':
        Object.assign(element.style, value);
        break;
      default:
        element.setAttribute(key, value);
    }
  });
  
  return element;
};

// Get URL
const getUrl = (query) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

// Get search query
const getSearchQuery = () => {
  const searchInput = document.querySelector(SELECTORS.SEARCH_INPUT);
  return searchInput instanceof HTMLInputElement ? searchInput.value : '';
};



// Component creation functions

// Create "Maps" button
const createMapsLink = (query) => {
  const containerBtn = createElementWithAttributes('div', {
    className: CLASSES.CONTAINER
});

  const mapsLink = createElementWithAttributes('a', {
    className: CLASSES.LINK,
    href: getUrl(query)
  });

  const linkText = createElementWithAttributes('div', {
    jsname: 'bVqjv'
  });

  const spanText = createElementWithAttributes('span', {
    className: CLASSES.SPAN_TEXT,
    jsname: 'pIvPIe',
    textContent: 'Maps'
  });

  linkText.appendChild(spanText);
  mapsLink.appendChild(linkText);
  containerBtn.appendChild(mapsLink);

  return containerBtn;
};

// Add "Maps" button to search tabs
const addMapsButtonIfNotPresent = () => {
  const searchTabs = document.querySelector(SELECTORS.SEARCH_TABS);
  // Verify if "Maps" button already exists
  const hasMapButton = Array.from(searchTabs?.querySelectorAll('span') || [])
    .some(span => span.textContent === 'Maps');

  if (searchTabs && !hasMapButton) {
    const searchQuery = getSearchQuery();
    if (searchQuery) {
      const mapsLink = createMapsLink(searchQuery);
      searchTabs.appendChild(mapsLink);
    }
  }
};

// Make minimap thumbnail clickable
const makeMapThumbnailClickable = () => {
  const combinedSelectors = `${SELECTORS.MAP_THUMBNAIL}, ${SELECTORS.MAP_IMAGE}`;
  const mapThumbnailContainer = document.querySelectorAll(combinedSelectors);
  if (!mapThumbnailContainer || mapThumbnailContainer.length === 0) return;

  const query = getSearchQuery();
  if (!query) return;

  mapThumbnailContainer.forEach(thumbnail => {
    console.log(mapThumbnailContainer);
    if (thumbnail instanceof HTMLElement) {
      thumbnail.addEventListener('click', () => {
        window.location.href = getUrl(query);
      });
      thumbnail.style.cursor = 'pointer';
    }
  });
};

addMapsButtonIfNotPresent();
makeMapThumbnailClickable();