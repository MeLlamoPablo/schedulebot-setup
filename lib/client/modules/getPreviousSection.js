const $                 = require("jquery")
	, getCurrentSection = require("./getCurrentSection")
	, getMenu           = require("./getMenu");

function getPreviousSection() {
	let menu = getMenu();
	return menu[menu.indexOf(getCurrentSection()) - 1] || null;
}

module.exports = getPreviousSection;