"use strict";

const checkSettingsValidity = require("../modules/checkSettingsValidity")
	, saveValidSettings     = require("../modules/saveValidSettings");

/**
 * @param {MouseEvent|CheckBoxName} eventOrCheckboxName
 * @typedef {object} CheckBoxName
 * @property {string} checkbox The checkbox name
 */
module.exports = eventOrCheckboxName => {
	let name, checkbox;

	if (eventOrCheckboxName.currentTarget) {
		// The event is an actual MouseEvent
		checkbox = $(eventOrCheckboxName.currentTarget).children().filter("input");
		name = checkbox.attr("id").replace("input-", "");
	} else {
		// The event is a manually triggered event from the javascript
		name = "settings-" + eventOrCheckboxName.checkbox;
		checkbox = $("#input-" + name);
	}

	// If the target has a div associated, show or hide it according to the checkbox value.
	let div = $(`#div-${name}`);

	if (div.length) {
		// Only do the thing if the checkbox is cheked and the div is hidden, or vice versa
		if (checkbox.is(":checked") && div.is(":hidden")) {
			div.fadeIn(null, checkSettingsValidity);
		} else if (!checkbox.is(":checked") && !div.is(":hidden")) {
			div.fadeOut(null, checkSettingsValidity);
		}
	}

	saveValidSettings();
};