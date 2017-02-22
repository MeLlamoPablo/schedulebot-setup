"use strict";

const disableNextButton = require("./disableNextButton")
	, enableNextButton  = require("./enableNextButton")
	, getCurrentSection = require("./getCurrentSection");

module.exports = () => {

	// Check if there are any invalid inputs before enabling the "next" button.
	// However we don't account for hidden inputs, since they are optional.
	if (!$("input.invalid:visible").length) {
		enableNextButton("bot-settings");
	} else {
		disableNextButton("bot-settings");
	}

};