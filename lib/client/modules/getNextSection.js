const $                 = require("jquery")
	, getCurrentSection = require("./getCurrentSection")
	, getMenu           = require("./getMenu");

function getNextSection() {
	let menu = getMenu();
	return menu[menu.indexOf(getCurrentSection()) + 1] || null;
}

module.exports = getNextSection;