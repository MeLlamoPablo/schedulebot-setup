"use strict";

const api                   = require("../modules/api")
	, checkSettingsValidity = require("../modules/checkSettingsValidity")
	, enableNextButton      = require("../modules/enableNextButton")
	, errorHandler          = require("../modules/errorHandler")
	, saveValidSettings     = require("../modules/saveValidSettings");

module.exports = () => {
	let button = $("#button-settings-master-channel");
	let loading = $("#loading-settings-master-channel");

	let input = $("#input-settings-master-channel");
	let id = input.val();

	button.hide();
	loading.show();

	api.getChannelDetails(localStorage.getItem("discord-bot-token"), id).then(details => {

		if (details !== null) {
			$("#settings-master-channel").html(
				`Selected channel: #${details.name} on ${details.server}.`
			);

			input.addClass("valid");
			input.removeClass("invalid");
		} else {
			Materialize.toast("The ID you have provided is incorrect, or the bot can't access " +
				"that channel", 5000);

			input.addClass("invalid");
			input.removeClass("valid");
		}

		loading.hide();
		button.show();

		checkSettingsValidity();
		saveValidSettings();

	}).catch(errorHandler);
};