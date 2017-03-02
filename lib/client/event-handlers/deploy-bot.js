"use strict";

const deploy       = require("../modules/api").deploy
	, errorHandler = require("../modules/errorHandler");

module.exports = () => {

	let button = $("#button-deploy-bot");
	let loading = $("#loading-deploy-bot");

	button.hide();
	loading.show();

	let payload = {};

	payload.discord = {
		bot: {
			id: localStorage.getItem("discord-bot-id"),
			token: localStorage.getItem("discord-bot-TOKEN"),
			username: localStorage.getItem("discord-bot-username")
		},
		admin: {
			id: localStorage.getItem("discord-admin-id"),
			username: localStorage.getItem("discord-admin-name")
		}
	};

	payload.settings = _getObject("settings");
	payload.steamBots = _getObject("steam-bots");

	let herokuMatches = location.host.match(/(.+)\.herokuapp\.com/);

	if (herokuMatches) {
		payload.heroku = {
			appName: herokuMatches[1]
		};
	}

	deploy(payload)
		.then(() => {

			loading.hide();
			button.show();
			button.addClass("disabled");
			button.text("The bot has been deployed");

			localStorage.clear();

		}).catch(errorHandler);

};

function _getObject(key) {
	return JSON.parse(localStorage.getItem(key) || "{}");
}