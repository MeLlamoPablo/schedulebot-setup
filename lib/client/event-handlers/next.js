"use strict";

const getNextSection = require("../modules/getNextSection")
	, loadSection    = require("../modules/loadSection");

module.exports = () => {
	let next = getNextSection();

	if (next !== null) {
		loadSection(next);
	}
};