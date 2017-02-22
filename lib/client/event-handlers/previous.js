"use strict";

const getPreviousSection = require("../modules/getPreviousSection")
	, loadSection        = require("../modules/loadSection");

module.exports = () => {
	let previous = getPreviousSection();

	if (previous !== null) {
		loadSection(previous);
	}
};