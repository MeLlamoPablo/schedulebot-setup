const $ = require("jquery");

/**
 * @return {string[]} An array with the names of every section.
 */
function getMenu() {
	return Array.from($(".menu-item")).map(e => e.id.replace("menu-item-", ""));
}

module.exports = getMenu;