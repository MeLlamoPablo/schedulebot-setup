"use strict";

const getMenu           = require("./getMenu")
	, getNextSection    = require("./getNextSection");

/**
 * @param {string} section The section the next button is being enabled for.
 */
function enableNextButton(section) {
	$(`#menu-item-${section}`).attr("data-prevent-next", false);

	let menu = getMenu();
	let index = menu.indexOf(section);

	if (getNextSection() === menu[index + 1]) {
		$("#button-next").removeClass("disabled");
	}
}

module.exports = enableNextButton;