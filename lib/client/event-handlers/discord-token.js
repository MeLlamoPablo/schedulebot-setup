"use strict";

const api                = require("../modules/api")
	, enableNextButton   = require("../modules/enableNextButton")
	, errorHandler       = require("../modules/errorHandler");

module.exports = () => {
	let button = $("#button-discord-TOKEN");
	let loading = $("#loading-discord-TOKEN");

	let token = $("#input-discord-TOKEN").val();

	button.hide();
	loading.show();

	api.getClientDetails(token).then(details => {

		if (details !== null) {
			$("#discord-bot-user-img").attr("src", details.avatar);
			$("#discord-bot-user-name").html(details.username);
			$("#discord-bot-user-panel").show();

			localStorage.setItem("discord-bot-TOKEN", token);
			localStorage.setItem("discord-bot-username", details.username);
			localStorage.setItem("discord-bot-id", details.id);

			enableNextButton("bot-account");

			$("#input-settings-prefix").val(`<@${localStorage.getItem("discord-bot-id")}>`);
			$("#input-settings-readable-prefix").val(
				`@${localStorage.getItem("discord-bot-username").match(/(.+)#[0-9]+/)[1]}`
			);

			Materialize.updateTextFields();
		} else {
			Materialize.toast("The TOKEN you have provided is incorrect!", 5000);
		}

		button.show();
		loading.hide();

	}).catch(errorHandler);
};