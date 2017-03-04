"use strict";

const api                = require("../modules/api")
	, enableNextButton   = require("../modules/enableNextButton")
	, getTimezones       = require("../modules/list-of-tz-timezones")
	, loadSection        = require("../modules/loadSection")
	, setDefaultValues   = require("../modules/setDefaultValues");

module.exports = () => {

	// Initialize Materialize stuff
	$('.modal').modal();
	setTimeout(() => {
		$("select").material_select();
		$("#input-settings-default-timezone").autocomplete({
			data: getTimezones()
		});
	}, 2000); // Doing this instantly causes a TypeError for some reason

	setDefaultValues();
	loadSection("introduction");

	// Onclick handlers
	$(".menu-item")
		.click(require("../event-handlers/menu-item"));

	$("#button-previous")
		.click(require("../event-handlers/previous"));
	$("#button-next")
		.click(require("../event-handlers/next"));

	$("#button-discord-TOKEN")
		.click(require("../event-handlers/discord-token"));
	$("#button-discord-admin-id")
		.click(require("../event-handlers/discord-admin-id"));
	$("#button-settings-master-channel")
		.click(require("../event-handlers/settings-master-channel"));

	$("#settings-default-server").on("change", require("../event-handlers/default-server"));

	$(".checkbox-group").click(require("../event-handlers/checkbox"));

	$(".settings-input").focusout(require("../event-handlers/input-settings"));
	$("#input-settings-default-timezone").focusin(
		() => $("#error-div-settings-default-timezone").fadeOut());

	$("#add-steam-bot").click(require("../event-handlers/add-steam-bot"));

	$("#button-deploy-bot").click(require("../event-handlers/deploy-bot"));

};