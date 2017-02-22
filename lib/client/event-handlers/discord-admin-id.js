"use strict";

const api                = require("../modules/api")
	, enableNextButton   = require("../modules/enableNextButton")
	, errorHandler       = require("../modules/errorHandler");

module.exports = () => {
	let button = $("#button-discord-admin-id");
	let loading = $("#loading-discord-admin-id");

	let id = $("#input-discord-admin-id").val();

	button.hide();
	loading.show();

	api.getUserDetails(localStorage.getItem("discord-bot-token"), id).then(details => {

		if (details !== null) {
			$("#discord-admin-user-img").attr("src", details.avatar);
			$("#discord-admin-user-name").html(details.username);
			$("#discord-admin-user-panel").show();

			localStorage.setItem("discord-admin-id", id);
			localStorage.setItem("discord-admin-name", details.username);

			enableNextButton("bot-admin");
		} else {
			Materialize.toast("The ID you have provided is incorrect!", 5000);
		}

		button.show();
		loading.hide();

	}).catch(errorHandler);
};