"use strict";

const getMenu           = require("./getMenu")
	, getNextSection    = require("./getNextSection");

/**
 * @param {string} section The section the next button is being disabled for.
 */
function disableNextButton(section) {
	$(`#menu-item-${section}`).attr("data-prevent-next", true);

	let menu = getMenu();
	let index = menu.indexOf(section);

	if (getNextSection() === menu[index + 1]) {
		$("#button-next").addClass("disabled");
	}
}

module.exports = disableNextButton;