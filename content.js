/**
 * @param {string} query - User search query
 * @returns {string} Google Maps URL for the given query
 */
const getMapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;


/** Semantic element finders */
const find = {
    /**
     * Finds the search tabs bar via [role="navigation"] and known tab keywords.
     * @returns {Element | null}
     */
    searchTabs() {
        for (const nav of document.querySelectorAll('[role="navigation"]')) {
            
            if (['Images', 'Vidéos', 'Videos', 'Shopping'].some(tab => nav.textContent.includes(tab))) {
                return nav;
            }
        }
        return null;
    },

    /**
     * Reads the current search query from Google's input field.
     * @returns {string}
     */
    searchQuery() {
        const input = document.querySelector('textarea[name="q"], input[name="q"]');
        return input?.value || '';
    },

    /**
     * Finds Google Maps thumbnails by detecting map image URLs or map links containing images.
     * @returns {Element[]}
     */
    mapThumbnails() {
        const isMapSrc = (src) =>
            (src.includes('google') && src.includes('/maps/')) || /maps\.(google|googleapis)/.test(src);

        const byImage = [...document.querySelectorAll('img')]
            .filter(img => isMapSrc(img.src || img.dataset?.src || ''))
            .map(img => img.closest('a') || img.closest('[data-attrid]') || img.parentElement)
            .filter(Boolean);

        if (byImage.length) return byImage;

        const byLink = [...document.querySelectorAll('a[href*="google.com/maps"]')]
            .filter(a => a.querySelector('img'));

        return byLink;
    }
};

/**
 * Injects a "Maps" tab into the Google search tabs bar if not already present.
 * Clones an inactive tab to inherit current styling and inserts before the "More" overflow button.
 */
const addMapsButtonIfNotPresent = () => {

    const tabs = find.searchTabs();
    if (!tabs) return;

    if ([...tabs.querySelectorAll('a')].some(a => a.textContent.trim() === 'Maps')) return;

    const query = find.searchQuery();
    if (!query) return;

    // Clone the 2nd tab (inactive) to avoid the active tab's underline
    const allLinks = [...tabs.querySelectorAll('a')];
    const inactiveLink = allLinks[1] || allLinks[0];
    if (!inactiveLink) return;

    const templateItem = inactiveLink.closest('[role="listitem"]') || inactiveLink.parentElement;
    const clone = templateItem.cloneNode(true);
    const link = clone.querySelector('a') || clone;

    link.href = getMapsUrl(query);
    const span = clone.querySelector('span');
    if (span) span.style.borderColor = 'transparent';

    const textEl = span || link;
    textEl.textContent = 'Maps';

    // Insert before the "Plus/More" overflow button so Maps stays visible
    const moreButton = tabs.querySelector('[role="button"][aria-expanded]');
    
    if (moreButton) {
        const moreItem = moreButton.closest('[role="listitem"]') || moreButton.parentElement;
        moreItem.before(clone);
    } 
    
    else {
        templateItem.parentElement.appendChild(clone);
    }
};

/**
 * Makes Google Maps thumbnails in search results clickable.
 * Redirects to Google Maps on click. Already-processed elements are marked via data-maps-clickable.
 */
const makeMapThumbnailClickable = () => {
    const query = find.searchQuery();
    if (!query) return;

    const mapsUrl = getMapsUrl(query);

    for (const thumbnail of find.mapThumbnails()) {
        if (!(thumbnail instanceof HTMLElement) || thumbnail.dataset.mapsClickable) continue;

        thumbnail.dataset.mapsClickable = 'true';
        thumbnail.style.cursor = 'pointer';
        thumbnail.addEventListener('click', () => {
            window.location.href = mapsUrl;
        });
    }
};

// Initial run
addMapsButtonIfNotPresent();
makeMapThumbnailClickable();

// Re-run on dynamic content changes (Google loads content progressively)
/** @type {ReturnType<typeof setTimeout> | undefined} */
let pending;

new MutationObserver(() => {
    clearTimeout(pending);
    pending = setTimeout(() => {
        addMapsButtonIfNotPresent();
        makeMapThumbnailClickable();
    }, 200);
}).observe(document.body, { childList: true, subtree: true });
