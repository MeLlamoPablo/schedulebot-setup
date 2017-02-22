"use strict";

const addBot = require("../modules/steamBotsManager").addBot;

module.exports = () => {
	let username = $("#input-steam-bot-name").val();
	let password = $("#input-steam-bot-password").val();
	let steamGuardEnabled = $("#input-steam-bot-steam-guard-enabled").is(":checked");
	let steamGuardCode = $("#input-steam-guard-code").val();

	addBot({username, password, steamGuardEnabled, steamGuardCode});
};