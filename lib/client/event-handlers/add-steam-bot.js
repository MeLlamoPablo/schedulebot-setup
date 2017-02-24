"use strict";

const addBot = require("../modules/steamBotsManager").addBot;

module.exports = () => {
	let steamBotNameInput = $("#input-steam-bot-name");
	let steamBotPasswordInput = $("#input-steam-bot-password");
	let steamGuardEnabledCheckbox = $("#input-steam-bot-steam-guard-enabled");
	let steamGuardCodeInput = $("#input-steam-guard-code");

	let username = steamBotNameInput.val();
	let password = steamBotPasswordInput.val();
	let steamGuardEnabled = steamGuardEnabledCheckbox.is(":checked");
	let steamGuardCode = steamGuardCodeInput.val();

	addBot({username, password, steamGuardEnabled, steamGuardCode});

	// Clear inputs
	steamBotNameInput.val("");
	steamBotPasswordInput.val("");
	steamGuardCodeInput.val("");
	steamGuardEnabledCheckbox.prop("checked", false);
	$("#div-steam-bot-steam-guard-enabled").fadeOut();

	Materialize.updateTextFields();
};