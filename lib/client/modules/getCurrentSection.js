const $ = require("jquery");

function getCurrentSection() {
	let current = $(".menu-item.active");

	if (current.length === 0) {
		return null;
	}

	return current.attr("id").replace("menu-item-", "");
}

module.exports = getCurrentSection;