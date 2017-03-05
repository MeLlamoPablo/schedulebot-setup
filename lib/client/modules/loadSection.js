"use strict";

const checkSettingsValidity = require("./checkSettingsValidity")
	, getCurrentSection     = require("./getCurrentSection")
	, getMenu               = require("./getMenu")
	, renderSteamBots       = require("./steamBotsManager").renderBots
	, saveValidSettings     = require("./saveValidSettings");

function loadSection(targetSection) {
	let previousButton = $("#button-previous");
	let nextButton = $("#button-next");

	previousButton.addClass("disabled");
	nextButton.addClass("disabled");

	let current = getCurrentSection();

	if (current !== null) {
		$(`#menu-item-${current}`).removeClass("active");
		$(`#section-${current}`).hide();
	}

	let targetSectionObject = $(`#section-${targetSection}`);
	let targetSectionMenuObject = $(`#menu-item-${targetSection}`);

	targetSectionMenuObject.addClass("active");
	targetSectionObject.show();

	let menu = getMenu();

	// If there is a previous element, enable the previous button
	if (menu.indexOf(targetSection) > 0) {
		previousButton.removeClass("disabled");
	}

	// If there is a next element, enable the next button, unless the section has the
	// data-prevent-next set to true
	if (menu.indexOf(targetSection) !== -1 && menu.indexOf(targetSection) !== menu.length - 1) {

		if (targetSectionMenuObject.attr("data-prevent-next") !== "true") {
			nextButton.removeClass("disabled");
		}

	}

	// So that the defaults are saved
	if (targetSection === "bot-settings") {
		saveValidSettings();
	}

	// So that the user can go to any section if already configured.
	checkSettingsValidity();

	// So that the "next" button is enabled or disabled correctly in the steam bots section
	renderSteamBots();
}

module.exports = loadSection;