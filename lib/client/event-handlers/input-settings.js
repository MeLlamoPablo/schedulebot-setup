"use strict";

const checkSettingsValidity = require("../modules/checkSettingsValidity")
	, getTimezones          = require("../modules/list-of-tz-timezones")
	, saveValidSettings     = require("../modules/saveValidSettings");

module.exports = event => {

	let field = $(event.currentTarget);
	let name = field.attr("id").replace("input-settings-", "");
	let errorDiv = $(`#error-div-settings-${name}`);
	let errorParagraph = $(`#error-p-settings-${name}`);
	let value = field.val();

	// Validate the input
	let err = (() => {
		//noinspection FallThroughInSwitchStatementJS - Reason: fallthrough is intended
		switch (name) {
			case "default-timezone":
				if (getTimezones(true).indexOf(value) === -1) {
					return "This must be a valid time zone! You can check valid time zones " +
						"<a href=\"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones\"" +
						" target=\"_blank\">here</a>.";
				}
				break;
			case "delete-after-reply-time":
			case "mmr-update-interval":
			case "update-interval":
				if (!isNaN(parseInt(value)) && +value <= 0) {
					return "This must be at least 1 or greater!";
				}
			default:
				if (value === "") {
					return "This can't be left empty!";
				} else {
					return false;
				}
		}
	})();

	if (err) {
		errorParagraph.html(err);

		if (errorDiv.is(":hidden")) {
			errorDiv.fadeIn();
		}

		field.addClass("invalid");
		field.removeClass("valid");
	} else {
		if (errorDiv.is(":visible")) {
			errorDiv.fadeOut();
		}

		field.addClass("valid");
		field.removeClass("invalid");
	}

	checkSettingsValidity();
	saveValidSettings();

};